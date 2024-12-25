import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import EmployeeCheckIn from "@/components/attendance/EmployeeClockIn";
import EmployeeClockOut from "@/components/attendance/EmployeeClockOut";
const page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Check In and Check Out</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="CheckIn" draggable={true}>
          <TabsList className=" flex-wrap h-auto">
            <TabsTrigger value="CheckIn">Employee Check In</TabsTrigger>
            <TabsTrigger value="CheckOut">Employment Check Out</TabsTrigger>
          </TabsList>
          <TabsContent value="CheckIn">
            <EmployeeCheckIn />
          </TabsContent>
          <TabsContent value="CheckOut">
            <EmployeeClockOut />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default page;
