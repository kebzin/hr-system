import DynamicTableSkeleton from "@/components/common/DynamicTableSkeleton";
import { JonalEntryTableHeaders } from "@/constants/tablesData";
import React from "react";

const loading = () => {
  return (
    <DynamicTableSkeleton headers={JonalEntryTableHeaders} rowCount={10} />
  );
};

export default loading;
