import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddNewEmployeeHeader from "@/components/employee/add/AddNewEmployeeHeader";
const page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Employee</CardTitle>
      </CardHeader>
      <CardContent>
        <AddNewEmployeeHeader />
      </CardContent>
    </Card>
  );
};

export default page;
