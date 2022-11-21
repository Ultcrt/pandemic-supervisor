<template>
<div id="student">
  <Menu :tabs="tabs" @tab-changed="onTabChanged"/>
  <div id="submission" v-if="tabSelected===tabs[0]">
    <div id="department">
      <label class="login-label">学院：</label>
      <select class="global-input">
        <option v-for="item in requestDepartmentList()">{{item}}</option>
      </select>
    </div>
    <div id="location">
      <label class="login-label">所在地：</label>
      <select class="global-input">
        <option v-for="item in requestLocationList()">{{item}}</option>
      </select>
    </div>
    <div id="done-test">
      <label class="login-label">是否完成核算检测：</label>
      <input type="checkbox" class="global-input"/>
    </div>
    <button id="submit-button" class="global-input" @click="submit">提交</button>
  </div>
  <div id="history" v-else-if="tabSelected===tabs[1]">
    <table id="history-table">
      <tr>
        <th>打卡时间</th>
        <th>学院</th>
        <th>所在地</th>
        <th>是否完成核酸检测</th>
      </tr>
      <tr v-for="item in requestHistory()">
        <td>{{item.recordDatetime.toLocaleString()}}</td>
        <td>{{item.department}}</td>
        <td>{{item.location}}</td>
        <td>{{item.doneTest ? "是" : "否"}}</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Menu from "./Menu.vue"
import {Authority, authority} from "../scripts/SharedState";

// 权限检测
if (authority.value !== Authority.Student) {
  window.location.hash = "#/login"
}

class SubmitRecord {
  public recordDatetime: Date
  public department: string
  public location: string
  public doneTest: boolean

  public constructor(recordDatetime: Date, department: string, location: string, doneTest: boolean) {
    this.recordDatetime = recordDatetime
    this.department = department
    this.location = location
    this.doneTest = doneTest
  }
}

let tabs = ['健康打卡', '打卡记录']

let tabSelected = ref(tabs[0])

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

function requestHistory(): Array<SubmitRecord> {
  // TODO 接入数据库
  let database = [
      new SubmitRecord(new Date(), "软件学院", "创新港", true),
      new SubmitRecord(new Date(), "计算机学院", "曲江", true),
      new SubmitRecord(new Date(), "医学院", "兴庆", false),
  ]
  return database
}

function submit() {
  // TODO 接入数据库
}

function onTabChanged(tabName: string) {
  tabSelected.value = tabName
}
</script>

<style scoped>
#student {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

#submission {
  height: 100%;
  width: 80%;
}

#history {
  height: 100%;
  width: 80%;
  overflow: auto;
}

#history-table {
  width: 100%;
}
</style>