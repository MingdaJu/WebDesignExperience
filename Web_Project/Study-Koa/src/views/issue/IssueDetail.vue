<template>
<body>
<div class="list-detail">
  <div class="ques">
    <div class="ques-title">
      <span>{{title}}</span>
    </div>
    <div class="ques-detail">
      <span>{{detail}}</span>
      <!-- <span>{{imageUrl}}</span> -->
    </div>
    <div class="ques-info">
      <el-button size="small" @click="collectQues(_id)">collect</el-button>
      <span>answer:{{answers}}</span>
      <span class="sep"></span>
      <span>time：{{publishTime.substr(0,10)}}</span>
      <span class="sep"></span>
      <span>by：{{authorName}}</span>
    </div>
  </div>
  <div class="ans">
    <div class="ans-item" v-for="(el,index) in anses" :key="index" :index="index+''"> 
      <div class="ans-detail">
        <span>{{el.detail}}</span>
      </div>
      <div class="ans-info">
        <span>By：{{el.authorName}}</span>
        <span class="sep"></span>
        <span>Time：{{el.publishTime.substr(0,10)}}</span>
        <span class="sep"></span>
        <span class="icon" v-if="userApproveList.indexOf(el._id) === -1" @click="approve(el._id,el.author_id)"><img src="/static/image/notapprove.png">&nbsp;&nbsp;{{el.approve}} 人</span>
        <span class="icon" v-else @click="notApprove(el._id)"><img src="/static/image/approve.png">&nbsp;&nbsp;{{el.approve}} person</span>
        <span class="sep"></span>
        <span class="icon" v-if="userAgainstList.indexOf(el._id) === -1" @click="against(el._id,el.author_id)"><img src="/static/image/notagainst.png">&nbsp;&nbsp;{{el.against}} 人</span>
        <span class="icon" v-else @click="notAgainst(el._id)"><img src="/static/image/against.png">&nbsp;&nbsp;{{el.against}} person</span>
        <!-- <span class="icon" ><img src="/static/image/approve.png">&nbsp;&nbsp;1 Person</span>
        <span class="sep"></span>
        <span class="icon" ><img src="/static/image/against.png">&nbsp;&nbsp;2 Person</span> -->
      </div>
    </div>
    <div class="want-ans">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="I Want to Answer" prop="desc" class="desc">
          <el-input type="textarea" v-model="ruleForm.desc" :rows="5"></el-input>  
        </el-form-item>
        <el-form-item label="Upload">
          <el-upload action="/api/addIssueImage" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="imageUrlHandle">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>  
        </el-form-item>
      </el-form>
      <el-button :disabled="ruleForm.desc === ''" class="submit-ans" @click="sendAnsInfo">Submit</el-button>
    </div>
  </div>
  
</div>
</body>
</template>
<script>
import cookieManage from '../../mixins/cookieManage'
import initHandle from '../../mixins/initInfo'
export default {
  mixins:[cookieManage, initHandle],
  data () {
    return {
      title: '',
      detail: '',
      imageUrl: '',
      answers: '',
      _id: '',
      author_id: '',
      publishTime: '',
      authorName: '',
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
				desc: ''
      },
      rules: {
				desc: [
					{ required: true, message: 'Please write detail description', trigger: 'blur' }
				]
			},
      ansImageUrl: [],
      anses: [],
      userApproveList:[],
      userAgainstList:[]
    }
  },
  mounted() {
        
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getIssue() {
      this.$http.get(`/api/getIssueByid?id=${this.$route.query.id}`)
				.then(res => {
          if(res.body.success) {
            this.title = res.body.data.title;
            this.detail = res.body.data.detail;
            this.imageUrl = res.body.data.imageUrl;
            this.answers = res.body.data.answers;
            this.publishTime = res.body.data.publishTime;
            this.authorName = res.body.data.authorName;
            this._id = res.body.data._id;
            this.author_id = res.body.data.author_id;
            this.getAns(res.body.data.answersId)
          }
          else {
            this.$message.error(res.body.msg)
          }
				})
    },
    getAns(ids) {
      this.$http.post('/api/getAnswerByids', {
        ids: ids
      }).then(res => {
        if(res.body.success) {
          this.anses = res.body.data
        }
        else {
          this.$message.error(res.body.msg)
        }
      })
    },
    collectQues(issueid) {
      if(this.$store.state.isLogin) {
        this.$http.get(`/api/watchIssue?userid=${this.$store.state.userid}&issueid=${issueid}`)
          .then(res => {
            this.$message({
              message: 'Success',
              type: 'success'
            })
            this.getUserInfo()
            this.getIssue()
          })
      }
    },
    approve(answer_id) {
      if(this.$store.state.isLogin) {
        this.$http.get(`/api/approveIssue?userid=${this.$store.state.userid}&answerid=${answer_id}`)
          .then(res => {
            if(res.body.success) {
              this.getUserInfo()
              this.getIssue()
            }
            else {
              this.$message.warning(res.body.msg)
            }
          })
      }
      else {
        this.$message.warning('Please log in first')
      } 
    },
    notApprove(answer_id) {
      if(this.$store.state.isLogin) {
        this.$http.get(`/api/cancelApproveIssue?userid=${this.$store.state.userid}&answerid=${answer_id}`)
        .then(res => {
          if(res.body.success) {
            this.getUserInfo()
            this.getIssue()
          }
          else {
            this.$message.warning(res.body.msg)
          }
        })
      }
      else {
        this.$message.warning('Please log in first')
      }
    },
    against(answer_id,author_id) {
      if(this.$store.state.isLogin) {
        this.$http.get(`/api/againstIssue?userid=${author_id}&answerid=${answer_id}`)
        .then(res => {
          if(res.body.success) {
            this.getUserInfo()
            this.getIssue()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
      }
      else {
        this.$message.warning('Please log in first')
      }
    },
    notAgainst(answer_id,author_id) {
      if(this.$store.state.isLogin) {
        this.$http.get(`/api/cancelAgainstIssue?userid=${author_id}&answerid=${answer_id}`)
        .then(res => {
          if(res.body.success) {
            this.getUserInfo()
            this.getIssue()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
      }
      else {
        this.$message.warning('Please log in first')
      }
    },
    sendAnsInfo() {
      if(this.$store.state.isLogin) {
        this.$http.post('/api/publishAnswer', {
          answer: {
            issue: this.$route.query.id,
            target: '',
            detail: this.ruleForm.desc,
            author_id: this.$store.state.userid,
            authorName: this.$store.state.name
          }
        }).then(res => {
          if(res.body.success) {
            this.$message.success('success')
            this.ansImageUrl = []
            this.getIssue()
          }
          else {
            this.$message.error(res.body.msg)
          }
        })
      }
    },
    imageUrlHandle (res){
			this.ansImageUrl.push(res.body.url)
		},
    getUserInfo() {
      this.$http.get(`/api/user?user_id=${this.$store.state.userid}`)
        .then(res => {
          this.collectFileidList = res.data.data.collectFileidList
          this.userApproveList = res.data.data.approveList,
          this.userAgainstList = res.data.data.againstList
        })
    }
  },
  created () {
    if(this.initInfo()) {
      this.getUserInfo()
    }
    this.getIssue()
    //this.getAns()
  }
}
</script>

<style lang="less" scoped>
.list-detail {
  position: relative;
  // top:20px;
  padding: 20px 0 20px 0;
  // background-image: url("/static/image/blackboard black.jpg");
  background: rgb(237,239,245);
	// background-color:lightgray;
  .ques {
    width: 70%;
    margin: 0 auto;
    padding: 15px;
    background-color:rgba(255, 255, 255, 0.7);
    // background-color:grey;
    border-radius: 2px;
    box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
    .ques-title {
          display: inline;
          font-size: 24px;
          line-height: 34px;
          font-weight: 400;
          // font-family:'Times New Roman', Times, serif;
          overflow: hidden;
    }
    .ques-detail {
      font-size: 14px;
      line-height: 24px;
      margin-top: 20px;
    }
    .ques-info {
      font-size: 12px;
      // color: #9eadb6;
      color:grey;
      margin-top: 10px;
      .sep {
        display: inline-block;
        vertical-align: middle;
        margin: 0 8px;
        height: 13px;
        overflow: hidden;
        width: 1px;
        background-color: #e8ecee;
        position: relative;
        top: -2px;
      }
    }
  }
  .ans {
    width: 70%;
    margin: 20px auto 0 auto;
    .ans-item {
      margin: 10px auto;
      padding: 15px;
       background-color:rgba(255, 255, 255, 0.8);
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      .ans-info {
        font-size: 12px;
        // color: #9eadb6;
        color:grey;
        margin-top: 10px;
        .sep {
          display: inline-block;
          vertical-align: middle;
          margin: 0 8px;
          height: 13px;
          overflow: hidden;
          width: 1px;
          background-color: #e8ecee;
          position: relative;
          top: -2px;
        }
        .icon {
          cursor: pointer;
          img {
            width: 25px;
            height: 25px;
            position: relative;
            top: 6px;
          }
        }
      }
    }
    .want-ans {
      margin: 10px auto;
      padding: 15px;
       background-color:rgba(255, 255, 255, 0.7);
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      .upload-demo {
        img {
          width: 20px;
          height: 20px;
          position: relative;
          top: -24px;
          left: 8px;
        }
      }
      .submit-ans {
        width: 200px;
        margin: 0 38%;
      }
    }
  }
}
</style>