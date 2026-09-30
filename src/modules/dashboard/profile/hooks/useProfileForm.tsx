"use client";
import React, { useEffect } from "react";
import { UpdateData, UserProfile } from "../lib/Profile";
import { useForm } from "react-hook-form";


export function useProfileForm(data?: UserProfile) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateData>();

  // Get Data
  useEffect(() => {
    if (!data) return;

    reset({
      name: data.name || "",
      email: data.email || "",
      img: null,
    });
  }, [data, reset]);
  return {
    register,
    handleSubmit,
    reset,
    errors,
  };
}
