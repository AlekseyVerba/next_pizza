"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
  onOpenModal: () => void;
}

export const ProfileButton: React.FC<Props> = ({ onOpenModal }) => {
  const { data } = useSession();

  console.log('aaaaaaaa')
  console.log(data)

  return (
    <>
      {data ? (
        <Link href={'/profile'}>
          <Button variant={"outline"} className="flex items-center gap-1">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      ) : (
        <Button
          variant={"outline"}
          className="flex items-center gap-1"
          onClick={onOpenModal}
        >
          <User size={16} />
          Войти
        </Button>
      )}
    </>
  );
};
