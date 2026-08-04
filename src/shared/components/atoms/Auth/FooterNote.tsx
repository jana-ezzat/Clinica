import Link from "next/link";
import Text from "@/shared/components/atoms/Text";

interface Props {
  question: string;
  linkLabel: string;
  href: string;
}

export default function FooterNote({ question, linkLabel, href }: Props) {
  return (
    <div className="mt-5 flex items-center justify-center gap-1">
      <Text size="sm" variant="secondary" className="p-0">
        {question}
      </Text>
      <Link
        href={href}
        className="text-sm font-bold ds-text-primary dark:text-white hover:underline"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
