import { Skeleton } from "../../ui";

interface Props {
  title: React.ReactNode;
  value: number;
  isLoading?: boolean;
}

export const CheckoutItemDetails: React.FC<Props> = ({
  title,
  value,
  isLoading = false,
}) => {
  return (
    <div className="flex">
      <span className="flex flex-1 text-lg">
        <div className="flex items-center gap-1">{title}</div>
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
      </span>
      {isLoading ? (
        <Skeleton className="h-6 mt-1 w-24" />
      ) : (
        <span className="font-bold text-lg">{value} ₽</span>
      )}
    </div>
  );
};
