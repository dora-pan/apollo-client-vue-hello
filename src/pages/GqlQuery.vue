<template>
  <div>
    <div v-if="$apollo.loading" class="loading">Loading...</div>
    <div v-if="$apollo.queries.userData.loading" class="loading">
      Loading...
    </div>
    <p>user: {{ userData }}</p>
    <input v-model="name" />
    <button @click="queryList">Query</button>
    <p>users: {{ usersList }}</p>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return { userData: {}, usersList: [], id: 300, name: "高山" };
  },
  apollo: {
    userData: {
      query() {
        return gql`
          query getUser($id: Int!) {
            user(id: $id) {
              id
              name
              branch {
                name
              }
            }
          }
        `;
      },
      update: (data) => data.user,
      variables: {
        id: 123,
      },
    },
  },
  methods: {
    async queryList() {
      const result = await this.$apollo.query({
        query: gql`
          query getUsers($name: String) {
            users(name: $name) {
              id
              name
              branch {
                name
              }
            }
          }
        `,
        variables: {
          name: this.name,
        },
        fetchPolicy: "network-only",
      });
      this.usersList = result.data.users;
    },
  },
};
</script>

<style lang="stylus" scoped>
.loading {
  background: blue;
}
</style>
