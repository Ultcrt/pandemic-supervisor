<template>
<div id="student">
  <Menu :tabs="tabs" @tab-changed="onTabChanged"/>
  <div class="menu-page" v-if="tabSelected===tabs[0]">
    <Submit :student-id="authorizedId"/>
  </div>
  <div class="menu-page" id="history" v-else-if="tabSelected===tabs[1]">
    <div class="table-div">
      <table>
        <tr>
          <th>打卡时间</th>
          <th>学院</th>
          <th>打卡位置</th>
          <th>核酸结果</th>
          <th>备注</th>
        </tr>
        <tr v-for="item in historyList">
          <td>{{new Date(item.clock_time).toLocaleString()}}</td>
          <td>{{item.college}}</td>
          <td>{{item.location}}</td>
          <td>{{item.detect_result ?? "未检测"}}</td>
          <td>{{item.remarks}}</td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Menu from "./Menu.vue"
import {
  Authority,
  authority,
  locationList,
  departmentList,
  authorizedId,
  axiosInstance,
  authorizedPassword, ResponseStatus, type ClockData
} from "../scripts/SharedState";
import Submit from "../components/Submit.vue";

// 权限检测
if (authority.value !== Authority.Student) {
  window.location.hash = "#/login"
}

let tabs = ['健康打卡', '打卡记录']

let tabSelected = ref(tabs[0])

const historyList = ref<Array<ClockData>>([])

function requestHistory() {
  historyList.value = []
  axiosInstance.post("/students/history", {
    id: authorizedId.value,
    password: authorizedPassword.value,
    type: authority.value
  }).then(
      function (response) {
        if (response.data.status === ResponseStatus.SUCCESS) {
          historyList.value = response.data.data
        }
      }
  )
}

function onTabChanged(tabName: string) {
  tabSelected.value = tabName

  if (tabName == "打卡记录") {
    requestHistory()
  }
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