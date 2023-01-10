import {RowDataPacket} from "mysql2";

// 学生表数据结构
export interface StudentData extends RowDataPacket {
    stu_id: string,
    name: string,
    class: string,
    phone_num: string,
    college: string,
    password: string
}

// 打卡表数据结构
export interface ClockData extends RowDataPacket {
    clock_id: number,
    stu_id: string,
    clock_time: number,
    location: string,
    remarks: string
}

// 核酸表数据结构
export interface DetectData extends RowDataPacket {
    detect_id: number,
    stu_id: string,
    detect_time: number,
    detect_result: string
}