'use client';

import React, { useMemo } from 'react';
import * as v from 'valibot';
import useSWR from 'swr';
import { AuthResponseSchema, User } from '@/core/auth';
import { TriggerAuthContext, UserContext, UserLoadingContext } from './context';
import http from '@/client/integration/http';

type AuthProviderProps = React.PropsWithChildren<{}>;

export default function AuthProvider({ children }: AuthProviderProps) {
  const { data, mutate, isLoading } = useSWR('/api/auth/me', async () => {
    const response = await http.get('/api/auth/me');
    const body = await response.json();
    const validated = v.parse(AuthResponseSchema, body);
    return validated.data;
  });

  const user = useMemo(
    () =>
      data ??
      ({
        _tag: 'ANONYMOUS',
      } satisfies User),
    [data],
  );

  return (
    <UserLoadingContext.Provider value={isLoading}>
      <TriggerAuthContext.Provider value={mutate}>
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      </TriggerAuthContext.Provider>
    </UserLoadingContext.Provider>
  );
}
