import { error } from 'console';
import { futimes } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { json } from 'stream/consumers';

export default async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { category } = body;

        if (!category) {
            return NextResponse.json({
                msg: "Response can't generated",
                error: "Category is required"
            });
        }

        const fullPrompt = `this is my prompt`;

        const chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: fullPrompt }] });

        const payload = {
            content: chatHistory,
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: 'ARRAY',
                    items: {
                        type: "OBJECT",
                        properties: {
                            "id": { "type": "NUMBER" },
                            "question": { "type": "STRING" },
                            "options": {
                                type: "ARRAY",
                                items: { "type": "STRING" }
                            },
                            "correct": { "type": "NUMBER" },
                            "explanation": { "type": "STRING" },
                            "difficulty": { "type": "STRING", "enum": ["Easy", "Medium", "Hard"] }
                        },
                        "required": ["id", "question", "options", "correct", "explanations", "difficulty"],
                        "propertyOrdering": ["id", "Question", "options", "correct", "explanation"]
                    }
                }
            }
        };
        const apiUrl = `https://myapiurl.com`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini api error", errorData);
            throw new Error(`Failed to fetch questions from Gemini API : ${JSON.stringify}`)
        }

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
        const questionJsonString = result.candidates[0].content.parts[0].text;
        const question = JSON.parse(questionJsonString);
        console.log("Generated question", question);

        if(!Array.isArray(question)) {
            throw new Error("Gemini API did not return an array of question.");
        }
        return NextResponse.json(question);
        } else {
            return new Error("failed to get a valid response from the Gemini API.");
        }

    } catch (error) {
        console.error("Failed to get and valid response from the Gemini API");

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({
            error : `Failed to generate question : ${errorMessage}`
        },{
            status: 500
        });
    }
}