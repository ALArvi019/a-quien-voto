import type { Category } from '../types';

export const categories: Category[] = [
  { id: 'country_world', name: 'País y Mundo', icon: '🌍' },
  { id: 'economy', name: 'Economía', icon: '💰' },
  { id: 'personal_values', name: 'Valores Personales', icon: '🧭' },
  { id: 'society', name: 'Sociedad', icon: '🏛️' },
  { id: 'religion', name: 'Religión', icon: '⛪' },
  { id: 'rights_freedoms', name: 'Derechos y Libertades', icon: '⚖️' },
  { id: 'security', name: 'Seguridad y Justicia', icon: '🛡️' },
];

export const categoryMap = Object.fromEntries(
  categories.map((c) => [c.id, c])
) as Record<string, Category>;
