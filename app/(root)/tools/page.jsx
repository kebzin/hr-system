import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FigmaDesign from "@/components/employee/EmployeeIdCart/IDCart";

const page = () => {
  return (
    <Tabs defaultValue="id">
      <TabsList className=" flex-wrap h-auto">
        <TabsTrigger value="id">Personal Information</TabsTrigger>
        <TabsTrigger value="EmploymentDetails">Employment Details</TabsTrigger>
        <TabsTrigger value="PreviousEmployment">
          Previous Employment
        </TabsTrigger>
        <TabsTrigger value="EmergencyContact">Emergency Contact</TabsTrigger>
        <TabsTrigger value="PayrollInformation">
          Payroll Information
        </TabsTrigger>

        <TabsTrigger value="mnfnf">Employee Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="id">
        <FigmaDesign />
      </TabsContent>
    </Tabs>
  );
};

export default page;
