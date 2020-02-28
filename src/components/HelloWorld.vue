<template>
  <div class="hello">{{Weather}}</div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      Weather: []
    };
  },
  created() {
    this.getWeather();
  },
  methods: {
    JSON() {
      axios
        .get("https://www.tianqiapi.com/api/", {
          version: "v1",
          city: "济南"
        })
        .then(({ data }) => {
          console.log(data);
          this.Weather = data;
        });
    },
    getWeather() {
      axios.get("/api/weather/city/101030100").then(({ data }) => {
        console.log(data);
        this.Weather = data;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
