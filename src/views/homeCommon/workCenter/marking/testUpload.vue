<template>
  <div style="margin-bottom:50px;">
    <div class="markingClass">
      <div class="markingClass_right">
        <el-upload
          class="upload-demo"
          action
          :on-change="onChange"
          :before-upload="beforeAvatarUpload"
          :http-request="TestUpload"
          multiple
        >
          <el-button size="mini" type="primary">批量上传</el-button>
        </el-upload>
        <el-button size="mini" @click="StartRead()">开始阅卷</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="UpList"
        height="550"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column width="60" align="center" type="selection"></el-table-column>
        <el-table-column property="name" label="图片名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-image-viewer v-if="showViewer" :on-close="()=>{showViewer=false}" :url-list="imgList" />
      <!-- <el-dialog :visible.sync="viewFlag">
        <img style="width:300px;height:200px" src="https://mixin.oss-cn-shenzhen.aliyuncs.com/onlineChecking-1587466392122-20200319手动选题组卷-A4答题卡+(1)-1" alt />
      </el-dialog>-->
      <div class="testUpload_footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="page.pagecount"
          :current-page="page.currentpage"
          @current-change="currentChange_"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "el-image-viewer": () =>
      import("element-ui/packages/image/src/image-viewer")
  },
  data() {
    return {
      page: {
        pagecount: null,
        currentpage: 1
      },
      base64code: "",
      viewFlag: false,
      flag: false,
      UpList: [],
      readList: [],
      imgList: [],
      showViewer: false
    };
  },

  mounted() {
    this.selectRead();
  },

  methods: {
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";

      if (!(isJPG || isPNG)) {
        this.$message.error("上传头像图片只能是 JPG 或者 PNG 格式!");
        return false;
      }
      //         if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      else {
        return true;
      }
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange");
      this.readList = val;
    },
    StartRead() {
      this.readList.forEach(item => {
        this.$post("/user/homework/scan", { id: item.id }).then(res => {
          if (res.code == 6013) {
            this.$message({
              type: "error",
              message: "阅卷异常：" + res.message + ",试卷名：" + item.name
            });
          }
        });
      });
    },
    handleDelete(index, item) {
      this.$get("/user/marking/deleteById", { id: item.id }).then(res => {
        if (res.code == 5000) {
          this.$message({ type: "success", message: "删除成功" });
          this.selectRead();
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },

    currentChange_(val) {
      console.log(val);
      this.page.currentpage = val;
      this.selectRead();
    },
    selectRead() {
      // /user/marking/selectMark
      this.$get("/user/marking/selectByState", {
        indexNo: this.page.currentpage
      }).then(res => {
        if (res.code == 5000) {
          this.page.pagecount = Number(res.data.count);
          console.log(this.page.pagecount, typeof this.page.pagecount);
          this.UpList = res.data;
        }
      });
    },
    StartUP(name, url) {
      this.$post("/user/marking/insertMark", { img: url, name: name }).then(
        res => {
          if (res.code == 5000) {
            this.$message({
              type: "success",
              message: "上传成功：" + name
            });
          } else {
            this.$message({
              type: "error",
              message: "上传失败：" + name
            });
          }
        }
      );
    },
    handleEdit(index, item) {
      this.showViewer = true;
      this.imgList = [item.img];
      return false;
      console.log(index, item);
      this.viewFlag = true;
    },

    toUpPage() {
      this.flag = true;
    },
    onChange(file, fileList) {
      console.log(file, fileList, "onChange");
    },
    TestUpload(file) {
      var name = file.file.name.split(".")[0];

      this.client = new OSS.Wrapper({
        region: "oss-cn-shenzhen",
        secure: true,
        accessKeyId: "TxkBX1VgU792UUVh",
        accessKeySecret: "45sBqHvJR7YeHj8qL5h0tsmvYdiA0W",
        bucket: "mixin"
      });
      var filename = "onlineChecking-" + file.file.uid + "-" + name;
      var url = "";
      this.client.multipartUpload(filename, file.file).then(result => {
        if (result.res.status == 200 && result.res.statusCode == 200) {
          console.log(result.res);
          url = result.res.requestUrls[0].split("?")[0];
          // this.UpList.push({name:name,url:url})
          this.StartUP(name, url), this.selectRead();
        }
      });
      // console.log(file)
      //base64
      // console.log(file.File)
      // try {
      //   let reader = new FileReader()
      //   reader.readAsDataURL(file.file)
      //   reader.onload = function(e) {

      //       let base64Str = e.target.result
      //       console.log(base64Str)

      //     }
      //   }
      //  catch (error) {

      //     console.log(error)

      // }
    }
  }
};
</script>

<style lang="less" scope >
.markingClass {
  .el-upload-list {
    display: none;
  }
}

.markingClass_right {
  float: right;
  display: flex;
  justify-content: space-between;
  width: 180px;
  margin-bottom: 15px;
}
.markingClass_left {
  float: left;
  display: flex;
  justify-content: space-between;
  width: 670px;
  margin-bottom: 15px;
}
.testUpload_footer {
  text-align: center;
  margin-top: 20px;
}
</style>