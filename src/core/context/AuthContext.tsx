"use client";

import http from "@/client/integration/http";
import React from "react";
import useSWR from "swr";
import * as v from "valibot";
import { AuthResponseSchema, User } from "../auth";

type AuthProviderProps = React.PropsWithChildren<{}>;

const UserContext = React.createContext<User | null>(null);
function useUser() {
  const ctx = React.useContext(UserContext);
  if (ctx === null) {
    throw new Error("cannot use `useUser()` outside of `<UserContext />`");
  }

  return ctx;
}

const TriggerAuthContext = React.createContext<VoidFunction | null>(null);
const useTriggerAuth = () => {
  const ctx = React.useContext(TriggerAuthContext);
  if (ctx === null) {
    throw new Error(
      "cannot use `useTriggerAuth()` outside of `<TriggerAuthContext />`",
    );
  }
  return ctx;
};

const UserLoadingContext = React.createContext<boolean>(false);
const useUserLoading = () => {
  return React.useContext(UserLoadingContext);
};

function AuthProvider({ children }: AuthProviderProps) {
  const {
    data: user,
    mutate,
    isLoading,
  } = useSWR("/api/auth/me", async () => {
    const response = await http.get("/api/auth/me");
    const body = await response.json();
    const validated = v.parse(AuthResponseSchema, body);
    return validated.data;
  });

  return (
    <UserLoadingContext.Provider value={isLoading}>
      <TriggerAuthContext.Provider value={mutate}>
        <UserContext.Provider value={user as User}>
          {children}
        </UserContext.Provider>
      </TriggerAuthContext.Provider>
    </UserLoadingContext.Provider>
  );
}

export { AuthProvider, useTriggerAuth, useUser, useUserLoading };
