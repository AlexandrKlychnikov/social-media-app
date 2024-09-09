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
import { SigninValidation } from '@/lib/validation';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Loader from '@/components/shared/Loader';
import { useSignInAccount } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        title: 'Вход не удался. Попробуйте еще раз',
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      toast({ title: 'Вход не удался. Попробуйте еще раз.' });

      return;
    }
  }
  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>
        <div className='flex justify-center items-center my-0 mx-auto'>
          <img src='/assets/images/logo.svg' alt='logo' />
          <p className='font-bold text-lg text-indigo-500'>Someda</p>
        </div>
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Вход в аккаунт</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          Добро пожаловать!
          <br />
          Пожалуйста, введите Ваши email и пароль.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-full mt-4'
        >
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
            {isUserLoading ? (
              <div className='flex-center gap-2'>
                <Loader />
                Загружается...
              </div>
            ) : (
              'Войти'
            )}
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>
            Нет аккаунта?
            <Link
              to='/sign-up'
              className='text-primary-500 text-small-semibold ml-1'
            >
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
