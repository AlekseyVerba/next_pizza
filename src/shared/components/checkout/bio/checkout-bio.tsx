import { InputForm } from "../../input-form";

export const CheckoutBio = () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <InputForm name="firstName" label="Имя" placeholder="Имя" required />
      <InputForm
        name="lastName"
        label="Фамилия"
        placeholder="Фамилия"
        required
      />
      <InputForm name="email" label="E-Mail" placeholder="E-Mail" required />
      <InputForm name="phone" label="Телефон" placeholder="Телефон" required />
    </div>
  );
};
