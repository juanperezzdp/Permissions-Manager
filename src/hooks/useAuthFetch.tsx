import { AuthFetchProps } from "@/interfaces/interfaces";
import useStore from "@/store/storeGlobals";
import axios from "axios";

export function useAuthFetch() {
  const { setErrorAuth } = useStore();

  const authRouter = async ({
    endpoint,
    formData,
    options,
  }: AuthFetchProps) => {
    try {
      const { data } = await axios.post(
        `/api/auth/${endpoint}`,
        formData,
        options
      );
      if (data.message) setErrorAuth(data.message);
    } catch (error: any) {
      setErrorAuth(error.response.data.message);
    }
  };

  return authRouter;
}
