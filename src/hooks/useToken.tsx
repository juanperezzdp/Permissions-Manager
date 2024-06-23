import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { DataToken } from "@/interfaces/interfaces";

const useToken = () => {
  const [tokenData, setTokenData] = useState<{ data: DataToken } | null>(null);

  useEffect(() => {
    const useClient = Cookies.get("auth_cookie");
    if (useClient) {
      const decodedToken = jwt.decode(useClient) as { data: DataToken };
      setTokenData(decodedToken);
    }
  }, []);

  return tokenData;
};

export default useToken;
