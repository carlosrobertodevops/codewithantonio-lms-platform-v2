'use client';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
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
import axios from 'axios';
import { PencilIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface CategoryFormProps {
  initialData: {
    categoryId: string | null;
  };
  courseId: string;
  categories: { name: string; id: string }[];
}

const categoryFormSchema = z.object({
  categoryId: z.string().trim().min(1, 'Category is required'),
});

type CategoryFormSchemaType = z.infer<typeof categoryFormSchema>;

const CategoryForm = ({
  initialData,
  courseId,
  categories,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<CategoryFormSchemaType>({
    mode: 'onBlur',
    defaultValues: { categoryId: initialData?.categoryId || '' },

    resolver: zodResolver(categoryFormSchema),
  });

  const { isValid, isSubmitting } = form.formState;

  const toggleIsEditing = () => setIsEditing((current) => !current);

  const onSubmit = async (values: CategoryFormSchemaType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
      toggleIsEditing();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const selectedCategory = categories.find(
    (category) => category.id === initialData.categoryId,
  )?.name;

  return (
    <div className='mt-6 rounded-md border bg-slate-100 p-4'>
      <div className='flex items-center justify-between font-medium'>
        Course category
        <Button variant={'ghost'} onClick={toggleIsEditing}>
          {isEditing ? (
            'Cancel'
          ) : (
            <>
              <PencilIcon className='mr-2 h-4 w-4' />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            'mt-2 text-sm',
            !initialData.categoryId && 'italic text-slate-500',
          )}>
          {selectedCategory ?? 'No description'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-4 space-y-4'>
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      options={categories.map((categorie) => ({
                        label: categorie.name,
                        value: categorie.id,
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Button disabled={!isValid || isSubmitting} type='submit'>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
