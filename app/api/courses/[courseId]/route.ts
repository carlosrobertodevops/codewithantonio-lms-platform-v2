import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const values = await request.json();
  } catch (error) {
    console.log('[COURSE_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
