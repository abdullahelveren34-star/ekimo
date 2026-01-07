'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { RotateCcw, RotateCw, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const initialCubeState: string[][] = [
    // Top face (White)
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    // Bottom face (Yellow)
    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
    // Front face (Green)
    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    // Back face (Blue)
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
    // Left face (Orange)
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    // Right face (Red)
    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
];

const colorMap: { [key: string]: string } = {
    'W': 'bg-white',
    'Y': 'bg-yellow-400',
    'G': 'bg-green-500',
    'B': 'bg-blue-500',
    'O': 'bg-orange-500',
    'R': 'bg-red-500',
    '': 'bg-gray-700'
};

const faces = ['Üst', 'Alt', 'Ön', 'Arka', 'Sol', 'Sağ'];

export const RubiksCubeGame = () => {
    const [cube, setCube] = useState(initialCubeState);
    const [currentFaceIndex, setCurrentFaceIndex] = useState(2); // Start with Front face
    const { toast } = useToast();

    const isSolved = useCallback((currentCube: string[][]): boolean => {
        return currentCube.every(face => {
            const firstColor = face[0];
            return face.every(color => color === firstColor);
        });
    }, []);

    const rotateFace = (faceIndex: number, clockwise: boolean) => {
        const newCube = cube.map(face => [...face]);
        const face = newCube[faceIndex];
        const temp = [...face];
        const indices = clockwise
            ? [6, 3, 0, 7, 4, 1, 8, 5, 2]
            : [2, 5, 8, 1, 4, 7, 0, 3, 6];

        for (let i = 0; i < 9; i++) {
            face[i] = temp[indices[i]];
        }
        setCube(newCube);
    };

    const shuffleCube = () => {
        let shuffledCube = initialCubeState.map(face => [...face]);
        for (let i = 0; i < 30; i++) {
            const faceIndex = Math.floor(Math.random() * 6);
            const isClockwise = Math.random() > 0.5;
            
            // This is a simplified rotation for shuffling, not a full cube rotation algorithm
            const face = shuffledCube[faceIndex];
            const temp = [...face];
            const indices = isClockwise
                ? [6, 3, 0, 7, 4, 1, 8, 5, 2]
                : [2, 5, 8, 1, 4, 7, 0, 3, 6];
            for (let j = 0; j < 9; j++) {
                face[j] = temp[indices[j]];
            }
        }
        // Ensure the shuffled cube is not solved
        if (isSolved(shuffledCube)) {
            shuffleCube();
        } else {
            setCube(shuffledCube);
        }
    };
    
    useEffect(() => {
        shuffleCube();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (isSolved(cube)) {
            toast({
                title: 'Tebrikler!',
                description: 'Zeka küpünü başarıyla çözdünüz!',
            });
        }
    }, [cube, isSolved, toast]);
    
    const handleFaceChange = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setCurrentFaceIndex((prev) => (prev + 1) % 6);
        } else {
            setCurrentFaceIndex((prev) => (prev - 1 + 6) % 6);
        }
    }


    return (
        <div className="flex flex-col items-center gap-6 p-4 rounded-lg bg-card-foreground/5">
             <div className="flex items-center justify-between w-full max-w-xs">
                <Button variant="ghost" size="icon" onClick={() => handleFaceChange('prev')}>
                    <RotateCcw className="h-5 w-5" />
                </Button>
                <h3 className="text-xl font-bold text-center w-32">{faces[currentFaceIndex]} Yüzey</h3>
                <Button variant="ghost" size="icon" onClick={() => handleFaceChange('next')}>
                     <RotateCw className="h-5 w-5" />
                </Button>
            </div>
           
            <div className="grid grid-cols-3 gap-1 p-2 bg-gray-900 rounded-md" style={{ width: 158, height: 158 }}>
                {cube[currentFaceIndex].map((color, index) => (
                    <div
                        key={index}
                        className={`w-12 h-12 rounded-sm transition-colors duration-300 ${colorMap[color]}`}
                    />
                ))}
            </div>
            
            <div className="flex flex-col gap-2 w-full max-w-xs">
                 <p className="text-xs text-center text-muted-foreground">Seçili yüzeyi döndür:</p>
                 <div className="flex justify-center gap-4">
                    <Button onClick={() => rotateFace(currentFaceIndex, false)}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Sola Döndür
                    </Button>
                    <Button onClick={() => rotateFace(currentFaceIndex, true)}>
                        <RotateCw className="mr-2 h-4 w-4" />
                        Sağa Döndür
                    </Button>
                </div>
            </div>

             <div className="mt-4">
                 <Button variant="outline" onClick={shuffleCube}>
                     <RefreshCcw className="mr-2 h-4 w-4" />
                     Karıştır ve Yeniden Başla
                 </Button>
             </div>
        </div>
    );
};
