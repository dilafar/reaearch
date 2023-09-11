import mongoose from "mongoose";

const { Schema } = mongoose;

const CpuUsageSchama = new Schema(
  {
    metrices: {
        type: String,
      },
    timestamp: {
        type: String,
      },
    data: [
        {
          pod: {
            type: String,
          },
          value: {
            type: String,
          },
        },
      ],
  },
  { timestamps: true, versionKey: false },
);

export const CPU = mongoose.model("cpuusage", CpuUsageSchama);
