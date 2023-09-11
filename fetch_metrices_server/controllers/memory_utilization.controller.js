import express from "express";
import Success from "../utils/success.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import {MEMORY} from "../models/index.js";
import XLSX from "xlsx";
import ExcelJS from 'exceljs';

const PROMETHEUS_PORT = "http://localhost:9090/api/v1";
const MEM_USAGE = `sum (rate (container_memory_working_set_bytes{image!=""}[1m])) by (pod)`;
  
  export const saveMemoryMetricData = async (req, res) => {
    axios
    .get(`${PROMETHEUS_PORT}/query?query=${MEM_USAGE}`).then(async (response) => {
        const metricdata = [];
        let temp_timestamp = 0;
        const data = response.data.data.result;

        await data.forEach(async (timeseries) => {
            let temp_data = {
              pod: "",
              timestamp: "",
              value: "",
            };

        temp_data.pod = timeseries.metric.pod;
        temp_timestamp = timeseries.value[0];
        temp_data.timestamp = timeseries.value[0];
        temp_data.value = timeseries.value[1];

        await metricdata.push(temp_data);
      });

            //Create a Object using Model
            const Memory_Usage = new MEMORY({
                metrices: "memory_utilization",
                timestamp: temp_timestamp,
                data: metricdata,
              });
        
              //Save to Database
              await Memory_Usage
                .save()
                .then((memorydata) => {
                    res.json(Success(memorydata, "Successfully memory usage data saved."));
                })
                .catch((err) => {
                    res.status(err.status).json(err.message);
                });

            })
            .catch((err) => {
                res.status(err.status).json(err.message);
            });

  };
  
  export const fetchMemoryUsage = async (req, res) => {
    MEMORY.find({})
    .then((memory) => {
        res.json(Success(memory, "Successfully fetched all  memory usage data."));
    })
    .catch((err) => {
        res.status(err.status).json(err.message);
    });
  };
  
  export const fetchMemoryUsageByPod = async (req, res) => {
    let pod_array = [];
    MEMORY.find({})
      .then(async (memory) => {
        await cpu.forEach((memory_data) => {
          let pod = {
            timestamp: 0,
            value: 0,
          };
  
          pod.timestamp = memory_data.timestamp;
  
          let pod_data = memory.data.filter(function (pod_data) {
            return pod_data.pod == req.params.pod;
          });
  
          pod_data.forEach((pod_value) => {
            pod.value = pod_value.value;
  
            pod_array.push(pod);
          });
        });
        res.json(Success(pod_array, "Successfully fetched all  cpu usage by pod name."));
      })
      .catch((err) => {
        res.status(err.status).json(err.message);
      });
  };

  export const addMemoryDataToExcelByPod = async (req, res) => {
    let dataset = [];
    let file_name = req.params.pod;
    let filePath = path.join(__dirname, '..', '..', 'optimize_server', file_name + '.xlsx');
    MEMORY.find()
      .then(async (memory) => {
        await memory.forEach((pod_data) => {
          let pod = {
            timestamp: 0,
            value: 0,
          };

          pod.timestamp = pod_data.timestamp;

          let pod_single = pod_data.data.filter(function (data) {
            let split_text = data.pod.split("-");
            let PodName = split_text[0] + "-" + split_text[1];
            return req.params.pod.includes(PodName);
          });

          let workbook = new ExcelJS.Workbook();
          let worksheet = workbook.addWorksheet('Sheet 1');
          let headers = Object.keys(pod);
          worksheet.getRow(1).values = headers;
  
          pod_single.forEach((data) => {
            pod.value = data.value;
  
            dataset.push(pod);
            let rowData = Object.values(pod);
            worksheet.addRow(rowData);
          });
          
        });
          
          await workbook.xlsx.writeFile(filePath);
          await console.log("xlsx Generateed");
          res.json(Success(dataset, "Successfully fetched all  memory usage by pod name."));


    })
    .catch((err) => {
        res.status(err.status).json(err.message);
    });
   
  };
  
  export const addMemoryDataToExcelByPod2 = async (req, res) => {
    try {
        const dataset = [];
        const file_name = req.params.pod;
        const filePath = path.join(__dirname, '..', '..', 'optimize_server', `${file_name}.xlsx`);
        const workbook = new ExcelJS.Workbook();
    
        const memoryData = await MEMORY.find();
    
        for (const pod_data of memoryData) {
          const pod = {
            timestamp: 0,
            value: 0,
          };
    
          pod.timestamp = pod_data.timestamp;
    
          const pod_single = pod_data.data.filter((data) => {
            const split_text = data.pod.split("-");
            const PodName = `${split_text[0]}-${split_text[1]}`;
            return req.params.pod.includes(PodName);
          });
    
          const worksheet = workbook.addWorksheet('Sheet 1');
          const headers = Object.keys(pod);
          worksheet.getRow(1).values = headers;
    
          pod_single.forEach((data) => {
            pod.value = data.value;
    
            dataset.push({ ...pod });
            const rowData = Object.values(pod);
            worksheet.addRow(rowData);
          });
        }
    
        await workbook.xlsx.writeFile(filePath);
        console.log("xlsx Generated");
        res.json(Success(dataset, "Successfully fetched all Memory usage by pod name."));
      } catch (err) {
        console.error(err);
        res.status(500).json(Error("Internal server error")); // Proper error handling and response
      }
   
  };
  

  