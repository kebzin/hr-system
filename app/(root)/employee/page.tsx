import BreadCrum from "@/components/common/BreadCrum";
import EmployeeContainer from "@/components/employee/EmployeeContainer";
import { GetAllUsers } from "@/lib/actions/user/get-all-users";
import { EmployeeType } from "@/types/employee-type";
import React from "react";

const Employee = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  // fetch attendance
  const { status, users, isPreviousPage, isNextPage, totalCount } =
    await GetAllUsers({
      page: page,
      limit: limit,
      query: search,
    });

  return (
    <div>
      <BreadCrum />
      <EmployeeContainer
        data={users as EmployeeType}
        page={page}
        isPreviousPage={isPreviousPage}
        isNextPage={isNextPage}
        totalCount={totalCount}
        limit={limit}
        search={search}
      />
    </div>
  );
};

export default Employee;
