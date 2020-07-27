<template>
  <div class="knowledges">
    <!-- <Grade @subjectId="subjectIds" v-if="workConter"></Grade> -->

    <div class="con">
      <el-row :gutter="20">
        <el-col
          style="width:25%;padding:0 10px;display:block;transition:all 0.5s ease 0s;"
          :style="shrink ? '' : 'width:0;padding:0;'"
        >
          <div class="grid-content">
            <Subject :addShow="true" ref="subject" :style="shrink ? '' : 'width:0;overflow:hidden'"></Subject>
            <div class="shrink" @click="changeShrink">
              <i :class="shrink ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
            </div>
          </div>
        </el-col>
        <el-col style="width:75%">
          <!-- <knowledge :toSon="toSon" /> -->

          <div class="table" style="background-color:#fff">
            <!-- <img src="../../../static/images/作业列表.png" alt /> -->
            <div style="margin-bottom:10px" class="clearfix">
              <img
                src="../../../static/images/作业列表.png"
                style="height:25px;float:left;margin-top:10px;"
                alt
              />
              <el-select
                v-model="className"
                placeholder="请选择班级"
                clearable
                @change="changeClass"
                size="mini"
                style="margin-left:30px;margin-top:10px;width:150px;float:left"
              >
                <el-option
                  v-for="(item, i) in classList"
                  :key="i"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <div
                v-for="item in selectType "
                :key="item.id"
                style="float:left;margin-left:30px;margin-top:10px"
              >
                <el-button
                  :class="{ active: typ_id == item.id }"
                  @click="changeStatus(item.id,item.id)"
                  style="margin-left: -18px;"
                  size="mini"
                >{{item.name}}</el-button>
              </div>
              <div style="display:flex;justify-content:space-between;width:430px;margin-top:9px">
                <div style="width:320px;">
                  <el-cascader
                    v-show="selectShow"
                    placeholder="请选择单元"
                    ref="myCascader"
                    v-model="addValue"
                    size="mini"
                    :options="treeList"
                    :props="{ expandTrigger: 'hover',label:'name',value:'id' }"
                    style="width:320px;margin-left:20px"
                    @change="handleChange"
                  ></el-cascader>
                </div>
                <div class="ssss" @click="selectDanyuan">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="tiao"
                    :disabled="unitId?false:true"
                  >新增作业</el-button>
                </div>
              </div>
            </div>
            <table>
              <thead>
                <tr style="background-color:#f8f8f8;">
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">序号</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">作业名称</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">展示分类</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">作业类型</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">时间</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">状态</td>
                  <td style="color:rgb(42, 184, 179);font-size:16px;padding:5px">操作</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in workList"
                  :key="index"
                  style="margin-bottom:5px;font-size:14px;"
                  class="trHover"
                >
                  <td style="padding:10px;font-size:14px">{{ index + 1 }}</td>
                  <td style="padding:10px;font-size:14px;cursor:pointer">
                    <a href="javascript:void(0);" @click="toDetail(item)">{{ item.name }}</a>
                  </td>
                  <td style="padding:10px;font-size:14px">{{ item.showType }}</td>
                  <td style="padding:10px;font-size:14px">{{ item.type }}</td>
                  <td style="padding:10px;font-size:14px">{{ item.createTime }}</td>
                  <td style="padding:10px;font-size:14px">{{ item.publish==0?"已发布":"未发布" }}</td>
                  <td>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                      <i
                        class="el-icon-delete"
                        style="font-size:14px;cursor:pointer;padding-right:5px"
                        @click="deleteQuestion(item)"
                      ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="打印" placement="top-start">
                      <i
                        class="el-icon-printer"
                        style="font-size:14px;cursor:pointer;padding-right:5px"
                        @click="Goprint(item)"
                      ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                      <i
                        class="el-icon-edit"
                        v-if="item.publish == 1"
                        @click="toChange(item)"
                        style="font-size:14px;cursor:pointer;padding-right:5px"
                      ></i>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="发布" placement="top-start">
                      <i
                        @click="toDetail(item)"
                        class="el-icon-position"
                        style="font-size:14px;cursor:pointer;padding-right:5px"
                      ></i>
                    </el-tooltip>
                    <i
                      @click="toDetail(item)"
                      class="el-icon-folder-add"
                      style="font-size:14px;cursor:pointer;padding-right:5px"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <el-pagination
              small
              background
              layout="prev, pager, next"
              style="margin-bottom:3px"
              @current-change="handleCurrentChange2"
              :page-count="pagecount"
              :current-page.sync="currentpage"
            ></el-pagination>
            <!-- <el-table :data="showTable" style="width: 100%">
              <el-table-column prop="id" label="序号" width="180"></el-table-column>
              <el-table-column prop="name" label="作业名称" width="180"></el-table-column>
              <el-table-column prop="showType" label="题型"></el-table-column>
              <el-table-column prop="type" label="作业类型"></el-table-column>
              <el-table-column prop="source" label="来源"></el-table-column>
              <el-table-column prop="createTime" label="时间"></el-table-column>
              <el-table-column prop="price" label="来源"></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="countPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="10"
              layout="total, sizes,prev, pager, next"
              :total="allTotal"
              prev-text="上一页"
              next-text="下一页"
            ></el-pagination>-->

            <!-- <el-pagination
              layout="prev, pager, next"
              :total="allTotal"
              class="page"
              style="color: #2ab8b3;"
              @current-change="handleCurrentChanges"
            ></el-pagination>-->
            <!-- <paginationVue /> -->
          </div>
        </el-col>
        <el-col
          style="width:100%;padding:0 10px;transition:all 0.5s ease 0s;"
          :style="shrink ? '' : 'width:100%;'"
        >
          <div class="subject" v-if="false">
            <div class="import-in">
              <div class="btn">
                <el-button
                  size="medium"
                  type="primary"
                  :class="tabsNum == index ? 'active' : ''"
                  @click="tabs(index)"
                  v-for="(item, index) in btns"
                  :key="index"
                >{{ item }}</el-button>
              </div>

              <div
                class="content"
                :class="{ pros: tabsNum == 2 || questionImage }"
                v-if="question == ''"
              >
                <div class="tips" v-show="tabsNum == 0">
                  <p class="title">点击查看之前上传的图片>></p>
                  <div class="code">
                    <img src="../../../static/images/code.png" alt />
                  </div>
                  <div class="codetips">
                    <span>1.先添加小程序(名称：爱课生）</span>
                    <span>2.手机拍照，小程序扫码上传图片</span>
                  </div>
                </div>
                <div class="word" v-show="tabsNum == 1">
                  <div style="width=100% height=100%;padding:15px">
                    <div v-html="wordHtml" @click="SelectText"></div>
                  </div>
                  <!-- <embed :src="url" type="application/pdf" width="100%" height="100%" />   -->
                  <iframe
                    :src="url"
                    style="width:100%;height:100%"
                    frameborder="0"
                    scrolling="auto"
                  ></iframe>
                  <!-- <iframe :src="url" style="width:100%;height:100%" frameborder="1"></iframe> -->
                </div>
                <div class="tips" v-show="tabsNum == 1">
                  <!-- <div class="code">
                    <div
                      class="show-preview"
                      v-show="previews.url"
                      :style="{
                        width: previews.w + 'px',
                        height: previews.h + 'px',
                        overflow: 'hidden',
                        margin: '5px'
                      }"
                    >
                      <div :style="previews.div">
                        <img :src="previews.url" :style="previews.img" />
                      </div>
                    </div>
                    <div style="overflow:hidden;" :style="previews.url ? '' : 'height:0'">
                      <div class="cropper">
                        <VueCropper
                          ref="cropper"
                          :img="option.img"
                          :outputSize="option.size"
                          :outputType="option.outputType"
                          :info="true"
                          :full="option.full"
                          :canMove="option.canMove"
                          :canMoveBox="option.canMoveBox"
                          :original="option.original"
                          :autoCrop="option.autoCrop"
                          :autoCropWidth="option.autoCropWidth"
                          :autoCropHeight="option.autoCropHeight"
                          :fixedBox="option.fixedBox"
                          @realTime="realTime"
                          @imgLoad="imgLoad"
                        ></VueCropper>
                      </div>
                    </div>
                  </div>-->
                  <div class="addimg">
                    <div class="upload">
                      <el-upload
                        class="upload-demo"
                        name="file"
                        action="http://data.ikeshen.com/user/homework/wordToHtml"
                        :headers="headers"
                        :before-upload="beforeUpload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :on-success="successUpload"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                      >
                        <el-button size="small" type="primary">word上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                      </el-upload>
                      <!-- <input
                        type="file"
                        @change="changeFile"
                        accept="application/msword, application/pdf, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      />-->
                    </div>
                  </div>
                </div>
                <div class="topic" v-show="tabsNum == 2">
                  <div class="titles">
                    <el-button @click="chooseAll" :type="type2 == 0 ? 'warning' : ''">全部</el-button>
                    <el-button
                      v-for="(item, index) in QuestionType"
                      :key="index"
                      :type="QuestionType2index == index ? 'warning' : ''"
                      @click="chooseType2(item, index)"
                    >{{ item.name }}</el-button>
                  </div>
                  <div class="timu">
                    <div class="list" v-for="(item, index) in tiku" :key="index">
                      <span class="index">{{ index + 1 }}、</span>
                      <div class="head" v-html="item.content"></div>
                      <div class="answer" v-html="item.answer"></div>

                      <div class="foot">
                        <p class="left">
                          <span>
                            组卷:
                            <span style="color:#409eff;margin-right:25px">2.6W+</span>
                          </span>
                          <span>
                            作者:
                            <span style="color:#409eff;margin-right:25px">王学峰</span>
                          </span>
                          <span>
                            平均得分率:
                            <span style="color: rgb(251, 139, 34);;margin-right:25px">55.42%</span>
                          </span>
                        </p>
                        <p class="right">
                          <span @click="addTest(item, index)" class="cursor">+试题篮</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="page">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="pageSize"
                      :layout="layout"
                      :total="countPage"
                    ></el-pagination>
                  </div>
                </div>
              </div>
              <div class="count" v-else>
                <div class="title">有理数课后作业练习</div>
                <div class="answer">
                  <el-radio v-model="radio" label="1">包含答案</el-radio>
                  <el-radio v-model="radio" label="2">不包含答案</el-radio>
                </div>
                <div class="picture">
                  <img :src="question" alt />
                </div>
              </div>
            </div>
            <div class="import-out">
              <div class="title">已导入的试题</div>
              <div class="wordTest" v-for="(item, r) in problems" :key="r" v-show="isShow">
                <div class="questionBank">
                  <p>
                    题目内容:
                    <el-button
                      @click="importTxt('content',r)"
                      size="mini"
                      style="margin-bottom:5px"
                    >导入</el-button>
                  </p>
                  <el-input
                    id="question-conter"
                    type="textarea"
                    :rows="5"
                    v-model="item.content"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
                <div class="anser-conter">
                  <p>
                    答案:
                    <el-button
                      @click="importTxt('questionAnser',r)"
                      size="mini"
                      style="margin-bottom:5px"
                    >导入</el-button>
                  </p>
                  <el-input
                    id="Anserconter"
                    type="textarea"
                    :rows="5"
                    v-model="item.questionAnser"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
                <div class="analysi">
                  <p>
                    解析:
                    <el-button
                      @click="importTxt('questionAnalysi',r)"
                      size="mini"
                      style="margin-bottom:5px"
                    >导入</el-button>
                  </p>
                  <el-input
                    id="Anserconter"
                    type="textarea"
                    :rows="5"
                    v-model="item.questionAnalysi"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
                <div class="anser-score">
                  <span style="margin-left:10px">分值:&nbsp;</span>

                  <el-input style="width:50px" v-model="item.questionScore"></el-input>
                  <span>&nbsp;分</span>
                </div>
                <div class="anserType">
                  <div class="anserList">
                    <span style="font-size:18px;color:#159484;display:block">题目属性:</span>
                    <el-button
                      class="leixing"
                      v-for="(items, i) in QuestionType"
                      :key="i"
                      :class="{'choores':item.QuestionType2indexs ==i }"
                      @click="chooseTypes(items, i,item,r)"
                    >{{ items.name }}</el-button>
                    <!-- <el-button>{{typeName}}</el-button> -->
                  </div>
                  <div class="anserList">
                    <span style="font-size:18px;color:#159484">难度:</span>
                    <el-button
                      v-for="(items, k) in difficulty"
                      :class="{'active':item.num2 ==k }"
                      :key="k"
                      @click="chooseDifficulty(items, k,item,r)"
                    >{{ items.name }}</el-button>
                  </div>
                  <!--                  <div class="anserList">-->
                  <!--                    <span style="font-size:18px;color:#159484">时间:</span>-->
                  <!--                    <el-button-->
                  <!--                      v-for="(items, indexs) in time"-->
                  <!--                      :key="indexs"-->
                  <!--                      :class="{ active: timeNums == indexs }"-->
                  <!--                      @click="chooseTime(items, indexs)"-->
                  <!--                    >{{ items.name }}</el-button>-->
                  <!--                  </div>-->
                  <div class="anserList">
                    <span style="font-size:18px;color:#159484">目标:</span>
                    <el-button
                      v-for="(items, j) in target"
                      :key="j"
                      :class="{ active: item.targetNum == j }"
                      @click="chooseTarget(items, j,item)"
                    >{{ items.name }}</el-button>
                  </div>
                  <div class="label">
                    选择输入语音:
                    <i class="el-icon-microphone" @click="setaudio"></i>
                    <!-- <audio :src="audioUrl"></audio> -->
                  </div>
                  <div class="right" style="margin-left:280px;margin-bottom:50px">
                    <el-button
                      type="primary"
                      class="confirm"
                      id="confirmBtn"
                      @click="confirmSd(item, r)"
                    >保存题目</el-button>
                    <el-button type="success" class="confirm" @click="addsubject(item, r)">继续加题</el-button>
                    <el-button
                      type="warning"
                      class="delete"
                      id="delateBtn"
                      @click="deleteProblems(item, r)"
                    >删除</el-button>
                  </div>
                </div>
              </div>
              <!-- 题库 -->
              <div class="problem" v-if="problem.length != 0" v-show="tabsNum == 2">
                <div class="example" v-for="(item, index) in problem" :key="index">
                  <div class="number">
                    <span>导入</span>
                    此题编码:
                    <!-- {{ item.code }} -->
                    <i
                      class="el-icon-question query"
                      @mouseover="mouseOver"
                      @mouseleave="mouseLeave"
                    ></i>
                    <span class="Elastic" :style="Showblock">赋予每道题的编码实现智能化精准化</span>
                  </div>

                  <div class="test" v-html="item.content"></div>
                  <div class="analysis">
                    <div class="item">
                      <div class="label">答案:</div>
                      <div class="input">
                        <div
                          class="editDemo"
                          :id="'answer' + index"
                          contenteditable="true"
                          v-html="item.answer"
                        ></div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="label">解析ss:</div>
                      <div class="input">
                        <div class="contentTitle">
                          <ul>
                            <li>
                              <i class="el-icon-picture"></i>
                              <input
                                type="file"
                                :id="'file_' + index"
                                @change="UploadImages"
                                placeholder="图片解析"
                              />
                            </li>
                            <el-input
                              v-model="item.jiexi"
                              placeholder="文本解析"
                              @change="UploadImages2"
                            ></el-input>
                          </ul>
                        </div>
                        <div
                          :id="'content' + index"
                          contenteditable="true"
                          class="editDemo"
                          v-html="item.resolution"
                        ></div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="label">分值:</div>
                      <div class="input">
                        <el-input v-model="item.questionScore" placeholder="请输入内容"></el-input>
                      </div>
                    </div>
                    <div class="item nature">
                      <div class="label"></div>
                      <div class="sort">
                        <div class="li">
                          <!-- ssss -->
                          <div class="head">题目属性:</div>
                          <div class="btn">
                            <el-button style="background: #159484;color:#fff">{{item.typeName}}</el-button>
                            <!-- <el-button
                              v-for="(items, indexs) in QuestionType"
                              :key="indexs"
                              :class="
                                QuestionType2indexs == indexs ? 'choores' : ''
                              "
                              @click="chooseType(items, indexs)"
                            >{{ items.name }}</el-button>-->
                          </div>
                        </div>
                        <div class="li">
                          <div class="head">题目难度:</div>
                          <div class="btn">
                            <el-button
                              v-for="(items, indexs) in difficulty"
                              :class="{'active':item.num2 ==indexs } "
                              :key="indexs"
                              @click="chooseDifficulty(items, indexs,item,index)"
                            >{{ items.name }}</el-button>
                          </div>
                        </div>
                        <!-- <div class="li">
                          <div class="head">题目时间:</div>
                          <div class="btn">
                            <el-button
                              v-for="(items, indexs) in time"
                              :key="indexs"
                              :class="{ active: timeNum == indexs }"
                              @click="chooseTime(items, indexs)"
                            >{{ items.name }}</el-button>
                          </div>
                        </div>-->
                        <div class="li">
                          <div class="head">题目目标:</div>
                          <div class="btn">
                            <el-button
                              v-for="(items, indexs) in target"
                              :key="indexs"
                              :class="{ active: item.targetNum == indexs }"
                              @click="chooseTarget(items, indexs,item)"
                            >{{ items.name }}</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item Voice">
                      <div class="label">
                        选择输入语音:
                        <i class="el-icon-microphone" @click="setaudio"></i>
                      </div>
                      <div class="btn" v-if="item.audioUrl">
                        <div class="left">
                          <audio
                            v-show="item.audioUrl != ''"
                            :src="item.audioUrl"
                            controls="controls"
                            class="content-audio"
                            style="display: none;width:160px;height:30px;"
                          >语音</audio>
                          <el-slider
                            v-show="item.audioUrl == ''"
                            v-model="item.value1"
                            :max="max"
                            disabled
                          ></el-slider>
                          <span v-show="item.audioUrl == ''" style="width:40px">{{ item.value1 }}s</span>
                        </div>
                        <div class="right">
                          <el-button @click="getChecked">
                            <i class="el-icon-microphone"></i>
                            {{ item.checked == 0 ? "完成" : "重新录制" }}
                          </el-button>
                          <el-button @click="deleteVoice">删除语音</el-button>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="btn" style="width:100%;display:flex;justify-content:flex-end;">
                        <div class="right" style>
                          <el-button
                            type="primary"
                            class="confirm"
                            id="confirmBtn"
                            @click="confirm(item, index)"
                          >确定</el-button>
                          <el-button
                            type="warning"
                            class="delete"
                            id="delateBtn"
                            @click="deleteProblem(item, index)"
                          >删除</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="nodata" v-else>
                <img src="../../../static/images/nodata.png" alt />
                <span>暂无导入试题</span>
              </div>-->
              <!--              <div class="Release">-->
              <!--                <span @click="release">发布预览</span>-->
              <!--                <span @click="chooseVideo">选择视频</span>-->
              <!--              </div>-->
            </div>
            <div class="task-basket">
              <el-badge :value="allproblemslist.length" class="item">
                <img src="../../assets/work_img.png" alt @click="change" />
              </el-badge>
              <div class="basket-con" v-show="showed">
                <table>
                  <thead>
                    <tr style="background-color:#f8f8f8;">
                      <td style="color:#fb8b22;font-size:16px;padding:5px">序号</td>
                      <td style="color:#fb8b22;font-size:16px;padding:5px">已选试题</td>
                      <td style="color:#fb8b22;font-size:16px;padding:5px">分数</td>
                      <td style="color:#fb8b22;font-size:16px;padding:5px">清空</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in allproblemslist"
                      :key="index"
                      style="margin-bottom:5px;font-size:14px;color:#fb8b22"
                      class="trHover"
                    >
                      <td style="padding:10px;font-size:14px">{{ index+1 }}</td>
                      <td style="padding:10px;font-size:14px">{{ item.typeName }}</td>
                      <td style="padding:10px;font-size:14px">{{ item.questionScore }}</td>
                      <td @click="deleallproblemslist(item,index)">
                        <i class="el-icon-delete-solid" style="font-size:14px"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="Release">
                  <span @click="releases" class="Releases">发布预览</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Grade from "../grade/grade";
import Subject from "../grade/subject";
import Utils from "../../../static/js/util";
import Gagination from "../../components/pagination/pagination";
import noData from "../../components/noData/noData";
import recording from "../../../static/js/recorder";
import Subjects from "@/components/subject/subject";
// import { VueCropper } from "vue-cropper";
import knowledge from ".././../views/homeCommon/resourceTools/sb";

var m1 = {
  name: "",
  props: {
    flag: {
      type: String,
      default: "3"
    }
  },
  data() {
    return {
      selectShow: false,
      headers: {
        Authorization: sessionStorage.getItem("token")
      },
      selectContent: "",
      selecter: "",
      addValue: [359],
      fileList: [],
      fileData: {},
      jiexi: "",
      currentpage: 1,
      pagecount: 0, //总页数
      publish_: "",
      typ_id: "",
      selectType: [
        { id: 0, name: "全部" },
        { id: 1, name: "已发布" },
        { id: 2, name: "未发布" }
      ],
      showed: false,
      allproblemslist: [],
      allProblems: 0,
      QuestionType2indexs: 0,
      typeId: "", //题目难度
      chooresPid: 0,
      workList: [],
      //给思维导图
      toSon: "",
      //word上传文档数据 题目类型
      isShow: false,
      //题目内容
      questionBank: "",
      //题目答案
      questionAnser: "",
      //题目分值
      questionScore: 5,
      //题目解析
      questionAnalysi: "",
      //题目时间
      timeType: "",
      typeName: "",
      wordHtml: "",
      showWord: false,
      targetConter: "", // 题目目标
      workId: 0, //作业ID
      //当前页
      totalS: 1,
      allTotal: 3,
      chapterIds: "", //章节id
      //教材ID
      pid: 0,
      typeNames: "", //题目名称
      Showblock: "",
      storeId: [], // 题库ID
      workConter: true,
      toSons: {},
      createClass: [],
      states: [
        { value: 0, label: "已发布" },
        { value: 1, label: "未发布" }
      ],
      hwlist: [],
      value: "",
      value4: "",
      barId: "",
      contentId: "",
      subjectId: "",
      chapterId: "",
      contentName: "",
      barName: "",
      shrink: true,
      screens: false,
      date1: "",
      chapterName: "",
      pageNum: 1,
      total: 0,
      textbookId: "",
      showimg: false,
      typename: "",
      subjectname: "",
      book: "",
      gradename: "",
      timeSelect: [],
      layout: "prev, pager, next, jumper",

      // questionsData
      centerDialogVisible: false,
      currentPage4: 1,
      countPage: 1,
      pageSize: 10,
      audioUrl: "",
      content: "",
      homeworkName: "",
      solve: "",
      value: [],
      input: "",
      problem: [],
      problems: [
        {
          jiexi: "",
          content: "",
          questionAnser: "",
          questionAnalysi: "",
          questionScore: "",
          QuestionType2indexs: 0,
          num2: 0,
          targetNum: 0,
          typeName: "作图题"
        }
      ],
      scoreValue: "",
      answerValue: "",
      max: "",
      value1: 0,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike", "formula"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"]
          ]
        }
      },
      questionImage: "",
      headImg: "",
      //剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: "",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 200,
        autoCropHeight: 150,
        centerBox: false,
        high: true
      },
      fileName: "", //本机文件地址
      downImg: "#",
      imgFile: "",
      uploadImgRelaPath: "", //上传后的图片的地址（不带服务器域名）

      QuestionType2index: "",
      style: "width:100%;",
      options: [],
      tabsNum: 2,
      btns: ["以往作业", "Word导入", "平台题库", "专家购买"],
      question: "",
      // question: "../../../../static/images/picture.jpg",
      radio: "1",
      test:
        "1.（2019•海南模拟）2018年6月3日，海南宣布设立海南自贸区海口江东新区，总面积约298000000平方米．数据298000000用科学记数法表示为（　　）",
      answerNum: ["A", "B", "C", "D"],
      number: "1145740",
      QuestionType: [],
      QuestionTypeList: [{ id: "", typeName: "" }],
      QuestionTypeindex: "",
      QuestionTypeindexs: "",
      answer: [
        { text: "298x10" },
        { text: "29.8x10" },
        { text: "2.98x10" },
        { text: "0.298x10" }
      ],
      answerindex: 0,
      difficulty: [
        { name: "解释性" },
        { name: "应用性" },
        { name: "拓展性" }
        // { name: "自定义" }
      ],
      difficultyConter: "",
      num2: 0,
      num2s: 0,
      difficultyindex: "",
      time: [
        { name: "宽松" },
        { name: "合适" },
        { name: "超时" }
        // { name: "自定义" }
      ],
      timeNum: 0,
      timeNums: 0,
      timeindex: "",
      target: [
        { name: "单一知识目标" },
        { name: "多知识目标" }
        // { name: "自定义" }
      ],
      targetName: "", //目标名
      targetNum: 0,
      targetNums: 0,
      tiku: [],
      targetindex: "",
      title: [],
      homeworkId: [],
      subjectId: this.$route.query.subjectId,
      max: 10,
      checked: 1,
      recorder: null,
      t: null,
      sound: "../../../../static/images/picture.jpg",
      classId: "",
      show: false,
      code: "../../../../static/images/code.png",
      type2: 0,
      QuestionType2index: 999999,
      resolution: "",
      level: "",
      expectTime: "",
      solveProblem: "",
      endTime: "",
      knowledge: "",
      unitId: "",
      type: "",
      update: this.$route.query.update,
      labels: "",
      updatatype1: true,
      timenum1: "",
      client: "",
      filesUrlname: "",
      url: "",
      SubJectID: "",
      // iframe
      indexIdx: 0,
      id_index: {
        index: "",
        values: "",
        topic: ""
      },
      //思维导图
      chart: null,
      knowledge: "",
      data2: {},
      classList: [], //班级列表
      className: "",
      classIds: 0, //班级id
      sort: 0,
      intoId: 0
    };
  },
  components: {
    Grade,
    Subject,
    Gagination,
    noData,
    Subjects,
    knowledge //思维导图
  },

  created() {
    if (this.$route.query.intoId) this.intoId = this.$route.query.intoId;
    var that = this;
    console.log(123132);
    //选择班级
    this.getWorkList();
    //  this.queryCreateClass();

    this.subjectId = this.$store.state.subjectId;
    this.QuestionTypeSelect();
    var that = this;
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  mounted() {
    this.getclassList();
    var that = this;
    Utils.$on("getData", function(msg) {
      that.selectShow = false;
      that.pids = msg.id;
      that.chapterIds = msg.id;
      that.findTitle(msg);
      //获取作业列表
      that.getWorkList();
      that.chooresPid = msg;
      // console.log("55");
      that.typeName = that.QuestionType[0].name; //题目属性
      that.typeId = that.QuestionType[0].id; //题目属性
      that.difficultyConter = that.difficulty[0].name; //题目难度
      that.targetNum = that.target[0].name; //题目目标
    });

    Utils.$on("demo", function(msg) {
      that.sublist(msg);

      that.querySujectList(msg);
    });
    window.teacher = () => {
      this.$refs.subject.queryTestBookList(this.subjectId);
    };
    this.mouseLeave();
  },
  computed: {
    treeList() {
      return this.$store.state.treeList;
    }
  },
  watch: {
    // addValue() {
    //   console.log(this.$refs["myCascader"].inputValue);
    // },
    pids: function() {
      //   console.log(this.pids);
    }
  },
  methods: {
    selectDanyuan() {
      if (!this.unitId) {
        this.selectShow = true;
      }
    },
    handleChange() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.addValue.length == 3) {
            let list = this.$refs["myCascader"].inputValue;
            let newList = list.split("/");
            sessionStorage.setItem("chapterName", newList[0]);
            sessionStorage.setItem("section", newList[1]);
            sessionStorage.setItem("unitName", newList[2]);
            this.unitId = this.addValue[2];
            this.$router.push({
              path: "/homeCommon/workCenter/addHomeWork",
              query: { chapterIds: this.chapterIds, pid: this.unitId }
            });
          } else {
            this.unitId = "";
          }
        }, 200);
      });
    },
    findTitle(msg) {
      let newList = JSON.parse(JSON.stringify(this.$refs.subject.data));
      if (msg.unitIndex) {
        this.unitId = msg.id;
        for (let i = 0; i < newList.length; i++) {
          if (this.recursion(newList[i], msg.id, newList[i], true)) {
            break;
          }
        }
        sessionStorage.setItem("unitName", msg.name);
      } else {
        this.unitId = "";
      }
    },
    findPid(list, pid) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == pid) {
          list[i].unitIndex = true;
          this.findTitle(list[i]);
          break;
        } else if (list[i].children) {
          this.findPid(list[i].children, pid);
        }
      }
    },
    toChange(value) {
      let newList = JSON.parse(JSON.stringify(this.$refs.subject.data));
      let copy = JSON.parse(JSON.stringify(value));
      this.findPid(newList, copy.pid);
      setTimeout(() => {
        this.$router.push({
          path: "/homeCommon/workCenter/addHomeWork/release",
          query: { homeworkId: value.id }
        });
      }, 300);
    },
    recursion(list, id, value) {
      let isFind;
      if (list.children) {
        for (let o = 0; o < list.children.length; o++) {
          if (list.children[o].id == id) {
            isFind = true;
            sessionStorage.setItem("section", list.name);
            sessionStorage.setItem("chapterName", value.name);
            sessionStorage.setItem("sectionId", list.id);
            // sessionStorage.setItem("chapterName", name.id);
            break;
          } else {
            this.recursion(list.children[o], id, value);
          }
        }
      }
      return isFind;
    },
    importTxt(type, index) {
      if (type === "content") this.problems[index].content = this.selectContent;
      else if (type === "questionAnser")
        this.problems[index].questionAnser = this.selectContent;
      else if (type === "questionAnalysi")
        this.problems[index].questionAnalysi = this.selectContent;
    },
    SelectText() {
      try {
        this.selecter = window.getSelection().toString();
        if (this.selecter != null && this.selecter.trim() != "") {
          this.selectContent = this.selecter;
        }
      } catch (err) {
        console.log(err);
        this.selecter = document.selection.createRange();
        var s = this.selecter.text;
        if (s != null && s.trim() != "") {
          return;
        }
      }
    },
    beforeUpload(file) {
      console.log(file);
      // this.fileData = file;
      console.log(this.fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    successUpload(one, two) {
      this.wORK;
      console.log(one);
      this.wordHtml = one.data;
    },
    tiao() {
      this.$router.push({
        path: "/homeCommon/workCenter/addHomeWork",
        query: { chapterIds: this.chapterIds, pid: this.unitId }
      });
    },
    Goprint(item) {
      console.log(item.id);
      sessionStorage.topicList = "";
      sessionStorage.styleState = "";
      sessionStorage.testWorkId = "";
      // /homeCommon/workCenter/homeworkPrint?homeworkId=755
      this.$router.push({
        path: "/homeCommon/workCenter/homeworkPrint",
        query: { homeworkId: item.id }
      });
      // this.$router.push({
      //   path: "/homeCommon/workCenter/homeworkPrint",
      //   query: {
      //     homeworkId: item.id
      //   }
      // });
    },
    handleCurrentChange2(e) {
      this.currentpage = e;
      this.getWorkList();
    },
    changeStatus(key, key2) {
      this.typ_id = key;
      // this.publish_ = key;
      if (key == 0) {
        this.publish_ = "";
        this.currentpage = 1;
      }
      if (key == 1) {
        this.publish_ = 0;
        this.currentpage = 1;
      }
      if (key == 2) {
        this.publish_ = 1;
        this.currentpage = 1;
      }
      this.getWorkList();
    },
    //继续加题
    addsubject(item, index) {
      this.problems.push({
        jiexi: "",
        content: "",
        questionAnser: "",
        questionAnalysi: "",
        questionScore: "",
        QuestionType2indexs: 0,
        num2: 0,
        targetNum: 0
      });
      // console.log(item, index);
    },
    //去作业详情
    toDetail(item) {
      this.$router.push({
        path: "/homeCommon/workCenter/homeworkDetail",
        query: {
          id: item.id,
          state: item.publish
        }
      });
    },
    changeClass(e) {
      this.classIds = e;
      this.getWorkList();
    },
    //获取班级列表
    getclassList() {
      let data = { userId: sessionStorage.getItem("userId") };
      this.$post("/user/classes/query", data).then(res => {
        if (res.code == "5000") {
          this.classList = res.data;
          //  this.getTeam();
        }
      });
    },
    //删除题目
    deleteQuestion(item) {
      var that = this;
      console.log(item.id, "deleteQuestion");
      that
        .$confirm("此操作将删除此题, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          // console.log("deleteQuestion");
          let data = { id: item.id };
          that.$axios
            .delete("/user/homework/delete", { params: data })
            .then(res => {
              if (res.data.code == "5000") {
                console.log("55");
                that.$message({
                  type: "success",
                  message: "删除成功!"
                });

                that.getWorkList();
              } else {
                that.$message({
                  type: "warning",
                  message: res.data.message
                });
              }
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //获取作业列表
    getWorkList() {
      let data = {
        pid: this.pids,
        rows: 10,
        indexNo: this.currentpage,
        subjectId: sessionStorage.getItem("subjectId"),
        publish: this.publish_
      };
      if (this.classIds != 0) {
        data.classId = this.classIds;
      }
      this.$get("/user/homework/findListByPid", data).then(res => {
        this.workList = res.data.date;
        this.pagecount = res.data.count;
        console.log(this.pagecount, "pagecount");
        // console.log(res.data);
      });
    },
    //页数变化
    handleCurrentChanges(val) {
      this.totalS = val;
      this.getWorkList();
    },
    //层级
    indexId(e) {
      this.indexIdx = e.values;
    },
    //鼠标移出事件
    mouseLeave() {
      this.Showblock = "display:none";
    },
    //鼠标移入事件
    mouseOver() {
      this.Showblock = "display:block";
    },
    screen() {
      this.screens = !this.screens;
    },
    // 查找上次未发布的作业id
    queryLastCreateHomeworkId(e) {
      let data = { subjectId: this.subjectId };
      this.$post("/likework/queryLastCreateHomeworkId.do", data).then(res => {
        //  console.log(res);
        if (res.code == "5000") {
          this.homeworkId = res.data;
          this.queryHomeworkById();
        }
      });
    },
    //学段学科
    subjectIds(e) {
      //  console.log(e)
      this.subjectId = e.id;
      this.QuestionTypeSelect();
      this.queryClassHomework();
      this.queryHomework();
    },
    choose(item) {
      if (this.contentName == "") {
        this.$message({ message: "请选择章节内容", type: "error" });
        return false;
      }
      this.$router.push({
        path: "/homeCommon/questions/release",
        query: {
          title: `${this.typename},${this.subjectname},${this.book},${this.gradename},${this.chapterName},${this.barName},${this.contentName}`,
          homeworkId: this.homeworkId,
          subjectId: this.subjectId,
          chapterId: this.chapterId,
          barId: this.barId,
          contentId: this.contentId,
          textbookId: this.textbookId,
          contentName: this.contentName
        }
      });

      // update 1-确定发布 2-更新发布 3-没有发布
      this.$store.state.textbookId = this.textbookId;
    },
    sublist(e) {
      // console.log(e)
      this.typename = e.type == 1 ? "小学" : e.type == 2 ? "初中" : "高中";
      this.subjectname = e.subjectName;
    },
    handleSizeChangeFun(v) {
      this.pageSize = v;
      this.queryClassHomework(); //每页条数
    },
    handleCurrentChangeFun(v) {
      //页面点击
      this.pageNum = v; //当前页
      this.queryClassHomework(); //当前
    },

    ////查询班级已发布/未发布作业时间下拉列表
    queryHomeworkTimeSelect() {
      this.$post("/likework/queryHomeworkTimeSelect.do", {
        classId: this.value4, //班级id
        flag: this.$route.query.flag //发布状态 0-已发布 1-未发布
      }).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          this.timeSelect = response.data.reverse();
          //查询作业
          this.queryClassHomework();
        }
      });
    },
    // workId(e) {
    //   // console.log(e);
    //   this.barId = e.barId;
    //   this.chapterId = e.chapterId;
    //   this.contentId = e.contentId;
    //   this.chapterName = e.name1;
    //   this.barName = e.name2;
    //   this.contentName = e.name3;
    //   this.queryHomework();
    //   // document.getElementById("childFrame").contentWindow.update(this.id_index.index,this.id_index.values,this.id_index.topic,e.chapterId) ;
    //   this.queryClassHomework();
    //   //  this.$store.state.textName = e.name3
    // },
    textbook(e) {
      this.$store.state.textId = e.id;
      sessionStorage.setItem("textid", e.id);
      // this.getCourseware()
      this.subjectId = e.subjectId;
      this.textbookId = e.id;
      this.book = e.book;
      this.gradename = e.gradename;
      this.queryHomework();
      this.queryClassHomework();
      // this.queryHomework(this.type2);

      if (!this.$route.query.homeworkId) {
        this.queryLastCreateHomeworkId();
      } else {
        this.homeworkId = this.$route.query.homeworkId;
        this.queryHomeworkById();
      }
    },
    // 根据id查询作业详情接口
    queryHomeworkById(e) {
      let data = { homeworkId: this.homeworkId };
      let that = this;
      this.$post("/likework/queryHomeworkById.do", data).then(res => {
        if (res.code == "5000") {
          this.solve = res.data.solveProblem;
          this.homeworkName = res.data.homeworkName;
          this.$store.state.homeworkCode = res.data.code;
          // this.value = res.data.classList[0].name;
          let classId = [],
            name = [];
          res.data.classList.forEach((item, index) => {
            name.push(item.name);
            classId.push(item.id);
          });
          this.value = classId;
          // this.classId = classId.join(':');
          // this.type = res.data.type==1?'结构化作业':'非结构化作业';
          this.endTime = res.data.endTime;
          this.knowledge = res.data.knowledge;
          this.solveProblem = res.data.solveProblem;
          this.expectTime = res.data.expectTime;
          // this.level = res.data.level==1?'初级':res.data.level==2?'中级':'高级';
          this.type = String(res.data.type);
          this.level = String(res.data.level);
          res.data.questionList.forEach((item, index) => {
            item.t = null;
            item.recorder = null;
            item.value = "";
            item.checked = 1;
            if (item.property === null) {
              (item.difficultyindex = 0),
                (item.timeindex = 0),
                (item.targetindex = 0),
                that.leixing(item.type, res => {
                  item.QuestionTypeindex = res;
                });
              return false;
            }
            let property = JSON.parse(item.property);
            that.nandu(property["难度"], response => {
              //    console.log(response);
              item.difficultyindex = response;
            });
            that.shijian(property["时间"], response => {
              item.timeindex = response;
            });
            that.mubiao(property["目标"], response => {
              item.targetindex = response;
            });
            that.leixing(item.type, res => {
              item.QuestionTypeindex = res;
            });
            //    console.log(item);
          });

          //  this.questionList = res.data.questionList;
          //   this.queryCreateClass();
          // this.question = res.data.code;
        }
      });
    },
    //查询作业
    queryClassHomework() {
      //  console.log(this.chapterId)
      this.hwlist = [];
      let data = {
        classId: this.value4, //班级id
        subjectId: this.subjectId, //学科id
        textbookId: this.textbookId, //教科书id
        chapterId: this.chapterId, //章id
        barId: this.barId, //节id
        contentId: this.contentId, //内容id
        rows: 10,
        indexNo: this.pageNum,
        time: ""
      };
      if (this.flag != "3") {
        data.time = this.date1;
        data.flag = this.$route.query.flag; //发布状态 1-已发布 2-未发布
      } else {
        data.flag = this.value;
      }

      this.$post("/likework/queryClassHomework.do", data).then(response => {
        //console.log(response)
        if (response.code == "5000") {
          if (response.data.rows != "") {
            this.hwlist = response.data.rows;
            this.total = response.data.pageCount;
            this.showimg = false;
          } else {
            this.showimg = true;
            this.total = 0;
          }
        } else {
          this.showimg = true;
        }
      });
      this.toSons = data;
    },

    changeShrink() {
      this.shrink = !this.shrink;
      if (!this.shrink) {
        this.layout = "prev, pager, next, jumper";
      } else {
        this.layout = "prev, pager, next";
      }
    },
    //VueCropper

    //放大/缩小
    changeScale(num) {
      //  console.log("changeScale");
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //坐旋转
    rotateLeft() {
      //   console.log("rotateLeft");
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      //    console.log("rotateRight");
      this.$refs.cropper.rotateRight();
    },
    //上传图片（点击上传按钮）
    finish(type) {
      //     console.log("finish");
      let _this = this;
      let formData = new FormData();
      // 输出
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          //      console.log(data);
          var img = window.URL.createObjectURL(data);
          let type = data.type.split("/")[1];
          const reader = new FileReader();
          reader.readAsArrayBuffer(data);
          reader.onload = e => {
            this.uploadImage(e, type, res => {
              //       console.log(res)
              //       console.log(this.problem)
              this.problem.push({
                content: `<div><img src=${res.url} /></div>`,
                addway: 2,
                answer: "",
                code: null,
                createTime: "",
                id: null,
                property: null,
                resolution: "",
                score: 0,
                sound: null,
                type: 0,
                QuestionTypeindex: 0,
                QuestionTypeindexs: 0,
                addway: 2,
                difficultyindex: 0,
                t: null,
                targetindex: 0,
                timeindex: 0,
                userCount: null
              });
            });
          };
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    //下载图片
    down(type) {
      //     console.log("down");
      var aLink = document.createElement("a");
      aLink.download = "author-img";
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data);
          aLink.href = window.URL.createObjectURL(data);
          aLink.click();
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          aLink.href = data;
          aLink.click();
        });
      }
    },
    //选择本地图片
    uploadImg(e, num) {
      //   console.log("uploadImg");
      var _this = this;
      //上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          _this.option.img = data;
        } else if (num === 2) {
          _this.example2.img = data;
        }
      };
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {},

    // VueCropper
    //读取word
    changeFile(e) {
      var self = this;
      var file = event.target.files[0];
      console.log(file);
      var ext = file.name.split(".")[1];
      console.log(ext);
      // this.videoName = file.name.replace("."+ext,"");
      var type = file.name.match(/\.(\w+)$/)[1]; //获取上传文件后缀名
      var storeAs = "upload-file1/abc";
      var file_name = `${new Date().getTime()}.${ext}`; //时间戳+文件后缀名
      this.client = new OSS.Wrapper({
        region: "oss-cn-shenzhen",
        secure: true,
        //endpoint: "oss-cn-shenzhen.aliyuncs.com",
        accessKeyId: "TxkBX1VgU792UUVh",
        accessKeySecret: "45sBqHvJR7YeHj8qL5h0tsmvYdiA0W",
        bucket: "mixin"
      });
      this.client
        .multipartUpload(file.name, file)
        .then(result => {
          console.log(result);

          // event.target.value = "";
          if (result.res.status == 200 && result.res.statusCode == 200) {
            // self.$emit("input", result.res.requestUrls[0]);
            // this.filesUrl = result.res.requestUrls[0].split("?")[0];
            // console.log(this.filesUrl);
            this.filesUrlname = file.name;
            if (result.res.requestUrls[0].indexOf("?") != -1) {
              //判断url地址中是否包含link字符串
              this.url =
                "http://view.officeapps.live.com/op/view.aspx?src=" +
                result.res.requestUrls[0].split("?")[0];
            } else {
              this.url =
                "http://view.officeapps.live.com/op/view.aspx?src=" +
                result.res.requestUrls[0];
            }
            console.log(this.url, "this.url");
            self.$message.success("上传成功");
          } else {
            self.$message.error("上传失败，请重新上传文件");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // changeFile(e) {
    //   this.problem.length = 1;
    //   // console.log(this.problem.length)
    //   this.updatatype1 = true;
    //   this.timenum1 = 0;
    //   // this.countDown1();
    //   var self = this;
    //   var file = event.target.files[0];
    //   // console.log(file);
    //   var ext = file.name.split(".")[1];
    //   //  console.log(ext);
    //   // this.videoName = file.name.replace("."+ext,"");
    //   var type = file.name.match(/\.(\w+)$/)[1]; //获取上传文件后缀名
    //   var storeAs = "upload-file1/abc";
    //   var file_name = `${new Date().getTime()}.${ext}`; //时间戳+文件后缀名
    //   this.client = new OSS.Wrapper({
    //     region: "oss-cn-shenzhen",
    //     secure: true,
    //     //endpoint: "oss-cn-shenzhen.aliyuncs.com",
    //     accessKeyId: "TxkBX1VgU792UUVh",
    //     accessKeySecret: "45sBqHvJR7YeHj8qL5h0tsmvYdiA0W",
    //     bucket: "mixin"
    //   });
    //   this.client
    //     .multipartUpload(file.name, file)
    //     .then(result => {
    //       //   console.log(result);

    //       // event.target.value = "";
    //       if (result.res.status == 200 && result.res.statusCode == 200) {
    //         // self.$emit("input", result.res.requestUrls[0]);
    //         // this.filesUrl = result.res.requestUrls[0].split("?")[0];
    //         //  console.log(this.filesUrl);
    //         this.filesUrlname = file.name;

    //         if (result.res.requestUrls[0].indexOf("?") != -1) {
    //           //判断url地址中是否包含link字符串
    //           this.url =
    //             "http://view.officeapps.live.com/op/view.aspx?src=" +
    //             //  "https://view.officeapps.live.com/op/view.aspx?src= " +
    //             result.res.requestUrls[0].split("?")[0];
    //         } else {
    //           this.url =
    //             "http://view.officeapps.live.com/op/view.aspx?src=" +
    //             //"https://view.officeapps.live.com/op/view.aspx?src= " +
    //             result.res.requestUrls[0];
    //         }
    //         console.log(this.url, "this.url");
    //         self.$message.success("上传成功");
    //       } else {
    //         self.$message.error("上传失败，请重新上传文件");
    //       }
    //     })
    //     .catch(function(err) {
    //       //  console.log(err);
    //     });
    // },
    UploadImages2() {},
    UploadImages(e) {
      // console.log("item:"+item,"index:"+index,"e:"+e)
      console.log(e);
      this.resolution = "";
      let index = e.path[0].id.split("_")[1];
      console.log(index);
      let file = e.target.files[0];
      this.uploading(e, res => {
        console.log(res);
        this.resolution = "<div><img src=" + res.url + "></div>";
        console.log(this.resolution);
        document.getElementById(
          "content" + index
        ).innerHTML = `<div><img src="${res.url}" /></div>`;
      });
      return false;
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);
      reader.onload = () => {
        //    console.log(reader)
        document.getElementById(
          "content" + index
        ).innerHTML = `<div><img src="${reader.result}" /></div>`;
      };
      console.log(this.resolution);
    },
    // 获取筛选条件
    querySujectList(e) {
      this.$post("/likework/querySujectList.do").then(res => {
        if (res.code == "5000") {
          for (var key in res.data) {
            res.data[key].forEach((item, index) => {
              if (item.id == e.id) {
                this.labels = `${key}${item.subjectName}`;
              }
            });
          }
        }
      });
    },
    //创建班级
    submitFormq(data) {
      // console.log(data);
      this.centerDialogVisible = data;
      //  this.queryCreateClass();
    },
    //创建班级关闭弹框
    closeDialog(val) {
      this.centerDialogVisible = val;
    },
    //创建班级取消
    callOfa(val) {
      this.centerDialogVisible = val;
    },
    //创建班级弹框
    createClassed() {
      this.centerDialogVisible = true;
    },
    // 删除题目
    deleteProblem(item, index) {
      this.$confirm("是否删除此题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.problem.splice(index, 1);
      });
      this.allProblems = this.problem.length + this.problems.length;
    },
    deleteProblems(item, index) {
      this.$confirm("是否删除此题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.problems.splice(index, 1);
      });
      this.allProblems = this.problem.length + this.problems.length;
    },
    deleallproblemslist(item, index) {
      this.$confirm("是否删除此题目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.allproblemslist.splice(index, 1);
      });
    },
    // 加入试题篮
    addTest(item, index) {
      this.problem.push(item);
      this.$set(item, "num2", 0);
      this.$set(item, "targetNum", 0);
      this.storeId.push(item.id);
      this.sort = index++;
      // console.log(item);
    },
    // 选择全部
    chooseAll() {
      this.type2 = 0;
      this.QuestionType2index = 99999;
      this.queryHomework(this.type2);
    },
    // 选择图库类型
    chooseTypes(items, index, item, r) {
      this.typeId = items.id;
      this.$set(item, "QuestionType2indexs", index);
      this.$set(item, "typeName", items.name);
      // this.QuestionType2indexs = index;
      this.typeName = items.name;
      // console.log(this.typeName);
    },
    chooseType2(item, index) {
      this.typeName = item.name;
      this.typeId = item.id;
      this.QuestionType.forEach((item, index) => {});
      this.isChoorse = index;
      // this.type2 = 1;
      this.type2 = item.id;
      this.QuestionType2index = index;
      // console.log(this.problem);
      this.queryHomework(item.id);
    },
    // 翻页
    handleCurrentChange(e) {
      this.currentPage4 = e;
      if (this.type2 == 0) {
        // this.queryHomework(this.type2);
        this.queryHomework(this.type2);
      }
      //else {
      //   this.queryHomework(this.QuestionType2index + 1);
      // }
    },
    //pageSize
    handleSizeChange(e) {
      this.pageSize = e;
      this.queryHomework();
      if (this.type2 == 0) {
        this.queryHomework(this.type2);
      }
      //   else {
      //   this.queryHomework(this.QuestionType2index + 1);
      // }
    },
    // 获取题库
    queryHomework(e) {
      let data = {
        subjectId: sessionStorage.getItem("subjectId"),
        typeId: e,
        indexNo: this.currentPage4,
        rows: this.pageSize,
        pid: this.pids
      };

      Utils.$emit("bookId", this.textbookId);
      this.$get("/user/homework/store/findAllList", data).then(res => {
        if (res.code == "5000") {
          this.tiku = res.data.date;
          this.countPage = res.data.total;
          this.currentPage4 = res.data.pageNum;
        }
      });
    },
    nandu(e, callback) {
      this.difficulty.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    shijian(e, callback) {
      this.time.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    mubiao(e, callback) {
      this.target.forEach((item, index) => {
        if (item.name == e) {
          callback(index);
        }
      });
    },
    leixing(e, callback) {
      this.QuestionType.forEach((item, index) => {
        if (item.id == e) {
          callback(index);
        }
      });
    },
    // 根据id查询作业详情接口
    queryHomeworkById(e) {
      //   console.log(this.homeworkId)
      let data = { id: e };
      //  console.log(this.homeworkId)
      let that = this;
      this.$get("/user/homework/question/findById", data).then(res => {
        if (res.code == "5000") {
          res.code.data.forEach((item, index) => {
            this.problem.push(item);
          });
          // console.log(this.problem);
        }
        // if (res.code == "5000") {
        //   this.solve = res.data.solveProblem;
        //   this.homeworkName = res.data.homeworkName;
        //   // this.value = res.data.classList[0].name;
        //   let classId = [],
        //     name = [];
        //   res.data.classList.forEach((item, index) => {
        //     name.push(item.name);
        //     classId.push(item.id);
        //   });
        //   this.value = classId;
        //   // this.classId = classId.join(':');
        //   // this.type = res.data.type==1?'结构化作业':'非结构化作业';
        //   this.endTime = res.data.endTime;
        //   this.knowledge = res.data.knowledge;
        //   this.solveProblem = res.data.solveProblem;
        //   this.expectTime = res.data.expectTime;
        //   // this.level = res.data.level==1?'初级':res.data.level==2?'中级':'高级';
        //   this.type = String(res.data.type);
        //   this.level = String(res.data.level);
        //   res.data.questionList.forEach((item, index) => {
        //     item.t = null;
        //     item.recorder = null;
        //     item.value = "";
        //     item.checked = 1;
        //     if (item.property === null) {
        //       (item.difficultyindex = 0),
        //         (item.timeindex = 0),
        //         (item.targetindex = 0),
        //         that.leixing(item.type, res => {
        //           item.QuestionTypeindex = res;
        //         });
        //       return false;
        //     }
        //     let property = JSON.parse(item.property);
        //     that.nandu(property["难度"], response => {
        //       //         console.log(response);
        //       item.difficultyindex = response;
        //     });
        //     that.shijian(property["时间"], response => {
        //       item.timeindex = response;
        //     });
        //     that.mubiao(property["目标"], response => {
        //       item.targetindex = response;
        //     });
        //     that.leixing(item.type, res => {
        //       item.QuestionTypeindex = res;
        //     });
        //     //      console.log(item);
        //   });
        //   //  console.log(res.data.questionList);

        //   this.problem = res.data.questionList;
        //   //  console.log(res.data.questionList,111)
        //   this.queryCreateClass();
        //   // this.question = res.data.code;
        // }
      });
    },
    // 获取创建的班级列表接口
    // queryCreateClass(e) {
    //   this.$post("/likework/queryCreateClass.do").then(res => {
    //     if (res.code == "5000") {
    //       this.options = res.data;
    //     }
    //   });
    // },
    onEditorBlur(e) {
      //    console.log(e);
    },
    onEditorFocus(e) {
      //   console.log(e);
    },
    onEditorChange(e) {
      //  console.log(e);
      this.resolution = e.text;
    },
    QuestionTypeSelect(e) {
      let data = { subjectId: sessionStorage.getItem("subjectId") };
      this.$get("/user/homework/store/findTypeBySubjectId", data).then(res => {
        if (res.code == "5000") {
          this.QuestionType = res.data;
        }
      });
    },
    tabs(e) {
      this.tabsNum = e;

      if (e == 1) {
        this.isShow = true;
        this.typeName = this.QuestionType[0].name; //题目属性
        this.typeId = this.QuestionType[0].id; //题目属性
        this.difficultyConter = this.difficulty[0].name; //题目难度
        this.targetNum = this.target[0].name; //题目目标
      } else {
        this.isShow = false;
      }
      if (e == 2) {
        this.queryHomework(this.type2);
      }
    },
    chooseType(items, indexs) {
      this.typeId = items.id;
      this.QuestionType2indexs = indexs;
      this.typeName = items.name;
    },
    //题目难度
    chooseDifficulty(items, indexs, item, index) {
      this.difficultyConter = items.name;
      // item.num2 = indexs;
      this.$set(item, "num2", indexs);
      // console.log(this.problem,items,indexs,item,index);
    },
    chooseTime(items, indexs) {
      this.timeType = items.name;
      this.timeNum = indexs;
      this.timeNums = indexs;
    },
    chooseTarget(items, indexs, item) {
      this.targetName = items.name;
      // this.targetNum = indexs;
      // this.targetNums = indexs;
      this.$set(item, "targetNum", indexs);
      // console.log(item,this.problem);
    },
    //发布
    release(e) {
      this.show = true;
      if (this.tabsNum == 1) {
        // let data = {
        //   // chapterId: this.chapterIds,
        //   storeId: this.storeId,
        //   content: this.questionBank,
        //   answer: this.questionAnser,
        //   resolution: this.questionAnalysi,
        //   score: this.questionScore,
        //   difficulty: this.difficultyConter,
        //   typeId: this.typeId,
        //   typeName: this.typeName,
        //   timeType: this.timeType,
        //   target: this.targetName,
        //   sound: this.audioUrl,
        //   sort: 1,
        //   chapterId: this.chapterIds
        // };
        // if (this.intoId == 0) {
        // } else if (this.intoId !== 0) {
        //   data.chapterId = this.intoId;
        // }
        // this.$post("/user/homework/question/insert", data).then(res => {
        //   if (res.code == "5000") {
        //     this.homeworkId = res.data;
        //     this.$router.push({
        //       path: "/homeCommon/workCenter/workable",
        //       query: {
        //         homeworkId: res.data,
        //         subjectId: this.subjectId,
        //         chapterId: this.chapterIds,
        //         pid: this.pids,
        //         contentId: this.contentId,
        //         textbookId: this.textbookId,
        //         contentName: this.contentName
        //       }
        //     });
        //     this.$message({ type: "success", message: "更新成功" });
        //   } else {
        //     this.$message({ type: "error", message: res.message });
        //   }
        // });
        if (this.homeworkId) {
          Utils.$emit("seenTo", this.problems);
          var list = JSON.stringify(this.problems);
          var totals = this.problems.length * this.questionScore;
          sessionStorage.setItem("total", totals);
          this.$router.push({
            path: "/homeCommon/workCenter/workable",
            query: {
              homeworkId: this.homeworkId,
              subjectId: this.subjectId,
              chapterId: this.chapterIds,
              pid: this.pids
            }
          });
          // console.log(list);
        } else {
          this.$message({ type: "error", message: "请点击确定并选择题目属性" });
        }
      } else if (this.tabsNum == 2) {
        if (this.homeworkId) {
          Utils.$emit("seenTo", this.problem);
          var list = JSON.stringify(this.problem);
          sessionStorage.setItem("list", [list]);
          var totals = this.problem.length * this.questionScore;
          sessionStorage.setItem("total", totals);
          this.$router.push({
            path: "/homeCommon/workCenter/workable",
            query: {
              homeworkId: this.homeworkId,
              subjectId: this.subjectId,
              chapterId: this.chapterIds,
              pid: this.pids
            }
          });
        } else {
          this.$message({ type: "error", message: "请点击确定并选择题目属性" });
        }
      }
    },
    //发布
    releases() {
      if (this.homeworkId) {
        Utils.$emit("seenTo", this.allproblemslist);
        var list = JSON.stringify(this.allproblemslist);
        sessionStorage.setItem("list", [list]);
        var totals = this.allproblemslist.length * this.questionScore;
        sessionStorage.setItem("total", totals);
        this.$router.push({
          path: "/homeCommon/workCenter/workable",
          query: {
            homeworkId: this.homeworkId,
            subjectId: this.subjectId,
            chapterId: this.chapterIds,
            pid: this.pids
          }
        });
      } else {
        this.$message({ type: "error", message: "请点击确定并选择题目属性" });
      }
    },
    change() {
      this.showed = !this.showed;
    },
    // 录入语音
    setaudio() {
      if (this.checked == 0) {
        //     console.log(this.checked);
        return false;
      }
      recording.get(res => {
        if (res) {
          //     console.log(res);
          this.recorder = res;
          this.t = setInterval(() => {
            if (this.value1 < this.max) {
              this.value1++;
              this.checked = 0;
            } else {
              this.checked = 1;
              // this.value1 = 0;
              this.recorder.stop();
              this.getBlob();
              clearInterval(this.t);
            }
          }, 1000);
        }
      });
    },
    // 判断是否点击完成
    getChecked() {
      if (this.checked == 0) {
        this.checked = 1;
        this.recorder.stop();
        this.getBlob();
        clearInterval(this.t);
      } else {
        this.value1 = 0;
        this.setaudio();
      }
    },

    // 删除语音
    deleteVoice(e) {},
    // 获取语音二进制文件
    getBlob(e) {
      // 获取语音二进制文件
      let bold = this.recorder.getBlob();
      //    console.log(bold);
      // 将获取的二进制对象转为二进制文件流
      let files = new File([bold], "test.mp3", {
        type: "audio/mp3",
        lastModified: Date.now()
      });
      //    console.log(files);
      let fd = new FormData();
      fd.append("file", files);
      //    console.log(fd);
      fd.append("tenantId", 3); // 额外参数，可根据选择填写
      // 这里是通过上传语音文件的接口，获取接口返回的路径作为语音路径
      this.uploading(files, res => {
        //      console.log(res);
        this.audioUrl = res.url;
      });
      // console.log(a);
    },
    // 选择视频
    chooseVideo(e) {
      this.$router.push({
        path: "/homeCommon/resourceTools/uploadVideo",
        query: { video: 1, classId: this.value.join(":") }
      });
    },
    confirm(item, index) {
      let data = {
        //  chapterId: this.chapterIds,
        storeId: "",
        content: item.content,
        answer: item.answer,
        resolution: this.resolution + "||||" + item.jiexi,
        score: item.questionScore,
        difficulty: this.difficultyConter,
        typeId: this.typeId,
        typeName: item.typeName,
        //timeType: this.timeType,
        target: this.targetName,
        sound: this.audioUrl,
        sort: this.sort,
        chapterId: this.chapterIds
      };
      // if (this.intoId == 0) {
      // } else if (this.intoId !== 0) {
      //   data.chapterId = this.intoId;
      // }
      // console.log(this.$route.query.intoId);
      this.$post("/user/homework/question/insert", data).then(res => {
        if (res.code == "5000") {
          this.homeworkId.push(res.data);
          var workId = JSON.stringify(this.homeworkId);
          sessionStorage.setItem("workId", workId);
          if (this.problems[0].content != "") {
            this.allProblems = this.problem.length + this.problems.length;
            this.allproblemslist = this.problem.concat(this.problems);
          } else {
            this.allProblems = this.problem.length;
            this.allproblemslist = this.problem;
          }
          // console.log(this.allproblemslist);

          // this.$router.push({
          //   path: "/homeCommon/workCenter/workable",
          //   query: {
          //     homeworkId: res.data,
          //     subjectId: this.subjectId,
          //     chapterId: this.chapterIds,
          //     pid: this.pids
          //   }
          // });
          this.$message({ type: "success", message: "更新成功" });
        } else {
          this.$message({ type: "error", message: res.message });
        }
      });
    },
    confirmS(item, index) {
      let data = {
        chapterId: this.chapterIds,
        storeId: this.storeId,
        content: this.questionBank,
        answer: this.questionAnser,
        resolution: this.questionAnalysi,
        score: this.questionScore,
        difficulty: this.difficultyConter,
        typeId: this.typeId,
        typeName: this.typeName,
        timeType: this.timeType,
        target: this.targetName,
        sound: this.audioUrl,
        sort: 1
      };
      this.$post("/user/homework/question/insert", data).then(res => {
        if (res.code == "5000") {
          this.homeworkId = res.data;
          this.$router.push({
            path: "/homeCommon/workCenter/workable",
            query: {
              homeworkId: res.data,
              chapterId: this.chapterIds,
              pid: this.pids
            }
          });
          this.$message({ type: "success", message: "更新成功" });
        } else {
          this.$message({ type: "error", message: res.data });
        }
      });
    },
    confirmSd(item, index) {
      console.log(item);
      let data = {
        chapterId: this.chapterIds,
        storeId: this.storeId.join(","),
        content: item.content,
        answer: item.questionAnser,
        resolution: item.questionAnalysi,
        score: item.questionScore,
        difficulty: this.difficultyConter,
        typeId: this.typeId,
        typeName: this.typeName,
        timeType: this.timeType,
        target: this.targetNum,
        sound: this.audioUrl,
        sort: 1
      };
      this.$post("/user/homework/question/insert", data).then(res => {
        if (res.code == "5000") {
          // this.homeworkId = res.data;

          this.homeworkId.push(res.data);
          var workId = JSON.stringify(this.homeworkId);
          sessionStorage.setItem("workId", workId);
          this.allProblems = this.problem.length + this.problems.length;
          this.allproblemslist = this.problem.concat(this.problems);

          // this.$router.push({
          //   path: "/homeCommon/workCenter/workable",
          //   query: {
          //     homeworkId: res.data,
          //     chapterId: this.chapterIds,
          //     pid: this.pids
          //   }
          // });
          this.$message({ type: "success", message: "更新成功" });
        } else {
          this.$message({ type: "error", message: res.data });
        }
      });
    }
  }
};
//console.log(m1);
function alerts(e) {
  // alert(123);
  m1.methods.teacher();
}

export default m1;
</script>

<style scoped lang="less">
.selectType:hover {
  background-color: @color;
}
@color: #159484;
.knowledges {
  #words {
    width: 159px;
    border: 1px solid #eee;
    height: 149px;
    text-align: center;
    img {
      margin: 20px;
      width: 80px;
      height: 80px;
    }
  }
  #confirmBtn {
    background-color: #159484;
    border: none;
  }
  #delateBtn {
    background-color: #ff8a00;
    border: none;
  }
  .active {
    background: #159484;
    color: #fff;
  }
  .btns {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
      padding: 8px 20px;
      border-radius: 4px;
      background: @color;
      color: #fff;
      margin-left: 20px;
    }
  }
  .con {
    margin-top: 20px;

    .published {
      height: 711px;
      padding: 20px 30px 0 30px;

      .con {
        .tit {
          text-decoration: underline;
        }
      }
    }
    .grid-content {
      position: relative;
      .shrink {
        cursor: pointer;
        position: absolute;
        width: 30px;
        right: 0;
        top: 50%;
        height: 60px;
        border-radius: 5px 0 0 5px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 24px;
        }
      }
    }
    .table {
      width: 100%;
      height: 559px;
      margin: 0 auto;
      text-align: center;
      // border: 1px solid #2ab8b3;
      margin-bottom: 15px;
      overflow: auto;
      table {
        overflow: auto;
        width: 100%;
        // height: 80%;
        // text-align: center;
        .trHover:hover {
          background-color: #faf1ed;
        }
      }
      .page {
        position: relative;
        margin: 5px;
        margin: 10px 0 10px 0;
      }
    }
    .subject {
      display: flex;
      justify-content: flex-start;
      // margin-top: 20px;
      width: 100%;
      position: relative;
      .import-in {
        background: #fff;
        width: 49%;
        margin-right: 20px;
        box-sizing: border-box;
        .word {
          width: 100%;
          height: 800px;
          border: 1px solid #e8e8e8;
          overflow-y: auto;
        }
        .btn {
          padding: 40px 50px;
          display: flex;
          justify-content: space-between;

          button {
            font-size: 18px;
            background: #fff;
            color: @color;
            border: 1px solid @color;
            border-radius: 3px;
          }
          .active {
            background: @color;
            color: #fff;
          }
          .choores {
            // background-color: #159484;
          }
        }
        .count {
          .title {
            font-size: 20px;
            color: #000;
            text-align: center;
          }
          .answer {
            margin-top: 26px;
            text-align: center;
            font-size: 16px;
            color: #333;
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
            label {
              margin-right: 50px;
            }
          }
          .picture {
            img {
              width: 100%;
            }
          }
        }
        .content {
          padding: 50px 0px;
          .title {
            font-size: 18px;
            color: @color;
            text-align: center;
            margin-bottom: 60px;
            text-decoration: underline;
            cursor: pointer;
          }
          .code {
            text-align: center;
            margin-bottom: 20px;
            img {
              width: 162px;
              height: 162px;
            }
          }
          .codetips {
            font-size: 18px;
            line-height: 30px;
            color: @color;
            span {
              display: block;
            }
          }
          .addimg {
            text-align: center;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .upload {
              position: relative;
              width: 97px;
              height: 38px;

              input {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 20px;
                left: 0;
                z-index: 2;
                cursor: pointer;
              }
            }
          }
        }
        .pros {
          padding: 0;
          .topic {
            padding: 0 20px;
            .titles {
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              .el-button {
                margin: 0;
                margin-right: 10px;
                margin-bottom: 10px;
              }
            }
            .timu {
              .head,
              .answer {
                padding: 10px;
                padding-left: 30px;
              }
              .list {
                box-shadow: 0 0 5px #ccc;
                border-radius: 5px;
                margin-bottom: 20px;
                position: relative;
                .index {
                  position: absolute;
                  left: 3px;
                  top: 10px;
                  font-size: 14px;
                  color: #ff8a00;
                }
                .foot {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  // height: 30px;
                  background: #eee;
                  border-radius: 0 0 4px 4px;
                  padding: 5px 10px;
                  p {
                    display: flex;
                  }
                  .left {
                    justify-content: flex-start;
                  }
                  .right {
                    justify-content: flex-end;
                    span {
                      padding: 4px 10px;
                      border-radius: 4px;
                      background: rgb(255, 138, 0);
                      color: #fff;
                    }
                  }
                }
              }
            }
            .page {
              padding-bottom: 20px;
              .el-pagination {
                text-align: center;
              }
            }
          }
          .tips {
            .code {
              img {
                width: auto;
                height: auto;
                max-width: none;
              }
            }
          }
        }
      }
      .import-out {
        flex: 1;
        background: #fff;
        position: relative;
        padding: 10px;
        .wordTest {
          // margin-top: 50px;
          // margin-left: 50px;
          padding: 10px;
          border: 1px solid #ccc;
          .anserList {
            margin: 10px;
            .leixing {
              margin: 5px;
            }
            .choores {
              // background-color: #159484;
              color: #fff;
            }
          }
          .testNature {
            padding: 10px;
            font-size: 18px;
            color: #159484;
          }
          .analysi {
            margin-top: 10px;
            padding: 10px;
            p {
              font-size: 18px;
              color: #159484;
            }
          }
          .questionBank {
            padding: 10px;
            margin-top: 10px;
            font-size: 18px;
            color: #159484;
            border-bottom: 2px dashed #eee;
            #question-conter {
              width: 95%;
            }
          }
          .anser-conter {
            padding: 10px;
            p {
              color: #159484;
              font-size: 18px;
            }
            .Anserconter {
              width: 95%;
            }
          }
          .label {
            padding: 10px;
            font-size: 18px;
            color: #159484;
          }
          .anser-score {
            span {
              font-size: 18px;
              color: #159484;
            }
          }
        }
        .title {
          font-size: 18px;
          color: @color;
          text-align: center;
          padding-top: 26px;
        }
        .nodata {
          margin-top: 100px;
          text-align: center;
          margin-bottom: 100px;
          img {
            width: 258px;
            height: 207px;
          }
          span {
            display: block;
            font-size: 16px;
            color: #b3b3b3;
            margin-top: 10px;
          }
        }
        .problem {
          margin-top: 20px;
          margin-bottom: 70px;
          .example {
            margin: 0 16px;
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            margin-bottom: 30px;
            .number {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-size: 14px;
              color: #ff8a00;
              .Elastic {
                margin-left: 5px;
                box-shadow: none;
                color: #d2d2d2;
                background-color: #fff;
                border: 1px solid #eee;
                font-size: 14px;
              }
              .query {
                font-size: 20px;
                color: #d2d2d2;
                margin-left: 5px;
              }
              span {
                padding: 4px 9px;
                background: #ff8a00;
                color: #fff;
                font-size: 14px;
                box-shadow: 3px 3px 0px rgba(255, 138, 0, 0.5);
                margin-right: 5px;
              }
            }
            .test {
              padding: 15px;
              font-size: 16px;
              color: #333;
              // margin-bottom: 30px;
              border-bottom: 1px dashed #ccc;
              .text {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                margin-top: 30px;
              }
            }
            .analysis {
              padding: 15px;
              // margin-bottom: 30px;
              .item {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 10px;
                .label {
                  font-size: 16px;
                  color: #159484;
                  line-height: 34px;
                  margin-right: 10px;
                }
                .input {
                  flex: 1;
                  #content,
                  .editDemo {
                    border: 1px solid #ccc;
                    color: #159484;
                    height: auto;
                    width: 100%;
                    padding: 15px;
                    box-sizing: border-box;
                  }
                  // border: 1px solid #e5e5e5;
                  input {
                    color: @color;
                    line-height: 34px;
                  }
                  .contentTitle {
                    border: 1px solid #ccc;
                    border-bottom: 0;
                    box-sizing: border-box;
                    padding: 10px;
                    ul {
                      width: 100%;
                      display: flex;
                      justify-content: flex-start;
                      align-items: center;
                      flex-wrap: wrap;
                      margin: 0;
                      padding: 0;
                      li {
                        width: 30px;
                        height: 30px;
                        position: relative;
                        font-size: 26px;
                        input {
                          width: 100%;
                          height: 100%;
                          opacity: 0;
                          position: absolute;
                          top: 0;
                          left: 0;
                          z-index: 1;
                          cursor: pointer;
                        }
                      }
                    }
                  }
                }
              }
              .nature {
                align-items: flex-start;
                margin-bottom: 20px;
                .sort {
                  flex: 1;
                  .li {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    margin-bottom: 20px;
                    .head {
                      font-size: 16px;
                      color: #159484;
                      margin-right: 20px;
                    }
                    .btn {
                      flex: 1;
                      display: flex;
                      justify-content: flex-start;
                      align-items: center;
                      flex-wrap: wrap;
                      button {
                        padding: 8px 15px;
                        color: #fff;
                        background: #dcdcdc;
                        border-radius: 4px;
                        cursor: pointer;
                        margin: 0;
                        margin-right: 10px;
                        margin-bottom: 10px;
                      }
                      .active {
                        background: @color;
                      }
                      .choores {
                        // background-color: #159484;
                      }
                    }
                  }
                }
                .custom {
                  padding: 8px 15px;
                  color: #fff;
                  background: #dcdcdc;
                  border-radius: 4px;
                  cursor: pointer;
                }
              }
              .Voice {
                justify-content: space-between;
                .label {
                  i {
                    font-size: 26px;
                    cursor: pointer;
                  }
                }
                .btn {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  flex: 1;
                  .left,
                  .right {
                    width: 50%;
                    display: flex;
                    align-items: center;
                  }
                  .left {
                    padding-left: 20px;
                    justify-content: flex-start;
                  }
                  .right {
                    justify-content: flex-end;
                  }
                  .el-slider {
                    width: 80px;
                  }
                  button {
                    font-size: 14px;
                    color: #fff;
                    background: @color;
                    padding: 9px 14px;
                    border-radius: 4px;
                    margin-left: 10px;
                    cursor: pointer;
                  }
                  .confirm {
                    background-color: #159484;
                  }
                  .delete {
                    background: #ff8a00;
                  }
                }
              }
            }
          }
        }
        .Release {
          position: absolute;
          bottom: 20px;
          width: 100%;
          text-align: center;
          span {
            font-size: 18px;
            color: #fff;
            background: @color;
            margin: 0 30px;
            padding: 8px 20px;
            border-radius: 4px;
            cursor: pointer;
          }
        }
      }
    }
    .cropper {
      width: 100%;
      height: 360px;
    }
    .cropper-content {
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      -webkit-justify-content: flex-end;
      .cropper {
        width: 260px;
        height: 260px;
      }
      .show-preview {
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        .preview {
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid #cccccc;
          background: #cccccc;
          margin-left: 40px;
        }
      }
    }
    .cropper-content .show-preview .preview {
      margin-left: 0;
    }
  }
}
.task-basket {
  cursor: pointer;
  position: absolute;
  right: -60px;
  top: 20%;
  .basket-con {
    position: absolute;
    width: 210px;
    background: #ffffff;
    right: 60px;
    top: 0;
    box-shadow: 6px 4px 10px rgba(224, 224, 220, 0.5);
  }
}
.Releases {
  font-size: 18px;
  color: #fff;
  background: @color;
  margin: 0 30px;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  text-align: center;
}
</style>
