import { ObjectId } from "mongodb";

export type PermissionLevel = "full" | "view" | "none";

export interface Permission {
  level: PermissionLevel;
  _id: ObjectId;
}

export interface RoleTypes {
  _id: ObjectId;
  name: string;
  description: string;
  permissions: Record<string, Permission>;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Data {
  role: RoleTypes;
}
