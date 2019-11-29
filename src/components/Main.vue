<template>
  <div>
      <!-- 第一页 -->
      <Header></Header>
      <Body></Body>
  </div>
</template>

<script>
    import Header from "./Header";
    import Body from "./Body";

    export default {
        name: "Main",
        components: {
            Header,
            Body,
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
