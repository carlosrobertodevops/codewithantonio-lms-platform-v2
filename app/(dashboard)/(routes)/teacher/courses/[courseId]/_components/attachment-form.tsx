'use client';

import FileUpload from '@/components/file-upload';
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
import { ImageIcon, PencilIcon, PlusCircle } from 'lucide-react';
import Image from 'next/image';
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

const AttachmentForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleIsEditing = () => setIsEditing((current) => !current);

  const onSubmit = async (values: { imageUrl: string }) => {
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
      {!isEditing && !initialData.imageUrl && (
        <div className='flex h-60 items-center justify-center rounded-md bg-slate-200'>
          <ImageIcon className='h-10 w-10 text-slate-500' />
        </div>
      )}

      {!isEditing && initialData.imageUrl && (
        <div className='relative mt-2 aspect-video'>
          <Image
            className='object-cover'
            alt='Course image'
            src={initialData.imageUrl}
            fill
          />
        </div>
      )}
      {isEditing && (
        <>
          <FileUpload
            endpoint='courseImage'
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <p className='mt-4 text-center text-xs text-muted-foreground'>
            16:9 aspect ratio recommended
          </p>
        </>
      )}
    </div>
  );
};

export default AttachmentForm;
