<template>
  <div style="margin-bottom:50px;">
    <div class="abnormal">
      <!-- <div class="markingClass_right">
        <el-upload
          class="upload-demo"
          action
          :on-change="onChange"
          :before-upload="beforeAvatarUpload"
          :http-request="TestUpload"
          multiple
        >
          <el-button size="mini" type="primary">试卷重传</el-button>
        </el-upload>
      </div>-->
      <!-- <div class="abnormal_left">
        <img src="../../../../../static/images/u93.jpg" alt />
      </div>-->
      <div class="abnormal_right">
        <p>异常：8</p>
        <el-table :data="tableData" height="550" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column property="name" label="图片名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-image-viewer v-if="showViewer" :on-close="()=>{showViewer=false}" :url-list="imgList" />
      </div>
      <div style="clear:both"></div>
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
      showViewer: false,
      viewFlag: false,
      imgList: [],
      tableData: [
        {
          testId: "SLLM022313005",
          name: "张三"
        },
        {
          testId: "SLLM022313005",
          name: "张三"
        },
        {
          testId: "SLLM022313005",
          name: "张三"
        },
        {
          testId: "SLLM022313005",
          name: "张三"
        },
        {
          testId: "SLLM022313005",
          name: "张三"
        },
        {
          testId: "SLLM022313005",
          name: "张三"
        },
        {
          testId: "SLLM022313005",
          name: "张三"
        },
        {
          testId: "SLLM022313005",
          name: "张三"
        }
      ]
    };
  },
  created() {
    this.$get("/user/marking/selectByIsError").then(res => {
      if (res.code == 5000) {
        console.log(res);
        this.tableData = res.data;
      }
    });
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
    },
    StartUP(name, url) {
      this.$post("/user/marking/update", { img: url, name: name }).then(res => {
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
      });
    },
    handleEdit(index, item) {
      console.log(item);
      this.showViewer = true;
      this.imgList = [item.img];
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.abnormal_left {
  width: 45%;
  height: 600px;
  float: left;
  overflow-y: auto;
}
.abnormal_right {
  width: 100%;
  height: 600px;
  float: right;
  p {
    margin-bottom: 10px;
    font-size: 16px;
  }
}
</style>