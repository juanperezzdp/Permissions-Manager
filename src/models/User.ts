import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId | string | undefined;
  email: string;
  password: string;
  confirmPassword: string;
  doc: number;
  fullUserName: string;
  address: string;
  phoneNumber: number;
  workArea: string;
  rol: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserSchema extends Document {
  _id?: ObjectId | string | undefined;
  email: string;
  password: string;
  doc: number;
  fullUserName: string;
  address: string;
  phoneNumber: number;
  workArea: string;
  rol: string;
  createdAt?: string;
  updatedAt?: string;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    doc: {
      type: Number,
      required: true,
    },
    fullUserName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    workArea: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PermissionModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
export default PermissionModel;
