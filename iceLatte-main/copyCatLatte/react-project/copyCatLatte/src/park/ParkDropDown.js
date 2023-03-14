/* eslint-disable */
import { Select } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function ParkDropDown ({setArea}) {
    const loadData = async () => {
    const url = 'http://openAPI.seoul.go.kr:8088/4d514f786b79757337386270766a6d/json/TnFcltySttusInfo10075/1/999/';
    const url2 = 'http://openAPI.seoul.go.kr:8088/4d514f786b79757337386270766a6d/json/TnFcltySttusInfo10075/1000/1600/';
    const response = await axios.get(url);
    const response2 = await axios.get(url2);
    const dataCluster = JSON.stringify(response.data.TnFcltySttusInfo10075.row);
    const dataCluster2 = JSON.stringify(response2.data.TnFcltySttusInfo10075.row);
    const dataList = JSON.parse(dataCluster);
    const dataList2 = JSON.parse(dataCluster2);

    const areaList = [...(dataList),...(dataList2)]

    const areas = areaList.reduce(function(acc, current) {
        if (acc.findIndex(({ ATDRC_NM }) => ATDRC_NM === current.ATDRC_NM) === -1) {
          acc.push(current);
        }
        return acc;
      }, []);
      setArea(areas)
    }
    loadData();

}