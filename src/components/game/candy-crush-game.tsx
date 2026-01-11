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
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle>Kimo Eşleştirme</CardTitle>
                        <CardDescription>Molada küçük bir oyun oynamaya ne dersin?</CardDescription>
                    </div>
                     <div className='flex items-center gap-4'>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{score}</div>
                            <div className="text-sm text-muted-foreground">Puan</div>
                        </div>
                        <Button onClick={createBoard}>Yeni Oyun</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center">
                    <div className="grid grid-cols-8 gap-1 p-2 bg-muted rounded-lg candy-crush-board">
                        {board.map((item, index) => {
                            const Icon = item.component;
                            return (
                                <div
                                    key={index}
                                    className="w-12 h-12 flex items-center justify-center bg-background rounded-md shadow-inner cursor-grab"
                                    data-id={index}
                                    draggable={true}
                                    onDragStart={dragStart}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragEnter={(e) => e.preventDefault()}
                                    onDragLeave={(e) => e.preventDefault()}
                                    onDrop={dragDrop}
                                    onDragEnd={dragEnd}
                                >
                                    {Icon && <Icon className={`w-8 h-8 ${item.color}`} />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
