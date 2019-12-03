<template>
<div class="pdf" v-show="fileType === 'pdf'">
    <!-- // 自己引入就可以使用,这里我的需求是做了分页功能,如果不需要分页功能,只要src就可以了 -->
    <pdf
      :src="pdfSrc"
      :page="currentPage"
      @num-pages="pageCount=$event"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler"
      style="margin-top:2%;width:100%;height:auto" >
    </pdf>
    <p class="arrow" style="margin-top:1%">
    <!-- // 上一页 -->
    <el-button @click="changePdfPage(0)"  :class="{grey: currentPage==1}">上一页</el-button>
    <span><strong style="color:grey;font-size:20px" >{{currentPage}} / {{pageCount}}</strong></span>
    <!-- // 下一页 -->
    <el-button @click="changePdfPage(1)"  :class="{grey: currentPage==pageCount}">下一页</el-button>
    <el-button @click="download()" style="margin-left:55%" :class="{grey: currentPage==pageCount}">下载PDF</el-button>
    </p>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
  export default {
    components: {pdf},
    data () {
      return {
        currentPage: 0, // pdf文件页码
        pageCount: 0, // pdf文件总页数
        fileType: 'pdf', // 文件类型
　　　　 pdfSrc: "//static.aminer.org/pdf/PDF/000/000/097/database_security.pdf"// pdf文件地址
      }
    },
　　
    methods: {
      changePdfPage (val) {
        if (val === 0 && this.currentPage > 1) {
          this.currentPage--
        }
        if (val === 1 && this.currentPage < this.pageCount) {
          this.currentPage++
        }
      },
      loadPdfHandler (e) {
        this.currentPage = 1 // 加载的时候先加载第一页
      },
      download(){
        alert("确定要下载吗？")
      }
    }
  }
</script>