"use client";

import React, { useState } from "react";
// import { Permission } from "@/types/role";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import UserRoleHooks from "@/hooks/user-role";
import { toast } from "sonner";

// interface PermissionCollapsProps {
//   permission: Permission;
// }
const PermissionCollaps = ({ permission, permissionKey, roleName }) => {
  const [selectedPermission, setSelectedPermission] = useState(
    permission[permissionKey].level || "off"
  );
  const { handleUpdatePermission } = UserRoleHooks();
  // console.log(permission[permissionKey]);

  // const handleSubmit = async () => {
  //   try {
  //     await handleUpdatePermission(permissionKey, selectedPermission);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   setSelectedPermission(permission[permissionKey].level || "off");
  //   // handleSubmit()
  //   console.log(selectedPermission);
  // }, [permission, permissionKey]);

  //  Handler for updating the selected permission
  const handlePermissionChange = async (value) => {
    setSelectedPermission(value);
    console.log(selectedPermission);
    await handleUpdatePermission(roleName, permissionKey, selectedPermission);
    // Add your logic to update the permission in the backend here
    console.log("Updated Permission:", value);
  };

  return (
    <div className="mb-5">
      <RadioGroup
        value={selectedPermission}
        onValueChange={handlePermissionChange}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="off" id="noAccess" />
          <Label htmlFor="noAccess">No Access</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="view" id="viewAccess" />
          <Label htmlFor="viewAccess">View Access</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="full" id="fullAccess" />
          <Label htmlFor="fullAccess">Full Access</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PermissionCollaps;
