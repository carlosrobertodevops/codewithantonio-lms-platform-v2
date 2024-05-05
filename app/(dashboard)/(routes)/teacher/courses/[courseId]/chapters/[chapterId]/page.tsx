import { auth } from '@clerk/nextjs';

interface ChapterIdPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage = ({ params }: ChapterIdPageProps) => {
  const { courseId, chapterId } = params;
  const { userId } = auth();

  return <div>This is a Chapter Id Page</div>;
};

export default ChapterIdPage;
