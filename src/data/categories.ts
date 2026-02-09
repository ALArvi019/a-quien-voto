import type { Category } from '../types';

export const categories: Category[] = [
  { id: 'immigration', name: 'Inmigración', icon: '🌍' },
  { id: 'economy', name: 'Economía y Fiscalidad', icon: '💰' },
  { id: 'health', name: 'Sanidad', icon: '🏥' },
  { id: 'housing', name: 'Vivienda', icon: '🏠' },
  { id: 'security', name: 'Seguridad y Justicia', icon: '⚖️' },
  { id: 'education', name: 'Educación', icon: '📚' },
  { id: 'environment', name: 'Medio Ambiente y Energía', icon: '🌱' },
  { id: 'social_rights', name: 'Derechos Sociales', icon: '🤝' },
  { id: 'territorial', name: 'Modelo Territorial', icon: '🗺️' },
  { id: 'transparency', name: 'Transparencia y Regeneración', icon: '🔍' },
];

export const categoryMap = Object.fromEntries(
  categories.map((c) => [c.id, c])
) as Record<string, Category>;
