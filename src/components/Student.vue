<template>
<div id="student">
  <Menu :tabs="tabs" @tab-changed="onTabChanged"/>
  <div class="menu-page" id="submission" v-if="tabSelected===tabs[0]">
    <div id="department">
      <label class="login-label">学院：</label>
      <select class="global-input">
        <option v-for="item in departmentList">{{item}}</option>
      </select>
    </div>
    <div id="location">
      <label class="login-label">所在地：</label>
      <select class="global-input">
        <option v-for="item in locationList">{{item}}</option>
      </select>
    </div>
    <div id="done-test">
      <label class="login-label">是否完成核算检测：</label>
      <input type="checkbox" class="global-input"/>
    </div>
    <button id="submit-button" class="global-input" @click="submit">提交</button>
  </div>
  <div class="menu-page" id="history" v-else-if="tabSelected===tabs[1]">
    <table>
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
import {Authority, authority, locationList, departmentList} from "../scripts/SharedState";

// 权限检测
if (authority.value !== Authority.Student) {
  window.location.hash = "#/login"
}

interface ISubmitRecord {
  recordDatetime: Date
  department: string
  location: string
  doneTest: boolean
}

let tabs = ['健康打卡', '打卡记录']

let tabSelected = ref(tabs[0])

function requestHistory(): Array<ISubmitRecord> {
  // TODO 接入数据库
  let database = [
    {recordDatetime: new Date(), department: "软件学院", location: "创新港", doneTest: true},
    {recordDatetime: new Date(), department: "软件学院", location: "创新港", doneTest: true},
    {recordDatetime: new Date(), department: "软件学院", location: "创新港", doneTest: true},
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
</style>