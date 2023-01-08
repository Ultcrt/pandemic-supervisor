import {RowDataPacket} from "mysql2";

export interface StudentData extends RowDataPacket {
    stu_id: string,
    name: string,
    class: string,
    phone_num: string,
    college: string,
    password: string
}

export interface ClockData extends RowDataPacket {
    clock_id: number,
    stu_id: string,
    clock_time: number,
    location: string,
    remarks: string
}

export interface DetectData extends RowDataPacket {
    detect_id: number,
    stu_id: string,
    detect_time: number,
    detect_result: string
}