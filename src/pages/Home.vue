<template>
  <div class="home-container">
    <!-- <img src="static/img/logo.png" />-->
    <!-- <WelcomeMessage name="World" />-->
    <router-link to="/query" class="router-a">Query</router-link>
    <router-link to="/mutation" class="router-a">Mutation</router-link>
    <router-link to="/subscription" class="router-a">Subscription</router-link>
    <div style="margin-top:50px;">
      <router-view />
    </div>
  </div>
</template>

<script>
import WelcomeMessage from "components/Home/WelcomeMessage";

export default {
  components: {
    WelcomeMessage,
  },
};
</script>

<style lang="stylus" scoped>
.home-container {
  padding: 20px 40px;
}

.router-a {
  padding: 0 20px;
  font-size: 24px;
}
</style>
