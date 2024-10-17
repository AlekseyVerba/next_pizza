"use client";

import { FormProvider, useForm } from "react-hook-form";
import { RegisterFormSchema, RegisterFormValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { InputForm } from "@/shared/components";
import { Button } from "@/shared/components/ui";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions";

interface Props {
    onClose: () => void
  }

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitForm = async (data: RegisterFormValues) => {
    try {
        setIsSubmit(true);
        await registerUser({
            fullName: data.fullName,
            email: data.email,
            password: data.password
        });
        toast.success('Регистрация прошла успешно');
        onClose()
    } catch (err: any) {
        toast.error(`При регистрации возникла ошибка: ${err.message}`);
    } finally {
        setIsSubmit(false)
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Регистрация</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 my-5">
          <InputForm
            name="fullName"
            label="Имя и фамилия"
            placeholder="Имя и фамилия"
            required
          />
          <InputForm name="email" label="Email" placeholder="Email" required />
          <InputForm
            name="password"
            label="Пароль"
            type="password"
            placeholder="******"
            required
          />
          <InputForm
            name="confirmPassword"
            label="Повторите пароль"
            type="password"
            placeholder="******"
            required
          />
        </div>

        <DialogFooter>
          <div className="flex flex-col gap-3 w-full">
            <Button
              loading={isSubmit}
              className="w-full font-bold h-12 text-base"
              type="submit"
            >
              Регистрация
            </Button>
          </div>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};
