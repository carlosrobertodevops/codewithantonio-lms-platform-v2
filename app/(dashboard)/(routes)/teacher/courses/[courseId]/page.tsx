import IconBadge from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { LayoutDashboard, ListChecks } from 'lucide-react';
import { redirect } from 'next/navigation';
import TitleForm from './_components/title-form';
import DescriptionForm from './_components/description-form';
import ImageForm from './_components/image-form';
import CategoryForm from './_components/category-form';

interface CourseIdProps {
  params: {
    courseId: string;
  };
}

const CourseIdPage = async ({ params }: CourseIdProps) => {
  const { courseId } = params;
  const { userId } = auth();

  const course = await db.course.findUnique({ where: { id: courseId } });
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
  });

  if (!course || course.userId !== userId) {
    return redirect('/');
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>Course Setup</h1>
          <span className='text-sm text-slate-700'>
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Section `Customize your course` starts */}
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='text-xl'>Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            categories={categories}
          />
        </div>
        {/* Section `Customize your course` ends */}
        <div className='space-y-6'>
          {/* Section `Course Chapters` starts */}
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ListChecks} />
              <h2 className='text-xl'>Course Chapters</h2>
            </div>
          </div>
          {/* Section `Course Chapters` ends */}
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
