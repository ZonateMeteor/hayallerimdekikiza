/*
# Create feedbacks and game_scores tables (single-tenant, no auth)

1. New Tables
- `feedbacks`: stores visitor feedback messages for the birthday site.
  - `id` (uuid, primary key)
  - `name` (text, optional visitor name)
  - `message` (text, required feedback content)
  - `created_at` (timestamptz, default now())
- `game_scores`: stores leaderboard entries for mini-games (snake, 2048).
  - `id` (uuid, primary key)
  - `game` (text, which game: 'snake' or '2048')
  - `player_name` (text, name entered at game over)
  - `score` (integer, achieved score)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- Allow anon + authenticated CRUD because the data is intentionally public/shared (no sign-in screen on this site).
*/

CREATE TABLE IF NOT EXISTS feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_feedbacks" ON feedbacks;
CREATE POLICY "anon_select_feedbacks" ON feedbacks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_feedbacks" ON feedbacks;
CREATE POLICY "anon_insert_feedbacks" ON feedbacks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_feedbacks" ON feedbacks;
CREATE POLICY "anon_delete_feedbacks" ON feedbacks FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game text NOT NULL,
  player_name text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_game_scores" ON game_scores;
CREATE POLICY "anon_select_game_scores" ON game_scores FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_game_scores" ON game_scores;
CREATE POLICY "anon_insert_game_scores" ON game_scores FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS game_scores_game_score_idx ON game_scores (game, score DESC);
