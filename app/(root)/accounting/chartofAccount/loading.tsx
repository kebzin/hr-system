import DynamicTableSkeleton from "@/components/common/DynamicTableSkeleton";
import { ChartOfAccountHistotyHeaders } from "@/constants/tablesData";
import React from "react";

const loading = () => {
  return <DynamicTableSkeleton headers={ChartOfAccountHistotyHeaders} />;
};

export default loading;
