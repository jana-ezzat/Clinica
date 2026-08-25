"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, children, onClose }: Props) => {
  return (
    <div
      className={`fixed inset-0 z-100  flex items-center justify-center transition-opacity duration-300 bg-black/70 p-4 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative flex max-h-[90vh] w-full ds-bg transition-transform duration-300 max-w-200 flex-col gap-6 overflow-y-auto   px-6 py-8 text-start     ${isOpen ? "scale-100" : "scale-90"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-e-4 top-4 cursor-pointer text-gray-400 hover:text-gray-600"
        >
          <IoMdClose size={20} />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
