"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AlertDialogComponent from "@/components/common/AlertDialog";
import { Loader } from "lucide-react";
import { AccountSettings } from "@/types/accountingt";

import { useSession } from "next-auth/react";
import AddAccount from "./AddAccount";
import Link from "next/link";
import AccountingHook from "@/hooks/accounting";

const ChartOfAccountAction = ({ item }: { item: AccountSettings }) => {
  const { handlDeleteAccount, isLoading } = AccountingHook();
  const [status, setStatus] = useState<string | undefined>("");
  const { data: session } = useSession({ required: true });

  const AccountDeletion = async () => {
    await handlDeleteAccount(item._id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full" variant="outline">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>Account Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-2">
          {/* add transaction */}
          <AddAccount isEdit={true} initialData={item} />

          <Link href={`/accounting/chartofAccount/${item.accountName}`}>
            <Button variant={"outline"}>View account</Button>
          </Link>

          <AlertDialogComponent
            icon={isLoading && <Loader className="animate-spin" />}
            DialogButtonName="Delete"
            dialogbuttonvarient="destructive"
            classname="w-full"
            DialogOnclickFunction={AccountDeletion}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChartOfAccountAction;
