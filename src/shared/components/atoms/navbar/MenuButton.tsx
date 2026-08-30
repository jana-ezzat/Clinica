import React from "react";
import { MdMenu, MdClose } from "react-icons/md";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MenuButton({ isOpen, onClick }: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "close menu" : "open menu"}
      className="ds-text flex h-9 w-9 items-center justify-center">
      {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
    </button>
  );
}
