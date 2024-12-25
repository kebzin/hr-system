"use client";

import DatePickerWithRange from "@/components/common/DateRangePicker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import AttendanceHook from "@/hooks/Settings-hook";
import {
  AttendanceSettingValidation,
  workingDays,
} from "@/lib/validations/attendance";
import { AttendanceSettingsTypes } from "@/types/attendance-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AttendanceSetting = () => {
  const {
    isLoading,
    // HandleAttendanceAdd,
    handleAttendanceGetByName,
    data,
    handleAttendanceUpdateByName,
  } = AttendanceHook();

  const attendanceData = data as unknown as AttendanceSettingsTypes;

  const form = useForm<z.infer<typeof AttendanceSettingValidation>>({
    resolver: zodResolver(AttendanceSettingValidation),
    defaultValues: {
      attendance: {
        clockInTime: "",
        clockOutTime: "",
        allowEarlyClockIn: false,
        maxLateMinutes: false,
        autoClockOutAfter: false,
        workingDays: [], // default empty array for workingDays
        allowWeekendClockIn: false,
        // holidays: {
        //   fromDate: undefined,
        //   toDate: undefined,
        // },
      },
    },
  });

  // Log the fetched attendance data
  // console.log(attendanceData);

  useEffect(() => {
    // Fetch the attendance settings data
    handleAttendanceGetByName("attendance" as string);
  }, []);

  useEffect(() => {
    // Once the data is available, update the form values
    if (attendanceData) {
      form.reset({
        attendance: {
          clockInTime: attendanceData.clockInTime,
          clockOutTime: attendanceData.clockOutTime,
          allowEarlyClockIn: attendanceData.allowEarlyClockIn,
          maxLateMinutes: attendanceData.maxLateMinutes,
          autoClockOutAfter: attendanceData.autoClockOutAfter,
          workingDays: attendanceData.workingDays,
          allowWeekendClockIn: attendanceData.allowWeekendClockIn,
        },
      });
    }
  }, [attendanceData, form]);

  async function onSubmit() {
    const formData = form.getValues();
    await handleAttendanceUpdateByName(
      "attendance",
      formData.attendance as AttendanceSettingsTypes
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Configure Your Attendance</CardTitle>
            <CardDescription>
              Manage and configure attendance settings for your employees.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 mt-10">
            {/* Clock In Time */}
            <FormField
              control={form.control}
              name="attendance.clockInTime"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2">
                  <FormLabel className="flex flex-col space-y-1">
                    <span>Clock In Time</span>
                    <FormDescription>
                      Specify the time when employees can clock in (e.g., 9:00
                      AM).
                    </FormDescription>
                  </FormLabel>
                  {isLoading ? (
                    <Loader className=" animate-spin" />
                  ) : (
                    <Input
                      type="time"
                      className="w-[20%]"
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                </FormItem>
              )}
            />
            {/* Clock Out Time */}
            <FormField
              control={form.control}
              name="attendance.clockOutTime"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2">
                  <FormLabel className="flex flex-col space-y-1">
                    <span>Clock Out Time</span>
                    <FormDescription>
                      Specify the time employees are expected to clock out.
                    </FormDescription>
                  </FormLabel>
                  {isLoading ? (
                    <Loader className=" animate-spin" />
                  ) : (
                    <Input type="time" className="w-[20%]" {...field} />
                  )}
                </FormItem>
              )}
            />
            {/* Working Days */}
            <FormField
              control={form.control}
              name="attendance.workingDays"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2">
                  <FormLabel className="flex flex-col space-y-1">
                    <span>Working Days</span>
                    <FormDescription>
                      Select the company official working days.
                    </FormDescription>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger>
                      <Button type="button" variant="outline">
                        Select Working Days
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      {isLoading ? (
                        <Loader className=" animate-spin" />
                      ) : (
                        workingDays.map((i) => (
                          <div
                            key={i.id}
                            className="flex items-center space-x-2 gap-3"
                          >
                            <Checkbox
                              checked={field.value?.includes(i.id) || false}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value ?? [];
                                field.onChange(
                                  checked
                                    ? [...currentValue, i.id]
                                    : currentValue.filter(
                                        (value) => value !== i.id
                                      )
                                );
                              }}
                            />
                            <Label className="text-sm font-medium leading-none">
                              {i.label}
                            </Label>
                          </div>
                        ))
                      )}
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            {/* Holidays */}
            {/* <FormField
              control={form.control}
              name="attendance.holidays"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2">
                  <FormLabel className="flex flex-col space-y-1">
                    <span>Holidays</span>
                    <FormDescription>
                      Set holidays to ensure employees are not marked absent.
                    </FormDescription>
                  </FormLabel>
                  {isLoading ? (
                    <Loader className=" animate-spin" />
                  ) : (
                    <DatePickerWithRange
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                </FormItem>
              )}
            /> */}
            {/* Other form fields... */}
            <FormField
              control={form.control}
              name="attendance.allowEarlyClockIn"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2">
                  <FormLabel className="flex flex-col space-y-1">
                    <span>Allow Early Clock-In</span>
                    <FormDescription>
                      Enable or disable early clock-in before the scheduled
                      time.
                    </FormDescription>
                  </FormLabel>
                  {isLoading ? (
                    <Loader className=" animate-spin" />
                  ) : (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attendance.allowWeekendClockIn"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2">
                  <FormLabel className="flex flex-col space-y-1">
                    <span>Allow Weekend Clock-In</span>
                    <FormDescription>
                      Specify if employees can clock in on non-working days.
                    </FormDescription>
                  </FormLabel>
                  {isLoading ? (
                    <Loader className=" animate-spin" />
                  ) : (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendance.maxLateMinutes"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2">
                  <FormLabel className="flex flex-col space-y-1">
                    <span>Max Late Minutes</span>
                    <FormDescription>
                      Allow employees to clock in up to X minutes late without
                      penalty.
                    </FormDescription>
                  </FormLabel>{" "}
                  {isLoading ? (
                    <Loader className=" animate-spin" />
                  ) : (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendance.autoClockOutAfter"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-2">
                  <FormLabel className="flex flex-col space-y-1">
                    <span>Auto Clock Out</span>
                    <FormDescription>
                      Automatically clock out employees after a specified time.
                    </FormDescription>
                  </FormLabel>
                  {isLoading ? (
                    <Loader className=" animate-spin" />
                  ) : (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="">
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && <Loader className="animate-spin mr-2" />}
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default AttendanceSetting;
