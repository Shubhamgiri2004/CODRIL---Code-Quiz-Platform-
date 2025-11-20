'use client';
import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";


interface Question {
    id: number;
    question : string;
    options : string[];
    explanation: string;
    correct : number;
    difficulty : 'Easy' | 'Medium' | 'Hard';
}

interface QuizCache {
    [category : string] : Question[];
}

interface QuizCacheContextType {
    cachedQuestions : QuizCache;
    fetchAndCacheQuestions : (category: string, forceFetch?: boolean) =>Promise<Question[]>;
}

const QuizCacheContext = createContext<QuizCacheContextType | undefined>(undefined);

export const QuizCacheProvider = ({ children}: {children: ReactNode}) =>{
    const[cachedQuestions, setCachedQuestions ] = useState<QuizCache>({});

    const fetchAndCacheQuestions = useCallback(async (category: string, forceFetch = false): Promise<Question[]> =>{
        if(!forceFetch && cachedQuestions[category]) {
            console.log(`Using cached Question for ${category}`);
            return cachedQuestions[category];
        }

        try{
            console.log(`Fetching new question for ${category}`);
            const response = await axios.get('/api/questions', {params:{category}});
            const data: Question[] = response.data;
            if(Array.isArray(data) && data.length > 0) {
                setCachedQuestions(prev => ({ ...prev, [category]: data}));
                return data;
            } else {
                throw new Error("No Questions for this category");
            }

        } catch (error) {
            console.log(`Error fetching or caching questions for ${category}:`, error);
            throw error;
        }
    }, [cachedQuestions]);

    return (
        <QuizCacheContext.Provider value={{ cachedQuestions, fetchAndCacheQuestions }}>
            {children}
        </QuizCacheContext.Provider>
    );
};

export const useQuizCache = () => {
    const context = useContext(QuizCacheContext);
    if(context === undefined) {
        throw new Error("UseQuizCache must be written in the QuizCacheProvider");
    }
    return context;
}