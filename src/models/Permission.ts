import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IPermission {
  _id?: ObjectId | string | undefined;
  idUser: string;
  name: string;
  doc: number;
  date: string;
  unidad: string;
  time: number;
  description: string;
  email: string;
  status: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPermissionSchema extends Document {
  _id?: ObjectId | string | undefined;
  idUser: string;
  name: string;
  doc: number;
  date: string;
  unidad: string;
  time: number;
  description: string;
  email: string;
  status: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

const PermissionSchema: Schema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    doc: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    unidad: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Permission =
  mongoose.models.Permission || mongoose.model("Permission", PermissionSchema);
export default Permission;
