import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const dymmydata = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

const loading = () => {
  return (
    <div>
      <div className="flex flex-1 flex-col gap-4  md:gap-8 mt-10">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Skeleton className="h-[175px] w-full rounded-xl" />

          <Skeleton className="h-[175px] w-full rounded-xl" />

          <Skeleton className="h-[175px] w-full rounded-xl" />

          <Skeleton className="h-[175px] w-full rounded-xl" />
        </div>
      </div>

      <div className="  items-center  justify-between gap-2  flex mt-5  max-md:flex-wrap  ">
        <Skeleton className="h-[30px] w-full rounded-xl" />

        <Skeleton className="h-[30px] w-full rounded-xl" />

        <Skeleton className="h-[30px] w-full rounded-xl" />

        <Skeleton className="h-[30px] w-full rounded-xl" />

        <Skeleton className="h-[30px] w-full rounded-xl" />

        <Skeleton className="h-[30px] w-full rounded-xl" />
      </div>

      <div className="mt-9">
        {dymmydata.map((id) => (
          <div key={id.id} className="flex items-center space-x-4 w-full mt-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-[100%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
