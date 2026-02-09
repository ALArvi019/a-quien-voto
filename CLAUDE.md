# ¿A quién voto? - Test de afinidad política

## Stack
- React 19 + Vite 7 + TypeScript
- Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Framer Motion para animaciones
- Supabase para estadísticas anónimas (opcional, funciona sin ella)

## Comandos
- `npm run dev` - Dev server
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

## Estructura
- `src/types/index.ts` - Todos los tipos TypeScript
- `src/data/` - Datos estáticos: partidos, preguntas, categorías, provincias
- `src/utils/scoring.ts` - Algoritmo de puntuación
- `src/hooks/useQuiz.ts` - Hook del quiz
- `src/lib/supabase.ts` - Cliente Supabase
- `src/components/` - Componentes React

## Añadir un partido
1. Añadir a `PartyId` en `src/types/index.ts`
2. Añadir objeto en `src/data/parties.ts`
3. Añadir posición (-2 a +2) en CADA pregunta de `src/data/questions.ts`
4. Crear logo SVG en `public/logos/{id}.svg`
5. Añadir color en `src/index.css` bajo `@theme`

## Añadir una pregunta
1. Añadir en `src/data/questions.ts` con posiciones para todos los partidos
2. Usar categoría existente de `src/data/categories.ts`

## Supabase
Variables de entorno opcionales:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Sin ellas, la app funciona pero sin estadísticas.

## Deploy
GitHub Pages con base path `/a-quien-voto/`.
