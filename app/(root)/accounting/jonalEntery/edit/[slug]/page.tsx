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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTransactionById } from "@/lib/actions/accounting/transaction";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionDisplayTypeInterface } from "@/types/transactionType";

const EditJonal = ({ params }: { params: { slug: string } }) => {
  const [creditAccount, setCreditAccount] = useState<AccountSettings | null>(
    null
  );
  const [debitAccount, setDebitAccount] = useState<AccountSettings | null>(
    null
  );
  const [error, setError] = useState<boolean>(false);

  const [jonalEnteryData, setJonalEnteryData] =
    useState<TransactionDisplayTypeInterface>();
  const [jonalDataLoading, setJonalDataLoading] = useState<boolean>(false);
  const { data: session } = useSession({ required: true });
  const { handleUpdateTransaction, isLoading } = AccountingHook();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(DoubleEntryValidation),
    defaultValues: {
      invoiceNumber: "",
      updatedBy: "",
      transactionDate: jonalEnteryData?.transactionDate,
      entries: [
        { account: "", debit: 0, credit: 0, description: "" }, // Debit entry row
        { account: "", debit: 0, credit: 0, description: "" }, // Credit entry row
      ],
    },
  });

  //   // useffect to fetch getJonalEnteryById
  useEffect(() => {
    setJonalDataLoading(true);
    toast.warning("Hang tight while we load your entry data...");
    const fetchData = async () => {
      const { transactions, status, message } = await getTransactionById(
        params.slug
      );
      params.slug;
      if (status !== 200) {
        setError(true);
        toast.error(message);
        setJonalDataLoading(false);
        return;
      }

      setJonalEnteryData(transactions);
      toast.success(message);
    };
    fetchData();
  }, [params.slug, form, session?.user._id]);

  // useffect
  useEffect(() => {
    if (jonalEnteryData) {
      form.reset({
        invoiceNumber: jonalEnteryData.invoiceNumber,
        updatedBy: session?.user._id,
        transactionDate: new Date(jonalEnteryData.transactionDate),
        entries: [
          {
            account: jonalEnteryData.sourceAccount._id,
            debit:
              jonalEnteryData.transactionType === "debit"
                ? jonalEnteryData.amount
                : 0,
            credit:
              jonalEnteryData.transactionType === "credit"
                ? jonalEnteryData.amount
                : 0,
            description: jonalEnteryData.description,
          },
          {
            account: jonalEnteryData.destinationAccount._id,
            debit:
              jonalEnteryData.transactionType === "credit"
                ? jonalEnteryData.amount
                : 0,
            credit:
              jonalEnteryData.transactionType === "debit"
                ? jonalEnteryData.amount
                : 0,
            description: jonalEnteryData.description,
          },
        ],
      });
      setDebitAccount(jonalEnteryData.sourceAccount as AccountSettings);
      setCreditAccount(jonalEnteryData.destinationAccount as AccountSettings);
      setJonalDataLoading(false);
    }
  }, [jonalEnteryData, session?.user._id]);

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
    if (creditAccount?._id) {
      form.setValue("entries.0.account", creditAccount._id);
    }
    if (debitAccount?._id) {
      form.setValue("entries.1.account", debitAccount._id);
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
    // if debit and credit are diffrent then return
    if (AmountEqual()) {
      toast.error(AmountEqual());
      return;
    }
    // cannot proceed while both debit and credit are 0
    if (
      formvalues.entries[0].debit === 0 &&
      formvalues.entries[1].credit === 0
    ) {
      toast.error("Both debit and credit fields cannot be 0.");
      return;
    }
    // check if the form is valid
    if (!form.formState.isValid) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const formData = {
      _id: jonalEnteryData?._id,
      invoiceNumber: formvalues.invoiceNumber,
      updatedBy: session?.user._id,
      transactionDate: formvalues.transactionDate,
      sourceAccount: formvalues.entries[0].account,
      destinationAccount: formvalues.entries[1].account,
      amount: formvalues.entries[0].debit,
      description: formvalues.entries[0].description,
      status: jonalEnteryData?.status,
    };
    const pathname = "/accounting/jonalEntery";
    const { status } = await handleUpdateTransaction(formData, pathname);
    //if the status is 200 navigate back
    if (status !== 200) {
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
        {error === true ? (
          <div>
            <p>
              An error occurred while loading the entry data. Please try again
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex justify-between gap-3 flex-wrap-reverse">
                <div className="flex items-center gap-5 flex-wrap">
                  <FormField
                    name="invoiceNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Journal Number</FormLabel>
                        <FormControl>
                          {jonalDataLoading ? (
                            <Skeleton className="h-10 w-auto" />
                          ) : (
                            <Input
                              className="w-[240px]"
                              {...field}
                              placeholder="Enter journal number"
                            />
                          )}
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        {jonalDataLoading ? (
                          <Skeleton className="h-10 w-auto" />
                        ) : (
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}

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
                                {jonalDataLoading ? (
                                  <Skeleton className="h-10 w-auto" />
                                ) : (
                                  <AccountDropDownWithSearch
                                    selectedAccount={debitAccount}
                                    setSelectedAccount={setDebitAccount}
                                  />
                                )}
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
                                {jonalDataLoading ? (
                                  <Skeleton className="h-10 w-auto" />
                                ) : (
                                  <Input
                                    type="number"
                                    {...field}
                                    placeholder="0.00"
                                    className="max-md:w-[240px]"
                                  />
                                )}
                              </FormControl>
                              <FormMessage className="text-sm" />
                            </FormItem>
                          )}
                        />
                      </TableCell>

                      {/* Credit Field (not used in Debit row) */}
                      <TableCell>
                        {jonalDataLoading ? (
                          <Skeleton className="h-10 w-auto" />
                        ) : (
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="max-md:w-[240px]"
                            disabled
                          />
                        )}
                      </TableCell>

                      {/* Description */}
                      <TableCell>
                        <FormField
                          name="entries.0.description"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                {jonalDataLoading ? (
                                  <Skeleton className="h-10 w-auto" />
                                ) : (
                                  <Input
                                    {...field}
                                    placeholder="Enter description"
                                    className="max-md:w-[240px]"
                                  />
                                )}
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
                                {jonalDataLoading ? (
                                  <Skeleton className="h-10 w-auto" />
                                ) : (
                                  <AccountDropDownWithSearch
                                    selectedAccount={creditAccount}
                                    setSelectedAccount={setCreditAccount}
                                  />
                                )}
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
                                {jonalDataLoading ? (
                                  <Skeleton className="h-10 w-auto" />
                                ) : (
                                  <Input
                                    type="number"
                                    {...field}
                                    placeholder="0.00"
                                    className="max-md:w-[240px]"
                                  />
                                )}
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
                                {jonalDataLoading ? (
                                  <Skeleton className="h-10 w-auto" />
                                ) : (
                                  <Input
                                    {...field}
                                    placeholder="Enter description"
                                    className="max-md:w-[240px]"
                                  />
                                )}
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
                <Button
                  disabled={isLoading || jonalDataLoading}
                  type="submit"
                  className="ml-auto"
                >
                  {isLoading && <Loader className="animate-spin mr-3" />}
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default EditJonal;
