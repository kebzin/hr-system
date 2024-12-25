import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { GetRoleByName } from "@/lib/actions/role/role";
import { Permission } from "@/types/role";
import PermissionCollaps from "@/components/setting/PermissionCollaps";
import { deepConvertToPlainObject } from "@/lib/data-manuplation-helper/data-manuplation-helper";

const Page = async ({ params }: { params: { slug: string } }) => {
  const part = params.slug.split("-")[2];

  const data = await GetRoleByName(decodeURIComponent(part));
  if (data.status === 404) {
    return (
      <Card>
        <CardTitle>Role Not Found</CardTitle>
        <CardDescription>
          The role you are looking for does not exist. Please make sure to spell
          the role correctly and try again.
        </CardDescription>
        <CardFooter>
          <Link href={`/settings/roles-permissions`}>
            <Button variant="link">Go Back to Role</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  if (data.status === 500) {
    return (
      <Card>
        <CardTitle>Error</CardTitle>
        <CardDescription>
          An error occurred while fetching the role data.
        </CardDescription>
        <CardFooter>
          <Link href={`/settings/roles-permissions`}>
            <Button variant="link">Go Back</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{decodeURIComponent(part.toUpperCase())}</CardTitle>
        <CardDescription>
          Below are the available permissions. To edit, click on the permission
          to either give full access, view-only access, or no access at all.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {Array.from(
          data.role.permissions.entries() as [string, Permission][]
        ).map(([permissionKey]) => (
          <Collapsible
            key={permissionKey}
            className="w-full space-y-2 transition-all border "
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <p className="text-sm text-muted-foreground">
                {" "}
                {permissionKey.replace(/_/g, " ")}{" "}
              </p>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="transition-all px-6 mb-5">
              <PermissionCollaps
                roleName={decodeURIComponent(part)}
                permissionKey={permissionKey}
                permission={deepConvertToPlainObject(
                  data.role.permissions as Permission
                )}
              />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-5">
        <div>
          <Link href={`/setting/roles-permissions`}>
            <Button variant="link">Go Back to Role</Button>
          </Link>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link href={`/setting/roles-permissions/${decodeURI(part)}`}></Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Page;
