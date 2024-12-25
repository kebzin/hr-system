// import Breadcrumb from "@/components/common/BreadCrum";
// import DepartmentInfo from "@/components/department/DepartmentInfo";
// import MembersOfDepartment from "@/components/department/MembersOfDepartment";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      {/* <Breadcrumb title={decodeURIComponent(params.slug)} />
      <Tabs defaultValue="info">
        <TabsList className="gap-3">
          <TabsTrigger value="info">Department Information</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <DepartmentInfo />
        </TabsContent>
        <TabsContent value="members">
          <MembersOfDepartment item={decodeURIComponent(params.slug)} />
        </TabsContent>
      </Tabs> */}
      page
    </div>
  );
};

export default page;
