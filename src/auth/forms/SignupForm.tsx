import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignupValidation } from '@/lib/validation';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Loader from '@/components/shared/Loader';
import { createUserAccount } from '@/lib/appwrite/api';

const SignupForm = () => {
  const { toast } = useToast();
  const isLoading = false;
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: 'Регистрация не удалась. Попробуйте еще раз',
      });
    }
  }
  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <div className='flex justify-center items-center my-0 mx-auto'>
          <img src='/assets/images/logo.svg' alt='logo' />
          <p className='font-bold text-lg text-indigo-500'>Someda</p>
        </div>
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
          Создание нового аккаунта
        </h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          Пожалуйста, введите Ваши данные
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel title='Имя, которым Вы будете представлены в Someda'>
                  Имя пользователя
                </FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='shad-button_primary'>
            {isLoading ? (
              <div className='flex-center gap-2'>
                <Loader />
                Загружается...
              </div>
            ) : (
              'Создать'
            )}
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>
            Уже есть аккаунт?
            <Link
              to='/sign-in'
              className='text-primary-500 text-small-semibold ml-1'
            >
              Войти
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;