import Vue from "vue";
import router from "./router";
import App from "./App";
import "babel-polyfill";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import "assets/css/app.styl";

//http 连接
const httpLink = new HttpLink({
  uri: "http://localhost:4000/ghl",
});
//websocket 连接
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/wsghl",
  options: {
    reconnect: true,
  },
});
// 使用分割连接的功能，你可以根据发送的操作类型将数据发送到不同的连接
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
// Create the apollo client
const apolloClientA = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Create the apollo client
const apolloClientB = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Create the apollo provider
const apolloProvider = new VueApollo({
  // 支持多客户端
  clients: {
    a: apolloClientA,
    b: apolloClientB,
  },
  defaultClient: apolloClient,
  // 'apollo' 对象的默认定义
  defaultOptions: {
    // 默认查询选项
    $query: {
      loadingKey: "loading",
      fetchPolicy: "cache-and-network",
    },
  },
  // 所有智能查询和订阅的全局错误处理函数
  errorHandler(error) {
    console.log("Global error handler.");
    console.error(error);
  },
});

// Install the vue plugin
Vue.use(VueApollo);

new Vue({
  router,
  apolloProvider, // provide: apolloProvider.provide()
  render: (h) => h(App),
}).$mount("#app");
