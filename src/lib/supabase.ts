import { createClient } from '@supabase/supabase-js';
import type { PartyId, ProvinceStatData, ResultRecord } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function saveResult(record: ResultRecord): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('results').insert({
    province: record.province,
    party_scores: record.party_scores,
    top_party: record.top_party,
  });
  return !error;
}

export async function getProvinceStats(): Promise<ProvinceStatData[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('results').select('*');
  if (error || !data) return [];

  const grouped: Record<string, { scores: Record<PartyId, number[]>; count: number }> = {};

  for (const row of data) {
    const prov = row.province as string;
    if (!grouped[prov]) {
      grouped[prov] = {
        scores: { pp: [], psoe: [], vox: [], podemos: [], salf: [] },
        count: 0,
      };
    }
    grouped[prov].count++;
    const ps = row.party_scores as Record<PartyId, number>;
    for (const pid of Object.keys(ps) as PartyId[]) {
      if (grouped[prov].scores[pid]) {
        grouped[prov].scores[pid].push(ps[pid]);
      }
    }
  }

  return Object.entries(grouped).map(([province, data]) => {
    const avgScores = {} as Record<PartyId, number>;
    let topParty: PartyId = 'pp';
    let topAvg = 0;
    for (const pid of Object.keys(data.scores) as PartyId[]) {
      const arr = data.scores[pid];
      const avg = arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
      avgScores[pid] = Math.round(avg);
      if (avg > topAvg) {
        topAvg = avg;
        topParty = pid;
      }
    }
    return { province, total: data.count, avgScores, topParty };
  });
}

export async function getNationalStats(): Promise<{
  total: number;
  avgScores: Record<PartyId, number>;
} | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('results').select('party_scores');
  if (error || !data || data.length === 0) return null;

  const sums: Record<PartyId, number> = { pp: 0, psoe: 0, vox: 0, podemos: 0, salf: 0 };
  for (const row of data) {
    const ps = row.party_scores as Record<PartyId, number>;
    for (const pid of Object.keys(ps) as PartyId[]) {
      sums[pid] += ps[pid];
    }
  }

  const avgScores = {} as Record<PartyId, number>;
  for (const pid of Object.keys(sums) as PartyId[]) {
    avgScores[pid] = Math.round(sums[pid] / data.length);
  }

  return { total: data.length, avgScores };
}
