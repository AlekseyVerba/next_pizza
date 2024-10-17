'use client';

import { useCallback, useState } from "react";
import { Button, Dialog } from "../../ui";
import { DialogContent } from "../../ui/dialog";
import { AuthForm, RegisterForm } from './forms'

interface Props {
    open: boolean
    onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<"auth" | "register">("auth");

  const onChangeType = useCallback(() => {
    setType(type === 'auth' ? 'register' : 'auth')
  }, [type])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[450px] bg-white">
          {type === "auth" ? <AuthForm onClose={onClose} /> : <RegisterForm onClose={onClose} />}
          <Button
            onClick={onChangeType}
            variant={'ghost'}
          >
            {type === 'auth' ? 'Регистрация' : 'Авторизация'}
          </Button>
      </DialogContent>
    </Dialog>
  );
};
