/* eslint-disable security/detect-object-injection */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface UserInterface {
  value: null | string;
}

const useAuthentication = () => {
  const [user, setUser] = useState<UserInterface>({ value: null });
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem(
        process.env.NEXT_PUBLIC_USER_TOKEN || ""
      );
      if (token) {
        setUser({ value: token });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      localStorage.clear();
    }
  }, [router.query]);

  const logout = () => {
    try {
      localStorage.removeItem(process.env.NEXT_PUBLIC_USER_TOKEN || "");
      setUser({ value: null });
      router.push("/");
    } catch (error) {
      localStorage.clear();
      console.error(error);
    }
  };

  return { user, logout };
};

export default useAuthentication;
