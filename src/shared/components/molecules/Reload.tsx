import { RotateCcw ,FileWarning} from "@/assets/icons/icons";
import Button from "@/shared/components/atoms/Button";
import Text from "@/shared/components/atoms/Text";

interface ReloadProps {
  error: string;
  retry: string;
  onRetry: () => void;
}

const Reload = ({ error, retry, onRetry }: ReloadProps) => {
  return (
    <div className="flex min-h-100 w-full flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 scale-125 rounded-full bg-red-50 blur-2xl" />

        <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] bg-linear-to-br from-red-50 to-orange-50 shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md">
            <FileWarning className="h-10 w-10 text-gray-400" />
          </div>

          <div className="absolute -bottom-2 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
            <RotateCcw className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex max-w-md flex-col items-center gap-2">
        <Text size="xl" className="font-bold tracking-tight text-gray-900">
          {error}
        </Text>
      </div>

      <Button
        onClick={onRetry}
        className="mt-7 flex h-11 items-center gap-2 rounded-xl px-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      >
        <RotateCcw className="h-4 w-4" />
        {retry}
      </Button>
    </div>
  );
};

export default Reload;
