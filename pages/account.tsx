import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Account = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("warethecode-login-token")) router.push("/");
  }, []);
  return <div>Account</div>;
};

export default Account;
