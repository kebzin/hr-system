import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dynamic Table Skeleton Component
interface DynamicTableSkeletonProps {
  headers: string[];
  rowCount?: number;
}

const DynamicTableSkeleton = ({
  headers,
  rowCount = 5,
}: DynamicTableSkeletonProps) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          {headers.map((header, index: number) => (
            <TableHead key={index}>
              <Skeleton className="h-5 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {headers.map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-5 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DynamicTableSkeleton;
