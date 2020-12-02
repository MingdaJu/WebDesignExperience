
<template>
  <div id="app">
    <div class="nav-bar" >
      <el-menu :default-active="$route.path"  class="el-menu-demo" mode="horizontal" @select="handleSelect" router style="background-color:white">
        <el-menu-item index="/" style="width: 18%">
          <img style="width:40px;height:40px;" src="../static/image/logo.png">
          <span style="font-size:27px;font-weight:bold;color:rgb(91,160,241)">HUSTAR</span>
        </el-menu-item>
        <el-menu-item index="" style="width: 25%">
          <el-input
            placeholder="Search..."
            icon="search"
            v-model="fuzzySearch" 
            :on-icon-click="handleIconClick">
          </el-input>
        </el-menu-item>
        <el-menu-item style="width: 20%" index=""></el-menu-item>
        <el-menu-item style="width: 7%" index="/file">Share</el-menu-item>
        <el-menu-item style="width: 7%" index="/issue">Discuss</el-menu-item>
        <el-menu-item style="width: 7%" index="/news">News</el-menu-item>
        <el-menu-item style="width: 7%" index="/video">Video</el-menu-item>
        <el-menu-item style="width: 7%" index="/user" v-if="$store.state.isLogin">
          <el-button type="primary" round>My</el-button>
        </el-menu-item>
        <el-menu-item style="width: 7%" v-if="!$store.state.isLogin" index="">
          <el-button type="text" @click="dialogFormVisible = true">Sign in/ Sign up</el-button>
        </el-menu-item> 
          <el-dialog class="dialog" :visible.sync="dialogFormVisible">
            <div class="log">
              <div class="reg-or-log" v-if="!this.$store.state.isLogin">
                <el-row>
                  <el-col :span="6" :offset="6">
                    <el-button  class="pointer"  @click="toReg" :class='[style1]' >Sign Up</el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-button class="pointer"  @click="toLog" :class='[style2]'>Sign In</el-button>
                  </el-col>
                </el-row>
              </div>
              <!-- 注册表单 -->
              <el-form @submit.native.prevent="() => false" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" v-if="!this.$store.state.isLogin && reg">
                <el-form-item label="Name" prop="name">
                  <el-input class="input" v-model="ruleForm2.name"></el-input>
                </el-form-item>
                <el-form-item label="NUID" prop="num">
                  <el-input class="input" v-model="ruleForm2.num"></el-input>
                </el-form-item>
                <!-- <el-form-item label="邮箱" prop="email">
                  <el-input v-model="ruleForm2.email"></el-input>
                </el-form-item> -->
                <el-form-item label="Password" prop="pass">
                  <el-input class="input" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="EnPassword" prop="checkPass">
                  <el-input class="input" type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                  <button class="submit pointer" @click="submitForm1('ruleForm2')">Submit</button>
                  <button class="reset pointer" @click="resetForm('ruleForm2')">Reset</button>
                </el-form-item> -->
              </el-form>
              <!-- 登陆表单 -->
              <el-form @submit.native.prevent="() => false" label-width="100px" class="demo-ruleForm" v-if="!this.$store.state.isLogin && log">
                <el-form-item label="Name">
                  <el-input class="input" v-model="checkName"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                  <el-input class="input" type="password" v-model="checkPsd"></el-input>
                </el-form-item>
                <div class="forget">
                  <span>Forget password?</span>
                </div>
                <!-- <el-form-item>
                  <button native-type="button" class="login" @click="submitLogin">Sign in</button>
                </el-form-item> -->
              </el-form>
            </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="submitAll()">Confirm</el-button>
                </span>
          </el-dialog>
        

      </el-menu>
    </div>
    <router-view></router-view>
  
  </div>
</template>
<script>
import cookieManage from './mixins/cookieManage'
import initHandle from './mixins/initInfo'
export default {
  name: 'app',
  mixins:[cookieManage, initHandle],
  data() {
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
        callback(new Error('Password doesn\'t match!'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      my: false,
      regAndLog: true,
      activeIndex2: '1',
      fuzzySearch: '',      
      reg: true,
      log: false,
      title: '',
      collectList:[],
      collectFileidList:[],
    
      checkPass: '',
      style1: 'change1',
      style2: 'change2',
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
          {min: 2,max: 15, message: 'Character must between 2-15!', trigger: 'blur'}
        ],
        num: [
          {required: true,message: 'Please enter your NUID', trigger: 'change'},
          {min: 10,max: 10, message: 'NUID must be 10 digits!', trigger: 'blur'}
        ],
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'This is not a valid email!', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    submitAll() {
      this.dialogFormVisible = false;
      if(this.reg===true) {
        this.submitForm1('ruleForm2');
      }
      else {
        this.submitLogin();
      }
    },
    handleSelect(key, keyPath) {
        // console.log(key, keyPath);      
    },
    checkLog() {
      // console.log(this.$store.state.isLogin)
      // console.log(this.$store.state.isAdmin)
      if(this.$store.state.isLogin) {
        this.my = true;
        this.regAndLog = false;
      }
    },
    handleIconClick() {
      console.log(this.fuzzySearch)
      this.$router.push({
        path: `/search?keyword=${this.fuzzySearch}`,
      })
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
  created() {
    this.checkLog()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.dialog {
  min-height: 100%;
  min-width: 800px;
  width: 4%;
  margin-left:295px;
  height: auto;
  position: fixed;
  
  }
.demo-ruleForm{
  padding-top:30px;
}
.forget{
  padding-left:200px;
}
 .change1 {
      border: none;
      color:#20a0ff;

    }
 
.change2 {
      border: none;
      color:#20a0ff;
    
    }
  .style1 {
    border: none;
    
  }
  .style2 {
    border: none;
  }
  .input{
    width:200px;
  }
 /* .demo-input-label {
    display: inline-block;
    width: 260px;
    position:right;
    padding-top:10px;
  }

.nav-bar {
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0; 
  
} 
.el-menu-demo{
  text-align: center;
  font-size:20px;
} */
.pointer {
  border:none;
  font-size:20px;
}
</style>
