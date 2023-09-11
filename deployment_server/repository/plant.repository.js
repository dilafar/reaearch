import { Plant } from "../models/index.js";
import AppError from "../utils/appError.js";

export const savePlant = (data) =>
  Plant.create(data)
    .then((plant) => {
      return Promise.resolve(plant);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, err.code);
    });

export const updatePlant = (id, data) =>
  Plant.findByIdAndUpdate(id, data, { new: true })
    .then((plant) => {
      if (!plant) {
        throw new AppError("Plant Details not Found", 404);
      }
      return Promise.resolve(plant);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, err.code);
    });

export const deletePlant = (id) =>
  Plant.findByIdAndDelete(id)
    .then((plant) => {
      if (!plant) {
        throw new AppError("Plant Details not Found", 404);
      }
      return Promise.resolve(plant);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, err.code);
    });

export const getPlantById = (id) =>
  Plant.findById(id)
    .then((plant) => {
      if (!plant) {
        throw new AppError("Plant Details not Found", 404);
      }
      return Promise.resolve(plant);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, err.code);
    });

export const getPlants = () =>
  Plant.find({})
    .then((plants) => {
      return Promise.resolve(plants);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, 500);
    });
