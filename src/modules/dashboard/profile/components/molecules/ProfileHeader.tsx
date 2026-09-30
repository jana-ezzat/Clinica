"use client";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Text from "@/shared/components/atoms/Text";
import Avatar from "./Avatar";
import { ProfileImage } from "../../lib/Profile";

interface Props {
  name: string;
  role: string;
  img: ProfileImage | null;
}

export default function ProfileHeader({ name, role, img }: Props) {
  const t = useTranslations("profile");
  const router = useRouter();

  return (
    <div className="mb-2 flex items-center gap-5 border-b border-gray-200 pb-8 dark:border-gray-700 sm:gap-7">
      <Avatar
        src={img?.url}
        name={name}
        className="h-32 w-32 text-4xl ring-2 ring-blue-500 ring-offset-4 ring-offset-white dark:ring-offset-gray-900"
      />
      <div className="min-w-0 flex-1">
        <Text
          size="xl"
          variant="primary"
          className="truncate text-2xl font-bold sm:text-3xl"
        >
          {name}
        </Text>

        <div className="mt-1.5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          <Text size="sm" variant="secondary">
            {role}
          </Text>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/profile/update")}
          className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-blue-600 underline-offset-4 hover:underline"
        >
          <Pencil size={14} />
          {t("editProfile")}
        </button>
      </div>
    </div>
  );
}
