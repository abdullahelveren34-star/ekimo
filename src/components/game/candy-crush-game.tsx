'use client';
import { useState, useEffect, useCallback } from 'react';
import { Gem, Star, Heart, Apple, Cherry, Sun, Moon, Play, Pause } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const width = 8;
const itemTypes = [
    { component: Gem, color: 'text-purple-500' },
    { component: Star, color: 'text-yellow-500' },
    { component: Heart, color: 'text-red-500' },
    { component: Apple, color: 'text-green-500' },
    { component: Cherry, color: 'text-pink-500' },
    { component: Sun, color: 'text-orange-500' },
    { component: Moon, color: 'text-blue-500' },
];

const blankItem = { component: null, color: '' };

const GameLogo = () => (
    <div className="flex items-center justify-center -ml-8">
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.2"/>
                </filter>
            </defs>
            <g style={{ filter: 'url(#drop-shadow)' }}>
                {/* Body */}
                <circle cx="50" cy="65" r="30" fill="#A0522D"/>
                
                {/* Head */}
                <circle cx="50" cy="35" r="25" fill="#CD853F"/>
                
                {/* Ears */}
                <circle cx="30" cy="15" r="10" fill="#A0522D"/>
                <circle cx="70" cy="15" r="10" fill="#A0522D"/>
                <circle cx="30" cy="17" r="7" fill="#F4A460"/>
                <circle cx="70" cy="17" r="7" fill="#F4A460"/>
                
                {/* Muzzle */}
                <ellipse cx="50" cy="42" rx="15" ry="12" fill="#F4A460"/>
                
                {/* Nose */}
                <path d="M50 38 a 4,3 0 0,1 0,6 a 4,3 0 0,1 0,-6" fill="#654321"/>
                
                {/* Eyes */}
                <circle cx="42" cy="32" r="3" fill="#000000"/>
                <circle cx="58" cy="32" r="3" fill="#000000"/>
                
                {/* Smile */}
                <path d="M44 45 Q50 52, 56 45" stroke="#654321" strokeWidth="2" fill="none" strokeLinecap="round"/>

                {/* Crossed Arms */}
                <path d="M 30 60 C 40 55, 60 55, 70 60 L 75 75 C 60 70, 40 70, 25 75 Z" fill="#CD853F" />
                <path d="M 30 60 C 35 62, 40 62, 45 60" stroke="#A0522D" strokeWidth="2" fill="none"/>
                <path d="M 55 60 C 60 62, 65 62, 70 60" stroke="#A0522D" strokeWidth="2" fill="none"/>
            </g>
        </svg>
        <svg width="180" height="100" viewBox="0 0 180 100" className="drop-shadow-lg">
            <defs>
                <linearGradient id="candy-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff8a00" />
                    <stop offset="100%" stopColor="#e52e71" />
                </linearGradient>
                <style>
                    {`@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');`}
                </style>
            </defs>
            <text
                fontFamily="'Pacifico', cursive"
                fontSize="40"
                fill="url(#candy-grad)"
                stroke="#fff"
                strokeWidth="2"
                strokeLinejoin="round"
                x="50%"
                y="45%"
                textAnchor="middle"
            >
                Candy
            </text>
            <text
                fontFamily="'Pacifico', cursive"
                fontSize="32"
                fill="#a855f7" 
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinejoin="round"
                x="50%"
                y="80%"
                textAnchor="middle"
            >
                Crush
            </text>
        </svg>
    </div>
);


const DecorativeItems = () => (
    <>
      {/* Left Side Decorations */}
      <Gem className="absolute -left-4 top-1/4 w-16 h-16 text-purple-500 opacity-20 transform -rotate-12 pointer-events-none" />
      <Star className="absolute left-10 top-2/3 w-12 h-12 text-yellow-500 opacity-20 transform rotate-20 pointer-events-none" />
      <Apple className="absolute left-2 bottom-8 w-10 h-10 text-green-500 opacity-20 transform -rotate-45 pointer-events-none" />
      <Cherry className="absolute left-20 top-10 w-8 h-8 text-pink-500 opacity-20 transform rotate-12 pointer-events-none" />
      <Sun className="absolute left-0 top-1/2 w-10 h-10 text-orange-500 opacity-20 transform -rotate-12 pointer-events-none" />
      <Moon className="absolute left-28 bottom-2 w-14 h-14 text-blue-500 opacity-20 transform rotate-45 pointer-events-none" />
      <Heart className="absolute left-1/4 top-4 w-12 h-12 text-red-500 opacity-20 transform pointer-events-none" />
      
      {/* Right Side Decorations */}
      <Heart className="absolute -right-5 top-1/3 w-16 h-16 text-red-500 opacity-20 transform rotate-12 pointer-events-none" />
      <Moon className="absolute right-12 top-3/4 w-12 h-12 text-blue-500 opacity-20 transform -rotate-20 pointer-events-none" />
      <Sun className="absolute right-4 bottom-16 w-10 h-10 text-orange-500 opacity-20 transform rotate-45 pointer-events-none" />
      <Gem className="absolute right-20 top-12 w-8 h-8 text-purple-500 opacity-20 transform -rotate-30 pointer-events-none" />
      <Apple className="absolute right-0 top-3/4 w-10 h-10 text-green-500 opacity-20 transform rotate-12 pointer-events-none" />
      <Star className="absolute right-28 bottom-4 w-14 h-14 text-yellow-500 opacity-20 transform -rotate-45 pointer-events-none" />
      <Cherry className="absolute right-1/4 top-8 w-12 h-12 text-pink-500 opacity-20 transform -rotate-12 pointer-events-none" />

       {/* Center-ish decorations */}
      <Star className="absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 text-yellow-500 opacity-10 pointer-events-none" />
      <Heart className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-10 text-red-500 opacity-10 pointer-events-none" />
    </>
);


export const CandyCrushGame = () => {
    const [board, setBoard] = useState<any[]>([]);
    const [score, setScore] = useState(0);
    const [scoreUpdated, setScoreUpdated] = useState(false);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [replacedItemIndex, setReplacedItemIndex] = useState<number | null>(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    const createBoard = useCallback(() => {
        const newBoard = Array.from({ length: width * width }, () => itemTypes[Math.floor(Math.random() * itemTypes.length)]);
        setBoard(newBoard);
        setScore(0);
    }, []);
    
    useEffect(() => {
        createBoard();
    }, [createBoard]);

    useEffect(() => {
        if (score > 0) {
            setScoreUpdated(true);
            const timer = setTimeout(() => setScoreUpdated(false), 500);
            return () => clearTimeout(timer);
        }
    }, [score]);

    const checkForColumnOfFour = useCallback((currentBoard: any[]) => {
        let changed = false;
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentBoard[i]?.color;
            const isBlank = currentBoard[i]?.component === null;
            if (!isBlank && columnOfFour.every(index => currentBoard[index]?.color === decidedColor)) {
                setScore(prev => prev + 4);
                columnOfFour.forEach(index => currentBoard[index] = blankItem);
                changed = true;
            }
        }
        return changed;
    }, []);

    const checkForRowOfFour = useCallback((currentBoard: any[]) => {
        let changed = false;
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentBoard[i]?.color;
            const isBlank = currentBoard[i]?.component === null;
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
            if (notValid.includes(i)) continue;
            if (!isBlank && rowOfFour.every(index => currentBoard[index]?.color === decidedColor)) {
                setScore(prev => prev + 4);
                rowOfFour.forEach(index => currentBoard[index] = blankItem);
                changed = true;
            }
        }
        return changed;
    }, []);

    const checkForColumnOfThree = useCallback((currentBoard: any[]) => {
        let changed = false;
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentBoard[i]?.color;
            const isBlank = currentBoard[i]?.component === null;
            if (!isBlank && columnOfThree.every(index => currentBoard[index]?.color === decidedColor)) {
                setScore(prev => prev + 3);
                columnOfThree.forEach(index => currentBoard[index] = blankItem);
                changed = true;
            }
        }
        return changed;
    }, []);

    const checkForRowOfThree = useCallback((currentBoard: any[]) => {
        let changed = false;
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentBoard[i]?.color;
            const isBlank = currentBoard[i]?.component === null;
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
            if (notValid.includes(i)) continue;
            if (!isBlank && rowOfThree.every(index => currentBoard[index]?.color === decidedColor)) {
                setScore(prev => prev + 3);
                rowOfThree.forEach(index => currentBoard[index] = blankItem);
                changed = true;
            }
        }
        return changed;
    }, []);
    
    const moveIntoSquareBelow = useCallback((currentBoard: any[]) => {
        let changed = false;
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);

            if (isFirstRow && currentBoard[i].component === null) {
                currentBoard[i] = itemTypes[Math.floor(Math.random() * itemTypes.length)];
                changed = true;
            }
            if (currentBoard[i + width].component === null) {
                currentBoard[i + width] = currentBoard[i];
                currentBoard[i] = blankItem;
                changed = true;
            }
        }
        return changed;
    }, []);

    const performMove = (fromIndex: number, toIndex: number) => {
        const newBoard = [...board];
        const draggedItem = newBoard[fromIndex];
        newBoard[fromIndex] = newBoard[toIndex];
        newBoard[toIndex] = draggedItem;

        const tempBoard = [...newBoard];
        const col4 = checkForColumnOfFour(tempBoard);
        const row4 = checkForRowOfFour(tempBoard);
        const col3 = checkForColumnOfThree(tempBoard);
        const row3 = checkForRowOfThree(tempBoard);
        
        if (row3 || row4 || col3 || col4) {
             setBoard(newBoard);
             return true;
        }
        return false;
    }

    const findValidMove = () => {
        for (let i = 0; i < width * width; i++) {
            const neighbors = [i + 1, i - 1, i + width, i - width].filter(n => n >= 0 && n < width * width);
            for (const neighbor of neighbors) {
                 const newBoard = [...board];
                 const temp = newBoard[i];
                 newBoard[i] = newBoard[neighbor];
                 newBoard[neighbor] = temp;
 
                 const tempBoardForCheck = [...newBoard];
                 if (checkForColumnOfFour(tempBoardForCheck) || checkForRowOfFour(tempBoardForCheck) || checkForColumnOfThree(tempBoardForCheck) || checkForRowOfThree(tempBoardForCheck)) {
                     return { from: i, to: neighbor };
                 }
            }
        }
        return null;
    }

    useEffect(() => {
        const gameLoop = setInterval(() => {
            const newBoard = [...board];
            const col4 = checkForColumnOfFour(newBoard);
            const row4 = checkForRowOfFour(newBoard);
            const col3 = checkForColumnOfThree(newBoard);
            const row3 = checkForRowOfThree(newBoard);
            const gravity = moveIntoSquareBelow(newBoard);
            
            if (col4 || row4 || col3 || row3 || gravity) {
                setBoard(newBoard);
            }
        }, 150);
        return () => clearInterval(gameLoop);
    }, [board, checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow]);

    useEffect(() => {
        if (isAutoPlaying) {
            const autoPlayLoop = setInterval(() => {
                const move = findValidMove();
                if (move) {
                    performMove(move.from, move.to);
                } else {
                    // No valid moves, maybe reset board or stop
                    setIsAutoPlaying(false);
                }
            }, 1000);
            return () => clearInterval(autoPlayLoop);
        }
    }, [isAutoPlaying, board]);


    const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setDraggedItemIndex(parseInt(e.currentTarget.dataset.id || '-1'));
    }

    const dragDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setReplacedItemIndex(parseInt(e.currentTarget.dataset.id || '-1'));
    }

    const dragEnd = () => {
        if (draggedItemIndex === null || replacedItemIndex === null) return;

        const validMoves = [
            draggedItemIndex - 1,
            draggedItemIndex + 1,
            draggedItemIndex - width,
            draggedItemIndex + width,
        ];
        
        const isValidMove = validMoves.includes(replacedItemIndex);
        
        if (isValidMove) {
            performMove(draggedItemIndex, replacedItemIndex);
        }
        
        setDraggedItemIndex(null);
        setReplacedItemIndex(null);
    }
    
    const toggleAutoPlay = () => {
        setIsAutoPlaying(prev => !prev);
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="flex flex-col items-center gap-6 p-6 relative">
                 <DecorativeItems />
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full z-10">
                    <div className="flex flex-col items-center justify-center text-center">
                       <GameLogo />
                       <div className={cn(
                           "text-5xl font-bold text-primary transition-all duration-300 mt-4",
                           scoreUpdated && "score-updated"
                       )}>{score}</div>
                       <div className="text-sm text-muted-foreground">Puan</div>
                    </div>
                    
                    <div className="grid grid-cols-8 gap-1 p-2 bg-muted rounded-lg candy-crush-board">
                        {board.map((item, index) => {
                            const Icon = item.component;
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md cursor-grab transition-all duration-300 ease-in-out",
                                        "bg-muted/30 shadow-lg hover:scale-110 active:scale-95 active:cursor-grabbing",
                                        "border-2 border-primary/50"
                                    )}
                                    data-id={index}
                                    draggable={true}
                                    onDragStart={dragStart}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragEnter={(e) => e.preventDefault()}
                                    onDragLeave={(e) => e.preventDefault()}
                                    onDrop={dragDrop}
                                    onDragEnd={dragEnd}
                                >
                                    {Icon && <Icon className={`w-7 h-7 sm:w-9 sm:h-9 ${item.color} pointer-events-none`} />}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4 w-full max-w-2xl pt-4 border-t border-border z-10">
                    <div className="flex gap-4">
                        <Button onClick={createBoard}>Yeni Oyun</Button>
                        <Button onClick={toggleAutoPlay} variant="outline">
                            {isAutoPlaying ? <Pause className="mr-2"/> : <Play className="mr-2" />}
                            {isAutoPlaying ? 'Durdur' : 'Otomatik Oynat'}
                        </Button>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-xs text-muted-foreground space-y-1.5 w-full text-center">
                         <h4 className="font-semibold text-foreground text-sm">Nasıl Oynanır?</h4>
                         <p>
                            <strong>1. Sürükle ve Bırak:</strong> Bir taşı, hemen yanındaki (yukarı, aşağı, sol, sağ) başka bir taşla yer değiştirmek için sürükleyip bırakın.
                        </p>
                        <p>
                            <strong>2. Eşleştir:</strong> Amacınız, aynı renkteki 3 veya daha fazla taşı dikey veya yatay bir çizgide bir araya getirmektir.
                        </p>
                         <p>
                            <strong>3. Puan Kazan:</strong> Başarılı bir eşleşme yaptığınızda taşlar kaybolur ve puan kazanırsınız. 4'lü eşleşmeler daha çok puan verir!
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
