import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAwardsRequest } from "./Requests/useAwardsRequest";
import { useCertificateRequest } from "./Requests/useCertificateRequest";

export interface CredentialInput {
  title: string;
  desc: string;
  file: File | null;
}

export function useCredentials() {
  const t = useTranslations("profile");

  const [award, setAward] = useState<CredentialInput>({
    title: "",
    desc: "",
    file: null,
  });

  const [certificate, setCertificate] = useState<CredentialInput>({
    title: "",
    desc: "",
    file: null,
  });

  const [awardFileError, setAwardFileError] = useState("");

  const [certificateError, setCertificateError] = useState("");

  const validateCredentials = () => {
    setAwardFileError("");
    setCertificateError("");
    return true;
  };

  const submitCredentials = async () => {
    if (award.title || award.desc || award.file) {
      try {
        await useAwardsRequest({
          title: award.title,
          desc: award.desc,
          file: award.file,
        });

      } catch (error) {

        throw error;
      }
    }

    if (certificate.title || certificate.desc || certificate.file) {
      try {
        await useCertificateRequest({
          title: certificate.title,
          desc: certificate.desc,
          file: certificate.file,
        });
      } catch (error) {

        throw error;
      }
    }
  };

  return {
    award,
    setAward,
    certificate,
    setCertificate,
    awardFileError,
    certificateError,
    validateCredentials,
    submitCredentials,
  };
}
