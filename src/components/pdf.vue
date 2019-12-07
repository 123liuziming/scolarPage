<template>
  <div>
    <object class="pdfs"
      data="">
    </object>  
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  components: { pdf },
  data() {
    return {
      pdfSrc: "//static.aminer.org/pdf/PDF/000/000/097/database_security.pdf" // pdf文件地址
    };
  },
  mounted(){
    var _this = this;
    let pdfs = document.getElementsByClassName("pdfs")
    pdfs[0].setAttribute("data",_this.pdfSrc)
  },
  methods: {
    download() {
      alert("确定要下载吗？");
    }
  }
};
</script>
<style scoped>
.pdfs{
  text-align: center;
  width: 100%;
  height: 45vw;
}
</style>