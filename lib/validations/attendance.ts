import { z } from "zod";

// {
//   "attendance": {
//     "clockInTime": "09:00 AM",
//     "clockOutTime": "05:00 PM",
//     "allowEarlyClockIn": true,
//     "maxLateMinutes": true , employee can be consider lat after 15 of clockin time
//     "autoClockOutAfter": true,
//     "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
//     "allowWeekendClockIn": false,
//
//   }
// }

// Attendance setting validation using zode

// working days
export const workingDays = [
  {
    id: "Monday",
    label: "Monday",
  },
  {
    id: "Tuesday",
    label: "Tuesday",
  },
  {
    id: "Wednesday",
    label: "Wednesday",
  },
  {
    id: "Thursday",
    label: "Thursday",
  },
  {
    id: "Friday",
    label: "Friday",
  },
  {
    id: "Saturday",
    label: "Saturday",
  },
  {
    id: "Sunday",
    label: "Sunday",
  },
];

// Attendance setting validation using Zod
export const AttendanceSettingValidation = z.object({
  attendance: z.object({
    clockInTime: z.string().optional(),
    clockOutTime: z.string().optional(),
    allowEarlyClockIn: z.boolean(),
    maxLateMinutes: z.boolean(),
    autoClockOutAfter: z.boolean(),
    workingDays: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one working day.",
      }),
    allowWeekendClockIn: z.boolean(),

    //  // Holidays: array of objects with fromDate and toDate for each holiday
    //   holidays: z.object({
    //     fromDate: z.string().optional(),
    //     toDate: z.string().optional(),
    //     holidayName:
    //   }),

    // // .refine(
    // //   (data) =>
    // //     new Date(data?.fromDate as string) <=
    // //     new Date(data?.toDate as string),
    // //   {
    // //     message: "'fromDate' must be earlier than or equal to 'toDate'",
    // //     path: ["toDate"],
    // //   }
    // // ),
  }),
});

//.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday, Saturday", "Saturday"]))
