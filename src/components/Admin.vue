<template>
<div id="admin">
  <Menu :tabs="tabs" @tab-changed="onTabChanged"></Menu>
</div>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue";
import {ref} from "vue";
import {Authority, authority} from "../scripts/SharedState";

// 权限检测
if (authority.value !== Authority.Admin) {
  window.location.hash = "#/login"
}

let tabs = ['统计数据', '记录修改', '代打卡']

let tabSelected = ref(tabs[0])

function onTabChanged(tabName: string) {
  tabSelected.value = tabName
}
</script>

<style scoped>

</style>