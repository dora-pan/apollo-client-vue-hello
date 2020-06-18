<template>
  <div>
    <div style="padding:20px 0;">
      <p class="tips">
        Click <span class="imp">'Subscribe'</span> button to subscribe notice
        from create option.
      </p>
      <button @click="subscribeAdd">Subscribe</button>
    </div>

    <input v-model="name" />
    <button @click="createUser">Add</button>
    <p>operation result：{{ user }}</p>
    <p>notices: {{ noticesList }}</p>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return { id: 456, name: "孙倩", user: {}, noticesList: [] };
  },
  methods: {
    async createUser() {
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($id: Int!, $name: String!) {
            addUser(id: $id, name: $name, mobile: "18657138900") {
              id
              name
            }
          }
        `,
        variables: {
          id: 400,
          name: this.name,
        },
      });
      this.user = result.data.addUser;
    },
    subscribeAdd() {
      this.$apollo.addSmartSubscription("addUser", {
        query: gql`
          subscription postCreated {
            postAdded {
              id
              name
              mobile
            }
          }
        `,
        result({ data }) {
          this.noticesList.unshift(data.postAdded);
        },
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.tips {
  color: blue;
}
.imp {
    font-weight:bold;
}
</style>
