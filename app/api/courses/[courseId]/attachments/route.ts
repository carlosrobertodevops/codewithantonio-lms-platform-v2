interface ContextProps {
  params: { courseId: string };
}

export async function POST(request: Request, { params }: ContextProps) {
  try {
  } catch (error) {
    console.log('[ATTACHMENTS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
