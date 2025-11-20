"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useQuizCache } from '@/context/'



// Make an interface for the things
interface Question {
    id: number;
    question : string;
    option: string[];
    correct : number;
    explanation: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

const QuizClientComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'Dynamic Programming';
    
    const { fetchAndCacheQuestion } = useQuizCache();

}