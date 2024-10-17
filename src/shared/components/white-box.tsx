import { cn } from "@/lib/utils";
import { Title } from "./title";

interface Props {
    className?: string
    title?: string
    endAdornment?: React.ReactNode;
    children?: React.ReactNode;
}

export const WhiteBox: React.FC<Props> = ({ title, endAdornment, className, children }: Props) => {
  return (
    <div className={cn('bg-white py-6 px-8 rounded-3xl')}>
      {title && 
            <div className="pb-5 border-b border-grey-400">
                <Title text={title} size="md" className="font-bold" />
                {endAdornment}
            </div>
      }
      <div className="mt-5">
        {children}
      </div>
    </div>
  );
};
