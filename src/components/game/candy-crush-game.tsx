'use client';
import { useState, useEffect } from 'react';
import { Gem, Star, Heart, Apple, Cherry, Sun, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '../ui/button';

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

export const CandyCrushGame = () => {
    const [board, setBoard] = useState<any[]>([]);
    const [score, setScore] = useState(0);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [replacedItemIndex, setReplacedItemIndex] = useState<number | null>(null);

    const createBoard = () => {
        const newBoard = Array.from({ length: width * width }, () => itemTypes[Math.floor(Math.random() * itemTypes.length)]);
        setBoard(newBoard);
        setScore(0);
    };
    
    useEffect(() => {
        createBoard();
    }, []);
    
    const checkForMatches = (currentBoard: any[]) => {
        let newScore = 0;
        const matchedIndices = new Set<number>();
    
        // Check for columns
        for (let c = 0; c < width; c++) {
            for (let r = 0; r < width - 2; r++) {
                const startIndex = r * width + c;
                if (currentBoard[startIndex]?.component) {
                    let matchLength = 1;
                    while (r + matchLength < width && currentBoard[startIndex]?.component === currentBoard[(r + matchLength) * width + c]?.component) {
                        matchLength++;
                    }
                    if (matchLength >= 3) {
                        newScore += matchLength;
                        for (let i = 0; i < matchLength; i++) {
                            matchedIndices.add((r + i) * width + c);
                        }
                    }
                }
            }
        }
    
        // Check for rows
        for (let r = 0; r < width; r++) {
            for (let c = 0; c < width - 2; c++) {
                const startIndex = r * width + c;
                if (currentBoard[startIndex]?.component) {
                    let matchLength = 1;
                    while (c + matchLength < width && currentBoard[startIndex]?.component === currentBoard[r * width + (c + matchLength)]?.component) {
                        matchLength++;
                    }
                    if (matchLength >= 3) {
                        newScore += matchLength;
                        for (let i = 0; i < matchLength; i++) {
                            matchedIndices.add(r * width + (c + i));
                        }
                    }
                }
            }
        }
    
        if (matchedIndices.size > 0) {
            setScore(prev => prev + newScore);
            const nextBoard = currentBoard.map((item, index) => matchedIndices.has(index) ? blankItem : item);
            return { hasMatch: true, nextBoard };
        }
    
        return { hasMatch: false, nextBoard: currentBoard };
    };
    
    const moveItemsDown = (currentBoard: any[]) => {
        const newBoard = [...currentBoard];
        let moved = false;
        for (let c = 0; c < width; c++) {
            for (let r = width - 1; r > 0; r--) {
                const currentIndex = r * width + c;
                const aboveIndex = (r - 1) * width + c;
                if (!newBoard[currentIndex].component && newBoard[aboveIndex].component) {
                    newBoard[currentIndex] = newBoard[aboveIndex];
                    newBoard[aboveIndex] = blankItem;
                    moved = true;
                }
            }
        }
        return { moved, nextBoard: newBoard };
    };

    const fillTopRow = (currentBoard: any[]) => {
        const newBoard = [...currentBoard];
        let filled = false;
        for (let c = 0; c < width; c++) {
            if (!newBoard[c].component) {
                newBoard[c] = itemTypes[Math.floor(Math.random() * itemTypes.length)];
                filled = true;
            }
        }
        return { filled, nextBoard: newBoard };
    };


    useEffect(() => {
        const gameLoop = () => {
            setBoard(currentBoard => {
                let boardAfterMatches = currentBoard;
                let hasChangedInLoop = false;
    
                const { hasMatch, nextBoard } = checkForMatches(currentBoard);
                if (hasMatch) {
                    boardAfterMatches = nextBoard;
                    hasChangedInLoop = true;
                }
    
                let boardAfterGravity = boardAfterMatches;
                const { moved, nextBoard: gravityBoard } = moveItemsDown(boardAfterGravity);
                if (moved) {
                    boardAfterGravity = gravityBoard;
                    hasChangedInLoop = true;
                }
    
                let boardAfterFill = boardAfterGravity;
                const { filled, nextBoard: fillBoard } = fillTopRow(boardAfterFill);
                if (filled) {
                    boardAfterFill = fillBoard;
                    hasChangedInLoop = true;
                }
    
                if (hasChangedInLoop) {
                    return boardAfterFill;
                }
                return currentBoard; // No changes, return the original state to prevent re-render
            });
        };
    
        const timer = setInterval(gameLoop, 150);
        return () => clearInterval(timer);
    }, []);

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
            setBoard(currentBoard => {
                const newBoard = [...currentBoard];
                const draggedItem = newBoard[draggedItemIndex];
                newBoard[draggedItemIndex] = newBoard[replacedItemIndex];
                newBoard[replacedItemIndex] = draggedItem;

                const { hasMatch: hasMatchAfterSwap } = checkForMatches(newBoard);

                if (hasMatchAfterSwap) {
                    // The useEffect loop will handle clearing and gravity
                    return newBoard;
                } else {
                    // Not a valid match, revert the board to its previous state
                    return currentBoard; 
                }
            });
        }
        
        setDraggedItemIndex(null);
        setReplacedItemIndex(null);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kimo Eşleştirme</CardTitle>
                <CardDescription>Molada küçük bir oyun oynamaya ne dersin?</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                     <div className="flex flex-col items-center md:items-start space-y-4">
                        <div className="flex items-center gap-6 w-full">
                             <div className="text-center flex-1">
                                <div className="text-4xl font-bold text-primary">{score}</div>
                                <div className="text-sm text-muted-foreground">Puan</div>
                            </div>
                            <Button onClick={createBoard} className="flex-1">Yeni Oyun</Button>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground space-y-2">
                             <h4 className="font-semibold text-foreground">Nasıl Oynanır?</h4>
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
                    <div className="flex justify-center">
                        <div className="grid grid-cols-8 gap-1 p-2 bg-muted rounded-lg candy-crush-board">
                            {board.map((item, index) => {
                                const Icon = item.component;
                                return (
                                    <div
                                        key={index}
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-background rounded-md shadow-inner cursor-grab"
                                        data-id={index}
                                        draggable={true}
                                        onDragStart={dragStart}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDragEnter={(e) => e.preventDefault()}
                                        onDragLeave={(e) => e.preventDefault()}
                                        onDrop={dragDrop}
                                        onDragEnd={dragEnd}
                                    >
                                        {Icon && <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${item.color}`} />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
