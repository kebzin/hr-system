import BreadCrum from "@/components/common/BreadCrum";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeePersonalInfo from "@/components/employee/EmployeePresonalInfo";
import Account from "@/components/employee/Account";
import { getEmployeeByEmploymentNumber } from "@/lib/actions/user/get-user-by-identifear";
import { EmployeeType } from "@/types/employee-type";

const page = async ({ params }: { params: { slug: string } }) => {
  // Fetch employee details and roles based on the slug (employment number)

  const employee = await getEmployeeByEmploymentNumber(params.slug);

  return (
    <div>
      <BreadCrum />
      <Tabs defaultValue="personalInfo" className="mt-3">
        <TabsList className="">
          <TabsTrigger value="personalInfo">Personal Info</TabsTrigger>

          <TabsTrigger value="password">Activity</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="notification">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personalInfo">
          <EmployeePersonalInfo employee={employee.employee as EmployeeType} />
        </TabsContent>

        {/* account */}
        <TabsContent value="settings">
          <Account employee={employee.employee as EmployeeType} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
