"use client";
import DialogComponent from "@/components/common/Dailogue";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewAccountValidation } from "@/lib/validations/account/account-Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AccountSettings } from "@/types/accountingt";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AccountingHook from "@/hooks/accounting";

type AddAccountProps = {
  isEdit?: boolean;
  initialData?: AccountSettings | null;
};

const AddAccount: React.FC<AddAccountProps> = ({
  isEdit = false,
  initialData,
}) => {
  const { data: session } = useSession({ required: true });
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean | undefined>();

  const { addNewAccount, handleUpdateAccount, isLoading } = AccountingHook();

  // Initialize form with default values and resolver
  const form = useForm({
    resolver: zodResolver(NewAccountValidation),
    defaultValues: {
      accountName: initialData?.accountName || "",
      accountType: initialData?.accountType || "",
      accountAmount: initialData?.accountAmount || 0,
      updatedBy: session?.user._id,
    },
  });
  const formData = form.getValues() as AccountSettings;
  // Update the form values if initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      form.reset({
        accountName: initialData.accountName.trim(),
        accountType: initialData.accountType,
        accountAmount: initialData.accountAmount,
        updatedBy: session?.user._id,
      });
    }
    console.log(formData.accountAmount);

    form.setValue("accountAmount", Number(formData.accountAmount));
  }, [initialData, form, session?.user._id, formData.accountAmount]);

  // Add or update account
  const onSubmit = async () => {
    // const formData = form.getValues() as AccountSettings;

    if (isEdit && initialData) {
      const { status } = await handleUpdateAccount({
        accountId: initialData._id,
        formData: formData,
      });

      // closed the dialog
      if (status === 200) {
        setDialogIsOpen(!dialogIsOpen);
      }
    } else {
      await addNewAccount({ formData });
    }

    form.reset();
    setDialogIsOpen(false);
  };

  return (
    <DialogComponent
      dialogOnOpenChange={() => setDialogIsOpen(!dialogIsOpen)}
      dialogIsOpen={dialogIsOpen}
      title={isEdit ? "Edit Account" : "Add Account"}
      dialogDescription={
        isEdit
          ? "Edit the account details"
          : "Add a new account to your account list"
      }
      buttonTitle={isEdit ? "Edit Account" : "Add Account"}
      buttonVariant="outline"
      dialogActionTitle={null}
      RenderItm={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col">
              <FormField
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder="Enter Account Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Account Type</SelectLabel>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="revenue">Revenue</SelectItem>
                            <SelectItem value="liability">Liability</SelectItem>
                            <SelectItem value="equity">Equity</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                name="accountAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="pt-2">{`${
                      isEdit ? "Current Balance" : "Initial Balance"
                    }`}</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isEdit}
                        type="number"
                        required
                        placeholder="Enter Amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isLoading}
              className="mt-5 float-right"
              type="submit"
            >
              {isLoading && <Loader className="animate-spin mr-3" />}
              {isLoading
                ? "Submitting"
                : isEdit
                ? "Update Account"
                : "Add Account"}
            </Button>
          </form>
        </Form>
      }
    />
  );
};

export default AddAccount;
