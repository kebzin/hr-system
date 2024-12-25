import DynamicTableHeader from "@/components/common/DynamicTableHeader";
import DynamicTableSkeleton from "@/components/common/DynamicTableSkeleton";
import ProfileComponent from "@/components/common/ProfileComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { ChartOfAccountHistotyHeaders } from "@/constants/tablesData";
import { getAccountByName } from "@/lib/actions/accounting/account";
import {
  formatReadableDate,
  formatReadableDateWithoutTime,
} from "@/lib/manuplation-helpers/general-manuplation-helpers";
import { convertToGambianCurrency } from "@/lib/salary-helper/payroll-calculation";
import Link from "next/link";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
  // Get account by name

  const { accounts, status, message } = await getAccountByName(
    decodeURIComponent(params.slug)
  );
  console.log(accounts);

  // Display message if no account data found
  if (status !== 200 || !accounts) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{message || "No account data available."}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="justify-between flex">
          {decodeURIComponent(params.slug)}
          <Link href={"/accounting/chartofAccount"}>
            <Button variant={"link"}>Back to List</Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-5">
          <div className="flex gap-5 mt-5 flex-wrap justify-between">
            <div>
              <p className="text-muted-foreground">Account Number</p>
              <p>{accounts.accountNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Account Name</p>
              <p>{accounts.accountName || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Account Type</p>
              <p>{accounts.accountType || "N/A"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Created At</p>
              <p>
                {accounts.createdAt
                  ? formatReadableDateWithoutTime(accounts.createdAt as string)
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Current Balance</p>
              <p
                className={
                  accounts.accountAmount < 0
                    ? "text-destructive"
                    : "text-green-600"
                }
              >
                {convertToGambianCurrency(accounts.accountAmount || 0)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Created By</p>
              <ProfileComponent
                firstName={accounts.updatedBy?.firstName || ""}
                middleName={accounts.updatedBy?.middleName || ""}
                lastName={accounts.updatedBy?.lastName || ""}
                email={accounts.updatedBy?.email || ""}
              />
            </div>
          </div>

          <Separator className="mt-5" />
          <div className="mt-5">
            <h3>Account History</h3>
            <Table>
              <Suspense
                fallback={
                  <DynamicTableSkeleton
                    headers={ChartOfAccountHistotyHeaders}
                    rowCount={5}
                  />
                }
              >
                <DynamicTableHeader headers={ChartOfAccountHistotyHeaders} />
                {accounts.activityHistory?.length > 0 ? (
                  accounts.activityHistory.map((activity) => (
                    <TableRow key={activity.transactionId || Math.random()}>
                      <TableCell>
                        {activity?.date
                          ? formatReadableDate(activity?.date)
                          : "N/A"}
                      </TableCell>
                      <TableCell>{activity?.description || "N/A"}</TableCell>
                      <TableCell>
                        {activity?.transactionType || "N/A"}
                      </TableCell>
                      <TableCell
                        className={
                          activity?.transactionType === "debit"
                            ? "text-destructive"
                            : "text-green-600"
                        }
                      >
                        {activity?.transactionType === "debit" ? "-" : ""}
                        {convertToGambianCurrency(activity?.amount || 0)}
                      </TableCell>
                      <TableCell>
                        {convertToGambianCurrency(activity.closingBalance || 0)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No account history available.
                    </TableCell>
                  </TableRow>
                )}
              </Suspense>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
