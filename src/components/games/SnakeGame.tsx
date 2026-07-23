import { useCallback, useEffect, useRef, useState } from "react";
import { GameOver } from "./GameOver";

const GRID = 15;
const SPEED = 130;

type Point = { x: number; y: number };

function randomFood(snake: Point[]): Point {
  while (true) {
    const p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    if (!snake.some((s) => s.x === p.x && s.y === p.y)) return p;
  }
}

export function SnakeGame({ onExit }: { onExit: () => void }) {
  const [snake, setSnake] = useState<Point[]>([{ x: 7, y: 7 }]);
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const reset = useCallback(() => {
    setSnake([{ x: 7, y: 7 }]);
    setDir({ x: 1, y: 0 });
    setFood(randomFood([{ x: 7, y: 7 }]));
    setScore(0);
    setOver(false);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const d = dirRef.current;
      if (e.key === "ArrowUp" && d.y === 0) setDir({ x: 0, y: -1 });
      else if (e.key === "ArrowDown" && d.y === 0) setDir({ x: 0, y: 1 });
      else if (e.key === "ArrowLeft" && d.x === 0) setDir({ x: -1, y: 0 });
      else if (e.key === "ArrowRight" && d.x === 0) setDir({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Dokunmatik kaydırma
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const d = dirRef.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20 && d.x === 0) setDir({ x: 1, y: 0 });
      else if (dx < -20 && d.x === 0) setDir({ x: -1, y: 0 });
    } else {
      if (dy > 20 && d.y === 0) setDir({ x: 0, y: 1 });
      else if (dy < -20 && d.y === 0) setDir({ x: 0, y: -1 });
    }
    touchStart.current = null;
  }

  useEffect(() => {
    if (over) return;
    const t = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        let next = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };
        // Duvarlardan geçiş (toroidal)
        if (next.x < 0) next.x = GRID - 1;
        else if (next.x >= GRID) next.x = 0;
        if (next.y < 0) next.y = GRID - 1;
        else if (next.y >= GRID) next.y = 0;
        if (prev.some((s) => s.x === next.x && s.y === next.y)) {
          setOver(true);
          return prev;
        }
        const newSnake = [next, ...prev];
        if (next.x === food.x && next.y === food.y) {
          setScore((s) => s + 10);
          setFood(randomFood(newSnake));
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(t);
  }, [food, over]);

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
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              aspectRatio: "1",
              width: "100%",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {food && (
              <span
                className="absolute rounded-full"
                style={{
                  left: `calc(${(food.x / GRID) * 100}% + 4px)`,
                  top: `calc(${(food.y / GRID) * 100}% + 4px)`,
                  width: `calc(${100 / GRID}% - 8px)`,
                  height: `calc(${100 / GRID}% - 8px)`,
                  background: "var(--accent)",
                }}
              />
            )}
            {snake.map((s, i) => (
              <span
                key={i}
                className="absolute rounded"
                style={{
                  left: `calc(${(s.x / GRID) * 100}% + 2px)`,
                  top: `calc(${(s.y / GRID) * 100}% + 2px)`,
                  width: `calc(${100 / GRID}% - 4px)`,
                  height: `calc(${100 / GRID}% - 4px)`,
                  background: i === 0 ? "var(--primary)" : "var(--primary-hover)",
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <GameOver
          game="snake"
          gameLabel="Yılan"
          score={score}
          onRestart={reset}
          onExit={onExit}
        />
      )}
    </div>
  );
}
