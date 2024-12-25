import AccountAction from "@/components/accounting/AccountAction";
import ProfileComponent from "@/components/common/ProfileComponent";
import SearchComponentWithFiltering from "@/components/common/SearchComponentWithFiltering";
import TablePaginationComponent from "@/components/common/TablePaginationComponent";
import AddAccount from "@/components/setting/accounting/AddAccount";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAccounts } from "@/lib/actions/accounting/account";
import { convertToGambianCurrency } from "@/lib/salary-helper/payroll-calculation";
import { AccountSettings } from "@/types/accountingt";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;

  // Extract search term
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const { accounts, status, totalCount, isPreviousPage, isNextPage } =
    await getAllAccounts({
      page: page,
      limit: limit,
      query: search,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart of Accounts</CardTitle>
        <CardDescription>
          Manage your company's financial accounts, including assets,
          liabilities, income, and expenses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <SearchComponentWithFiltering
            placeholder="Search for an account"
            search={search}
          />
          <AddAccount />
        </div>

        <Table className="mt-5">
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Account Name</TableHead>
              <TableHead>Account Type</TableHead>

              <TableHead>Last Updated By</TableHead>
              <TableHead>Account Balance</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* map through the account data */}
            {accounts?.map((item: AccountSettings) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.accountNumber}</TableCell>
                <TableCell>{item?.accountName}</TableCell>
                <TableCell>{item?.accountType}</TableCell>
                <TableCell>
                  <ProfileComponent
                    middleName={item?.user?.middleName}
                    firstName={item?.user?.firstName}
                    lastName={item?.user?.lastName}
                    email={item?.user?.email}
                  />
                </TableCell>
                <TableCell
                  className={`${
                    item.accountAmount < 0 ? "text-destructive" : ""
                  }`}
                >
                  {convertToGambianCurrency(item?.accountAmount)}
                </TableCell>
                <TableCell>{/* <AccountAction item={item} /> */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <TablePaginationComponent
          search={search}
          totalCount={totalCount}
          isNextPage={isNextPage}
          isPreviousPage={isPreviousPage}
          limit={limit}
          page={page}
        />
      </CardFooter>
    </Card>
  );
};

export default page;
