import express from "express";
import {
 saveMemoryMetricData,
 fetchMemoryUsage,
 fetchMemoryUsageByPod,
 addMemoryDataToExcelByPod,
 addMemoryDataToExcelByPod2
} from "../controllers/index.js";

const memoryRouter = express.Router();

memoryRouter.get("/", fetchMemoryUsage);
memoryRouter.get("/saveMemoryMetrices", saveMemoryMetricData);
memoryRouter.get("fetchMemoryByPod/:pod", fetchMemoryUsageByPod);
memoryRouter.get("export/exportMemoryDataToExcel/:pod", addMemoryDataToExcelByPod2);

export default memoryRouter;
