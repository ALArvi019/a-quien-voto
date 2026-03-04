import { useState, useCallback } from 'react';
import type { Answer, AppView, PartyScore } from './types';
import { Landing } from './components/Landing';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { ProvinceSelector } from './components/ProvinceSelector';
import { Statistics } from './components/Statistics';
import { Footer } from './components/Footer';

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
      navigate('results');
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {view === 'landing' && <Landing onNavigate={navigate} />}
      {view === 'quiz' && <Quiz onComplete={handleQuizComplete} onNavigate={navigate} />}
      {view === 'results' && <Results scores={scores} answers={answers} onNavigate={navigate} />}
      {view === 'province' && <ProvinceSelector scores={scores} onNavigate={navigate} />}
      {view === 'statistics' && <Statistics onNavigate={navigate} />}
      <Footer />
    </div>
  );
}

export default App;
