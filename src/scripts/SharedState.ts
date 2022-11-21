import {ref} from "vue";

export class Authority {
    public static readonly Visitor = 0
    public static readonly Student = 1
    public static readonly Admin = 2
}

export let authority = ref(Authority.Visitor)

export let departmentList = requestDepartmentList()

export let locationList = requestLocationList()

function requestDepartmentList(): Array<string> {
    // TODO 接入数据库
    let database = ["软件学院", "计算机学院", "医学院"]

    return database
}

function requestLocationList(): Array<string> {
    // TODO 接入数据库
    let database = ["创新港", "兴庆", "曲江", "校外（省内）", "校外（省外）"]

    return database
}