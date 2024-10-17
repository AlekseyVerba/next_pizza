import { Skeleton } from "../../ui";

export const CheckoutDrawerItemSkeleton = () => {
  return (
    <div className="flex items-center justify-between bg-white">
      <div className="flex items-center gap-5">
        <Skeleton className="h-[60px] w-[60px]" />
        
        <div className="flex flex-col">
            <Skeleton className="w-36 h-6" />
            <Skeleton className="h-3 mt-1 w-40" />
        </div>
      </div>

      <Skeleton className="w-20 h-6" />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
            <Skeleton className="w-9 h-9 rounded-[10px]" />
            <Skeleton className="w-4 h-8" />
            <Skeleton className="w-9 h-9 rounded-[10px]" />
            <Skeleton className="w-6 h-6 rounded-[10px]" />
        </div>
      </div>
    </div>
  );
};
