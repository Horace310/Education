<template>
  <div class="bigBox">
    <div class="heard">
      <img src="../../../static/images/akslogo.png" alt />
    </div>
    <div class="msgBox">
      <div class="title">
        <span>|注册</span>
        <el-radio-group v-model="checkedValue" @change="handleRadioChangess" class="choores">
          <el-radio v-for="item in list" :label="item.id" :key="item.id">
            {{
            item.name
            }}
          </el-radio>
        </el-radio-group>
      </div>
      <!-- 学生 -->
      <div class="stundenMsg" v-if="checkedValue == 2">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign"
          :rules="rules"
        >
          <el-form-item label="姓名:">
            <el-input v-model="formLabelAlign.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="checkedValues" @change="handleRadioChanges" class="choores">
              <el-radio v-for="item in sex" :label="item.id" :key="item.id">
                {{
                item.name
                }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学校:" id="pasicon">
            <input
              type="text"
              placeholder="请输入学校或机构简称"
              v-model="schoolName"
              @input="getSchool"
              class="textInput"
            />
            <div class="dialog" v-show="DiaShow">
              <ul>
                <li
                  v-for="(item, index) in SchoolNames"
                  :key="index"
                  @click="ShowName(item)"
                >{{ item.name }}</li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="居住所在地:" class="item">
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="学段:">
            <el-select v-model="value" placeholder="请选择" @change="getTypeid">
              <el-option
                v-for="item in optionss"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="身份证号码:" prop="id">
            <el-input v-model="formLabelAlign.id" placeholder="请输入身份证号码" minlength="18"></el-input>
          </el-form-item>-->
          <el-form-item label="学籍号:">
            <el-input v-model="formLabelAlign.number" placeholder="请输入学籍号"></el-input>
          </el-form-item>
          <!-- <el-form-item label="政治面貌:">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in poloti" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item>
            <el-button
              style="background-color:#2ab8b3;color:#fff;width:200px;height:49px"
              @click="submit"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 教师 -->
      <div class="teacherMsg" v-if="checkedValue == 1">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign"
          :rules="rules"
        >
          <el-form-item label="姓名:">
            <el-input v-model="formLabelAlign.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group v-model="checkedValues" @change="handleRadioChanges" class="choores">
              <el-radio v-for="item in sex" :label="item.id" :key="item.id">
                {{
                item.name
                }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学校:" id="pasicon">
            <!-- <el-input v-model="formLabelAlign.school" placeholder="请输入学校" @change="getSchool"></el-input> -->
            <input
              type="text"
              placeholder="请输入学校或机构简称"
              v-model="schoolName"
              @input="getSchool"
              class="textInput"
            />
            <div class="dialog" v-show="DiaShow">
              <ul>
                <li
                  v-for="(item, index) in SchoolNames"
                  :key="index"
                  @click="ShowName(item)"
                >{{ item.name }}</li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="居住所在地:" class="item">
            <el-cascader
              size="large"
              :options="options"
              ref="cascaderAddr"
              v-model="selectedOptions"
              @change="handleChange($event)"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="学段:">
            <el-select v-model="value" placeholder="请选择" @change="getTypeid">
              <el-option
                v-for="item in optionss"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学科:">
            <el-select v-model="tearchSubjectName" placeholder="请选择" @change="getSubjectId">
              <el-option
                v-for="item in teacherList"
                :key="item.id"
                :label="item.subjectName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教材版本">
            <el-select v-model="materialName" placeholder="请选择教材版本" @change="geteditionId">
              <el-option
                v-for="item in material"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="身份证号码:" prop="id">
            <el-input v-model="formLabelAlign.id" placeholder="请输入身份证号码" minlength="18"></el-input>
          </el-form-item>-->
          <!-- <el-form-item label="学籍号:">
            <el-input v-model="formLabelAlign.number" placeholder="请输入学籍号"></el-input>
          </el-form-item>-->
          <!-- <el-form-item label="政治面貌:">
            <el-select v-model="polotiName" placeholder="请选择" @change="getPoliti">
              <el-option v-for="item in poloti" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item>
            <el-button
              style="background-color:#2ab8b3;color:#fff;width:200px;height:49px"
              @click="submit"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="teamMsg" v-if="checkedValue == 3">
        <el-form :label-position="labelPosition" label-width="100px" :rules="rules">
          <el-form-item label="机构名称:">
            <el-input v-model="mechanism" placeholder="请输入机构名称"></el-input>
          </el-form-item>

          <el-form-item label="机构所在地:" class="item">
            <el-cascader
              size="large"
              :options="options"
              ref="cascaderAddr"
              v-model="selectedOptions"
              @change="handleChange($event)"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="学段:">
            <el-select v-model="value" placeholder="请选择学段" @change="getTypeid">
              <el-option
                v-for="item in optionss"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学科:">
            <el-select v-model="tearchSubjectName" placeholder="请选择" @change="getSubjectId">
              <el-option
                v-for="item in teacherList"
                :key="item.id"
                :label="item.subjectName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="教材版本">
            <el-select v-model="materialName" placeholder="请选择教材版本" @change="geteditionId">
              <el-option
                v-for="item in material"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请人姓名:">
            <el-input v-model="formLabelAlign.name" placeholder="请输入申请人姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="身份证号码:" prop="id">
            <el-input v-model="formLabelAlign.id" placeholder="请输入身份证号码" minlength="18"></el-input>
          </el-form-item>-->
          <el-form-item>
            <el-button style="background-color:#2ab8b3;color:#fff;width:200px;height:49px">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="articles">
      <Articles></Articles>
    </div>
    <!-- <p class="copyright tc">
      <Footers></Footers>
    </p>-->
  </div>
</template>
<script>
import Footers from "../../components/common/footers";
import Articles from "../../components/articles/articles";

import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
export default {
  components: { Footers, Articles },
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        age: "",
        school: "",
        id: "",
        number: ""
      },
      rules: {
        id: [
          { required: true, message: "请填写证件号码", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！",
            trigger: "blur"
          }
        ]
      },
      //学校名
      schoolName: "",
      SchoolNames: [],
      schoolId: 0,
      //学校联系框
      DiaShow: false,
      //学段名
      value: "",
      periodId: 0,
      //学科名
      tearchSubjectName: "",
      //学科Id
      subjectId: 0,
      //性别
      sexy: 0,
      //政治面貌
      poloti: [
        { id: 1, name: "群众" },
        { id: 2, name: "党员" },
        { id: 3, name: "团员" }
      ],
      polotiName: "",
      putPoloti: "",
      politicsFace: 0,
      //学段
      optionss: [
        { id: 1, name: "小学" },
        { id: 2, name: "初中" },
        { id: 3, name: "高中" }
      ],
      sex: [
        { id: 1, name: "男" },
        { id: 2, name: "女" }
      ],
      teacherList: [],
      checkedValue: 1,
      checkedValues: 0,
      list: [
        {
          id: 1,
          name: "老师"
        },
        {
          id: 2,
          name: "学生"
        },
        {
          id: 3,
          name: "机构"
        }
      ],
      options: regionData,
      //地域详情
      selectedOptions: [],
      cascaderAddr: "",
      myCity: "",
      //教材版本
      material: [],
      materialName: "",
      editionId: 0,
      //机构名
      mechanism: ""
    };
  },
  created() {
    this.getSubject();
    this.getedition();
  },
  methods: {
    //身份证校验
    checkCardID(sId) {
      var aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      };
      var iSum = 0;
      var info = "";
      if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
      sId = sId.replace(/x$/i, "a");
      var sBirthday = "";
      if (aCity[parseInt(sId.substr(0, 2))] == null)
        return "你的身份证地区非法";
      sBirthday =
        sId.substr(6, 4) +
        "-" +
        Number(sId.substr(10, 2)) +
        "-" +
        Number(sId.substr(12, 2));
      var d = new Date(sBirthday.replace(/-/g, "/"));
      if (
        sBirthday !=
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      )
        return "身份证上的出生日期非法";
      for (var i = 17; i >= 0; i--)
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
      if (iSum % 11 != 1) return "你输入的身份证号非法";
      //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
      return true;
    },
    handleRadioChangess(value) {},
    handleChange(val) {
      let name = this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels;
      this.myCity = name.toString();
    },
    //获取学段id
    getTypeid(value) {
      this.periodId = value;
      this.getSubject(value);
    },
    getTypeids(value) {
      this.periodId = value;
      this.getSubject(value);
    },
    //获取学科Id
    getSubjectId(value) {
      this.subjectId = value;
    },
    //获取学校
    getSchool(value) {
      this.DiaShow = true;
      this.$get("/system/school", { name: this.schoolName }).then(res => {
        //  console.log(res.data);
        this.SchoolNames = res.data;
      });
    },
    //点击学校名字
    ShowName(item) {
      this.schoolName = item.name;
      this.schoolId = item.id;
      this.DiaShow = false;
    },
    //选择男女
    handleRadioChanges(value) {
      this.sexy = value;
    },
    //获取政治面貌
    getPoliti(value) {
      // console.log(value);
      this.politicsFace = value;
      if (value == 1) {
        this.putPoloti = "群众";
      }
      if (value == 2) {
        this.putPoloti = "党员";
      }
      if (value == 3) {
        this.putPoloti = "团员";
      }
    },
    //获取教材版本
    getedition() {
      this.$get("/system/edition").then(res => {
        this.material = res.data;
      });
    },
    geteditionId(value) {
      // console.log(value);
      this.editionId = value;
    },
    onSelected(data) {
      this.temp.addressprovince = data.province.value;
      this.temp.addresscity = data.city.value;
      this.temp.addressdist = data.area.value;
    },
    //获取学科
    getSubject(value) {
      this.$get("/system/subject", { type: value }).then(res => {
        this.teacherList = res.data;
      });
    },
    getdetail() {
      this.$get("/user/detail").then(res => {
        sessionStorage.setItem("subjectName", res.data.subject);
        sessionStorage.setItem("userId", res.data.id);
        sessionStorage.setItem("subjectId", res.data.subjectId);
        sessionStorage.setItem("editionId", res.data.editionId);
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("avatar", res.data.avatar);
        sessionStorage.setItem("type", res.data.type);
        sessionStorage.setItem("stuno", res.data.stuno);
        sessionStorage.setItem("userCode", res.data.code);
        sessionStorage.setItem("contion", res.data.contion);
        sessionStorage.setItem("edition", res.data.editionId);
        sessionStorage.setItem("periodId", res.data.periodId);
        sessionStorage.setItem("subject", res.data.subjectId);
        if (res.data.type == 1) {
          this.$router.push("/homeCommon");
        }
        if (res.data.type == 2) {
          this.$router.push("/studentCommon");
        }
        if (res.data.type == 3) {
          this.$router.push("/homeCommon");
        }
      });
    },
    //登录
    login() {
      this.$post(
        "/auth/oauth/token",
        {
          grant_type: "password",
          username: sessionStorage.getItem("registerPhone"),
          password: sessionStorage.getItem("registerPassword")
        },
        {
          headers: {
            Authorization: "Basic ZmViczoxMjM0NTY="
          }
        }
      ).then(res => {
        let token = "bearer " + res.access_token;
        sessionStorage.setItem("token", token);
        var that = this;
        setTimeout(function() {
          that.getdetail();
        }, 500);
      });
    },
    //注册
    submit() {
      this.$post("/user/registerDetail", {
        id: sessionStorage.getItem("userid"),
        username: this.formLabelAlign.name,
        periodId: this.periodId,
        subjectId: this.subjectId,
        school: this.schoolName,
        editionId: this.editionId,
        organization: this.mechanism,
        politicsFace: this.politicsFace,
        sex: this.sexy,
        age: this.formLabelAlign.age,
        address: this.myCity,
        identityCard: this.formLabelAlign.id,
        stuno: this.formLabelAlign.number,
        type: this.checkedValue
      }).then(res => {
        if (res.code == "5000") {
          this.$message.success("注册成功");
          this.login();
        }
      });
      // }
      // else {
      //   this.$message({
      //     type: "warning",
      //     message: this.checkCardID(this.formLabelAlign.id)
      //   });
      // }
    }
  }
};
</script>

<style lang="less" scoped>
#pasicon {
  position: relative;
  .dialog {
    position: absolute;
    // bottom: -100%;
    // left: 40px;
    z-index: 100;
    width: 362px;
    padding: 5px;
    border-radius: 30px;
    background-color: #eee;
    overflow: hidden;
    box-sizing: border-box;
    ul {
      float: left;
      text-align: left;
      margin: 0;
      li {
        padding: 0px;
        border-bottom: 1px dashed #bbb;
      }
    }
  }
}
.bigBox {
  background-color: #f8f8f8;
  overflow: auto;
  .heard {
    height: 66px;
    background-color: #0f8c83;
    padding-left: 300px;
    padding-top: 8px;
    box-sizing: border-box;
    margin-bottom: 100px;
  }
  .msgBox {
    width: 600px;
    height: 750px;
    margin: 0 auto;
    background-color: #fff;
    .textInput {
      width: 360px;
      border-radius: 3px;
      height: 40px;
      outline: none;
      border-style: none;
      border: 1px solid #eaebf0;
      text-indent: 30px;
    }
    .stundenMsg {
      .item {
      }
    }
    .stundenMsg {
      padding: 70px;
    }
    .teacherMsg {
      padding: 70px;
    }
    .teamMsg {
      padding: 70px;
    }
    .title {
      height: 50px;
      padding-top: 30px;
      padding-left: 30px;
      box-sizing: border-box;
      span {
        // margin-left: 30px;
        color: #2bb5b1;
        font-size: 18px;
        font-weight: bold;
      }
      .choores {
        float: right;
        margin-right: 30px;
      }
    }
  }
  .articles {
    margin-top: 100px;
    background-color: #0f8c83;

    color: #fff;
  }
}
</style>
