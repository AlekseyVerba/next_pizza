import { useFormContext } from "react-hook-form";
import { Input } from "./ui";
import { ErrorText } from "./error-text";
import { RequiredSymbol } from "./required-symbol";
import { X } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  required?: boolean;
  label?: string;
  className?: string;
}

export const InputForm: React.FC<Props> = (props) => {
  const { name, label, required, className } = props;

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <label className="text-sm font-bold">
          {label} {required && <RequiredSymbol />}{" "}
        </label>
      )}
      <div className="mt-1 relative">
        <Input
          value={value}
          {...register(name)}
          {...props}
          className="w-full h-12 px-4 border border-gray-300 rounded-[10px]"
        />
        {value && (
          <X
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={onClickClear}
            size={22}
          />
        )}
      </div>

      {errorText && <ErrorText value={errorText} className="mt-2" />}
    </div>
  );
};
