import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { AuthFormSchema, AuthFormValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "@/shared/components";
import { Button } from "@/shared/components/ui";
import { signIn } from "next-auth/react"
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void
}

export const AuthForm: React.FC<Props> = ({ onClose }) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm = async (data: AuthFormValues) => {
    try {
      setIsSubmit(true);
      const result = await signIn('credentials', {...data, redirect: false})
      
      if (!result?.ok) {
        throw new Error('Авторизация прошла неуспешно!')
      }
      toast.success('Авторизация прошла успешно');
      onClose()
    } catch (err: any) {
        console.log(err)
        setIsSubmit(false)
        toast.error(`${err.message}`);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Авторизация</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 my-5">
          <InputForm name="email" label="Email" placeholder="Email" required />
          <InputForm
            name="password"
            label="Пароль"
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
              Войти
            </Button>
            <div className="text-center">
            <Button variant={"ghost"} type="button" onClick={() => signIn("github")} className="w-[30px] h-[30px] p-0" >   
                <img src="/assets/images/github.png" alt="github" />
            </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};
