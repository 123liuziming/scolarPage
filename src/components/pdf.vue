<template>
  <div>
    <object class="pdfs" data="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pdfSrc: "//static.aminer.org/pdf/PDF/000/000/097/database_security.pdf" // pdf文件地址
    };
  },
  mounted() {
    var _this = this;
    let pdfs = document.getElementsByClassName("pdfs");
    pdfs[0].setAttribute("data", _this.pdfSrc);
  }
};
</script>

<style scoped>
.pdfs {
  text-align: center;
  width: 100%;
  min-height: 55vw;
  margin-bottom: 2%;
}
</style>
