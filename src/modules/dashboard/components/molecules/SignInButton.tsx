import Link from "next/link";
import Text from "@/shared/components/atoms/Text";
import { useTranslations } from "next-intl";

const SignInButton = () => {
  const t = useTranslations("nav");
  return (
    <Link
      href="/sign-in"
      className="flex items-center gap-2 rounded-lg px-4 py-2 transition-colors hover:bg-gray-100"
    >
      <Text size="sm" variant="primary">
        {t("login")}
      </Text>
    </Link>
  );
};

export default SignInButton;
