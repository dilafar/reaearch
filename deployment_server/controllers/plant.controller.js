import {
  savePlantService,
  updatePlantService,
  deletePlantService,
  getPlantsService,
  getPlantByIdService,
} from "../services/index.js";
import Success from "../utils/success.js";

export const savePlantController = async (req, res) => {
  try {
    const plant = await savePlantService(req.body);
    res.json(Success(plant, " Successfully Plant Added."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

export const updatePlantsController = async (req, res) => {
  try {
    const plant = await updatePlantService(req.params.id, req.body);
    res.json(Success(plant, "Successfully Plant Updated."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

export const deletePlantController = async (req, res) => {
  try {
    const plant = await deletePlantService(req.params.id);
    res.json(Success(plant, "Successfully Plant Deleted."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

export const getPlantByIdController = async (req, res) => {
  try {
    const plant = await getPlantByIdService(req.params.id);
    res.json(Success(plant, "Successfully Plant Fetched."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

export const getPlantsController = async (req, res) => {
  try {
    const plants = await getPlantsService();
    res.json(Success(plants, "Successfully Plants Fetched."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
