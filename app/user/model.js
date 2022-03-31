import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "nama tidak benar"],
    },
    noHp: {
      type: String,
      required: [true, "no HP tidak benar"],
    },
    password: {
      type: String,
      // required: [true, "password"],
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Bidan", "Kader"],
      default: "Kader",
      required: [true, "role dibutuhkan"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
