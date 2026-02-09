export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 mt-16">
      <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-500 space-y-2">
        <p>
          Esta herramienta es orientativa y no constituye una recomendación de voto.
          Las posiciones de los partidos se basan en sus programas electorales y declaraciones públicas.
        </p>
        <p>
          Proyecto de código abierto.{' '}
          <a
            href="https://github.com/ALArvi019/a-quien-voto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors underline"
          >
            Ver código fuente
          </a>
        </p>
      </div>
    </footer>
  );
}
