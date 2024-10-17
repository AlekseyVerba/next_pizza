'use client';

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';
import { PropsWithChildren } from "react";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader />
    </>
  );
};
