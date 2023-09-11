import mongoose from "mongoose";

const { Schema } = mongoose;

const PlantSchama = new Schema(
  {
    plantName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Plant = mongoose.model("Plant", PlantSchama);
