import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";
import { Textarea } from "../ui";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  className?: string;
}

export const TextareaForm: React.FC<TextareaProps> = (props) => {
  const { className, name, label, ...otherProps } = props;
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && <label className="text-sm font-bold">{label}</label>}
      <Textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
        )}
        value={value}
        {...register(name)}
        {...otherProps}
      />
      {errorText && <ErrorText value={errorText} className="mt-2" />}
    </div>
  );
};
