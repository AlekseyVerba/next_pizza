import { Button } from "@/shared/components/ui";
import { ArrowLeft } from "lucide-react";
import { Title } from "./title";
import Link from "next/link";

interface Props {
    title: string
    subTitle: string
    img: string
}

export const InfoBlock: React.FC<Props> = ({ title, subTitle, img }) => {
  return (
    <div className="flex items-center justify-between w-[840px]">
      <div className="w-[440px]">
        <Title text={title} size={'xl'} className="font-extrabold" />
        <p className="text-gray-400 text-lg">
          {subTitle}
        </p>
        <Link href={"/"}>
          <Button variant={'outline'} className="mt-11 w-56 h-12 text-base" size="lg">
            <ArrowLeft className="w-5 mr-2" />
                На главную
          </Button>
        </Link>
      </div>
      <img src={img} alt={title} />
    </div>
  );
};
