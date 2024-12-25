import mongoose from "mongoose";
// import Counter from "./counterSchema";
/**
 * Schema for representing a user within the organization.
 * This schema includes personal details, authentication information, role, status, and departmental affiliation.
 */
const userSchema = new mongoose.Schema(
  {
    /**
     * The first name of the user.
     * This field is required and must be between 3 and 50 characters in length.
     */
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: [50, "First name cannot exceed 50 characters."],
    },
    /**
     * The middle name of the user.
     * This field is optional but must not exceed 50 characters in length if provided.
     */
    middleName: {
      type: String,
      maxlength: [50, "Middle name cannot exceed 50 characters."],
    },

    /**
     * The last name of the user.
     * This field is required and must be between 3 and 50 characters in length.
     */
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: [50, "Last name cannot exceed 50 characters."],
    },
    /**
     * The email address of the user.
     * This field must be unique and match a standard email format.
     */
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // Index added
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address.",
      ],
    },

    /**
     * The gender of the user.
     * This field is required.
     */
    gender: {
      type: String,
      required: true,
    },

    /**
     * The hashed password of the user.
     * This field is required and must be between 8 and 50 characters in length.
     */
    password: {
      type: String,
      minlength: 8,
      maxlength: [50, "Password cannot exceed 50 characters."],
    },

    /**
     * The phone number of the user.
     * This field is required and must be at least 7 characters in length.
     */
    phoneNumber: {
      type: String,
      required: true,
      minlength: 7,
    },

    /**
     * The full address of the user.
     * This field is required.
     */
    fullAddress: {
      type: String,
      required: true,
    },

    /**
     * The contract type of the user's employment.
     * This field is required.
     */
    contractType: {
      type: String,
    },

    /**
     * The job title of the user.
     * This field is required.
     */
    jobTitle: {
      type: String,
      // required: true,
    },

    /**
     * The profile image of the user.
     * This field has a default value of 'default.png'.
     */
    profileImage: {
      type: String,
      default: "logo.png",
    },

    /**
     * The unique employment number of the user.
     * This field is unique and is generated automatically.
     */
    employmentNumber: {
      type: String,
      unique: true,
    },

    /**
     * The basic salary of the user.
     * This field is required.
     */
    basicSalary: {
      type: Number,
      // required: true,
      min: 0,
    },
    /**
     * The credit allowance of the user.
     * This field is required.
     */
    creditAllowance: {
      type: Number,
      // required: true,
      min: 0,
    },

    /**
     * The composition allowance of the user.
     * This field is required.
     */
    compositionAllowance: {
      type: Number,
      // required: true,
      min: 0,
    },

    /**
     * The social security contribution percentage of the user.
     * This field is required and has a default value of 3%.
     */
    socialSecurity: {
      type: Number,
      default: 3,
    },

    /**
     * The income tax percentage of the user.
     * This field is required and has a default value of 30%.
     */
    incomeTax: {
      type: Number,
      default: 30,
    },

    /**
     * The role assigned to the user.
     * This field references the 'Role' model.
     */
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },

    /**
     * The department the user belongs to.
     * This field references the 'Department' model.
     */
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      // required: false,
    },

    /**
     * The specific role of the employee within the organization.
     * Defaults to 'General Employee'.
     */
    employeeRole: {
      type: String,
      default: "General Employee",
    },

    dateOfBirth: {
      type: Date,
      // required: false,
    },

    hireDate: {
      type: Date,
      // required: false,
    },
    endDate: {
      type: Date,
    },
    nationality: {
      type: String,
      // required: true,
    },

    emergencyContact: {
      name: { type: String },
      relationship: { type: String },
      phone: { type: String, minlength: 7 },
    },

    previousEmployment: {
      companyName: { type: String },
      jobTitle: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
    },

    /**
     * The status of the user's account.
     * Possible values are: 'Active', 'On Leave', 'Terminated', 'Suspended', 'Disabled'.
     * Defaults to 'Active'.
     */
    provider: {
      type: String,
      enum: ["google", "credentials"],
      default: "credentials",
    },
    isActive: {
      type: String,
      enum: ["Active", "On Leave", "Terminated", "Suspended", "Disabled"],
      default: "Active",
    },
  },

  {
    /**
     * Automatically adds `createdAt` and `updatedAt` timestamps to the schema.
     */
    timestamps: true,
  }
);

const passwordResetTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

export const PasswordResetToken =
  mongoose.models?.PasswordResetToken ||
  mongoose.model("PasswordResetToken", passwordResetTokenSchema);

// Pre-save middleware to generate employment number
userSchema.pre("save", async function (next) {
  if (!this.employmentNumber) {
    try {
      const lastEmployee = await mongoose
        .model("User")
        .findOne({})
        .sort({ employmentNumber: -1 })
        .exec();

      let nextEmploymentNumber = "CUG001"; // Default starting number

      if (lastEmployee && lastEmployee.employmentNumber) {
        const lastNumber = parseInt(
          lastEmployee.employmentNumber.substring(3),
          10
        );
        const nextNumber = lastNumber + 1;
        nextEmploymentNumber = `CUG${nextNumber.toString().padStart(3, "0")}`;
      }

      this.employmentNumber = nextEmploymentNumber;
    } catch (erro) {
      return next(error);
    }
  }
  next();
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

// Create or retrieve the 'User' model based on the schema.
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
