import React, { useCallback, useState } from "react";

export type usePinCodeT = {
  pinCode: string | undefined;
  checkServiceAvailbilty: () => Promise<void>;
  onChangePin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  serviceTextColor: string;
  serviceText: string;
};

const usePinCode = () => {
  const [pinCode, setPinCode] = useState<string | undefined>("");
  const [isSericeAvailable, setIsSericeAvailable] = useState<boolean | null>(
    null
  );

  const serviceTextColor =
    isSericeAvailable && pinCode
      ? "text-green-300"
      : isSericeAvailable !== null && pinCode
      ? "text-red-300"
      : "text-gray-300";
  const serviceText =
    isSericeAvailable && pinCode
      ? "service available in you region"
      : isSericeAvailable !== null && pinCode
      ? "sorry service not available in your region"
      : "check availabilty of product in your region";

  const checkServiceAvailbilty = useCallback(async () => {
    if (!pinCode) return;
    const response = await fetch("http://localhost:3000/api/pincode");
    const result = await response.json();
    const found = result.findIndex((pin: number) => pin === +pinCode);
    if (found !== -1) {
      setIsSericeAvailable(true);
    } else {
      setIsSericeAvailable(false);
    }
  }, [pinCode]);

  const onChangePin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setIsSericeAvailable(null);
    setPinCode(e.target.value);
  }, []);

  return {
    pinCode,
    checkServiceAvailbilty,
    onChangePin,
    serviceTextColor,
    serviceText,
  };
};

export default usePinCode;
