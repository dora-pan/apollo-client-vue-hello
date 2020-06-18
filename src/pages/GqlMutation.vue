<template>
  <div>
    <input v-model="name" />
    <button @click="createUser">Add</button>
    <p>operation result：{{ user }}</p>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return { id: 456, name: "孙倩", user: {} };
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
  },
};
</script>
