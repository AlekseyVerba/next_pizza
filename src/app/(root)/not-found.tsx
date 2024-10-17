import { Container, InfoBlock } from "@/shared/components";

export default function Custom404() {
  return (
    <Container className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Страница не найдена"
        subTitle="Проверьте корректность введённого адреса или повторите попытку позже"
        img="/assets/images/404.png"
      />
    </Container>
  );
}