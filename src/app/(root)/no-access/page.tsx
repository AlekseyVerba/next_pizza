import { Container, InfoBlock } from "@/shared/components";

export default async function NoAccessPage() {
  return (
    <Container className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ запрещён"
        subTitle="Данную страницу могут просматривать только авторизованные пользователи"
        img="/assets/images/no-access.png"
      />
    </Container>
  );
}