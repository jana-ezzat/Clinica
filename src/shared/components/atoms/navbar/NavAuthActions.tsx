"use client";
import React, { useEffect, useState } from "react";
import { tokenService } from "@/services/tokenService";
import { MdNotificationsNone, MdPerson } from "react-icons/md";
import NavLink from "./NavLink";
import Button from "../Button";

interface NavAuthActionsProps {
  loginLabel: string;
  ctaLabel: string;
}

export default function NavAuthActions({
  loginLabel,
  ctaLabel,
}: NavAuthActionsProps) {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(tokenService.isAuthenticated());
    setMounted(true);
  }, []);

  // Avoid a flash of the wrong state before we've checked localStorage on the client.
  if (!mounted) return null;

  if (isAuthenticated) {
    return (
      <>
        <button
          type="button"
          aria-label="Notifications"
          className="ds-text hover:opacity-70">
          <MdNotificationsNone size={24} />
        </button>


        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ds-bg-icon">
          <MdPerson size={20} className="ds-text-primary" />
        </div>
      </>
    );
  }

  return (
    <>
      <NavLink href="/sign-in">{loginLabel}</NavLink>
      <Button tag="link" href="/sign-up" size="sm">
        {ctaLabel}
      </Button>
    </>
  );
}
