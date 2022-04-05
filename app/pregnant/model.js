import mongoose from "mongoose";

const pregnantSchema = new mongoose.Schema(
  {
    kader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "kader tidak benar"],
    },
    name: {
      type: String,
      required: [true, "Nama tidak benar"],
    },
    husband: {
      type: String,
      required: [true, "husband tidak benar"],
    },
    bpjs: {
      type: String,
      required: [true, "bpjs tidak benar"],
    },
    nik: {
      type: String,
      required: [true, "nik tidak benar"],
    },
    hpht: {
      type: String,
      required: [true, "hpht tidak benar"],
    },
    htp: {
      type: String,
      required: [true, "htp tidak benar"],
    },
    golDarah: {
      type: String,
      required: [true, "golDarah tidak benar"],
    },
    noHp: {
      type: String,
      required: [true, "noHp tidak benar"],
    },
    allRisk: {
      type: Array,
    },
    cekup: [{ type: Object }],
    born: {
      type: String,
    },
    penolong: {
      type: String,
    },
    pendamping: {
      type: String,
    },
    tempat: {
      type: String,
    },
    transport: {
      type: String,
    },
    calonPendonor: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    tm1: {
      type: Boolean,
      default: false,
    },
    tm2: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pregnant", pregnantSchema);
