"use client";

import { User } from "@prisma/client";
import { Container } from "./container";
import { Title } from "./title";
import { InputForm } from "./input-form";
import { FormProvider, useForm } from "react-hook-form";
import {
  RegisterFormSchema,
  RegisterFormValues,
} from "./modals/auth-modal/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui";
import { signOut } from "next-auth/react";
import { updateUserInformation } from "@/app/actions";
import toast from "react-hot-toast";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({
  data: { fullName, email, id },
}) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullName,
      email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitForm = async (data: RegisterFormValues) => {
    try {
      await updateUserInformation(data);
      toast.success("Данные обновлены успешно!");
    } catch (err) {
      toast.success("Данные не были обновлены!");
    }
  };

  const onClickSignOut = async () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <FormProvider {...form}>
      <Container className="mt-10">
        <Title text={`Личные данные #${id}`} size="md" className="font-bold" />

        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="flex flex-col gap-5 w-96 mt-10"
        >
          <InputForm
            name="fullName"
            label="Имя и фамилия"
            placeholder="Александр Сергеевич"
            required
          />
          <InputForm
            name="email"
            label="E-Mail"
            placeholder="E-Mail"
            required
          />
          <InputForm name="password" label="Пароль" placeholder="******" type="password" />
          <InputForm
            name="confirmPassword"
            label="Подтверждение пароля"
            placeholder="******"
            type="password"
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-5"
            type="submit"
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </Container>
    </FormProvider>
  );
};
