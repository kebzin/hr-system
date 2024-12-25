// import DatePickerWithRange from "@/components/common/DateRangePicker";
import SearchComponentWithFiltering from "@/components/common/SearchComponentWithFiltering";
import TablePaginationComponent from "@/components/common/TablePaginationComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudUpload } from "lucide-react";
import React from "react";

const Invoice = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Invoice (Coming Soon)</CardTitle>
        <CardDescription>
          Manage and track all your invoices effortlessly. Use the search bar to
          find specific invoices, or export your data for detailed reporting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="  items-center  justify-between gap-2  flex mt-5  max-md:flex-wrap  ">
            <SearchComponentWithFiltering
              page={1}
              placeholder="Search by invoice name , title and date "
            />
            <Button variant="outline" size="sm">
              {" "}
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export csv
              </span>
              <CloudUpload className="h-5 w-5 ml-3 " />
            </Button>
            {/* <DatePickerWithRange
              //   datefrom={datefrom}
              //   dateto={dateto}
              page={1}
            /> */}
            {/* add expense */}
            <Button variant="outline" size="sm">
              {" "}
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Invoice
              </span>
              <CloudUpload className="h-5 w-5 ml-3 " />
            </Button>
          </div>
          {/* contend */}
          <div className="text-center mt-4 italic text-gray-500">
            invoice management features are coming soon—stay tuned!
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <TablePaginationComponent
          search={""}
          totalCount={0}
          isNextPage={false}
          isPreviousPage={false}
          limit={10}
          page={1}
        />
      </CardFooter>
    </Card>
  );
};

export default Invoice;
