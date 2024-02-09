import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

interface ContextProps {
  params: {
    courseId: string;
    attachmentId: string;
  };
}

export async function DELETE(request: NextRequest, { params }: ContextProps) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const attachment = await db.attachment.delete({
      data: {
        courseId: params.courseId,
        attachmentId: params.attachmentId,
      },
    });
  } catch (error) {
    console.log('[ATTACHMENTS_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
