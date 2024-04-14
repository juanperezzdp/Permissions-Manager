import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

interface UserData {
  _id: string;
  email: string;
  rol: string;
  fullUserName: string;
  doc: number;
}

const useToken = () => {
  const [tokenData, setTokenData] = useState<{ data: UserData } | null>(null);

  useEffect(() => {
    const useClient = Cookies.get("auth_cookie");
    if (useClient) {
      const decodedToken = jwt.decode(useClient) as { data: UserData };
      setTokenData(decodedToken);
    }
  }, []);

  return tokenData;
};

export default useToken;
