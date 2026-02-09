import { motion } from 'framer-motion';
import type { AppView } from '../types';
import { parties } from '../data/parties';

interface Props {
  onNavigate: (view: AppView) => void;
}

export function Landing({ onNavigate }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 relative z-10 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
            ¿A quién voto?
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto">
            Responde 25 preguntas sobre los temas que importan y descubre qué partido político se alinea más con tus ideas.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('quiz')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
          >
            Empezar el test
          </motion.button>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-white mb-10">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: '📝', title: 'Responde preguntas', desc: '25 preguntas sobre temas clave: economía, sanidad, vivienda, inmigración...' },
              { step: '2', icon: '🧮', title: 'Calculamos afinidad', desc: 'Comparamos tus respuestas con las posiciones reales de cada partido.' },
              { step: '3', icon: '🎯', title: 'Descubre tu partido', desc: 'Ranking con % de afinidad, desglose por temas y las razones de cada resultado.' },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Number(item.step) * 0.15 }}
                className="text-center space-y-3"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parties */}
      <section className="px-4 py-12 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Partidos incluidos</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {parties.map((party) => (
              <motion.div
                key={party.id}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-2"
              >
                <img src={party.logo} alt={party.shortName} className="w-16 h-16 rounded-xl" />
                <span className="text-sm font-medium" style={{ color: party.color }}>
                  {party.shortName}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats link */}
      <section className="px-4 py-12 border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-xl font-bold text-white">Estadísticas por provincia</h2>
          <p className="text-sm text-gray-400">
            Consulta cómo piensan los españoles por provincia, basado en los resultados anónimos del test.
          </p>
          <button
            onClick={() => onNavigate('statistics')}
            className="px-6 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-xl transition-colors cursor-pointer"
          >
            Ver estadísticas →
          </button>
        </div>
      </section>
    </div>
  );
}
