import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GetRoleByName } from "@/lib/actions/role/role";
import { Permission } from "@/types/role";
import Link from "next/link";
import React, { Suspense } from "react";
// import { Role, Permission } from "@/types/role"; // Adjust the path as necessary
// Role
// Permission

const page = async ({ params }: { params: { slug: string } }) => {
  const passedData = decodeURIComponent(params.slug);

  const data = await GetRoleByName(passedData);
  console.log(data.role);

  if (data.status !== 200) {
    return (
      <Card>
        <CardTitle>Role Not Found</CardTitle>
        <CardDescription>
          The role you are looking for does not exist. Please make sure to spell
          the role correctly and try again.
        </CardDescription>
        <CardFooter>
          <Link href={`/setting/roles-permissions`}>
            <Button variant="link">Go Back</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{decodeURI(passedData)} Permission</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <p> This is the permission page for {decodeURI(passedData)}</p>
            <Link
              href={`/setting/roles-permissions/${params.slug}/edit-permission-${params.slug}`}
            >
              <Button variant="link">Edit Permission</Button>
            </Link>
          </CardDescription>
        </CardHeader>

        <Suspense
          fallback={
            <div>
              <div className="mt-10 flex items-center gap-4">
                {Array.from({ length: 7 }, (_, index) => (
                  <Skeleton key={index} className="h-15 w-20 " />
                ))}
              </div>
            </div>
          }
        >
          <CardContent className="mt-5">
            <div className="mb-5">
              <div className="flex items-center gap-8  ">
                <div className="flex items-center gap-1 mr-5">
                  <Button
                    variant="destructive"
                    className=" rounded-full w-5 h-5"
                  >
                    {" "}
                  </Button>
                  <small className="text-muted-foreground">No Permission</small>
                </div>
                <div className="flex items-center gap-1 mr-5">
                  <Button
                    variant="secondary"
                    className="rounded-full  w-5 h-5 "
                  >
                    {" "}
                  </Button>
                  <small className="text-muted-foreground">
                    View Permission
                  </small>
                </div>
                <div className="flex items-center gap-1 mr-5">
                  <Button className="rounded-full  w-5 h-5 "> </Button>
                  <small className="text-muted-foreground">
                    Full Access Permission
                  </small>
                </div>
              </div>
            </div>

            {/* Render the permissions */}
            <div className="flex items-center gap-3 flex-wrap">
              {Array.from(
                data.role.permissions.entries() as [string, Permission][]
              ).map(([permissionKey, permissionValue]) => (
                <div key={permissionKey} className="flex items-center gap-2">
                  <Button
                    variant={
                      permissionValue.level === "full"
                        ? "default"
                        : permissionValue.level === "view"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {permissionKey.replace(/_/g, " ")}{" "}
                    {/* Optional: Format the permission key */}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Suspense>

        <CardFooter className=" flex items-center justify-between flex-wrap">
          <Link href={`/setting/roles-permissions`}>
            <Button variant="link">Go Back</Button>
          </Link>
          <Link
            href={`/setting/roles-permissions/${params.slug}/edit-permission-${params.slug}`}
          >
            <Button variant="link">Edit Permission</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
