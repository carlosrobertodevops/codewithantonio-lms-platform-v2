import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';

interface ChapterIdPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const { courseId, chapterId } = params;
  const { userId } = auth();

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });

  return <div>This is a Chapter Id Page</div>;
};

export default ChapterIdPage;
