import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Droplets, 
  Wind, 
  Star, 
  ShieldCheck, 
  Compass, 
  Wine, 
  CloudSun,
  ChevronRight,
  Flame,
  Award,
  X,
  BookOpen,
  Send
} from 'lucide-react';

const App = () => {
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [mirrorPolishing, setMirrorPolishing] = useState(0);
  const [view, setView] = useState('dashboard'); // dashboard, paths, meditation, journal
  const [notif, setNotif] = useState(null);
  
  // State for the experience modal
  const [activeTask, setActiveTask] = useState(null);
  const [experience, setExperience] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);

  const stages = [
    { id: 'sharia', name: 'La Coque (Sharia)', icon: <ShieldCheck className="w-6 h-6" />, color: 'bg-emerald-600', desc: 'La protection des rituels et de la loi.' },
    { id: 'tariqa', name: 'Le Cerneau (Tariqa)', icon: <Compass className="w-6 h-6" />, color: 'bg-blue-600', desc: 'Le voyage intérieur et l\'effort sur le Nafs.' },
    { id: 'haqiqa', name: 'L\'Huile (Haqiqa)', icon: <Star className="w-6 h-6" />, color: 'bg-amber-500', desc: 'La Vérité ultime et l\'extinction en Dieu.' }
  ];

  const tasks = [
    { id: 1, text: "Dhikr : 5 min de souvenir silencieux", points: 10, type: 'polissage', icon: <Wind className="w-4 h-4" /> },
    { id: 2, text: "Maîtrise du Nafs : Transformer une colère en patience", points: 25, type: 'ego', icon: <Flame className="w-4 h-4" /> },
    { id: 3, text: "Sobriété : Action altruiste sans attendre de merci", points: 20, type: 'baqa', icon: <CloudSun className="w-4 h-4" /> },
    { id: 4, text: "Contemplation : Voir la lumière dans une 'blessure'", points: 15, type: 'guerison', icon: <Droplets className="w-4 h-4" /> }
  ];

  const handleOpenTask = (task) => {
    setActiveTask(task);
    setExperience("");
  };

  const handleSubmitExperience = () => {
    if (!experience.trim()) return;

    const newEntry = {
      id: Date.now(),
      taskTitle: activeTask.text,
      content: experience,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }),
      points: activeTask.points
    };

    setJournalEntries([newEntry, ...journalEntries]);
    setPoints(prev => prev + activeTask.points);
    setMirrorPolishing(prev => Math.min(100, prev + 5));
    
    showNotification(`Expérience enregistrée. +${activeTask.points} Points.`);
    
    if (points + activeTask.points > 100 && level === 1) setLevel(2);
    if (points + activeTask.points > 300 && level === 2) setLevel(3);

    setActiveTask(null);
  };

  const showNotification = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const Dashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Mirror Visualizer */}
      <div className="relative flex flex-col items-center justify-center p-8 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20"></div>
        <h2 className="text-xl font-light mb-4 text-white">Miroir du Cœur</h2>
        <div className="relative w-40 h-40 rounded-full border-4 border-white/30 flex items-center justify-center overflow-hidden shadow-inner">
          <div 
            className="absolute inset-0 transition-all duration-1000 bg-slate-800"
            style={{ opacity: 1 - (mirrorPolishing / 100) }}
          ></div>
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-white to-blue-400 opacity-0 transition-opacity duration-1000"
            style={{ opacity: mirrorPolishing / 100 }}
          ></div>
          <Heart className={`w-12 h-12 z-10 ${mirrorPolishing > 50 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
        </div>
        <p className="mt-4 text-sm text-indigo-100 italic text-center px-4">
          {mirrorPolishing < 30 ? "La rouille de l'oubli recouvre le miroir." : 
           mirrorPolishing < 70 ? "La lumière commence à poindre." : 
           "Le miroir reflète la Présence."}
        </p>
        <div className="w-full mt-4 bg-white/20 h-1.5 rounded-full">
          <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: `${mirrorPolishing}%` }}></div>
        </div>
      </div>

      {/* Daily Efforts */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" /> Efforts Quotidiens
        </h3>
        {tasks.map(task => (
          <button 
            key={task.id}
            onClick={() => handleOpenTask(task)}
            className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-between transition-all active:scale-95 group text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 group-hover:scale-110 transition-transform">
                {task.icon}
              </div>
              <span className="text-sm text-gray-200">{task.text}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );

  const JournalView = () => (
    <div className="space-y-4 animate-in slide-in-from-left duration-300">
      <h2 className="text-2xl font-light text-white mb-6 text-center">Journal du Voyageur</h2>
      {journalEntries.length === 0 ? (
        <div className="text-center py-20 opacity-40">
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <p>Aucune expérience consignée pour le moment.</p>
        </div>
      ) : (
        journalEntries.map(entry => (
          <div key={entry.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="text-indigo-300 font-bold text-sm uppercase tracking-wider">{entry.taskTitle}</h4>
              <span className="text-[10px] text-slate-500">{entry.date}</span>
            </div>
            <p className="text-gray-300 text-sm italic leading-relaxed">"{entry.content}"</p>
            <div className="text-[10px] text-amber-400 font-bold tracking-widest">+{entry.points} POINTS</div>
          </div>
        ))
      )}
    </div>
  );

  const StagesView = () => (
    <div className="space-y-4 animate-in slide-in-from-right duration-300">
      <h2 className="text-2xl font-light text-white mb-6 text-center">L'Architecture du Chemin</h2>
      {stages.map((stage, idx) => {
        const isUnlocked = level > idx;
        return (
          <div 
            key={stage.id} 
            className={`p-5 rounded-3xl border transition-all ${isUnlocked ? 'bg-white/10 border-white/20' : 'bg-black/20 border-white/5 opacity-50'}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${stage.color} text-white`}>
                {stage.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">{stage.name}</h3>
                  {!isUnlocked && <span className="text-[10px] uppercase tracking-widest text-gray-400">Verrouillé</span>}
                </div>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 pb-24">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 pt-4">
          <div>
            <h1 className="text-2xl font-serif tracking-tight font-bold text-white">Al-Musafir</h1>
            <p className="text-xs text-indigo-300 uppercase tracking-widest">Le Voyageur Spirituel</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-xs text-slate-400 mb-1">Niveau {level}</div>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-8 h-1 rounded-full ${level >= i ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'bg-slate-700'}`}></div>
              ))}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        {view === 'dashboard' && <Dashboard />}
        {view === 'paths' && <StagesView />}
        {view === 'journal' && <JournalView />}
        {view === 'meditation' && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center animate-in zoom-in duration-500">
             <div className="w-32 h-32 rounded-full border-2 border-indigo-500/30 flex items-center justify-center animate-pulse">
                <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-indigo-500/40"></div>
                </div>
             </div>
             <h2 className="text-xl mt-8 font-light italic">"Mourir avant de mourir"</h2>
             <p className="text-sm text-slate-400 mt-4 px-8 leading-relaxed">
               Lâchez prise sur les formes. Devenez l'océan.
             </p>
             <button 
               onClick={() => setView('dashboard')}
               className="mt-10 px-6 py-2 bg-indigo-600 rounded-full text-sm font-bold shadow-lg shadow-indigo-500/20"
             >
               Retour au monde
             </button>
          </div>
        )}

        {/* Experience Modal */}
        {activeTask && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
                    {activeTask.icon}
                  </div>
                  <button onClick={() => setActiveTask(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{activeTask.text}</h3>
                  <p className="text-xs text-indigo-300 uppercase tracking-widest font-bold">Consigner votre expérience</p>
                </div>

                <textarea
                  autoFocus
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Qu'avez-vous ressenti ? Qu'est-ce qui a changé en vous ?"
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                />

                <button 
                  onClick={handleSubmitExperience}
                  disabled={!experience.trim()}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${experience.trim() ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                >
                  <Send className="w-4 h-4" />
                  Valider l'effort
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {notif && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg animate-in slide-in-from-bottom duration-300 z-50">
            {notif}
          </div>
        )}

        {/* Bottom Nav */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-around px-2 shadow-2xl z-40">
          <button 
            onClick={() => setView('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${view === 'dashboard' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-[10px] font-bold">Cœur</span>
          </button>
          <button 
             onClick={() => setView('journal')}
             className={`flex flex-col items-center gap-1 transition-colors ${view === 'journal' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-bold">Journal</span>
          </button>
          <button 
             onClick={() => setView('paths')}
             className={`flex flex-col items-center gap-1 transition-colors ${view === 'paths' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-bold">Chemin</span>
          </button>
          <button 
             onClick={() => setView('meditation')}
             className={`flex flex-col items-center gap-1 transition-colors ${view === 'meditation' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            <Droplets className="w-5 h-5" />
            <span className="text-[10px] font-bold">Fana</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default App;