<template>
  <div id="submit">
    <div id="department" class="submit-row">
      <label class="login-label">学院：</label>
      <select class="global-input" :class="props.disabled ? '' : 'clickable'" :disabled="props.disabled">
        <option v-for="item in departmentList">{{item}}</option>
      </select>
    </div>
    <div id="location" class="submit-row">
      <label class="login-label">所在地：</label>
      <select class="global-input" :class="props.disabled ? '' : 'clickable'" :disabled="props.disabled">
        <option v-for="item in locationList">{{item}}</option>
      </select>
    </div>
    <div id="done-test" class="submit-row">
      <label class="login-label">是否完成核算检测：</label>
      <input type="checkbox" class="global-input" :class="props.disabled ? '' : 'clickable'" :disabled="props.disabled"/>
    </div>
    <button id="submit-button" class="global-input" :class="props.disabled ? '' : 'clickable'" @click="submit" :disabled="props.disabled">提交</button>
  </div>
</template>

<script setup lang="ts">
import {Authority, authority, locationList, departmentList} from "../scripts/SharedState";

let props = defineProps(["studentId", "disabled"])

console.log(props)

function submit() {
  // TODO 接入数据库
}
</script>

<style scoped>
#submit {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.submit-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>