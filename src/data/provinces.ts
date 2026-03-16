import * as topojson from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import spainTopo from 'es-atlas/es/provinces.json';

export interface ProvinceFeature {
  id: string; // INE code like "28"
  name: string;
  geometry: GeoJSON.Geometry;
}

const topo = spainTopo as unknown as Topology;
const geojson = topojson.feature(
  topo,
  topo.objects.provinces as GeometryCollection
);

// Map INE codes to clean Spanish names
const nameOverrides: Record<string, string> = {
  '01': 'Álava',
  '03': 'Alicante',
  '07': 'Islas Baleares',
  '08': 'Barcelona',
  '12': 'Castellón',
  '15': 'A Coruña',
  '17': 'Girona',
  '20': 'Guipúzcoa',
  '25': 'Lleida',
  '43': 'Tarragona',
  '46': 'Valencia',
  '48': 'Vizcaya',
};

export const provinces: ProvinceFeature[] = geojson.features
  .filter((f) => f.id !== '54') // Exclude Gibraltar
  .map((f) => ({
    id: String(f.id),
    name: nameOverrides[String(f.id)] || (f.properties as { name: string }).name,
    geometry: f.geometry,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'es'));

export const provinceMap = Object.fromEntries(
  provinces.map((p) => [p.id, p])
) as Record<string, ProvinceFeature>;
