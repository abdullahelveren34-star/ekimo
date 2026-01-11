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

export const CandyCrushGame = () => {
    const [board, setBoard] = useState<any[]>([]);
    const [score, setScore] = useState(0);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [replacedItem, setReplacedItem] = useState<number | null>(null);

    const createBoard = () => {
        const newBoard = [];
        for (let i = 0; i < width * width; i++) {
            newBoard.push(itemTypes[Math.floor(Math.random() * itemTypes.length)]);
        }
        setBoard(newBoard);
        setScore(0);
    };

    useEffect(() => {
        createBoard();
    }, []);

    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedItem = board[i];
            const isBlank = board[i].component === null;

            if (!isBlank && columnOfFour.every(square => board[square] === decidedItem)) {
                setScore((prev) => prev + 4);
                columnOfFour.forEach(square => board[square] = { component: null, color: '' });
                return true;
            }
        }
        return false;
    }

    const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedItem = board[i];
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
            const isBlank = board[i].component === null;

            if (notValid.includes(i)) continue;

            if (!isBlank && rowOfFour.every(square => board[square] === decidedItem)) {
                setScore((prev) => prev + 4);
                rowOfFour.forEach(square => board[square] = { component: null, color: '' });
                return true;
            }
        }
        return false;
    }

    const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedItem = board[i];
            const isBlank = board[i].component === null;

            if (!isBlank && columnOfThree.every(square => board[square] === decidedItem)) {
                setScore((prev) => prev + 3);
                columnOfThree.forEach(square => board[square] = { component: null, color: '' });
                return true;
            }
        }
        return false;
    }

    const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedItem = board[i];
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
            const isBlank = board[i].component === null;

            if (notValid.includes(i)) continue;

            if (!isBlank && rowOfThree.every(square => board[square] === decidedItem)) {
                setScore((prev) => prev + 3);
                rowOfThree.forEach(square => board[square] = { component: null, color: '' });
                return true;
            }
        }
        return false;
    }

    const moveIntoSquareBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);

            if (isFirstRow && board[i].component === null) {
                board[i] = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            }

            if (board[i + width].component === null) {
                board[i + width] = board[i];
                board[i] = { component: null, color: '' };
            }
        }
    }

    const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setDraggedItem(parseInt(e.currentTarget.dataset.id || '0'));
    }

    const dragDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setReplacedItem(parseInt(e.currentTarget.dataset.id || '0'));
    }

    const dragEnd = () => {
        if (replacedItem === null || draggedItem === null) return;
        const newBoard = [...board];

        const validMoves = [
            draggedItem - 1,
            draggedItem - width,
            draggedItem + 1,
            draggedItem + width
        ];
        const validMove = validMoves.includes(replacedItem);
        
        const draggedItemType = newBoard[draggedItem];
        const replacedItemType = newBoard[replacedItem];

        if (validMove) {
            newBoard[replacedItem] = draggedItemType;
            newBoard[draggedItem] = replacedItemType;

            const isAColumnOfFour = checkForColumnOfFour();
            const isARowOfFour = checkForRowOfFour();
            const isAColumnOfThree = checkForColumnOfThree();
            const isARowOfThree = checkForRowOfThree();

            if (isARowOfThree || isARowOfFour || isAColumnOfThree || isAColumnOfFour) {
                setDraggedItem(null);
                setReplacedItem(null);
            } else {
                newBoard[replacedItem] = replacedItemType;
                newBoard[draggedItem] = draggedItemType;
            }
            setBoard(newBoard);
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setBoard([...board]);
        }, 150);
        return () => clearInterval(timer);
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, board]);


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
