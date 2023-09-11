import {
  savePlant,
  updatePlant,
  deletePlant,
  getPlantById,
  getPlants,
} from "../repository/index.js";
import AppError from "../utils/appError.js";

export const savePlantService = async (data) => {
  const { plantName, description, price, category, imageUrl } = data;
  try {
    const plant = await savePlant({
      plantName,
      description,
      price,
      category,
      imageUrl,
    });
    return Promise.resolve(plant);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const updatePlantService = async (id, data) => {
  try {
    const plant = await updatePlant(id, data);
    return Promise.resolve(plant);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const deletePlantService = async (id) => {
  try {
    const plant = await deletePlant(id);
    return Promise.resolve(plant);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getPlantByIdService = async (id) => {
  try {
    const plant = await getPlantById(id);
    return Promise.resolve(plant);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getPlantsService = async () => {
  try {
    const plants = await getPlants();
    return Promise.resolve(plants);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};
