export interface Permission {
  _id: string;
  idUser: string;
  name: string;
  doc: number;
  date: string;
  unidad: string;
  time: number;
  description: string;
  status: boolean | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionsResponse {
  permissions: Permission[];
  message: string;
}

export interface TableUserProps {
  filteredPermissions: Permission[];
}

export interface RadialProps {
  permissions: Permission[];
}

export interface User {
  _id: string;
  fullUserName: string;
  doc: number;
  email: string;
  address: string;
  phoneNumber: number;
  workArea: string;
  rol: string;
  createdAt: string;
}

export interface AlertProps {
  errorAuth: string;
}

export interface LoginFormProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface DataToken {
  _id: string;
  email: string;
  rol: string;
  fullUserName: string;
  doc: number;
}

export interface AuthFetchProps {
  endpoint: string;
  formData: any;
  options?: any;
}

export interface PermissionPost {
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

export interface PermissionPut {
  formData: {
    _id: string;
    idUser: string;
    email: string;
    name: string;
    date: string;
    status: boolean;
  };
}

export interface PermissionFormProps {
  idUser: string | null | undefined;
  name: string;
  doc: number;
  date: string;
  unidad: string;
  time: number;
  description: string;
  email: string;
}

export interface LoginFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  doc: number;
  fullUserName: string;
  address: string;
  phoneNumber: number;
  workArea: string;
  rol: string;
}

export interface ForgetPasswordProps {
  email: string;
}

export interface ChangePasswordProps {
  newPassword: string;
  confirmPassword: string;
}
