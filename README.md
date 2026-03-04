# ¿A quién voto? - Test de afinidad política

Test interactivo que te ayuda a descubrir qué partido político español se alinea más con tus ideas. Responde preguntas sobre temas clave y obtén un ranking de afinidad con desglose por categorías.

## Características

- 73 preguntas sobre 7 categorías: economía, sociedad, seguridad, derechos, religión, valores personales y país/mundo
- 5 partidos: PP, PSOE, VOX, Podemos y Se Acabó La Fiesta
- Ranking con % de afinidad y desglose por temas
- Brújula política (compass) con posicionamiento visual
- Estadísticas anónimas por provincia (opcional vía Supabase)
- Diseño responsive con animaciones

## Stack

- React 19 + Vite 7 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase (opcional)

## Desarrollo

```bash
npm install
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
```

## Variables de entorno (opcionales)

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Sin ellas la app funciona pero sin estadísticas.

## Deploy

GitHub Pages con GitHub Actions. Se despliega automáticamente al hacer push a `main`.
