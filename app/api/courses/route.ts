import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
  } catch (error) {
    console.log('[COURSES]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
