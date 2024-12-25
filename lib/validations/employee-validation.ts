import * as z from "zod";

export const AddingEmployeeFormSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: "First name must be at least 3 characters",
    })
    .max(50, {
      message: "First name cannot exceed 50 characters",
    }),
  middleName: z
    .string()
    .max(50, {
      message: "Middle name cannot exceed 50 characters",
    })
    .optional(),
  lastName: z
    .string()
    .min(3, {
      message: "Last name must be at least 3 characters",
    })
    .max(50, {
      message: "Last name cannot exceed 50 characters",
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(7, {
    message: "Phone number must be at least 7 digits",
  }),
  fullAddress: z
    .string()
    .min(3, {
      message: "Address must be at least 3 characters",
    })
    .max(255, {
      message: "Address cannot exceed 255 characters",
    }),
  contractType: z.string().min(1, { message: "Contract type is required" }),
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters",
  }),
  basicSalary: z.string().min(0, {
    message: "Basic salary must be a positive number",
  }),
  creditAllowance: z.string().min(0, {
    message: "Credit allowance must be a positive number",
  }),
  compositionAllowance: z.string().min(0, {
    message: "Composition allowance must be a positive number",
  }),
  gender: z.string().min(1, { message: "Gender is required" }),
  department: z.string().optional(), // Department can be optional or required based on your needs
  employeeRole: z.string().optional(),
  //   .default("General Employee"),
  dateOfBirth: z.string().optional(), // This can be made into a date if needed
  hireDate: z.string().optional(), // This can be made into a date if needed
  nationality: z.string().min(1, { message: "Nationality is required" }),
  emergencyContact: z.object({
    name: z.string().min(3, { message: "Emergency contact name is required" }),
    relationship: z.string().min(1, { message: "Relationship is required" }),
    phone: z.string().min(7, {
      message: "Emergency contact phone number must be at least 7 digits",
    }),
  }),
  previousEmployment: z
    .object({
      companyName: z.string().optional(),
      jobTitle: z.string().optional(),
      startDate: z.string().optional(), // This can be made into a date if needed
      endDate: z.string().optional(), // This can be made into a date if needed
    })
    .optional(),
});

// suspend employee schema
export const SuspendEmployeeSchema = z.object({
  isActive: z.boolean().default(false).optional(),
  status: z
    .enum(["Active", "On Leave", "Terminated", "Suspended", "Disabled"])
    .default("Active"),
});

// terminate employee schema
