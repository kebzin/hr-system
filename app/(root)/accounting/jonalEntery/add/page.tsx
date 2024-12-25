"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader } from "lucide-react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DoubleEntryValidation } from "@/lib/validations/account/account-Validation";
import { convertToGambianCurrency } from "@/lib/salary-helper/payroll-calculation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AccountDropDownWithSearch from "@/components/accounting/AccountDeopDownWithSearchWithFullDataAvelable";
import { AccountSettings } from "@/types/accountingt";
import { Calendar } from "@/components/ui/calendar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AccountingHook from "@/hooks/accounting";
import { usePathname, useRouter } from "next/navigation";

const AddNewJonaEntery = () => {
  const [debitAccount, setDebitAccount] = useState<AccountSettings | null>(
    null
  );
  const [creditAccount, setCreditAccount] = useState<AccountSettings | null>(
    null
  );

  const { data: session } = useSession({ required: true });
  const { handleAddNewTransaction, isLoading } = AccountingHook();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(DoubleEntryValidation),
    defaultValues: {
      invoiceNumber: "",
      status: "Approved",
      createdBy: session?.user._id,
      updatedBy: "",
      transactionDate: new Date(),
      entries: [
        { account: "", debit: 0, credit: 0, description: "" }, // Debit entry row
        { account: "", debit: 0, credit: 0, description: "" }, // Credit entry row
      ],
    },
  });
  const formvalues = form.getValues();
  const AmountEqual = () => {
    if (debitAccount?._id && creditAccount?._id) {
      if (
        Number(formvalues.entries[0].debit) !==
        Number(formvalues.entries[1].credit)
      ) {
        return `What your are Debetting from ${debitAccount?.accountName}  should be the same as what you are crediting to ${creditAccount?.accountName}`;
      }
    }
  };
  useEffect(() => {
    if (debitAccount?._id) {
      form.setValue("entries.0.account", debitAccount._id);
    }
    if (creditAccount?._id) {
      form.setValue("entries.1.account", creditAccount._id);
    }
    if (creditAccount?._id && debitAccount?._id) {
      if (creditAccount._id === debitAccount._id) {
        form.setError("entries.0.account", {
          message: "Source account and destination account cannot be the same.",
        });
      } else {
        form.clearErrors("entries.0.account");
      }
    }
    if (formvalues.entries[0].debit || formvalues.entries[1].credit) {
      // convert the number to interger
      form.setValue("entries.0.debit", Number(formvalues.entries[0].debit));
      form.setValue("entries.1.credit", Number(formvalues.entries[1].credit));
    }
    // conver the debit and credit amount to number
  }, [
    debitAccount,
    form,
    creditAccount,
    form.watch("entries.0.debit"),
    form.watch("entries.1.credit"),
  ]);

  //   handle submit
  const handleSubmit = async () => {
    const formData = {
      invoiceNumber: formvalues.invoiceNumber,
      createdBy: session?.user._id,
      updatedBy: session?.user._id,
      transactionDate: formvalues.transactionDate,
      sourceAccount: formvalues.entries[0].account,
      destinationAccount: formvalues.entries[1].account,
      amount: Number(formvalues.entries[0].debit),
      description: formvalues.entries[1].description,
      transactionType: "debit",
      approvedAt: new Date(),
      approvedBy: session?.user._id,
      status: "Approved",
      transactionCategory: "JournalEntry",
    };
    console.log(typeof formvalues.entries[0].credit);

    // console.log(formData);
    const result = await handleAddNewTransaction({
      formData: formData,
      userId: session?.user._id,
      pathname: pathname,
    });

    //  if the status is 200 navigate back
    if (result?.status !== 200) {
      return;
    }
    router.push("/accounting/jonalEntery");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Manual Journal Entry Form (Double Entry)
          <Link className="float-right" href={"/accounting/jonalEntery"}>
            <Button variant={"link"}>Back to List</Button>
          </Link>
        </CardTitle>
        <CardDescription>
          Provide the required double-entry journal details below. Ensure that
          the debits and credits are balanced.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex justify-between gap-3 flex-wrap-reverse">
              <div className="flex items-center gap-5 flex-wrap">
                <FormField
                  name="invoiceNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Journal Number (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[240px]"
                          {...field}
                          placeholder="Enter journal number (optional)"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="transactionDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-[240px] pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Total amount display */}
              <div className="flex items-center gap-5">
                <div className="text-3xl font-bold tracking-tighter">
                  {convertToGambianCurrency(
                    Number(form.getValues("entries.0.debit")) || 0
                    //   (form.getValues("entries.1.credit") || 0)
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Table for double entry */}
            <div className="mt-5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Debit</TableHead>
                    <TableHead>Credit</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Debit Entry */}
                  <TableRow>
                    <TableCell>
                      <FormField
                        name="entries.0.account"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AccountDropDownWithSearch
                                selectedAccount={debitAccount}
                                setSelectedAccount={setDebitAccount}
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    {/* Debit Field */}
                    <TableCell>
                      <FormField
                        name="entries.0.debit"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                placeholder="0.00"
                                className="max-md:w-[240px]"
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    {/* Credit Field (not used in Debit row) */}
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="max-md:w-[240px]"
                        disabled
                      />
                    </TableCell>

                    {/* Description */}
                    <TableCell>
                      <FormField
                        name="entries.0.description"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter description"
                                className="max-md:w-[240px]"
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>

                  {/* Credit Entry */}
                  <TableRow>
                    <TableCell>
                      <FormField
                        name="entries.1.account"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <AccountDropDownWithSearch
                                selectedAccount={creditAccount}
                                setSelectedAccount={setCreditAccount}
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    {/* Debit Field (not used in Credit row) */}
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="max-md:w-[240px]"
                        disabled
                      />
                    </TableCell>

                    {/* Credit Field */}
                    <TableCell>
                      <FormField
                        name="entries.1.credit"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                placeholder="0.00"
                                className="max-md:w-[240px]"
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </TableCell>

                    {/* Description */}
                    <TableCell>
                      <FormField
                        name="entries.1.description"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter description"
                                className="max-md:w-[240px]"
                              />
                            </FormControl>
                            <FormMessage className="text-sm" />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-destructive text-sm pt-5">{AmountEqual()}</p>
            </div>

            <CardFooter className="mt-5">
              <Link href={"/accounting/jonalEntery"}>
                <Button variant={"link"}>Back</Button>
              </Link>
              <Button disabled={isLoading} type="submit" className="ml-auto">
                {isLoading && <Loader className="animate-spin mr-3" />}
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddNewJonaEntery;
