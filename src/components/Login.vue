<template>
  <div id="login">
    <div id="login-sub-window" class="sub-window">
      <div id="login-title-div">
        <label id="login-title-label">登录</label>
      </div>
      <div id="login-type-div" class="login-input-div">
        <label class="login-label">类型：</label>
        <select id="login-type-select" class="global-input login-input">
          <option>学生</option>
          <option>管理员</option>
        </select>
      </div>
      <div id="login-account-div" class="login-input-div">
        <label class="login-label">账号：</label>
        <input class="global-input login-input"/>
      </div>
      <div id="login-password-div" class="login-input-div">
        <label class="login-label">密码：</label>
        <input class="global-input login-input" type="password"/>
      </div>
      <button id="login-button" class="global-input login-input">登录</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: aqua;
}

.sub-window {
  background-color: darkred;
}

#login-sub-window {
  width: 40vh;
  height: 40vh;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

#login-title-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#login-title-label {
  font-size: 40px;
  color: white;
}

.login-label {
  color: white;
  font-size: 28px;
}

.login-input-div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  width: 90%;
}

.login-input {
  width: 75%;
}
</style>