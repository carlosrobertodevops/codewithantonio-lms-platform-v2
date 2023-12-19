'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
});

const CreatePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className='mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center'>
      <div>
        <h1 className='text-2xl'>Name your course</h1>
        <p className='text-sm text-slate-600'>
          How would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-8 space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder='e.g. Advanced web development'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Link href={'/teacher/courses'}>
                <Button type='button' variant={'ghost'}>
                  Cancel
                </Button>
              </Link>
              <Button type='submit' disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
