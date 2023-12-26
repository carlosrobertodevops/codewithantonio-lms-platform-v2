import { db } from '@/lib/db';

interface CourseIdProps {
  params: {
    courseId: string;
  };
}

const CourseIdPage = ({ params }: CourseIdProps) => {
  const { courseId } = params;

  const course = db.course.findUnique({ where: { id: courseId } });

  return <div>{courseId}</div>;
};

export default CourseIdPage;
