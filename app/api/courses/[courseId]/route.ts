import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
  } catch (error) {
    console.log('[COURSE_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
