import * as z from "zod";
// import { UserRole } from "@/lib/models/types";

export const SignInValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be 8+ characters"),
  code: z.optional(z.string()),
});

export const SignUpValidation = z
  .object({
    name: z
      .string()
      .min(1, "Username is required")
      .max(50, "Username must be less than 50 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be 8+ characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export const ResetPasswordValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

export const NewPasswordValidation = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be 8+ characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const validatePassword = z
  .string()
  .refine((val) => val === "" || val.length >= 8, {
    message: "Password must be 8+ characters if provided",
  });

export const SettingsValidation = z
  .object({
    firstname: z.optional(z.string()),
    email: z.optional(z.string().email("Invalid email")),
    password: z.optional(validatePassword),
    newPassword: z.optional(validatePassword),
    // role: z.enum([UserRole.ADMIN, UserRole.USER]),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      path: ["password"],
      message: "To change password, enter current one.",
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      path: ["newPassword"],
      message: "To change password, enter new password.",
    }
  );

// personal info validateion
export const PersonalInfoValidation = z.object({
  firstName: z
    .string()
    .min(3, "First name must be more than 3 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(3, "Last name must be more than 3 characters")
    .max(50, "Last name must be less than 50 characters"),
  middleName: z.string().optional(),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(7, "Phone number must be at least 7 digits"),
  fullAddress: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address must be less than 255 characters"),
  gender: z.string().min(1, { message: "Gender is required" }),
  dateOfBirth: z.string().optional(), // This can be made into a date if needed
});

// employment detail validation

export const EmploymentDetailValidation = z.object({
  jobTitle: z.string().min(2, "Job title mudt be more than 2 characters "),
  contractType: z.string().min(1, { message: "Contract type is required" }),
  hireDate: z.string().optional(), // This can be made into a date if needed
  nationality: z.string().min(1, { message: "Nationality is required" }),
  department: z.string().optional(), // Department can be optional or required based on your needs
  role: z.string().optional(),
});

// Previouse Employment Record
export const PreviouseEmploymentRecordValidation = z.object({
  previousEmployment: z
    .object({
      companyName: z.string().min(1, { message: " company name is required" }),
      jobTitle: z.string().min(1, { message: " job title is required" }),
      startDate: z.string().optional(), // This can be made into a date if needed
      endDate: z.string().optional(), // This can be made into a date if needed
    })
    .optional(),
});

//  EmergencyContactValidation

export const EmergencyContactValidation = z.object({
  emergencyContact: z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      relationship: z.string().min(1, { message: "Relationship is required" }),
      phone: z.string().min(7, "Phone number must be at least 7 digits"),
    })
    .optional(),
});

// payroll info validation
export const payrollInfoValidation = z.object({
  basicSalary: z.string().min(0, {
    message: "Basic salary must be a positive number",
  }),
  creditAllowance: z.string().min(0, {
    message: "Credit allowance must be a positive number",
  }),
  compositionAllowance: z.string().min(0, {
    message: "Composition allowance must be a positive number",
  }),
});
