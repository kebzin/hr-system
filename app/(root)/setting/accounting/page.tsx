"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SettingHook from "@/hooks/settingHook";
import { AccountingSettingValidation } from "@/lib/validations/account/account-Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChartNoAxesCombined, User2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AccountingSetting = () => {
  const { handleAddSetting, isLoading, setting, handleSettingUpdateByName } =
    SettingHook({
      settingType: "accounting",
    });
  const form = useForm({
    resolver: zodResolver(AccountingSettingValidation),
    defaultValues: {
      accounting: {
        maximum_amount_for_entry_before_approval: "",
      },
    },
  });

  useEffect(() => {
    if (setting) {
      form.setValue(
        "accounting.maximum_amount_for_entry_before_approval",
        setting?.maximum_amount_for_entry_before_approval
      );
    }
  }, [setting]);
  const onSubmit = async () => {
    const formData = form.getValues();

    const accounting = {
      maximum_amount_for_entry_before_approval: Number(
        formData.accounting.maximum_amount_for_entry_before_approval
      ),
    };

    await handleSettingUpdateByName({
      settingType: "accounting",
      updatedSettings: accounting,
    });
  };

  //  set the form values once they have been fetch from the setting

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounting Settings</CardTitle>
        <CardDescription>
          Configure your accounting settings here.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-1">
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent bg-accent/50 hover:text-accent-foreground mt-1">
              {/* <User2 className="mt-px h-5 w-5" /> */}
              <ChartNoAxesCombined className="mt-px" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Maximum Amount for Entry Before Approval
                </p>
                <p className="text-sm text-muted-foreground">
                  When an expense is recorded and the amount exceeds the
                  specified limit, approval is required.
                </p>
              </div>
              <FormField
                name="accounting.maximum_amount_for_entry_before_approval"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="pt-2">Initial Balance</FormLabel> */}
                    <FormControl>
                      <Input
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
            <div className="mb-5 mt-5 float-right">
              <Button type="submit">Save</Button>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

export default AccountingSetting;
