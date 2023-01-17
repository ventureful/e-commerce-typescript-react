import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Account = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem(process.env.NEXT_PUBLIC_USER_TOKEN || ""))
      router.push("/");
  }, []);
  return <div>Account</div>;
};

export default Account;
