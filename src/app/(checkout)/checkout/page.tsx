"use client";

import { checkoutFormSchema, CheckoutFormValues } from "@/constants";
import {
  CartSide,
  Container,
  InputForm,
  Title,
  WhiteBox,
  CheckoutDrawerItems,
  CheckoutBio,
} from "@/shared/components";
import { useCart } from "@/shared/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextareaForm } from "@/shared/components/form";
import { useState } from "react";
import toast from 'react-hot-toast';
import { createOrder } from "@/app/actions";

// eslint-disable-next-line @next/next/no-async-client-component
export default function CheckoutPage() {
  const { updateQuantity, totalAmount, deleteItem, items, loading } = useCart();
  const [isSubmit, setIsSubmit] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmitForm = async (data: CheckoutFormValues) => {
    try {
      setIsSubmit(true);

      const result = await createOrder(data);
      toast.success('Заказ был создан успешно');

      if (result) {
        location.href = result
      }
    } catch(err) {
      console.log(err)
      setIsSubmit(false)
      toast.error('Заказ не был создан');
    }
  };

  return (
    <Container className="py-10">
      <Title
        text="Оформление заказа"
        size="lg"
        className="font-bold text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <div className="mt-10 flex justify-between w-full gap-20">
            <div className="flex flex-col gap-10 flex-1">
              <WhiteBox title="1. Корзина">
                <CheckoutDrawerItems
                  deleteItem={deleteItem}
                  items={items}
                  loading={loading}
                  updateQuantity={updateQuantity}
                />
              </WhiteBox>
              <WhiteBox title="2. Персональная информация">
                <CheckoutBio />
              </WhiteBox>
              <WhiteBox title="3. Адрес доставки">
                <InputForm
                  name="address"
                  label="Введите адрес"
                  placeholder="Адрес"
                  className="mb-5"
                  required
                />
                <TextareaForm name="comment" label="Комментарий к заказу" />
              </WhiteBox>
            </div>
            <div className="w-[450px]">
              <CartSide price={totalAmount} isLoading={loading} isSubmit={isSubmit} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
