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

const Banks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Banks (Coming Soon)</CardTitle>
        <CardDescription>
          Connect your bank accounts to seamlessly track and view your
          transactions in one place. Use the search and export options for easy
          management and reporting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="items-center justify-between gap-2 flex mt-5 max-md:flex-wrap">
            <SearchComponentWithFiltering
              page={1}
              placeholder="Search by transaction name, title, or date"
            />
            <Button variant="outline" size="sm">
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export CSV
              </span>
              <CloudUpload className="h-5 w-5 ml-3" />
            </Button>
            <Button variant="outline" size="sm">
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Connect Bank Account
              </span>
              <CloudUpload className="h-5 w-5 ml-3" />
            </Button>
          </div>
          {/* Coming soon message */}
          <div className="text-center mt-4 italic text-gray-500">
            Bank account connectivity and transaction management features are
            coming soon—stay tuned!
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

export default Banks;
