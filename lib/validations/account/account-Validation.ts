import { z } from "zod";

// NewAccountValidation
export const NewAccountValidation = z.object({
  accountName: z.string().min(1, "Account name is required"),
  accountType: z.enum(["expense", "revenue", "asset", "liability", "equity"]),
  accountNumber: z.string().optional(),
  updatedBy: z.string().optional(),
  accountAmount: z
    .number()
    //.min(1 ,"Account amount is required")
    .transform((val) => Number(val)), // Convert the string to a number
});

// AddTransactionValidation
export const ExpenseValidation = z.object({
  transactionDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  transactionType: z.enum(["debit", "credit"]).optional(), //
  description: z.string().min(1, "Description is required"),
  amount: z
    .string()
    .min(2, "Amount is required")
    .transform((val) => parseFloat(val)), // Convert the string to a number
  transactionCategory: z.enum(["Expense", "Bill", "JournalEntry"]),
  sourceAccount: z.string().min(2, {
    message: "You need to specefied where the money is comming from ",
  }), // This can be made
  destinationAccount: z
    .string()
    .min(2, { message: "You need to specefied where the money is going to " }),
  approvedAt: z
    .preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date()
    )
    .optional(),
  approvedBy: z.string().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  invoiceNumber: z.string().optional(),
});

//AccountingSettingValidation;
export const AccountingSettingValidation = z.object({
  accounting: z.object({
    maximum_amount_for_entry_before_approval: z
      .string()
      .min(1, "Amount is required")
      .transform((val) => parseFloat(val)), // Convert the string to a number
  }),
});

// CreateBillValidation

export const CreateBillValidation = z.object({
  invoiceNumber: z.string().min(1, "Number is required"),
  dueDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  transactionDate: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
  amount: z
    .string()
    .min(1, "Bill amount is required")
    .transform((val) => parseFloat(val)), // Convert the string to a number
  sourceAccount: z
    .string()
    .min(2, { message: "You need to specify the account" }),
  destinationAccount: z
    .string()
    .min(2, { message: "You need to specify where the money is going to" }),
  status: z
    .enum([
      "Pending",
      "Approved",
      "Paid",
      "Completed",
      "Rejected",
      "Reversed",
      "Overdue",
    ])
    .optional(),
  description: z
    .string()
    .min(2, { message: "Tell us the description about this bill" }),
  receiptUrl: z.string().optional(),
  approvedAt: z.string().optional(),
  approvedBy: z.string().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

// Define a schema for the individual entry (account, debit, credit, description)
const EntrySchema = z.object({
  account: z.string().nonempty("Account is required"),
  debit: z.number().min(0, "Debit amount must be zero or greater"),
  credit: z.number().min(0, "Credit amount must be zero or greater"),
  description: z.string().min(1, "Description is required"),
});

// Define the overall journal entry schema for two entries (double entry)
export const DoubleEntryValidation = z.object({
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
  invoiceNumber: z.string().optional(),
  transactionDate: z
    .date()
    .refine((d) => d instanceof Date && !isNaN(d.getTime()), {
      message: "Invalid date",
    }),
  entries: z
    .array(EntrySchema)
    .length(2) // Ensure only 2 entries
    .refine(
      (entries) => entries[0].account !== entries[1].account, // Ensure accounts are different
      {
        message: "Debit and credit accounts cannot be the same",
        path: ["entries"],
      }
    ),
  // .refine(
  //   (entries) =>
  //     (entries[0].debit > 0 && entries[1].credit > 0) || // First row is debit and second is credit
  //     (entries[0].credit > 0 && entries[1].debit > 0), // First row is credit and second is debit
  //   {
  //     message: "Both rows cannot be debit or credit at the same time",
  //     path: ["entries"],
  //   }
  // ),
});
