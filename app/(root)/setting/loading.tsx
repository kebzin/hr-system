import DynamicTableSkeleton from "@/components/common/DynamicTableSkeleton";
// import { JonalEntryTableHeaders } from "@/constants/tablesData";
import React from "react";

const loading = () => {
  return <DynamicTableSkeleton headers={["", "", "", ""]} rowCount={10} />;
};
export default loading;
