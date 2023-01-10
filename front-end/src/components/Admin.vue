<template>
  <div id="admin">
    <Menu :tabs="tabs" @tab-changed="onTabChanged"></Menu>
    <div class="menu-page" id="not-done-test" v-if="tabSelected === tabs[0]">
      <div class="admin-input-div">
        <label>学院：</label>
        <select v-model="notDoneClockCollege" class="global-input clickable">
          <option>全部</option>
          <option v-for="item in departmentList">{{ item }}</option>
        </select>
        <label>所在地：</label>
        <select v-model="notDoneClockLocation" class="global-input clickable">
          <option>全部</option>
          <option v-for="item in locationList">{{ item }}</option>
        </select>
        <button @click="requestNotDoneClockList" class="clickable">查询</button>
      </div>
      <p>今日未打卡人数：{{ notDoneClockList.length }}</p>
      <div class="table-div">
        <table>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>学院</th>
            <th>班级</th>
            <th>所在地</th>
            <th>联系方式</th>
            <th>操作</th>
          </tr>
          <tr v-for="item in notDoneClockList">
            <td>{{ item.stu_id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.college }}</td>
            <td>{{ item.class }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.phone_num }}</td>
            <td class="operation-td">
              <button class="clickable global-input copy" :data-clipboard-text="item.stu_id">复制学号</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="menu-page" v-else-if="tabSelected === tabs[1]">
      <div class="admin-input-div">
        <label>学院：</label>
        <select v-model="notDoneClockInTwoDaysCollege" class="global-input clickable">
          <option>全部</option>
          <option v-for="item in departmentList">{{ item }}</option>
        </select>
        <label>所在地：</label>
        <select v-model="notDoneClockInTwoDaysLocation" class="global-input clickable">
          <option>全部</option>
          <option v-for="item in locationList">{{ item }}</option>
        </select>
        <button @click="requestNotDoneClockInTwoDaysList" class="clickable">查询</button>
      </div>
      <div class="table-div">
        <table>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>学院</th>
            <th>班级</th>
            <th>所在地</th>
            <th>联系方式</th>
            <th>操作</th>
          </tr>
          <tr v-for="item in notDoneClockInTwoDaysList">
            <td>{{ item.stu_id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.college }}</td>
            <td>{{ item.class }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.phone_num }}</td>
            <td class="operation-td">
              <button class="clickable global-input copy" :data-clipboard-text="item.stu_id">复制学号</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="menu-page" v-else-if="tabSelected === tabs[2]">
      <div class="admin-input-div">
        <label>学院：</label>
        <select v-model="notDoneDetectCollege" class="global-input clickable">
          <option>全部</option>
          <option v-for="item in departmentList">{{ item }}</option>
        </select>
        <label>所在地：</label>
        <select v-model="notDoneDetectLocation" class="global-input clickable">
          <option>全部</option>
          <option v-for="item in locationList">{{ item }}</option>
        </select>
        <button @click="requestNotDoneDetect" class="clickable">查询</button>
      </div>
      <div class="table-div">
        <table>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>学院</th>
            <th>班级</th>
            <th>所在地</th>
            <th>联系方式</th>
            <th>操作</th>
          </tr>
          <tr v-for="item in notDoneDetectList">
            <td>{{ item.stu_id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.college }}</td>
            <td>{{ item.class }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.phone_num }}</td>
            <td class="operation-td">
              <button class="clickable global-input copy" :data-clipboard-text="item.stu_id">复制学号</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="menu-page" v-else-if="tabSelected === tabs[3]">
      <div class="admin-input-div">
        <label>学号：</label>
        <input v-model="targetStudentId"/>
        <button @click="onInputTargetStudentId" class="clickable">查询</button>
        <p class="notification"><span v-html="notificationOfTarget"></span></p>
      </div>
      <div id="history-graph-div" class="table-div"></div>
      <div id="history-table-div" class="table-div">
        <table>
          <tr>
            <th>打卡时间</th>
            <th>学院</th>
            <th>打卡位置</th>
            <th>核酸结果</th>
            <th>备注</th>
          </tr>
          <tr v-for="item in targetStudentHistoryList">
            <td>{{new Date(item.clock_time).toLocaleString()}}</td>
            <td>{{item.college}}</td>
            <td>{{item.location}}</td>
            <td>{{item.detect_result ?? "未检测"}}</td>
            <td>{{item.remarks}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="menu-page" v-else-if="tabSelected === tabs[4]">
      <div class="admin-input-div">
        <label>学号：</label>
        <input v-model="changeLocationStudentId"/>
        <label>所在地：</label>
        <select v-model="changeLocationSelected" class="global-input clickable">
          <option v-for="item in locationList">{{ item }}</option>
        </select>
        <button @click="changeLocation" :class="changeLocationSelected === '' ? '' : 'clickable'" :disabled="changeLocationSelected === ''">修改</button>
        <p class="notification"><span v-html="notificationOfSubmit"></span></p>
      </div>
    </div>
    <div class="menu-page" v-else-if="tabSelected === tabs[5]">
      <div class="admin-input-div">
        <label>学号：</label>
        <input v-model="submitStudentId"/>
        <p class="notification"><span v-html="notificationOfSubmit"></span></p>
      </div>
      <Submit :student-id="submitStudentId" :disabled="submitStudentId === ''"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue";
import {computed, ref} from "vue";
import {
  Authority,
  authority,
  authorizedId,
  authorizedPassword,
  axiosInstance, type ClockData,
  departmentList,
  locationList, ResponseStatus, type StudentData
} from "../scripts/SharedState";
import * as echarts from "echarts"
import type {EChartsType} from "echarts";
import Submit from "../components/Submit.vue";
import ClipboardJS from "clipboard";

// 权限检测
if (authority.value !== Authority.Admin) {
  window.location.hash = "/login"
}

let tabs = ['本日未打卡', "连续两日未打卡", "本日未完成核酸", '查询学生记录', '修改所在地', '代打卡']

let tabSelected = ref(tabs[0])

new ClipboardJS(".copy")

let notificationOfTarget = ref("")
let notificationOfSubmit = ref("")

let notDoneClockLocation = ref("全部")
let notDoneClockCollege = ref("全部")

let notDoneClockInTwoDaysLocation = ref("全部")
let notDoneClockInTwoDaysCollege = ref("全部")

let notDoneDetectLocation = ref("全部")
let notDoneDetectCollege = ref("全部")

let changeLocationStudentId = ref("")
let changeLocationSelected = ref("")

let submitStudentId = ref("")

let targetStudentId = ref("")
let targetStudentHistoryList = ref<Array<ClockData>>([])

let notDoneClockList = ref<Array<StudentData>>([])

let notDoneClockInTwoDaysList = ref<Array<StudentData>>([])

let notDoneDetectList = ref<Array<StudentData>>([])

let targetStudentRecordsChart: null | EChartsType

function requestNotDoneClockList() {
  notDoneClockList.value = []
  axiosInstance.post("/admin/not-done-clock", {
    id: authorizedId.value,
    password: authorizedPassword.value,
    type: authority.value,
    college: notDoneClockCollege.value,
    location: notDoneClockLocation.value
  }).then(
      function (response) {
        if (response.data.status === ResponseStatus.SUCCESS) {
          notDoneClockList.value = response.data.data
        }
      }
  )
}

function requestNotDoneClockInTwoDaysList() {
  notDoneClockInTwoDaysList.value = []
  axiosInstance.post("/admin/not-done-clock-in-two-days", {
    id: authorizedId.value,
    password: authorizedPassword.value,
    type: authority.value,
    college: notDoneClockInTwoDaysCollege.value,
    location: notDoneClockInTwoDaysLocation.value
  }).then(
      function (response) {
        if (response.data.status === ResponseStatus.SUCCESS) {
          notDoneClockInTwoDaysList.value = response.data.data
        }
      }
  )
}

function requestNotDoneDetect() {
  notDoneDetectList.value = []
  axiosInstance.post("/admin/not-done-detect", {
    id: authorizedId.value,
    password: authorizedPassword.value,
    type: authority.value,
    college: notDoneDetectCollege.value,
    location: notDoneDetectLocation.value
  }).then(
      function (response) {
        if (response.data.status === ResponseStatus.SUCCESS) {
          notDoneDetectList.value = response.data.data
        }
      }
  )
}

function onTabChanged(tabName: string) {
  tabSelected.value = tabName

  // v-if条件渲染会导致部分element对象被删除，因此将chart设置为null，之后重新绑定element
  targetStudentRecordsChart = null

  notificationOfTarget.value = ""
  notificationOfSubmit.value = ""

  targetStudentHistoryList.value = []
}

function onInputTargetStudentId() {
  axiosInstance.post("/students/history", {
    id: authorizedId.value,
    password: authorizedPassword.value,
    type: authority.value,
    targetId: targetStudentId.value
  }).then(
      function (response) {
        if (response.data.status === ResponseStatus.SUCCESS) {
          notificationOfTarget.value = ""

          targetStudentHistoryList.value = response.data.data

          if (!targetStudentRecordsChart) {
            targetStudentRecordsChart = echarts.init(document.getElementById('history-graph-div')!);
          }

          let todayBegin = new Date()

          todayBegin.setHours(0)
          todayBegin.setMinutes(0)
          todayBegin.setSeconds(0)
          todayBegin.setMilliseconds(0)

          let dateAxis: Array<string> = []
          let hourData: Array<number> = []
          let currentHistoryIndex = 0
          for (let i = 0; i < 7; i++) {
            const currentDayBegin = new Date(todayBegin.getTime() - i * 24 * 60 * 60 * 1000)

            dateAxis.push(currentDayBegin.toLocaleDateString())

            while (currentHistoryIndex < targetStudentHistoryList.value.length) {
              const currentRecord = targetStudentHistoryList.value[currentHistoryIndex]

              if (currentDayBegin.getTime() < currentRecord.clock_time &&
                  currentRecord.clock_time < currentDayBegin.getTime() + 24 * 60 * 60 * 1000) {
                hourData.push(new Date(currentRecord.clock_time).getHours())
                break
              }

              if (currentRecord.clock_time < currentDayBegin.getTime()) {
                break;
              }
              else {
                currentHistoryIndex++;
              }
            }

            if (dateAxis.length > hourData.length) {
              hourData.push(-1)
            }
          }

          dateAxis = dateAxis.reverse()
          hourData = hourData.reverse()

          let option = {
            tooltip: {
              formatter: function(params: any) {
                return (
                    params.name + " " + params.value + "点"
                );
              }
            },
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
          targetStudentRecordsChart.setOption(option);
        }
        else {
          notificationOfTarget.value = "<span style='color: red'>查询失败，请检查学生信息</span>"
        }
      }
  )
}

function changeLocation() {
  axiosInstance.post("/admin/change-location", {
    id: authorizedId.value,
    password: authorizedPassword.value,
    type: authority.value,
    targetId: changeLocationStudentId.value,
    targetLocation: changeLocationSelected.value
  }).then(
      function (response) {
        if (response.data.status === ResponseStatus.SUCCESS) {
          notificationOfSubmit.value = "<span style='color: green'>修改成功</span>"
        }
        else {
          notificationOfSubmit.value = "<span style='color: red'>修改失败，请检查学生ID</span>"
        }
      }
  )
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

#history-graph-div {
  flex: 1 1 50%;
}

#history-table-div {
  flex: 1 1 50%;
}

.notification {
  height: 10%;
}
</style>