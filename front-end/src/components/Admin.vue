<template>
<div id="admin">
  <Menu :tabs="tabs" @tab-changed="onTabChanged"></Menu>
  <div class="menu-page" id="not-done-test" v-if="tabSelected === tabs[0]">
    <div class="admin-input-div">
      <label>学院：</label>
      <select class="global-input clickable">
        <option>全部</option>
        <option v-for="item in departmentList">{{item}}</option>
      </select>
      <label>所在地：</label>
      <select class="global-input clickable">
        <option>全部</option>
        <option v-for="item in locationList">{{item}}</option>
      </select>
      <button @click="requestNotDoneTestList" class="clickable">查询</button>
    </div>
    <p>今日未打卡人数：{{ notDoneTestList.length }}</p>
    <div class="table-div">
      <table>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>联系方式</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in notDoneTestList">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.phoneNumber}}</td>
          <td class="operation-td"><button class="clickable global-input clickable">代打卡</button></td>
        </tr>
      </table>
    </div>
  </div>
  <div class="menu-page" v-else-if="tabSelected === tabs[1]">
    <div class="admin-input-div">
      <label>学院：</label>
      <select class="global-input clickable">
        <option v-for="item in departmentList">{{item}}</option>
      </select>
      <button @click="requestNotDoneTestInTwoDaysList" class="clickable">查询</button>
    </div>
    <div class="table-div">
      <table>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>联系方式</th>
        </tr>
        <tr v-for="item in notDoneTestInTwoDaysList">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.phoneNumber}}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="menu-page" v-else-if="tabSelected === tabs[2]">
    <div class="admin-input-div">
      <label>学号：</label>
      <input/>
      <button @click="onInputStudentId" class="clickable">查询</button>
    </div>
    <div id="student-records-div" class="table-div">
    </div>
  </div>
  <div class="menu-page" v-else-if="tabSelected === tabs[3]">
    <div class="admin-input-div">
      <label>学号：</label>
      <input/>
      <label>日期：</label>
      <input type="date" v-model="dateInput" class="clickable"/>
      <button @click="test" class="clickable">查询</button>
    </div>
    <p>{{}}</p>
    <Submit :student-id="studentIdInput" :disabled="true"/>
  </div>
</div>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue";
import {reactive, ref} from "vue";
import {
  Authority,
  authority,
  authorizedId,
  authorizedPassword,
  axiosInstance,
  departmentList,
  locationList
} from "../scripts/SharedState";
import * as echarts from "echarts"
import type {EChartsType} from "echarts";
import Submit from "../components/Submit.vue";

function test() {
  console.log(dateInput)
}

// 权限检测
if (authority.value !== Authority.Admin) {
  window.location.hash = "#/login"
}

interface StudentData {
  stu_id: string,
  name: string,
  class: string,
  phone_num: string,
  college: string,
  password: string
}

let studentIdInput = ref("")
let dateInput = ref(new Date().toISOString().split("T")[0])

let tabs = ['本日未打卡', "连续两日未打卡", '查询学生记录', '修改记录']

let tabSelected = ref(tabs[0])

let notDoneTestList = ref<Array<StudentData>>([])

let notDoneTestInTwoDaysList = ref<Array<StudentData>>([])

let targetStudentInfo = ref<StudentData>({
  stu_id: "",
  name: "",
  class: "",
  phone_num: "",
  college: "",
  password: ""
})

let studentRecordsChart: null | EChartsType

function requestNotDoneTestList() {
  notDoneTestList.value = []
  axiosInstance.post("/admin/not-done-test", {
    id: authorizedId.value,
    password: authorizedPassword.value,
    type: authority.value
  }).then(
      function () {

      }
  )
  for (let record of database) {
    notDoneTestList.value.push(record)
  }
}

function requestNotDoneTestInTwoDaysList() {
  // TODO 接入数据库
  let database = [
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
    {id: "12345679", name: "张强", phoneNumber: "1008611", department: "软件学院"},
  ]

  notDoneTestInTwoDaysList.value.length = 0
  for (let record of database) {
    notDoneTestInTwoDaysList.value.push(record)
  }
}

function requestTargetStudentInfo() {
  // TODO 接入数据库
  let database = {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"}
}

function onTabChanged(tabName: string) {
  tabSelected.value = tabName

  // v-if条件渲染会导致部分element对象被删除，因此将chart设置为null，之后重新绑定element
  studentRecordsChart = null
}

function onInputStudentId() {
  // TODO 接入数据库
  if (!studentRecordsChart) {
    studentRecordsChart = echarts.init(document.getElementById('student-records-div')!);
  }

  let currentTimestamp = new Date().getTime()

  let dateAxis: Array<string> = []
  for (let i=6; i>=0; i--) {
    dateAxis.push(new Date(currentTimestamp - i * 24 * 60 * 60 * 1000).toLocaleDateString())
  }

  let hourData: Array<number> = []
  for (let i=0; i<7; i++) {
    let startHour = Math.floor(Math.random()*24 - 1)
    hourData.push(startHour)
  }
  console.log(hourData)

  let option = {
    title: {
      text: '该生7日内打卡情况'
    },
    xAxis: {
      data: dateAxis,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 20
      },
      splitLine: {
        show: true,
      }
    },
    yAxis: {
      interval: 1,
      axisLabel: {
        formatter: '{value} 点'
      },
      min: 0,
      max: 23
    },
    series: [
      {
        name: '打卡时间',
        type: 'scatter',
        data: hourData,
        symbolSize: 20,
        color: "darkred"
      },
    ]
  };
  studentRecordsChart.setOption(option);
}
</script>

<style scoped>
#admin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.operation-td {
  text-align: center;
}

.admin-input-div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-bottom: 20px;
}

#student-records-div {
  flex-grow: 1;
}
</style>