<template>
<div class="user">
  <!-- 我的选择 -->
    <el-menu  class="el-menu-vertical-demo" v-if="$store.state.isLogin">
      <img src="/static/image/touxiang.png" class="touxiang">
      <el-menu-item index="1" @click="seeCollect">My Collection</el-menu-item>
      <el-menu-item index="2" @click="seeUpload">My Upload</el-menu-item>
      <el-menu-item index="3" @click="seeDownload">My Download</el-menu-item>
      <el-menu-item index="4" @click="seeWatch">My Focus Question</el-menu-item>
      <el-menu-item index="5" @click="seeQues">My Question</el-menu-item>
      <el-menu-item index="6" @click="seeAnswer">My Answer</el-menu-item>
      <el-menu-item index="7">
        <el-button type="text" @click="open2">Log Out</el-button>
      </el-menu-item>
    </el-menu>
    <!-- 我收藏的 -->
    <div class="see" v-if="collect">
        <div v-if="collectList.length === 0" class="empty"><a href="/file">None</a></div>
        <div v-else v-for="(el,index) in collectList" :key="index" :index="index+''" class="note">
          <div class="note-name">
            <span>{{el.title}}</span>
          </div>
          <div class="collect-info">
            <span>Size:{{el.size}}KB</span>
            <span class="sep"></span>
            <span>Type:{{el.fileType}}</span>
            <span class="sep"></span>
            <span>Time:{{el.lastModified.substr(0,10)}}</span>
            <span class="sep"></span>
            <span><img src="/static/image/downloadoff.png" class="download-font"><a :href="el.url">Download</a></span>
            <span class="sep"></span>
            <el-button type="text" @click="cancelCol(el._id)">Cancel</el-button>
          </div>
        </div>
    </div>
    <!-- 我上传的 -->
    <div class="see" v-if="upload">
      <div v-if="uploadList.length === 0" class="empty"><a href="/file">None</a></div>
      <div v-else v-for="(el,index) in uploadList" :key="index" :index="index+''" class="note">
        <div class="note-name">
          <span>{{el.title}}</span>
        </div>
        <div class="collect-info">
            <span>Size:{{el.size}}KB</span>
            <span class="sep"></span>
            <span>Type:{{el.fileType}}</span>
            <span class="sep"></span>
            <span>Time:{{el.lastModified.substr(0,10)}}</span>
            <span class="sep"></span>
            <span><img src="/static/image/downloadoff.png" class="download-font"><a :href="el.url">Download</a></span>
            <span class="sep"></span>
            <el-button type="text" @click="cancelUp(el._id)">Delete</el-button>
        </div>
      </div>
    </div>
    <!-- 我下载的 -->
    <div class="see" v-if="download">
      <div v-if="downList.length === 0" class="empty"><a href="/file">None</a></div>
      <div v-else v-for="(el,index) in downList" :key="index" :index="index+''" class="note">
        <div class="note-name">
          <span>{{el.title}}</span>
        </div>
        <div class="collect-info">
          <span>Size:{{el.size}}KB</span>
          <span class="sep"></span>
          <span>Type:{{el.fileType}}</span>
          <span class="sep"></span>
          <span>Time:{{el.updatedAt.substr(0,10)}}</span>
          <span class="sep"></span>
          <span><img src="/static/image/downloadoff.png" class="download-font"><a :href="el.url">Download</a></span>
        </div>
      </div>
    </div>
    <!-- 我关注的 -->
    <div class="see" v-if="watch">
      <div v-if="watchList.length === 0" class="empty"><a href="/issue">None</a></div>
      <div v-else v-for="(el,index) in watchList" :key="index" :index="index+''" class="note">
        <div class="note-name">
          <a :href="'/issuedetail?id=' + el._id" target="_blank" class="ques-title">
            <span>{{el.title}}</span>
          </a>
        </div>
        <div class="collect-info">
          <span>time:{{el.publishTime.substr(0,10)}}</span>
          <span class="sep"></span>
          <span>answer number:{{el.answers}}</span>
          <span class="sep"></span>
          <el-button type="text" @click="cancelWatch(el._id)">cancel</el-button>
        </div>
      </div>
    </div>
    <!-- 我提问的 -->
    <div class="see" v-if="ques">
      <div v-if="quesList.length === 0" class="empty"><a href="/issue">None</a></div>
      <div v-for="(el,index) in quesList" :key="index" :index="index+''" class="note">
        <div class="note-name">
          <a :href="'/issuedetail?id=' + el._id" target="_blank" class="ques-title">
            <span>{{el.title}}</span>
          </a>
        </div>
        <div class="collect-info">
          <span>time:{{el.publishTime.substr(0,10)}}</span>
          <span class="sep"></span>
          <span>answer number:{{el.answers}}</span>
          <span class="sep"></span>
          <el-button type="text" @click="cancelQues(el._id)">cancel</el-button>
        </div>
      </div>
    </div>
    <!-- 我回答的 -->
    <div class="see" v-if="ans">
      <div v-if="ansList.length === 0" class="empty"><a href="/issue">None</a></div>
      <div v-for="(el,index) in ansList" :key="index" :index="index+''" class="note">
        <div class="note-name">
          <a :href="'/issuedetail?id=' + el.issue" target="_blank" class="ques-title">
            <span>title:{{el.issueTitle}}</span>
          </a>
        </div>
        <div class="collect-info">
          <span>Time:{{el.publishTime.substr(0,10)}}</span>
          <span class="sep"></span>
          <span>Agree:{{el.approve}}</span>
          <span class="sep"></span>
          <span>Disagree{{el.against}}</span>
          <el-button type="text" @click="cancelAns(el.issue,el._id)">Delete</el-button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import cookieManage from '../../mixins/cookieManage'
import initHandle from '../../mixins/initInfo'
export default {
  name: 'user',
  mixins:[cookieManage, initHandle],
  data () {
    return {
      title: '',
      collectList:[],
      collectFileidList:[],
      uploadList:[],
      uploadFileidList: [],
      downList:[],
      downloadFileList:[],
      watchList:[],
      watchIssueList: [],
      quesList: [],
      issueList: [],
      ansList: [],
      answerList: [],
      collect: true,
      upload: false,
      download: false,
      watch: false,
      ques: false,
      ans:false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
        // console.log(key, keyPath);
    },
    seeCollect() {
      if(this.$store.state.isLogin) {
        this.collect = true;
        this.upload = false;
        this.download = false;
        this.watch = false;
        this.ques = false;
        this.ans = false;
        this.$http.post('/api/filesbyids', {
          idList: this.collectFileidList
        }).then(res =>{
          if(res.body.success) {
            res.body.data.forEach((el) => {
              el.url = `/api/download?name=${el.fileUrl}&raw=${el.fileName}&id=${el._id}&user_id=${this.$store.state.userid}`
            })
            this.collectList = res.body.data.reverse()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
      }
      else {
        this.$message({
          message: 'Log in first',
          type: 'warning'
        });
      }
    },
    cancelCol(file_id) {
      this.$confirm('Are you sure?', 'Hint', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.cancelCollect(file_id)
          this.$message({
            type: 'success',
            message: 'Successfully delet!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Continue'
          });          
        });
    },
    cancelCollect(file_id) {
      this.$http.post('/api/uncollect', {
        file_id: file_id,
        user_id: this.$store.state.userid
      }).then(res => {
        if(res.body.success) {
          this.seeCollect()//请求成功获取用户信息
        } else {
          this.$message.error(res.body.msg)
        }
      })
    },
    seeUpload() {
      this.collect = false;
      this.upload = true;
      this.download = false;
      this.watch = false;
      this.ques = false;
      this.ans = false;
      this.$http.post('/api/filesbyids', {
        idList: this.uploadFileidList
      }).then(res =>{
        if(res.body.success) {
          res.body.data.forEach((el) => {
            el.url = `/api/download?name=${el.fileUrl}&raw=${el.fileName}&id=${el._id}&user_id=${this.$store.state.userid}`
          })
          this.uploadList = res.data.data.reverse()
        }
        else {
          this.$message.error(res.body.msg)
        }
      })
    },
    cancelUp(_id) {
      this.$confirm('Are you sure?', 'Hint', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.cancelUpload(_id)
          this.$message({
            type: 'success',
            message: 'Successfully delete!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel delete'
          });          
        });
    },
    cancelUpload(_id) {
      this.$http.get(`/api/deletefile?id=${_id}&user_id=${this.$store.state.userid}`)
        .then(res => {
          if(res.body.success) {
            this.seeUpload()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
    },
    seeDownload() {
      if(this.$store.state.isLogin) {
        this.collect = false;
        this.upload = false;
        this.download = true;
        this.watch = false;
        this.ques = false;
        this.ans = false;
        this.$http.post('/api/filesbyids', {
          idList: this.downloadList
        }).then(res =>{
          if(res.body.success) {
            res.body.data.forEach((el) => {
              el.url = `/api/download?name=${el.fileUrl}&raw=${el.fileName}&id=${el._id}&user_id=${this.$store.state.userid}`
            })
            this.downList = res.data.data.reverse()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
      }
      else {
        this.$message({
          message: 'Log in first',
          type: 'warning'
        });
      }
    },
    seeWatch() {
      if(this.$store.state.isLogin) {
        this.collect = false;
        this.upload = false;
        this.download = false;
        this.watch = true;
        this.ques = false;
        this.ans = false;
        this.$http.post('/api/getIssueByids', {
          ids: this.watchIssueList
        }).then(res =>{
          if(res.body.success) {
            this.watchList = res.body.data.reverse()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
      }
      else {
        this.$message({
          message: 'Log in first',
          type: 'warning'
        });
      }
    },
    cancelWatch(issue_id) {
      this.$confirm('Are you sure?', 'Hint', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.cancelWatchIssue(issue_id)
          this.$message({
            type: 'success',
            message: 'Delete!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          });          
        });
    },
    cancelWatchIssue(issue_id) {
      this.$http.get(`/api/cancelWatchIssue?userid=${this.$store.state.userid}&issueid=${issue_id}`)
        .then(res => {
          if(res.body.success) {
            this.seeWatch()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
    },
    seeQues() {
      if(this.$store.state.isLogin) {
        this.collect = false;
        this.upload = false;
        this.download = false;
        this.watch = false;
        this.ques = true;
        this.ans = false;
        this.$http.post('/api/getIssueByids', {
          ids: this.issueList
        }).then(res =>{
          if(res.body.success) {
            // console.log(res.body.data)
            this.quesList = res.body.data.reverse()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
      }
      else {
        this.$message({
          message: 'Log in first',
          type: 'warning'
        });
      }
    },
    cancelQues(id) {
      this.$confirm('Are you sure?', 'Hint', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.cancelQuesIssue(id)
          // this.$message({
          //   type: 'success',
          //   message: '已删除!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          });          
        });
    },
    cancelQuesIssue(id) {
      this.$http.get(`/api/deleteIssue?id=${id}`)
        .then(res => {
          if(res.body.success) {
            this.$message.success('Successfully Delete')
            this.seeQues()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
    },
    seeAnswer() {
      if(this.$store.state.isLogin) {
        this.collect = false;
        this.upload = false;
        this.download = false;
        this.watch = false;
        this.ques = false;
        this.ans = true;
        this.$http.post('/api/getAnswerByids', {
          ids: this.answerList
        }).then(res =>{
          if(res.body.success) {
            // console.log(res.body.data)
            this.ansList = res.body.data.reverse()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
      }
      else {
        this.$message({
          message: 'Log in first',
          type: 'warning'
        });
      }
    },
    cancelAns(issue_id,answer_id) {
        this.$confirm('Are you sure?', 'Hint', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.cancelAnsIssue(issue_id,answer_id)
          this.$message({
            type: 'success',
            message: 'Successfully delete!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          });          
        });
    },
    cancelAnsIssue(issue_id,answer_id) {
      this.$http.get(`/api/deleteAnswer?userid=${this.$store.state.userid}&issueid=${issue_id}&answerid=${answer_id}`)
        .then(res => {
          if(res.body.success) {
            this.seeAnswer()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
    },
    open2() {
      this.$confirm('Are you sure?', 'Hint', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.$store.commit('LOGOUT'),
        this.cookieLogout()
        this.$router.push({path: '/'})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancel'
        });          
      });
    },
    //获取用户信息
    getUserInfo() {
      this.$http.get(`/api/user?user_id=${this.$store.state.userid}`)
        .then(res => {
          // console.log(res.data)
         //这里获取的是对应信息的id列表，具体得到列表里的信息还需要用这个id去请求
          this.collectFileidList = res.data.data.collectFileidList
          this.uploadFileidList = res.data.data.uploadFileidList
          this.downloadList = res.data.data.downloadFileidList
          this.issueList = res.data.data.issueList
          this.answerList = res.data.data.answerList
          this.watchIssueList = res.data.data.watchIssueList
        })
    }
  },
  created () {
    if (this.initInfo()) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  height: 720px;
  margin: 20px auto 0 auto;
  background-color: rgba(143,220,244,0.3);
  .el-menu-vertical-demo {
    width: 180px;
    height: 720px;
    .touxiang {
      position: relative;
      top: 90px;
      left: 50px;
      height: 80px;
      width: 80px;
    }
    .el-menu-item {
      position: relative;
      top: 100px;
      height:65px;
      text-align: center;
    }
  }
  .demo-ruleForm {
    width: 400px;
    margin: 10px auto;
    border: 1px solid rgb(200,200,200);
    border-radius: 10px;
    background-color: rgba(210,210,210,0.3);
    padding: 50px 70px 40px 20px;
    .el-input {
      background-color: transparent;
    }
    .submit {
      width: 147px;
      height: 35px;
      font-size: 15px;
      background-color:#20a0ff;
      color: white;
      border: none;
      border-radius: 5px;
    }
    .reset {
      width: 147px;
      height: 35px;
      font-size: 15px;
      background-color: white;
      border: 1px solid #bfcbd9;
      border-radius: 5px;
    }
  }
  .forget {
    color:#20a0ff;
    font-size: 12px;
    float: right;
  }
  .login {
    width: 300px;
    height: 35px;
    margin-top: 20px;
    font-size: 16px;
    background-color: #20a0ff;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .see {
    position: absolute;
    top: 70px;
    left: 30%;
    overflow-y: auto;
    height: 650px;
    width: 700px;
    .note {
      margin: 30px 0;
      height: 100px;
      width: 100%;
      border-bottom: 1px solid #d6d6d6;
      .note-name {
        width: 100%;
        font-weight: bold;
        font-size: 21px;
        margin: 0 0 8px 0;
        a {
          text-decoration: none;
          color: #2c3e50;
        }
      }
      .collect-info {
        font-size: 14px;
        color: #9eadb6;
        margin-top: 10px;
        .sep {
          display: inline-block;
          vertical-align: middle;
          margin: 0 15px;
          height: 13px;
          overflow: hidden;
          width: 1px;
          background-color: #d6d6d6;
          position: relative;
          top: -2px;
        }
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
    margin-top: 120px;
    a {
      color: rgb(158,159,156);
      text-decoration: none;
    }   
  }
}
</style>

