import type { Party } from '../types';

export const parties: Party[] = [
  {
    id: 'pp',
    name: 'Partido Popular',
    shortName: 'PP',
    color: '#1e40af',
    logo: '/a-quien-voto/logos/pp.png',
    description: 'Partido de centro-derecha, defensor de la economía de mercado, la unidad de España y valores conservadores.',
    ideology: 'Centro-derecha / Conservador',
    website: 'https://www.pp.es',
  },
  {
    id: 'psoe',
    name: 'Partido Socialista Obrero Español',
    shortName: 'PSOE',
    color: '#dc2626',
    logo: '/a-quien-voto/logos/psoe.png',
    description: 'Partido socialdemócrata, apuesta por el estado de bienestar, los derechos sociales y la justicia social.',
    ideology: 'Centro-izquierda / Socialdemócrata',
    website: 'https://www.psoe.es',
  },
  {
    id: 'vox',
    name: 'VOX',
    shortName: 'VOX',
    color: '#16a34a',
    logo: '/a-quien-voto/logos/vox.png',
    description: 'Partido de derecha, con posiciones firmes en inmigración, unidad nacional y valores tradicionales.',
    ideology: 'Derecha / Conservador',
    website: 'https://www.voxespana.es',
  },
  {
    id: 'podemos',
    name: 'Podemos',
    shortName: 'Podemos',
    color: '#7c3aed',
    logo: '/a-quien-voto/logos/podemos.png',
    description: 'Partido de izquierda, centrado en justicia social, derechos civiles y transformación económica.',
    ideology: 'Izquierda',
    website: 'https://podemos.info',
  },
  {
    id: 'salf',
    name: 'Se Acabó La Fiesta',
    shortName: 'SALF',
    color: '#f97316',
    logo: '/a-quien-voto/logos/salf.png',
    description: 'Partido centrado en la regeneración democrática, la lucha contra la corrupción y la transparencia institucional.',
    ideology: 'Regeneracionista / Transversal',
    website: 'https://www.seacabolafiesta.com',
  },
];

export const partyMap = Object.fromEntries(
  parties.map((p) => [p.id, p])
) as Record<string, Party>;
