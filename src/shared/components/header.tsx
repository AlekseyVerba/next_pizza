'use client';

import { cn } from "@/lib/utils";
import { Container } from "./container";
import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import React, { useCallback } from "react";
import { AuthModal } from "./modals";
import { ProfileButton } from './profile-button'

interface Props {
  hasSearch?: boolean;
  hasButtonCart?: boolean;
}

export const Header: React.FC<Props> = ({
  hasSearch = true,
  hasButtonCart = true,
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  
  const toggleAuthModal = useCallback(() => {
    setIsAuthModalOpen((prev) => !prev);
  }, [])

  return (
    <header className={cn("border-b")}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl font-black uppercase">NEXT PIZZA</h1>
              <p className="text-base text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <AuthModal
            open={isAuthModalOpen}
            onClose={toggleAuthModal}
          />
          <ProfileButton onOpenModal={toggleAuthModal} />
          {
            // Проверка на наличие кнопки корзины
            hasButtonCart && <CartButton />
          }
        </div>
      </Container>
    </header>
  );
};
