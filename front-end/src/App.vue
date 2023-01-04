<script setup lang="ts">
import Login from "./components/Login.vue"
import Admin from "./components/Admin.vue"
import Student from "./components/Student.vue"
import {computed, ref} from "vue";
import type {Component} from "vue";

// 路由跳转相关代码
const routes: { [key: string]: Component } = {
  "/login": Login,
  "/admin": Admin,
  "/student": Student,
}

window.location.hash = "/login"
let currentLocation = ref(window.location.hash)
window.addEventListener("hashchange", (event) => {
  currentLocation.value = window.location.hash
})

let currentPage = computed(() => {
  return routes[currentLocation.value.slice(1)]
})
</script>

<template>
  <component :is="currentPage"/>
</template>
