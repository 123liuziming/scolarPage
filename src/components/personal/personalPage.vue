<template>
  <div class="scholarPg">
    <PersonHead />
    <PersonBody />
  </div>
</template>

<script>
  import PersonBody from "./PersonBody";
  import PersonHead from "./PersonHead";
  export default {
    name: "personalPage",
    components:{
      PersonBody,
      PersonHead
    },
    data() {
      return {

      }
    },
    methods: {
     
    },
  }
</script>

<style>


</style>
