import useStore from "@/store/storeGlobals";
import axios from "axios";

interface PermissionPost {
  formData: {
    idUser: string | null | undefined;
    name: string;
    doc: number;
    date: string;
    unidad: string;
    time: number;
    description: string;
    email: string;
  };
}

interface PermissionPut {
  formData: {
    _id: string;
    idUser: string;
    email: string;
    name: string;
    date: string;
    status: boolean;
  };
}

const usePermissionApi = () => {
  const { setErrorPermission } = useStore();

  const postPermission = async (Data: PermissionPost) => {
    try {
      const { data } = await axios.post("/api/permission", Data.formData);
      if (data.message) setErrorPermission(data.message);
    } catch (error: any) {
      console.log(error.response.data.message);
      setErrorPermission(error.response.data.message);
    }
  };

  const putPermission = async (Data: PermissionPut) => {
    try {
      const { data } = await axios.put("/api/permission", Data.formData);
      if (data.message) setErrorPermission(data.message);
    } catch (error: any) {
      setErrorPermission(error.response.data.message);
    }
  };

  return {
    postPermission,
    putPermission,
  };
};

export default usePermissionApi;
