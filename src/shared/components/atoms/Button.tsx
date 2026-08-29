import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
  className?: string;
};

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    tag?: "button";
    href?: never;
  };

type AsLink = BaseProps & {
  tag: "link";
  href: string;
};

export type ButtonProps = AsButton | AsLink;

const baseClasses =
  "inline-flex items-center justify-center font-medium rounded-lg transition-opacity focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const variants = {
  primary: "ds-bg-button-primary text-white hover:opacity-90",
  outline: "ds-bg-card ds-text border ds-border-gray hover:opacity-80",
  ghost: "ds-text-primary hover:opacity-70",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
  icon: "h-8 w-8 p-0",
} as const;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if (props.tag === "link") {
    const { href } = props;
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { tag: _tag, ...buttonProps } = props as AsButton;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
