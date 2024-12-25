// import Breadcrumb from "@/components/common/BreadCrum";
import BreadCrum from "@/components/common/BreadCrum";
import DepartmentContainer from "@/components/department/DepartmentContainer";
import { getDepartmentForDropdown } from "@/lib/actions/department/department";
import React from "react";

const Department = async () => {
  const department = await getDepartmentForDropdown();
  // console.log(department);

  return (
    <div>
      <BreadCrum />
      <DepartmentContainer department={department.departments} />
    </div>
  );
};

export default Department;
