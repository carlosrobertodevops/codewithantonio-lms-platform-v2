'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Course } from '@prisma/client';
import axios from 'axios';
import { PencilIcon, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface ImageFormProps {
  initialData: {
    imageUrl: string | null;
  };
  courseId: string;
}

const imageFormSchema = z.object({
  imageUrl: z.string().trim().min(1, 'Image is required'),
});

type ImageFormSchemaType = z.infer<typeof imageFormSchema>;

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<ImageFormSchemaType>({
    mode: 'onBlur',
    defaultValues: { imageUrl: initialData?.imageUrl ?? '' },
    resolver: zodResolver(imageFormSchema),
  });

  const { isValid, isSubmitting } = form.formState;

  const toggleIsEditing = () => setIsEditing((current) => !current);

  const onSubmit = async (values: ImageFormSchemaType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course title updated');
      toggleIsEditing();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='mt-6 rounded-md border bg-slate-100 p-4'>
      <div className='flex items-center justify-between font-medium'>
        Course image
        <Button variant={'ghost'} onClick={toggleIsEditing}>
          {isEditing && <>Cancel</>}

          {!isEditing && initialData.imageUrl && (
            <>
              <PencilIcon className='mr-2 h-4 w-4' />
              Edit
            </>
          )}

          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className='mr-2 h-4 w-4' />
              Add
            </>
          )}
        </Button>
      </div>
      {!isEditing && <></>}
      {isEditing && <></>}
    </div>
  );
};

export default ImageForm;
