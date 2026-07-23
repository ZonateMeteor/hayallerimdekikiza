import { supabase } from "../lib/supabase";

export interface ScoreEntry {
  id: string;
  player_name: string;
  score: number;
  created_at: string;
}

export async function fetchScores(game: string): Promise<ScoreEntry[]> {
  const { data, error } = await supabase
    .from("game_scores")
    .select("id, player_name, score, created_at")
    .eq("game", game)
    .order("score", { ascending: false })
    .limit(10);
  if (error) return [];
  return (data ?? []) as ScoreEntry[];
}

export async function submitScore(game: string, playerName: string, score: number): Promise<void> {
  await supabase.from("game_scores").insert({ game, player_name: playerName, score });
}
