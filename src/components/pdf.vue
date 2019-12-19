<template>
  <object class="pdfs" data="" />
</template>

<script>
export default {
  props: {
    pdfSrc: { type: String, required: true }
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
  min-height: 450px;
  margin-bottom: 1%;
}
</style>
