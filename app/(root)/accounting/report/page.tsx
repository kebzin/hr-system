import Cash_In from "@/components/accounting/report/Cash_In";
import Cash_Out from "@/components/accounting/report/Cash_Out";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Reports = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>
          Here you can find various reports for transaction .
        </CardDescription>
        <CardContent>
          <div>
            <div className="flex items-center gap-3">
              <Cash_In />
              <Cash_Out />
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Reports;
