import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import FileUploader from '../shared/FileUploader';
import { Input } from '../ui/input';
import { PostValidation } from '@/lib/validation';

const PostForm = () => {
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: '',
      file: [],
      location: '',
      tags: '',
    },
  });

  function onSubmit(values: z.infer<typeof PostValidation>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Описание</FormLabel>
              <FormControl>
                <Textarea
                  className='shad-textarea custom-scrollbar'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Добавить фото</FormLabel>
              <FormControl>
                <FileUploader />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Добавить локацию
              </FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Добавить теги (через запятую ", ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Искусство, Cамовыражение, Обучение'
                  type='text'
                  className='shad-input'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-end'>
          <Button
            type='button'
            className='shad-button_dark_4'
            onClick={() => {}}
          >
            Отмена
          </Button>
          <Button
            type='submit'
            className='shad-button_primary whitespace-nowrap'
          >
            Разместить
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
