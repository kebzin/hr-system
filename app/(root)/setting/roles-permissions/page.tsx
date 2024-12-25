import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { User2 } from "lucide-react";
import { GetAllRoles } from "@/lib/actions/role/role";
const page = async () => {
  const result = await GetAllRoles();
  return (
    <div>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            Role & Permission
            {/* <AddRole /> */}
          </CardTitle>
          <CardDescription>
            Manage roles and permissions for your users and control who can
            access different parts of your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-1">
          <Suspense
            fallback={
              <>
                <div className="mt-10">
                  {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="flex items-center mt-4">
                      <Skeleton className="h-10 w-10 mr-3" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-10 ml-3" />
                    </div>
                  ))}
                </div>
              </>
            }
          >
            {result?.roles?.map((role) => (
              <Link
                href={`/setting/roles-permissions/${encodeURIComponent(
                  role.name
                )}`}
                key={role._id}
                className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent bg-accent/50 hover:text-accent-foreground mt-1"
              >
                <User2 className="mt-px h-5 w-5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {role.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </Link>
            ))}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
