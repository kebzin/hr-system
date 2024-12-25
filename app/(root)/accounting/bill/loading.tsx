import DynamicTableSkeleton from "@/components/common/DynamicTableSkeleton";
import { BillTableHeaders } from "@/constants/tablesData";
import React from "react";

const loading = () => {
  return (
    <div>
      <DynamicTableSkeleton headers={BillTableHeaders} rowCount={10} />
    </div>
  );
};

export default loading;
