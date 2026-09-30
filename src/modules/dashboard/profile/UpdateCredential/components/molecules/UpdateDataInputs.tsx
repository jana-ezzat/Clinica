import Input from "@/shared/components/atoms/Input";
import Text from "@/shared/components/atoms/Text";
import { UseFormRegister } from "react-hook-form";

interface FormValues {
  title: string;
  desc: string;
}

interface Props {
  title: string;
  name: keyof FormValues;
  isEdit: boolean;
  register: UseFormRegister<FormValues>;
}

const UpdateDataInputs = ({ title, name, isEdit, register }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <Text size="sm" variant="secondary" className="font-semibold">
        {title}
      </Text>

      <Input
        {...register(name)}
        disabled={!isEdit}
        className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 dark:border-gray-700 dark:disabled:bg-gray-800"
      />
    </div>
  );
};

export default UpdateDataInputs;
