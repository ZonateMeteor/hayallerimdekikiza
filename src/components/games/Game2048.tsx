import { useCallback, useEffect, useRef, useState } from "react";
import { GameOver } from "./GameOver";

type Grid = number[][];

const SIZE = 4;

function emptyGrid(): Grid {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function clone(g: Grid): Grid {
  return g.map((r) => [...r]);
}

function addRandom(g: Grid): Grid {
  const empties: [number, number][] = [];
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (g[r][c] === 0) empties.push([r, c]);
  if (empties.length === 0) return g;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  const ng = clone(g);
  ng[r][c] = Math.random() < 0.9 ? 2 : 4;
  return ng;
}

function rotate(g: Grid): Grid {
  const ng = emptyGrid();
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) ng[c][SIZE - 1 - r] = g[r][c];
  return ng;
}

function slideLeft(g: Grid): { grid: Grid; gained: number; moved: boolean } {
  let gained = 0;
  let moved = false;
  const ng = g.map((row) => {
    const filtered = row.filter((v) => v !== 0);
    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2;
        gained += filtered[i];
        filtered.splice(i + 1, 1);
      }
    }
    while (filtered.length < SIZE) filtered.push(0);
    if (filtered.some((v, i) => v !== row[i])) moved = true;
    return filtered;
  });
  return { grid: ng, gained, moved };
}

function move(g: Grid, dir: "left" | "right" | "up" | "down"): { grid: Grid; gained: number; moved: boolean } {
  let rotations = 0;
  if (dir === "up") rotations = 3;
  else if (dir === "right") rotations = 2;
  else if (dir === "down") rotations = 1;
  let work = g;
  for (let i = 0; i < rotations; i++) work = rotate(work);
  const res = slideLeft(work);
  let result = res.grid;
  for (let i = 0; i < (4 - rotations) % 4; i++) result = rotate(result);
  return { grid: result, gained: res.gained, moved: res.moved };
}

function isGameOver(g: Grid): boolean {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c] === 0) return false;
      if (c < SIZE - 1 && g[r][c] === g[r][c + 1]) return false;
      if (r < SIZE - 1 && g[r][c] === g[r + 1][c]) return false;
    }
  return true;
}

const TILE_COLORS: Record<number, string> = {
  0: "transparent",
  2: "#1e293b",
  4: "#334155",
  8: "#0ea5e9",
  16: "#6366f1",
  32: "#8b5cf6",
  64: "#ec4899",
  128: "#f59e0b",
  256: "#f97316",
  512: "#ef4444",
  1024: "#22d3ee",
  2048: "#10b981",
};

export function Game2048({ onExit }: { onExit: () => void }) {
  const [grid, setGrid] = useState<Grid>(() => addRandom(addRandom(emptyGrid())));
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const gridRef = useRef(grid);
  gridRef.current = grid;

  const reset = useCallback(() => {
    setGrid(addRandom(addRandom(emptyGrid())));
    setScore(0);
    setOver(false);
  }, []);

  const doMove = useCallback(
    (dir: "left" | "right" | "up" | "down") => {
      if (over) return;
      const res = move(gridRef.current, dir);
      if (!res.moved) return;
      const withRandom = addRandom(res.grid);
      setGrid(withRandom);
      setScore((s) => s + res.gained);
      if (isGameOver(withRandom)) setOver(true);
    },
    [over]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") doMove("left");
      else if (e.key === "ArrowRight") doMove("right");
      else if (e.key === "ArrowUp") doMove("up");
      else if (e.key === "ArrowDown") doMove("down");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [doMove]);

  // Dokunmatik kaydırma
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  return (
    <div className="mx-auto w-full max-w-md px-4">
      {!over ? (
        <>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-muted">Skor: <b style={{ color: "var(--accent)" }}>{score}</b></span>
            <span className="text-muted text-xs">Kaydırarak oyna</span>
          </div>
          <div
            className="no-touch-scroll relative mx-auto rounded-xl p-2"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", aspectRatio: "1", width: "100%" }}
            onTouchStart={(e) => {
              touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }}
            onTouchMove={(e) => {
              if (e.cancelable) e.preventDefault();
            }}
            onTouchEnd={(e) => {
              if (!touchStart.current) return;
              const dx = e.changedTouches[0].clientX - touchStart.current.x;
              const dy = e.changedTouches[0].clientY - touchStart.current.y;
              if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 20) doMove("right");
                else if (dx < -20) doMove("left");
              } else {
                if (dy > 20) doMove("down");
                else if (dy < -20) doMove("up");
              }
              touchStart.current = null;
            }}
          >
            {grid.map((row, r) =>
              row.map((val, c) => (
                <span
                  key={`${r}-${c}`}
                  className="absolute flex items-center justify-center rounded font-bold transition-all"
                  style={{
                    left: `calc(${(c / SIZE) * 100}% + 4px)`,
                    top: `calc(${(r / SIZE) * 100}% + 4px)`,
                    width: `calc(${100 / SIZE}% - 8px)`,
                    height: `calc(${100 / SIZE}% - 8px)`,
                    background: TILE_COLORS[val] ?? "#fbbf24",
                    color: val <= 4 ? "var(--text-muted)" : "#fff",
                    fontSize: val >= 1024 ? "1.5rem" : "2rem",
                  }}
                >
                  {val !== 0 ? val : ""}
                </span>
              ))
            )}
          </div>
        </>
      ) : (
        <GameOver game="2048" gameLabel="2048" score={score} onRestart={reset} onExit={onExit} />
      )}
    </div>
  );
}
