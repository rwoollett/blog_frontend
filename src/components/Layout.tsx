import React, { HTMLAttributes, useEffect, useState } from 'react';
import { Header } from './Header';
import { useRouter } from "next/router";
import { ROUTES } from '../constants/routes';
import useUsersContext from '../hooks/use-users-context';

export default function Layout({ children }: HTMLAttributes<Element>) {
  const {
    user, signOut, isAuthenticated
  } = useUsersContext();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { isLoggedIn: asIsLogged } = await isAuthenticated();
      setIsLoggedIn(asIsLogged);
    })();
  }, [isLoggedIn, isAuthenticated]);

  const router = useRouter();

  return (
    <article>
      <Header
        user={user}
        onLogin={() => router.push(ROUTES.SIGNIN_ROUTE)}
        onLogout={() => signOut()}
        onCreateAccount={() => router.push(ROUTES.SIGNIN_ROUTE)}
      />
      <main>
        {children}
      </main>
    </article>
  );
}