export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 mt-16">
      <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-400 space-y-1">
        <p>Herramienta orientativa basada en programas electorales. No constituye recomendación de voto.</p>
        <p>
          <a
            href="https://github.com/ALArvi019/a-quien-voto"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 inline-flex items-center min-h-[44px] text-gray-400 hover:text-white transition-colors underline"
          >
            Código fuente
          </a>
        </p>
      </div>
    </footer>
  );
}
