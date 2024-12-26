//
"use server";
import connectDB from "@/lib/db";
import Role from "@/lib/models/role.model";
import { deepConvertToPlainObject } from "@/lib/utils";
import { RoleTypes } from "@/types/role";
import { revalidatePath } from "next/cache";

// get all roles

export const GetAllRoles = async () => {
  try {
    await connectDB();
    const roles = await Role.find({});
    //  if ther is no role return message

    if (!roles.length) {
      return { status: 404, message: "Role not found" };
    }
    const convert = deepConvertToPlainObject(roles as unknown as RoleTypes);
    return { status: 200, roles: convert };
  } catch (error) {
    console.error(error);
    //    internal server error
    return { status: 500, message: "Internal server error" };
  }
};

// get tole by name

export const GetRoleByName = async (name: string) => {
  try {
    await connectDB();
    const role = await Role.findOne({ name });
    //  if ther is no role return message
    if (!role) {
      return { status: 404, message: "Role not found" };
    }
    return { status: 200, role };
  } catch (error) {
    console.error(error);
    //    internal server error
    return { status: 500, message: "Internal server error" };
  }
};

// Function to update a role by its name

export const UpdatePermissionLevel = async (
  roleName: string,
  permissionKey: string,
  newLevel: string
) => {
  try {
    await connectDB();

    // Retrieve the role
    const role = await Role.findOne({ name: roleName });

    if (!role) {
      console.log("role not found");

      return { status: 404, message: "Role not found" };
    }
    // console.log(role);
    console.log(role.permissions.get(permissionKey));
    console.log(permissionKey);

    // Check if the permission exists
    if (!role.permissions.get(permissionKey).level) {
      return { status: 404, message: "Permission not found" };
    }

    // Update the permission level
    role.permissions.get(permissionKey).level = newLevel;

    // console.log(role.permissions.get(permissionKey).level);
    // console.log(permission);

    // Save the updated role
    await role.save();
    revalidatePath(
      "/setting/roles-permissions/[slug]/edit-permission-[slug]",
      "page"
    );
    revalidatePath("/setting/roles-permissions/[slud]", "page");
    revalidatePath("/setting/roles-permissions", "page");

    return { status: 200, message: "Permission level updated successfully" };
  } catch (error) {
    console.log("Error updating permission level:", error);
    return { status: 500, message: "Internal server error" };
  }
};
