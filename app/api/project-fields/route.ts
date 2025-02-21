import { NextResponse } from 'next/server';
import fields from '@/data/project-fields.json';

export async function GET() {
  return NextResponse.json(fields);
}
