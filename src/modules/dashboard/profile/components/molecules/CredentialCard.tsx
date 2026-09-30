"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, FileBadge } from "lucide-react";
import { useTranslations } from "next-intl";
import Text from "@/shared/components/atoms/Text";
import { CredentialCardProps } from "../../lib/Profile";
import { ImageOff } from "@/assets/icons/icons";

export default function CredentialCard({
  title,
  items,
  hrefBase,
}: CredentialCardProps & { hrefBase: string }) {
  const t = useTranslations("profile");

  return (
    <section className="ds-bg-card ds-shadow-sm mt-10 w-full rounded-2xl p-5 sm:p-6">
      {/* Header */}
      <header className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FileBadge size={22} />
        </div>

        <Text size="lg" className="ds-text font-bold">
          {title}
        </Text>
      </header>

      {items.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-12 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
            <FileBadge size={28} className="text-gray-400" />
          </div>
          <Text size="sm" className="text-gray-500">
            {t("NoItems")}
          </Text>
        </div>
      ) : (
        <ul className="-mx-2 flex max-h-140 flex-col gap-4 overflow-y-auto px-2 py-2">
          {items.map((item) => (
            <li key={item._id}>
              <Link
                href={`${hrefBase}/${item._id}`}
                className="group ds-bg flex flex-col gap-4 rounded-xl p-4 shadow-md transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:gap-5"
              >
                {/* Image */}
                <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:w-56">
                  {item.file ? (
                    <Image
                      src={item.file}
                      alt={item.title || "Credential"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/70 text-blue-500 shadow-sm dark:bg-white/10">
                        <ImageOff size={26} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <Text
                    size="lg"
                    variant="primary"
                    className="line-clamp-2 font-bold"
                  >
                    {item.title}
                  </Text>

                  <Text
                    size="md"
                    variant="secondary"
                    className="mt-2 line-clamp-3 leading-relaxed"
                  >
                    {item.desc}
                  </Text>
                </div>

                <span
                  className="
    hidden h-10 w-10 shrink-0 items-center justify-center
    rounded-full
    border border-gray-200
    bg-white
    text-gray-500
    shadow-sm
    transition-all duration-200
    group-hover:border-blue-200
    group-hover:bg-blue-50
    group-hover:text-blue-600
    group-hover:shadow-md
    sm:flex
    rtl:rotate-180
  "
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
