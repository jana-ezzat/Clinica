"use client";
import React, { useEffect, useState } from "react";

interface Props {
  seconds?: number;
  labelBefore: string;
  labelResend: string;
  onResend: () => void;
}

const OtpTimer = ({
  seconds = 60,
  labelBefore,
  labelResend,
  onResend,
}: Props) => {
  const [remin, setRemine] = useState<number>(Number(seconds) || 60);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (remin <= 0) {
      setIsExpired(true);
      return;
    }
    const timer = setInterval(() => {
      setRemine((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [remin]);

  const handleResendClick = () => {
    setRemine(seconds);
    setIsExpired(false);
    onResend();
  };

  const minutes = Math.floor(remin / 60);
  const remainingSeconds = remin % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  return (
    <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
      {!isExpired ? (
        <p>
          {labelBefore} 
          <span className="font-semibold text-primary"> {formattedTime}</span>
        </p>
      ) : (
        <button
          onClick={handleResendClick}
          className="text-primary font-semibold hover:underline focus:outline-none"
        >

          {labelResend}
        </button>
      )}
    </div>
  );
};

export default OtpTimer;
