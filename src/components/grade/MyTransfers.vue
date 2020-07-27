<template>
  <div v-if="showNedi">
    <span class="title" style="margin-left:330px;">班级成员列表</span>

    <hr />
    <div class="div1">
      <!-- <input
        class="inputclass"
        v-model="input"
        placeholder="请输入内容"
        style=""
      />-->

      <div style="margin-top:21px;">
        <div v-for="(item, index) in dataList" :key="index" style="margin-bottom:15px;">
          <img :src="item.img" style="width:40px;height:40px;margin-left:30px; border-radius:50%" />
          <span style="margin-left: 86px;
    margin-top: -29px;display: block;">{{ item.username }}</span>
          <span
            style="margin-left: 301px;display: block;margin-top:-19px;"
            @change="JudgeAdd(index, item)"
          >
            <el-checkbox v-model="dataList[index].checked"></el-checkbox>
          </span>
        </div>
      </div>
    </div>

    <div class="div2">
      <el-select
        v-model="value"
        placeholder="请选择您要添加的人员分组"
        size="mini"
        style="width:150px;margin-left:100px"
        @change="getteamId"
      >
        <el-option
          v-for="item in teamList"
          :key="item.groupId"
          :label="item.groupName"
          :value="item.groupId"
        ></el-option>
      </el-select>
      <div>
        <div v-for="(item, index) in addList" :key="index">
          <div
            style="height:30px;background:rgba(255,255,255,1);margin-left:50px; margin-bottom: 20px;"
          >
            <p
              style="font-size:14px;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);line-height:30px;text-align:center;display:inline-block"
            >{{ item.username }}</p>
            <!-- style="margin: -24px 0 0 257px;display: block;" -->
            <i class="el-icon-delete" style="margin-left:200px;color:red" @click="delet(index)" />
          </div>
        </div>
      </div>
      <div class="mybtn">
        <el-button type="primary" size="medium" @click="edit()">确认</el-button>
        <el-button size="medium" style="margin-right:118px;" @click="Noedit()">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from "../../../static/js/util";
export default {
  data() {
    return {
      showNedi: true,
      input: "",
      dataList2: [],
      dataList: [],
      addList: [],
      classId: this.$parent.researchId,
      teamList: [], //分组列表
      value: "", //分组选择名字
      stundentId: [], //学生id
      teamId: 0 //小组Id
    };
  },
  created() {
    this.dataList2 = this.dataList;
    this.getClass();
    this.getTeam();
  },
  methods: {
    //获取小组Id
    getteamId(value) {
      this.teamId = value;
    },
    //获取班级所有学员
    getClass() {
      this.$post("/user/researchTeacher/query", { id: this.classId }).then(
        res => {
          if (res.code == "5000") {
            this.dataList = res.data;
          }
        }
      );
    },
    //获取学生分组情况
    getTeam() {
      let data = {
        rId: this.classId
      };
      this.$post("/user/researchGroup/query", data).then(res => {
        this.teamList = res.data.children;
      });
    },
    edit() {
      let data = { groupId: this.teamId, list: this.stundentId };
      this.$post("/user/researchGroup/update", data).then(res => {
        if (res.code == "5000") {
          this.$parent.getList();
          this.$message({ type: "success", message: "调整成功" });
        }
      });
      Utils.$emit("Noedit2", false);
    },
    Noedit() {
      this.showNedi = false;
      Utils.$emit("Noedit", false);
    },
    JudgeAdd(item, items) {
      //   var arr = [];
      //   arr.push(items.id);
      //   this.stundentId = arr;
      this.stundentId.push(items.id);

      let list = [];
      this.dataList.forEach(res => {
        if (res.checked == true) {
          list.push(res);
        }
      });
      this.addList = list;
    },
    delet(item) {
      let list = [];
      this.addList[item].checked = false;
      this.addList.forEach(res => {
        if (res.checked == true) {
          list.push(res);
        }
      });
      this.addList = list;
    },
    search(keyWord) {
      let list = [];
      if (keyWord != "") {
        for (var i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].name.indexOf(keyWord) >= 0) {
            list.push(this.dataList[i]);
          }
        }
        this.dataList = list;
      } else {
        this.dataList = this.dataList2;
      }
    }
  },
  watch: {
    input: function(newVal) {
      this.input = newVal;
      this.search(this.input);
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  font-size: 18px;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: rgba(51, 51, 51, 1);
  line-height: 48px;
}
.div1 {
  clear: both;
  float: left;
  width: 380px;
  height: 432px;
  border-right: 1px solid rgba(210, 210, 210, 1);
}
.div2 {
  position: relative;
  float: left;
  width: 400px;
  height: 432px;
  .mybtn {
    position: absolute;
    bottom: auto;
    left: 100px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
}
.countnum {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 48px;
}
.inputclass {
  margin: 33px 0 0 30px;
  width: 286px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(234, 234, 234, 1);
  border-radius: 4px;
}
</style>
