const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      set: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"], // Example: "user" or "admin"
    },
    notification: {
      type: Array,
      default: [],
    },
    seennotification: {
      type: Array,
      default: [],
    },
    isdoctor: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
