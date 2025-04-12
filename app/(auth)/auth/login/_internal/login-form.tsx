'use client';

import Button from '@/app/_internal/button';
import { showAlert } from '@/app/_internal/utils/toast';
import { useTriggerAuth } from '@/client/auth';
import http from '@/client/integration/http';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { LoginRequest, LoginRequestSchema } from '@/core/auth';
import { getTranslation } from '@/i18n';
import { valibotResolver } from '@hookform/resolvers/valibot';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import useSWRMutation from 'swr/mutation';
import { HTTPEndpoint } from './endpoint';

const hasError = (field: keyof LoginRequest) => (fieldErrors: FieldErrors<LoginRequest>) => Boolean(fieldErrors[field]);

export default function LoginForm() {
  const router = useRouter();
  const { t } = getTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: valibotResolver(LoginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const triggerAuth = useTriggerAuth();

  const { trigger, isMutating } = useSWRMutation<unknown, Error, string, LoginRequest>(
    '/api/auth/login',
    (_, { arg }) =>
      http.post(HTTPEndpoint.LOGIN, {
        json: arg,
      }),
    {
      onSuccess: async () => {
        showAlert({
          icon: 'success',
          title: t('login_success'),
          text: t('you_have_logged_in_successfully'),
        });
        triggerAuth();
        router.push('/');
      },
      onError: async () => {
        showAlert({
          icon: 'error',
          title: t('login_failed'),
          text: t('invalid_credentials_please_try_again'),
        });
      },
    },
  );
  const submit = (request: LoginRequest) => trigger(request);

  return (
    <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(submit)}>
      <div
        className={clsx({
          'has-error': hasError('email')(errors),
        })}
      >
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
        <div className="relative text-white-dark">
          <input
            id="password"
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
        Sign In
      </Button>
    </form>
  );
}
