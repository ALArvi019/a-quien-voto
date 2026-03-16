import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Answer, AppView, PartyScore, SavedQuiz } from './types';
import { Landing } from './components/Landing';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { ProvinceSelector } from './components/ProvinceSelector';
import { Statistics } from './components/Statistics';
import { Footer } from './components/Footer';
import { saveQuiz } from './lib/storage';

function App() {
  const [view, setView] = useState<AppView>('landing');
  const [scores, setScores] = useState<PartyScore[]>([]);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const navigate = useCallback((v: AppView) => {
    setView(v);
    window.scrollTo(0, 0);
  }, []);

  const handleQuizComplete = useCallback(
    (s: PartyScore[], a: Record<string, Answer>) => {
      setScores(s);
      setAnswers(a);
      saveQuiz(a as Record<string, -2 | -1 | 0 | 1 | 2>, s);
      navigate('province'); // Force province selection before results
    },
    [navigate]
  );

  const handleProvinceSelected = useCallback(() => {
    navigate('results');
  }, [navigate]);

  const handleLoadSaved = useCallback(
    (saved: SavedQuiz) => {
      setScores(saved.scores);
      setAnswers(saved.answers ?? {});
      navigate('results');
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {view === 'landing' && <Landing onNavigate={navigate} onLoadSaved={handleLoadSaved} />}
          {view === 'quiz' && <Quiz onComplete={handleQuizComplete} onNavigate={navigate} />}
          {view === 'results' && <Results scores={scores} answers={answers} onNavigate={navigate} />}
          {view === 'province' && (
            <ProvinceSelector
              scores={scores}
              onNavigate={navigate}
              onProvinceSaved={handleProvinceSelected}
            />
          )}
          {view === 'statistics' && <Statistics onNavigate={navigate} />}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
