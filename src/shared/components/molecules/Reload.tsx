import { RotateCcw } from "@/assets/icons/icons";
import Button from "@/shared/components/atoms/Button";
import Text from "@/shared/components/atoms/Text";

interface ReloadProps {
  error: string;
  retry: string;
  onRetry: () => void;
}

const Reload = ({ error, retry, onRetry }: ReloadProps) => {
  return (
    <div className="flex min-h-س w-full flex-col items-center justify-center gap-5 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <RotateCcw className="h-7 w-7 text-red-500" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <Text size="lg" className="font-semibold text-gray-800">
          {error}
        </Text>
      </div>

      {/* Retry */}
      <Button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 rounded-lg px-5"
      >
        <RotateCcw className="h-4 w-4" />
        {retry}
      </Button>
    </div>
  );
};

export default Reload;
