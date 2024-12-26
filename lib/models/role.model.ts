import mongoose from "mongoose";

/**
 * Schema for representing a role within the organization.
 * This schema includes the role's name, description, and associated permissions.
 */
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ["Administrator", "Accounting/Finance", "Sub Admin", "Employee"],
    },
    description: {
      type: String,
    },
    permissions: {
      type: Map,
      of: {
        level: { type: String, enum: ["full", "view", "off"], default: "off" }, // Default value set to 'off'
      },
      default: {
        view_employees: { level: "view" },
        edit_employees: { level: "view" },
        manage_payroll: { level: "view" },
        view_departments: { level: "view" },
        edit_departments: { level: "view" },
        view_roles: { level: "view" },
        edit_roles: { level: "view" },
        manage_leave: { level: "view" },
        request_leave: { level: "view" },
        view_performance: { level: "view" },
        edit_performance: { level: "view" },
        view_attendance: { level: "view" },
        edit_attendance: { level: "view" },
        manage_website: { level: "view" },
        view_transactions: { level: "view" },
        export_data: { level: "view" },
        view_company_files: { level: "view" },
        edit_company_files: { level: "view" },
        delete_company_files: { level: "view" },
        create_company_files: { level: "view" },
        view_documents: { level: "view" },
        view_report: { level: "view" },
        manage_company_files: { level: "view" },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
export default Role;
