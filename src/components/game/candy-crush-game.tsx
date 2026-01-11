'use client';
import { useState, useEffect, useCallback } from 'react';
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

    const createBoard = useCallback(() => {
        const newBoard = Array.from({ length: width * width }, () => itemTypes[Math.floor(Math.random() * itemTypes.length)]);
        setBoard(newBoard);
        setScore(0);
    }, []);
    
    useEffect(() => {
        createBoard();
    }, [createBoard]);

    const checkForColumnOfFour = useCallback((currentBoard: any[]) => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentBoard[i]?.color;
            const isBlank = currentBoard[i]?.component === null;
            if (!isBlank && columnOfFour.every(index => currentBoard[index]?.color === decidedColor)) {
                setScore(prev => prev + 4);
                columnOfFour.forEach(index => currentBoard[index] = blankItem);
                return true;
            }
        }
        return false;
    }, []);

    const checkForRowOfFour = useCallback((currentBoard: any[]) => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentBoard[i]?.color;
            const isBlank = currentBoard[i]?.component === null;
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
            if (notValid.includes(i)) continue;
            if (!isBlank && rowOfFour.every(index => currentBoard[index]?.color === decidedColor)) {
                setScore(prev => prev + 4);
                rowOfFour.forEach(index => currentBoard[index] = blankItem);
                return true;
            }
        }
        return false;
    }, []);

    const checkForColumnOfThree = useCallback((currentBoard: any[]) => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentBoard[i]?.color;
            const isBlank = currentBoard[i]?.component === null;
            if (!isBlank && columnOfThree.every(index => currentBoard[index]?.color === decidedColor)) {
                setScore(prev => prev + 3);
                columnOfThree.forEach(index => currentBoard[index] = blankItem);
                return true;
            }
        }
        return false;
    }, []);

    const checkForRowOfThree = useCallback((currentBoard: any[]) => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentBoard[i]?.color;
            const isBlank = currentBoard[i]?.component === null;
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
            if (notValid.includes(i)) continue;
            if (!isBlank && rowOfThree.every(index => currentBoard[index]?.color === decidedColor)) {
                setScore(prev => prev + 3);
                rowOfThree.forEach(index => currentBoard[index] = blankItem);
                return true;
            }
        }
        return false;
    }, []);
    
    const moveIntoSquareBelow = useCallback((currentBoard: any[]) => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);

            if (isFirstRow && currentBoard[i].component === null) {
                currentBoard[i] = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            }
            if (currentBoard[i + width].component === null) {
                currentBoard[i + width] = currentBoard[i];
                currentBoard[i] = blankItem;
            }
        }
        return currentBoard;
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setBoard(currentBoard => {
                const newBoard = [...currentBoard];
                checkForColumnOfFour(newBoard);
                checkForRowOfFour(newBoard);
                checkForColumnOfThree(newBoard);
                checkForRowOfThree(newBoard);
                const boardAfterGravity = moveIntoSquareBelow(newBoard);
                return boardAfterGravity;
            });
        }, 150);
        return () => clearInterval(timer);
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow]);

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

                const isColumnOfFour = checkForColumnOfFour(newBoard);
                const isRowOfFour = checkForRowOfFour(newBoard);
                const isColumnOfThree = checkForColumnOfThree(newBoard);
                const isRowOfThree = checkForRowOfThree(newBoard);

                // If the move results in a match, keep the new board state
                if (isRowOfThree || isRowOfFour || isColumnOfThree || isColumnOfFour) {
                    return newBoard;
                }
                
                // If no match, revert the swap
                return currentBoard;
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
