<template>
<div class="log">
  <div class="reg-or-log" v-if="!this.$store.state.isLogin">
    <el-row>
      <el-col :span="4" :offset="8">
        <button class="pointer"  @click="toReg" :class='[style1]' >Sign Up</button>
      </el-col>
      <el-col :span="4">
        <button  @click="toLog" :class='[style2]'>Sign In</button>
      </el-col>
    </el-row>
  </div>
  <!-- 注册表单 -->
  <el-form @submit.native.prevent="() => false" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-if="!this.$store.state.isLogin && reg">
    <el-form-item label="Name" prop="name">
      <el-input v-model="ruleForm2.name"></el-input>
    </el-form-item>
    <el-form-item label="NUID" prop="num">
      <el-input v-model="ruleForm2.num"></el-input>
    </el-form-item>
    <!-- <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm2.email"></el-input>
    </el-form-item> -->
    <el-form-item label="Password" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="EnPassword" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <button class="submit pointer" @click="submitForm1('ruleForm2')">Submit</button>
      <button class="reset pointer" @click="resetForm('ruleForm2')">Reset</button>
    </el-form-item>
  </el-form>
  <!-- 登陆表单 -->
  <el-form @submit.native.prevent="() => false" label-width="100px" class="demo-ruleForm" v-if="!this.$store.state.isLogin && log">
    <el-form-item label="Name">
      <el-input v-model="checkName"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="checkPsd"></el-input>
    </el-form-item>
    <div class="forget">
      <span>Forget password?</span>
    </div>
    <el-form-item>
      <button native-type="button" class="login" @click="submitLogin">Sign in</button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import cookieManage from '../../mixins/cookieManage'
import initHandle from '../../mixins/initInfo'
export default {
  name: 'log',
  mixins:[cookieManage, initHandle],
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter passward again'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter passward again'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('Not same!'));
      } else {
        callback();
      }
    };
    return {
      reg: true,
      log: false,
      title: '',
      collectList:[],
      collectFileidList:[],
    
      checkPass: '',
      style1: 'change1',
      style2: 'choose-log',
      checkName: '',
      checkPsd: '',
      ruleForm2: {
        pass: '',
        checkPass: '',
        name: '',
        num: '',
        email: ''
      },
      rules2: {
        pass: [
          { required: true,validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true,validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          {required: true, message: 'Please enter your name', trigger: 'change'},
          {min: 2,max: 15, message: '2-15', trigger: 'blur'}
        ],
        num: [
          {required: true,message: 'Please enter your NUID', trigger: 'change'},
          {min: 10,max: 10, message: '10', trigger: 'blur'}
        ],
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'not valid', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
        // console.log(key, keyPath);
    },
    toReg() {
      this.reg = true;
      this.log = false;
      this.style1 = 'change1';
      this.style2 = 'choose-log';
    },
    toLog() {
      this.reg = false;
      this.log = true;
      this.style1 = 'choose-reg';
      this.style2 = 'change2';   
    },
    //注册，发送邮箱验证
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(formName)
          this.$http.post('/api/register', {
            name: this.ruleForm2.name,
            psd: this.ruleForm2.pass,
            email: this.ruleForm2.email,
            studentID: this.ruleForm2.num
          }).then(res => {
            if(res.body.success) {
              this.$store.commit('USER',{id:res.body.data.user._id, name: res.body.data.user.name})
              this.$store.commit('LOGIN')
              // this.$store.commit('isAdmin')
              this.$message.success("Succesfully")
              this.setCookie(true, res.body.data.user._id, res.body.data.user.name)
              this.$router.push({
                  path: '/'
              });
            } else {
              this.$message.error(res.body.msg)
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //登录
    submitLogin() {
      this.$http.post('/api/login', {
        name: this.checkName,
        psd: this.checkPsd,
      }).then(res => {
        if (res.body.success){
          this.$store.commit('USER',{id: res.body.data.user._id,name: res.body.data.user.name})
          this.$store.commit('LOGIN')
          localStorage.setItem("collectFileidList",JSON.stringify(res.body.data.user.collectFileidList))
          this.setCookie(true, res.body.data.user._id, res.body.data.user.name)
          if (res.body.data.isAuth) {
            this.$store.commit('AUTH')
          }
          this.$router.push({name: 'Home'})
        }
        else {
          this.$message.error(res.body.msg)
        }
      })
    },
    //获取用户信息
    getUserInfo() {
      this.$http.get(`/api/user?user_id=${this.$store.state.userid}`)
        .then(res => {
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
.pointer,button{
  cursor: pointer !important;
}
.log {
  width: 100%;
  height: 720px;
  margin: 20px auto 0 auto;
  background-color: rgba(143,220,244,0.3);
  .reg-or-log{
    width: 100%;
    margin: 0 auto 50px auto;
    padding-top: 90px;
    .choose-reg {
      border: none;
      background-color: rgba(0,0,0,0);
      font-size: 36px;
      font-weight: 300;
      outline: none;
      // margin: 0 0 0 44%;
    }
    .el-col {
      text-align: center;
    }
    .change1 {
      border: none;
      background-color: rgba(0,0,0,0);
      color:#20a0ff;
      font-size: 36px;
      font-weight: 300;
      outline: none;
      // margin: 0 0 0 44%;
    }
    .choose-log {
      border: none;
      background-color: rgba(0,0,0,0);
      font-size: 36px;
      font-weight: 300;
      outline: none;
      margin: 0 auto;
    }
    .change2 {
      border: none;
      background-color: rgba(0,0,0,0);
      color:#20a0ff;
      font-size: 36px;
      font-weight: 300;
      outline: none;
      margin: 0 auto;
    }
  }
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
    // position: relative;
    // top: -620px;
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
}
</style>

