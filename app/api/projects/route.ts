import { NextResponse } from 'next/server';
import projects from '@/data/projects.json';
import { baseUrl } from '@/data';
import axios from 'axios';

// export async function GET() {
//   return NextResponse.json(projects);
// }

export async function GET() {
  const response = await axios.get(`${baseUrl}/projects`);
  const data = response.data;
  return NextResponse.json(data);
}
