<template>
<div class="list">
  <!-- 基础导航栏 -->
  <div class = "left-plat">
    <!-- 导航栏 -->
    <div class="el-menu-demo">
    <el-menu :default-active="activeIndex2"  mode="vertical" @select="handleSelect">   
        <el-menu-item index="1" @click="toNote">View Note</el-menu-item>
        <el-menu-item index="2" @click="toText">View Slide</el-menu-item>
        <el-menu-item index="3" @click="toSub">Upload</el-menu-item>
    </el-menu>
    </div>
  </div>
  <!-- 看笔记 -->
  <div class="see-note" v-if="ifNote">
    <!--具体资料-->
      <el-col :span="18" :offset="2">
        <div class="download-detail">
          <div v-if="noteList.length === 0" class="empty"><a href="/file">No one has uploaded it yet, Come On</a></div>
          <div v-for="(el,index) in noteList" :key="index" :index="index+''" class="note-download">
            <div class="note-name">
              <span>{{el.title}}</span>
            </div>
            <div class="rol-two">
              <div class="note-size">
                <span>Size:{{el.size}}KB</span>
              </div>
              <div class="note-type">
                <span>Type:{{el.fileType}}</span>
              </div>
              <div class="note-time">
                <span>Time:{{el.lastModified.substr(0,10)}}</span>
              </div>
            </div>
            <div class="rol-three">
              <div class="note-collect">
                <div class="not-col" v-if= "!collectFileidList.includes(el._id)" @click="toCollect(el._id)">
                  <img src="/static/image/collectoff.png">
                  <span>Collect</span>
                </div>
                <div class="col" v-if="collectFileidList.includes(el._id)" @click="cancelCollect(el._id)">
                  <img src="/static/image/collecton.png">
                  <span>Cancel</span>
                </div>
              </div>
              <div class="note-button" v-if="$store.state.isLogin">
                <img src="/static/image/downloadoff.png" class="download-font">
                <a :href="el.url">Download</a>
              </div>
            </div>
          </div>
        </div>
      </el-col>
  </div>
  <!-- 看课件 -->
  <div class="see-text" v-if="ifText">
      <!-- 具体资料 -->
      <el-col :span="18" :offset="2">
        <div class="download-detail">
          <div v-if="coursewareList.length === 0" class="empty"><a href="/file">No one has uploaded it yet, Come On</a></div>
          <div v-for="(el,index) in coursewareList" :key="index" :index="index+''" class="note-download">
            <div class="note-name">
              <span>{{el.title}}</span>
            </div>
            <div class="rol-two">
              <div class="note-size">
                <span>Size:{{el.size}}KB</span>
              </div>
              <div class="note-type">
                <span>Type:{{el.fileType}}</span>
              </div>
              <div class="note-time">
                <span>Time:{{el.lastModified.substr(0,10)}}</span>
              </div>
            </div>
            <div class="rol-three">
              <div class="note-collect">
                <div class="not-col" v-if= "!collectFileidList.includes(el._id)" @click="toCollect(el._id)">
                  <img src="/static/image/collectoff.png">
                  <span>Collect</span>
                </div>
                <div class="col" v-if="collectFileidList.includes(el._id)" @click="cancelCollect(el._id)">
                  <img src="/static/image/collecton.png">
                  <span>Cancel</span>
                </div>
              </div>
              <div class="note-button" v-if="$store.state.isLogin">
                <img src="/static/image/downloadoff.png" class="download-font">
                <a :href="el.url">Download</a>
              </div>
            </div>
          </div>
        </div>
      </el-col>
  </div>
  <!-- 上传 -->
  <div class="submit" v-if="ifSubmit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Title" prop="name" class="title">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Type" prop="objectType" class="choose-subject">
        <el-select v-model="ruleForm.objectType">
          <el-option label="Node" value=0></el-option>
          <el-option label="Courseware" value=1></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-upload class="upload-demo" action="/api/file" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :on-success="sendFileInfo">
      <el-button :disabled="ruleForm.name === '' || ruleForm.objectType === '' || !$store.state.isLogin">Submit</el-button>
    </el-upload>
  </div>
</div>
</template>
<script>
import cookieManage from '../../mixins/cookieManage'
import initHandle from '../../mixins/initInfo'
export default {
  name: 'list',
  mixins:[cookieManage, initHandle],
  data () {
    return {
      activeIndex2: '1',
      fileList: [],
      input:'',
      acadamy: '',
      acadamys: [],
      moreAcadamys:[],
      allAcadamies:[],
      value1: '',
      value2: '',
      value3: '',
      ifNote: true,
      ifText: false,
      ifSubmit: false,
      ruleForm: {
        name: '',
        // acadamy: '',
        objectType: ''   
      },
      rules: {
        name: [
          {required: true, message: 'Please enter title', trigger: 'change'},
          {min: 3,max: 500, message: 'Please enter more than 3 words', trigger: 'blur'}
        ],
        acadamy: [
          {required: true, message: 'Please enter department', trigger: 'change' }
        ],
        objectType: [
          {required: true, message: 'Please enter type', trigger: 'change'}
        ],
      },
      tableData: [],
      download: '',
      downloads: [],
      fileName: '',
      noteList: [],
      coursewareList: [],
      activeNames: ['1'],
      notCol: true,
      col: false,
      collectFileidList:[]
    }
  },
  mounted() {
        
  },
  methods: {
    submitUpload() {
        this.$refs.upload.submit();
      },
    handleSelect(key, keyPath) {
        // console.log(key, keyPath);
    },
    handleRemove(file, fileList) {
        // console.log(file, fileList);
    },
    handlePreview(file) {
        // console.log(file);
    },
    toNote() {
      this.ifNote = true;
      this.ifText = false;
      this.ifSubmit = false;
      this.getData()

    },
    toText() {
      this.ifNote = false;
      this.ifText = true;
      this.ifSubmit = false;
      this.getData()
    },
    toSub() {
      this.ifNote = false;
      this.ifText = false;
      this.ifSubmit = true;
    },
    toCollect(file_id) {
      if(this.$store.state.isLogin) {
        this.$http.post('/api/collect', {
          file_id: file_id,
          user_id: this.$store.state.userid
        }).then(res => {
          if (res.body.success) {
            this.getUserInfo()
          } else {
            this.$message.error(res.body.msg)
          }
        })
      }
      else {
        this.$message.warning('Please log in first')
      }
    },
    cancelCollect(file_id) {
      if(this.$store.state.isLogin) {
        this.$http.post('/api/uncollect', {
          file_id: file_id,
          user_id: this.$store.state.userid
        }).then(res => {
          if(res.body.success) {
            this.getUserInfo()
          } else {
            this.$message.error(res.body.msg)
          }
        })
      }
      else {
        this.$message.warning('Please log in first')
      }
    },
    //上传上传文件时的填写信息
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    //上传文件
    sendFileInfo (res) {
      if(this.$store.state.isLogin) {
        if (res.success) {
          this.$http.post('/api/file-info', {
            info: this.ruleForm,
            id: res.id,
            author_id: this.$store.state.userid
          }).then(res => {
            console.log("upload")
            if(res.body.success) {
              this.$message({
                message: 'success',
                type: 'success'
              });
              this.getUserInfo()
              this.getData()
            }
            else {
              this.$message.error(res.body.msg)
            }
          })
        }
      }
      else {
        this.$message.warning('Please log in first')
      }
    },
    //获取下载信息
    getData() {
      this.$http.get('/api/file')
        .then(res => {
          var downloads = res.body.data
          console.log(downloads)
          this.noteList = []
          this.coursewareList = []
          downloads.forEach((el) => {
            el.url = `/api/download?name=${el.fileUrl}&raw=${el.fileName}&id=${el._id}&user_id=${this.$store.state.userid}`
            // el.objectType === 0 ? this.noteList.push(el) : this.coursewareList.push(el)
            this.noteList.push(el)
          })
      })
    },
    //获取学院信息
    getAcadamys() {
      this.$http.get('/api/acadamylist')
        .then(res => {
            if(res.body.success) {
              this.allAcadamies = res.data.data
              this.acadamys = res.data.data.slice(0,5)
              this.moreAcadamys = res.data.data.slice(5)
            }
            else {
              this.$message.error(res.body.msg)
            }
        })
    },
    //获取更多学院...
    getMoreAcadamys() {
      this.$http.get('/api/acadamylist')
        .then(res => {
            if(res.body.success) {
              this.moreAcadamys = res.data.dataaoe
            }
            else {
              this.$message.error(res.body.msg)
            }
        })
    },
    //显示按学院显示的资料文件
    showAcadamyFileList(key) {
      this.$http.get(`/api/getfilebyacadamy?acadamy=${key}`)
        .then(res => {
          if(res.body.success) {
            this.downloads = res.data.data
            this.noteList = []
            this.coursewareList = []
            this.downloads.forEach((el) => {
              el.url = `/api/download?name=${el.fileUrl}&raw=${el.fileName}&id=${el._id}&user_id=${this.$store.state.userid}`
              this.getUserInfo()
              el.objectType === 0 ? this.noteList.push(el) : this.coursewareList.push(el)
            })
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
    },
    getUserInfo() {
      this.$http.get(`/api/user?user_id=${this.$store.state.userid}`)
        .then(res => {
          if(res.body.success) {
            this.collectFileidList = res.data.data.collectFileidList
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
    }
  },
  created () {
    this.getData()
    this.getAcadamys()
    // this.getMoreAcadamys()
    if (this.initInfo()) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
}
  .file-back {
    width: 100%;
    height: 350px;
    img {
      z-index: -999;
      width: 100%;
      height: 100%;
    }
    .back-slogan {
      font-size: 29px;
      color: white;
      width: 400px;
      margin: 0 auto;
      position: relative;
      top: -230px;
      letter-spacing: 1px;
      text-shadow: 2px 2px 18px white;
    }
  }
  // .el-menu-demo {
  //   position: relative;
  //   top: 30px;
  // }
  .el-menu-vertical-demo {
    .el-menu-item {
      height: 80px;
      line-height: 80px;
    }
    background-color: white;
    // width: 20%;
  }
  .el-button {
    margin: 0 14px 0 0;
  }
  .download-detail {
    min-height: 300px;
    border: 1px solid #eaeefb;
    position: relative;
    padding: 20px,5px;
    // top: -200px;
    // left: 20%;
    width: 80%;
    .empty {
      a {
        color: rgb(158,159,156);
        text-decoration: none;
      }
    }
    .note-download {
      margin: 30px 0;
      height: 100px;
      border-bottom: 1px solid #d6d6d6;
      .note-name {
        width: 100%;
        font-weight: bold;
        font-size: 21px;
        margin: 0 0 8px 20px;
      }
      .rol-two {
        float: left;
        .note-size {
          float: left;
          margin-left: 20px;
          font-size: 15px;
        }
        .note-type {
          vertical-align: middle;
          float: left;
          margin-left: 25px;
          font-size: 15px;
        }
        .note-time {
          vertical-align: middle;
          float: left;
          margin-left: 25px;
          font-size: 15px;
        }
      }
      .rol-three {
        clear: left;
        margin-top: 32px;
        cursor: pointer;
        .note-collect {
          margin-left: 20px;
          float: left;
          font-size: 13px;
          img {
            position: relative;
            top: 2px;
            width: 20px;
            height: 20px;
          }
          .col {
            color: rgb(237,100,92);
            span {
              padding:2px;
              border: 1px solid rgb(237,100,92);
            }
          }
        }
        .note-button {
          float: left;
          margin-left: 60px;
          font-size: 13px;
          position: relative;
          top: 2px;
          a {
            text-decoration: none;
            color: #515151;
          }
          .download-font {
            position: relative;
            top: 2px;
            width: 18px;
            height: 18px;
          }
        }
      }  
    }
    .empty {
      height: 30px;
      text-align: center;
      padding-top: 20px;
      a {
        color: gray;
        text-decoration-line: none;
      }
    }
  }
  .submit {
    margin-top: 20px;
      .title {
        width: 400px;
        // margin: 20px auto;
      }
      
      .choose-subject {
        width: 400px;
        // margin: 20px auto;
      }
      .upload-demo {
      width: 150px;
      margin: 10px 50px;
      position: relative;
      left: 10px;
      button {
        width:150px;
      }
      }
      // .sub-option {
      //   position: relative;
      //   left: 450px;
      //   top: 90px;
      // }
      // .el-select {
      //   width:300px;
      // }
  }
.user-store {
  position: relative;
  top: 80px;
}
.see-note {
  width:82%;
}
.see-text {
  width:82%;
}
.submit {
  width:82%;
}
.left-plat{
    width:18%;
    margin: 0.2%;
    box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
    // background-color: silver;
    .user-information{
    height:100%;
    width:100%;
    text-align: center;
    }
    .el-menu-demo {
    position: relative;
    width: 100%;
    height:1000px;
    background: rgb(239,241,246);
    }
}
</style>