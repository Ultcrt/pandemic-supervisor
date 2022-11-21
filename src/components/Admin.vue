<template>
<div id="admin">
  <Menu :tabs="tabs" @tab-changed="onTabChanged"></Menu>
  <div class="menu-page" id="not-done-test" v-if="tabSelected === tabs[0]">
    <div>
      <label>学院：</label>
      <select class="global-input">
        <option v-for="item in departmentList">{{item}}</option>
      </select>
    </div>
    <p>今日未打卡人数：{{ notDoneTestList.length }}</p>
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
        <td class="operation-td"><button class="clickable global-input">代打卡</button></td>
      </tr>
    </table>
  </div>
  <div class="menu-page" v-else-if="tabSelected === tabs[1]">
    <table>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>联系方式</th>
      </tr>
      <tr v-for="item in requestNotDoneTestInTwoDays()">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.phoneNumber}}</td>
      </tr>
    </table>
  </div>
  <div class="menu-page" v-else-if="tabSelected === tabs[2]">
    <table>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>联系方式</th>
      </tr>
      <tr v-for="item in requestNotDoneTestInTwoDays()">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.phoneNumber}}</td>
      </tr>
    </table>
  </div>
  <div class="menu-page" v-else-if="tabSelected === tabs[3]">
    <table>
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>联系方式</th>
      </tr>
      <tr v-for="item in requestNotDoneTestInTwoDays()">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.phoneNumber}}</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue";
import {ref} from "vue";
import {Authority, authority, departmentList} from "../scripts/SharedState";

// 权限检测
if (authority.value !== Authority.Admin) {
  window.location.hash = "#/login"
}

interface IStudentInfo {
  id: string,
  name: string,
  phoneNumber: string,
  department: string,
}

let tabs = ['本日未打卡', "连续两日未打卡", '查询学生记录', '修改记录']

let tabSelected = ref(tabs[0])

let notDoneTestList = requestNotDoneTestList()

function requestNotDoneTestList(): Array<IStudentInfo> {
  // TODO 接入数据库
  return [
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
  ]
}

function requestNotDoneTestInTwoDays(): Array<IStudentInfo> {
  // TODO 接入数据库
  return [
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
    {id: "12345678", name: "李伟", phoneNumber: "1008611", department: "软件学院"},
  ]
}

function onTabChanged(tabName: string) {
  tabSelected.value = tabName
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
</style>