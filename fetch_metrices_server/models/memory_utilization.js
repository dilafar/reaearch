import mongoose from "mongoose";

const { Schema } = mongoose;

const MemoryUtilizationSchama = new Schema(
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

export const MEMORY = mongoose.model("memoryutilization", MemoryUtilizationSchama);
