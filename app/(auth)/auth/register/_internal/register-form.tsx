'use client';

import { Button } from '@/app/_internal';
import { showAlert } from '@/app/_internal/utils/toast';
import http from '@/client/integration/http';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import IconUser from '@/components/icon/icon-user';
import { RegisterRequest, RegisterRequestSchema } from '@/core/auth';
import { valibotResolver } from '@hookform/resolvers/valibot';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';

const hasError = (field: keyof RegisterRequest) => (fieldErrors: FieldErrors<RegisterRequest>) =>
  Boolean(fieldErrors[field]);

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: valibotResolver(RegisterRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { trigger, isMutating } = useSWRMutation<unknown, Error, string, RegisterRequest>(
    '/api/auth/register',
    (_, { arg }) =>
      http.post('/api/auth/register', {
        json: arg,
      }),
    {
      onSuccess: async () => {
        showAlert({
          icon: 'success',
          title: 'Registration Complete',
          text: 'You have registered successfully!',
        });
        router.push('/auth/login');
      },
      onError: async () => {
        showAlert({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Something went wrong. Please try again.',
        });
      },
    },
  );

  const submit = (request: RegisterRequest) => trigger(request);

  return (
    <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(submit)}>
      <div
        className={clsx({
          'has-error': hasError('name')(errors),
        })}
      >
        <label htmlFor="Name">Name</label>
        <div className="relative text-white-dark">
          <input
            id="Name"
            type="text"
            placeholder="Enter Name"
            className="form-input py-3 ps-10 placeholder:text-white-dark"
            {...register('name')}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconUser fill={true} />
          </span>
        </div>
        {errors.name ? <div className="mt-1 text-danger">{errors.name.message}</div> : null}
      </div>
      <div
        className={clsx({
          'has-error': hasError('email')(errors),
        })}
      >
        <label htmlFor="Email">Email</label>
        <div className="relative text-white-dark">
          <input
            id="Email"
            type="email"
            placeholder="Enter Email"
            className="form-input py-3 ps-10 placeholder:text-white-dark"
            {...register('email')}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} />
          </span>
        </div>
        {errors.email ? <div className="mt-1 text-danger">{errors.email.message}</div> : null}
      </div>
      <div
        className={clsx({
          'has-error': hasError('password')(errors),
        })}
      >
        <label htmlFor="Password">Password</label>
        <div className="relative text-white-dark">
          <input
            id="Password"
            type="password"
            placeholder="Enter Password"
            className="form-input py-3 ps-10 placeholder:text-white-dark"
            {...register('password')}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
        </div>
        {errors.password ? <div className="mt-1 text-danger">{errors.password.message}</div> : null}
      </div>

      <Button isLoading={isMutating} type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default RegisterForm;
