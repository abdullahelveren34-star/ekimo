'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';

const width = 8;
const candyColors = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-orange-500'
];

export const CandyCrushGame = () => {
    const [currentColorArrangement, setCurrentColorArrangement] = useState<string[]>([]);
    const [squareBeingDragged, setSquareBeingDragged] = useState<EventTarget | null>(null);
    const [squareBeingReplaced, setSquareBeingReplaced] = useState<EventTarget | null>(null);
    const [scoreDisplay, setScoreDisplay] = useState(0);

    const checkForColumnOfFour = useCallback(() => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === 'bg-transparent';

            if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4);
                columnOfFour.forEach(square => currentColorArrangement[square] = 'bg-transparent');
                return true;
            }
        }
        return false;
    }, [currentColorArrangement]);
    
    const checkForRowOfFour = useCallback(() => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const decidedColor = currentColorArrangement[i];
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];
            const isBlank = currentColorArrangement[i] === 'bg-transparent';

            if (notValid.includes(i)) continue;

            if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 4);
                rowOfFour.forEach(square => currentColorArrangement[square] = 'bg-transparent');
                return true;
            }
        }
        return false;
    }, [currentColorArrangement]);


    const checkForColumnOfThree = useCallback(() => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2];
            const decidedColor = currentColorArrangement[i];
            const isBlank = currentColorArrangement[i] === 'bg-transparent';

            if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3);
                columnOfThree.forEach(square => currentColorArrangement[square] = 'bg-transparent');
                return true;
            }
        }
        return false;
    }, [currentColorArrangement]);
    
    const checkForRowOfThree = useCallback(() => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const decidedColor = currentColorArrangement[i];
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
            const isBlank = currentColorArrangement[i] === 'bg-transparent';

            if (notValid.includes(i)) continue;

            if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)) {
                setScoreDisplay((score) => score + 3);
                rowOfThree.forEach(square => currentColorArrangement[square] = 'bg-transparent');
                return true;
            }
        }
        return false;
    }, [currentColorArrangement]);


    const moveIntoSquareBelow = useCallback(() => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);

            if (isFirstRow && currentColorArrangement[i] === 'bg-transparent') {
                let randomColor = Math.floor(Math.random() * candyColors.length);
                currentColorArrangement[i] = candyColors[randomColor];
            }

            if ((currentColorArrangement[i + width]) === 'bg-transparent') {
                currentColorArrangement[i + width] = currentColorArrangement[i];
                currentColorArrangement[i] = 'bg-transparent';
            }
        }
    }, [currentColorArrangement]);

    const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setSquareBeingDragged(e.target);
    }

    const dragDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setSquareBeingReplaced(e.target);
    }

    const dragEnd = () => {
        if (squareBeingDragged && squareBeingReplaced) {
            const squareBeingDraggedId = parseInt((squareBeingDragged as HTMLDivElement).dataset.id as string);
            const squareBeingReplacedId = parseInt((squareBeingReplaced as HTMLDivElement).dataset.id as string);

            const validMoves = [
                squareBeingDraggedId - 1,
                squareBeingDraggedId - width,
                squareBeingDraggedId + 1,
                squareBeingDraggedId + width
            ];

            const validMove = validMoves.includes(squareBeingReplacedId);

            if (validMove) {
                const newArrangement = [...currentColorArrangement];
                newArrangement[squareBeingReplacedId] = (squareBeingDragged as HTMLDivElement).className.split(' ')[0];
                newArrangement[squareBeingDraggedId] = (squareBeingReplaced as HTMLDivElement).className.split(' ')[0];

                const isAColumnOfFour = checkForColumnOfFour();
                const isARowOfFour = checkForRowOfFour();
                const isAColumnOfThree = checkForColumnOfThree();
                const isARowOfThree = checkForRowOfThree();

                if (squareBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
                     setCurrentColorArrangement(newArrangement);
                     setSquareBeingDragged(null);
                     setSquareBeingReplaced(null);
                } else {
                    // Revert the swap if it's not a valid move
                    const revertedArrangement = [...currentColorArrangement];
                    setCurrentColorArrangement(revertedArrangement);
                }
            }
        }
    };


    const createBoard = () => {
        const randomColorArrangement = [];
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
            randomColorArrangement.push(randomColor);
        }
        setCurrentColorArrangement(randomColorArrangement);
    }

    useEffect(() => {
        createBoard();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            moveIntoSquareBelow();
            setCurrentColorArrangement([...currentColorArrangement]);
        }, 100);
        return () => clearInterval(timer);
    }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement]);


    return (
        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-card-foreground/5">
            <div className="flex items-center justify-between w-full max-w-md">
                <div className="text-lg font-bold">Skor: <span className="text-primary">{scoreDisplay}</span></div>
                <Button onClick={createBoard}>Yeni Oyun</Button>
            </div>
            <div className="grid grid-cols-8 grid-rows-8 gap-1 p-2 bg-muted rounded-lg candy-crush-board" style={{width: 8 * 60, height: 8 * 60}}>
                {currentColorArrangement.map((candyColor, index) => (
                    <div
                        key={index}
                        data-id={index}
                        className={`${candyColor} w-full h-full rounded-md cursor-grab active:cursor-grabbing`}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                        style={{
                            width: '56px',
                            height: '56px',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
