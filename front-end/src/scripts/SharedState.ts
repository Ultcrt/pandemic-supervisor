import {ref} from "vue";
import type {AxiosInstance, AxiosRequestConfig} from "axios";
import axios from "axios";

// 权限枚举类
export enum Authority {
    Visitor = -1,
    Student = 0,
    Admin = 1
}

// 响应式数据定义
export const authority = ref(Authority.Visitor)

export const authorizedId = ref("")

export const authorizedPassword = ref("")

export const departmentList = ["软件学院", "计算机学院", "医学院"]

export const locationList = ["创新港", "兴庆", "曲江", "校外（省内）", "校外（省外）"]

// axios示例
export const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000/api/",
    timeout: 1000
})

// 响应状态
export enum ResponseStatus {
    SUCCESS,
    FAIL
}

// 检测结果类型
export const detectResultTypes = ["未检测", "结果未知", "阴性", "阳性"]

// 响应的学生数据结构
export interface StudentData {
    stu_id: string,
    name: string,
    class: string,
    phone_num: string,
    college: string,
    location: string
}

// 响应的打卡数据结构
export interface ClockData {
    clock_time: number,
    college: string,
    location: string,
    detect_result: string,
    remarks: string,
}