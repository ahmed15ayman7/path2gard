import { NextResponse } from 'next/server';
import messages from '@/data/messages.json';

type Message = {
    question: string;
    answer: string;
};

export async function POST(request: Request) {
    const { question } = await request.json();
    const response = messages.find((msg: Message) => msg.question.toLowerCase() === question.toLowerCase());
    return NextResponse.json({ answer: response ? response.answer : "Sorry, I don't understand." });
}