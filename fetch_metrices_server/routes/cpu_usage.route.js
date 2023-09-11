import express from "express";
import {
  saveMetricData,
  fetchCpuUsage,
  fetchCpuUsageByPod,
  addDataToExcelByPod,
  addDataToExcelByPod2
} from "../controllers/index.js";

const cpuRouter = express.Router();

cpuRouter.get("/", fetchCpuUsage);
cpuRouter.get("/saveCpuMetrices", saveMetricData);
cpuRouter.get("fetchByPod/:pod", fetchCpuUsageByPod);
cpuRouter.get("export/exportCpuDataToExcel/:pod", addDataToExcelByPod2);

export default cpuRouter;
