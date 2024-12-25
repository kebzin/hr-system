import JonalEnteryContainer from "@/components/accounting/jonalEntery/JonalEnteryContainer";
import { getDayBoundaries } from "@/lib/utils";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { startOfDay, endOfDay } = getDayBoundaries();

  // Extract page and limit from the searchParams
  const page =
    typeof searchParams?.page === "string" ? Number(searchParams?.page) : 1;
  const limit =
    typeof searchParams?.limit === "string" ? Number(searchParams?.limit) : 10;

  // Extract search term
  const search =
    typeof searchParams?.search === "string" ? searchParams?.search : undefined;

  // Extract dateFrom and dateTo from searchParams and convert them to Date objects

  const dateFromParam =
    typeof searchParams.dateFrom === "string"
      ? searchParams.dateFrom
      : undefined;
  const dateToParam =
    typeof searchParams.dateTo === "string" ? searchParams.dateTo : undefined;

  const datefrom = dateFromParam ? new Date(dateFromParam) : startOfDay;
  const dateto = dateToParam ? new Date(dateToParam) : endOfDay;
  return (
    <div>
      <JonalEnteryContainer
        page={page}
        limit={limit}
        search={search}
        datefrom={datefrom}
        dateto={dateto}
      />
    </div>
  );
};

export default page;
