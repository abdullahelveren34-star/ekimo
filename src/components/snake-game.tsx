'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const CANVAS_SIZE = 400;
const SNAKE_START = [
  [8, 7],
  [8, 8]
];
const FOOD_START = [8, 3];
const SCALE = 20;
const SPEED = 150;
const DIRECTIONS: { [key: string]: number[] } = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0]
};

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [food, setFood] = useState(FOOD_START);
  const [direction, setDirection] = useState(DIRECTIONS['ArrowRight']);
  const [speed, setSpeed] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setSnake(SNAKE_START);
    setFood(FOOD_START);
    setDirection(DIRECTIONS['ArrowRight']);
    setSpeed(SPEED);
    setGameOver(false);
    setScore(0);
    gameContainerRef.current?.focus();
  };

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const createFood = () =>
    food.map((_c, i) => Math.floor(Math.random() * (CANVAS_SIZE / SCALE)));

  const checkCollision = (piece: number[], sn: number[][] = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE ||
      piece[1] < 0
    )
      return true;

    for (const segment of sn) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkFoodCollision = (newSnake: number[][]) => {
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newFood = createFood();
      while (checkCollision(newFood, newSnake)) {
        newFood = createFood();
      }
      setFood(newFood);
      setScore(prev => prev + 1);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + direction[0], snakeCopy[0][1] + direction[1]];
    if (checkCollision(newSnakeHead)) {
        endGame();
        return;
    }
    snakeCopy.unshift(newSnakeHead);
    if (!checkFoodCollision(snakeCopy)) {
      snakeCopy.pop();
    }
    setSnake(snakeCopy);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // prevent browser scroll
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
    const newDirection = DIRECTIONS[e.key];
    // prevent snake from going backwards
    if (newDirection) {
        const [dx, dy] = direction;
        const [newDx, newDy] = newDirection;
        if ((dx !== 0 && dx === -newDx) || (dy !== 0 && dy === -newDy)) {
            return;
        }
       setDirection(newDirection);
    }
  };

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      context.fillStyle = "hsl(var(--primary))";
      snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
      context.fillStyle = "hsl(var(--accent))";
      context.fillRect(food[0], food[1], 1, 1);
    }
  }, [snake, food, gameOver]);


  useEffect(() => {
    if (speed !== null && !gameOver) {
      const interval = setInterval(gameLoop, speed);
      return () => clearInterval(interval);
    }
  }, [snake, direction, speed, gameOver]);
  
  useEffect(() => {
    if(!gameOver && speed !== null) {
        gameContainerRef.current?.focus();
    }
  }, [gameOver, speed]);

  return (
    <div ref={gameContainerRef} onKeyDown={handleKeyDown} tabIndex={0} className="relative focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <canvas
        ref={canvasRef}
        width={`${CANVAS_SIZE}px`}
        height={`${CANVAS_SIZE}px`}
        className="bg-secondary rounded-md mx-auto"
      />
       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center w-full">
            <p className="text-lg font-bold">Skor: {score}</p>
        </div>
      {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
            <h2 className="text-3xl font-bold text-destructive mb-4">Oyun Bitti!</h2>
            <p className="text-lg mb-4">Skorunuz: {score}</p>
            <Button onClick={startGame}>Yeniden Başla</Button>
          </div>
      )}
       {!speed && !gameOver && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
             <h2 className="text-2xl font-bold mb-4">Yılan Oyunu</h2>
             <p className="text-muted-foreground mb-4">Başlamak için butona tıklayın ve yön tuşlarını kullanın.</p>
             <Button onClick={startGame}>Oyunu Başlat</Button>
           </div>
       )}
    </div>
  );
};
