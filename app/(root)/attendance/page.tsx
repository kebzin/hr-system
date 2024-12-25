import { AttendanceContainer } from "@/components/attendance/AttendanceContainer";
import BreadCrum from "@/components/common/BreadCrum";
import { getAttendance } from "@/lib/actions/attendance/attendance";
import { markEmployeeAsAbsent } from "@/lib/actions/attendance/schedulJobForAttendance";
import { getDayBoundaries } from "@/lib/utils";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Get the start and end of the current day by default
  const { startOfDay, endOfDay } = getDayBoundaries();

  // Extract page and limit from the searchParams
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;

  // Extract search term
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  // Extract dateFrom and dateTo from searchParams and convert them to Date objects

  const dateFromParam =
    typeof searchParams.dateFrom === "string"
      ? searchParams.dateFrom
      : undefined;
  const dateToParam =
    typeof searchParams.dateTo === "string" ? searchParams.dateTo : undefined;

  const datefrom = dateFromParam ? new Date(dateFromParam) : startOfDay;
  const dateto = dateToParam ? new Date(dateToParam) : endOfDay;

  // Fetch attendance data
  const {
    status,
    data,
    isPreviousPage,
    isNextPage,
    totalCount,
    totalEmployees,
  } = await getAttendance({
    page: page,
    limit: limit,
    query: search,
    startDate: datefrom,
    endDate: dateto,
  });

  // Uncomment if you need to mark employees as absent
  // await markEmployeeAsAbsent();

  return (
    <div>
      <BreadCrum />
      <AttendanceContainer
        search={search as string}
        attendanceData={data}
        totalEmployees={totalEmployees as number}
        datefrom={datefrom}
        dateto={dateto}
        isPreviousPage={isPreviousPage}
        totalCount={totalCount as number | undefined}
        isNextPage={isNextPage}
        page={page}
        limit={limit}
      />
    </div>
  );
};

export default page;
