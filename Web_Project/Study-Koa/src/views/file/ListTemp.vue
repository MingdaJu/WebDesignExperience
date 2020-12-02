<template lang="pug">
<div>
  <div class="file-back">
    <img src="/static/image/bookback.png">
  </div>
  <!-- 基础导航栏 -->
  <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1" @click="toNote">看笔记</el-menu-item>
    <el-menu-item index="2" @click="toText">看课件</el-menu-item>
    <el-menu-item index="3" @click="toSub">上传文件</el-menu-item>
  </el-menu>
  <!-- 看笔记 -->
  <div class="see-note" v-if="ifNote">
    <div class="user-store">
        <el-menu  class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="tongxin">信息与通信工程学院</el-menu-item>
          <el-menu-item index="2" @click="dianzi">电子工程学院</el-menu-item>
          <el-menu-item index="3" @click="jisuanji">计算机学院</el-menu-item>
          <el-menu-item index="4" @click="zidonghua">自动化学院</el-menu-item>
          <el-menu-item index="5" @click="ruanjian">软件学院</el-menu-item>
          <el-menu-item index="6" @click="shumei">数字媒体与设计艺术学院</el-menu-item>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="更多" name="2">
              <a index="7" class="more-acadamy" @click="lixueyuan">理学院</a>
              <a index="8" class="more-acadamy" @click="jingguan">经济管理学院</a>
              <a index="9" class="more-acadamy" @click="gongguan">公共管理学院</a>
              <a index="10" class="more-acadamy" @click="renwen">人文学院</a>
              <a index="11" class="more-acadamy" @click="guoji">国际学院</a>
              <a index="12" class="more-acadamy" @click="wangjiao">网络教育学院</a>
              <a index="13" class="more-acadamy" @click="jixu">继续教育学院</a>
              <a index="14" class="more-acadamy" @click="minjiao">民族教育学院</a>
            </el-collapse-item>
          </el-collapse>        
        </el-menu>
    </div>
    <div v-for="download in noteList" class="note-download">
      <div class="note-name">
        <span>{{download.fileName}}</span>
      </div>
      <div class="note-size">
        <span>{{download.size}}KB</span>
      </div>
      <div class="note-time">
        <span>{{download.lastModified}}</span>
      </div>
      <div class="note-button">
        <a :href="download.url">下载</a>
      </div>
    </div>
  </div>
  <!-- 看课件 -->
  <div class="see-text" v-if="ifText">
    <div class="user-store">
      <el-menu  class="el-menu-vertical-demo">
        <el-menu-item index="1">信息与通信工程学院</el-menu-item>
        <el-menu-item index="2">电子工程学院</el-menu-item>
        <el-menu-item index="3">计算机学院</el-menu-item>
        <el-menu-item index="4">自动化学院</el-menu-item>
        <el-menu-item index="5">软件学院</el-menu-item>
        <el-menu-item index="6">数字媒体与设计艺术学院</el-menu-item>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="更多" name="2">
            <el-menu-item index="7">理学院</el-menu-item>
            <el-menu-item index="8">经济管理学院</el-menu-item>
            <el-menu-item index="9">公共管理学院</el-menu-item>
            <el-menu-item index="10">人文学院</el-menu-item>
            <el-menu-item index="11">国际学院</el-menu-item>
            <el-menu-item index="12">网络教育学院</el-menu-item>
            <el-menu-item index="13">继续教育学院</el-menu-item>
            <el-menu-item index="14">民族教育学院</el-menu-item>
          </el-collapse-item>
        </el-collapse>        
      </el-menu>
    </div>
    <div v-for="download in coursewareList" class="note-download">
      <div class="note-name">
        <span>{{download.fileName}}</span>
      </div>
      <div class="note-size">
        <span>{{download.size}}KB</span>
      </div>
      <div class="note-time">
        <span>{{download.lastModified}}</span>
      </div>
      <div class="note-button">
        <a :href="download.url">下载</a>
      </div>
    </div>
  </div>
  <!-- 上传 -->
  <div class="submit" v-if="ifSubmit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="请输入标题" prop="name" class="title">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="请选择学院" prop="acadamy" class="choose-acadamy">
        <el-select v-model="ruleForm.acadamy">
          <el-option v-for="acadamy in acadamys" :key="acadamy.value" :label="acadamy.label" :value="acadamy.value"></el-option>
        </el-select>
      </el-form-item>
      //- <el-form-item label="请选择专业" prop="majorRegion" class="choose-major">
      //-   <el-select v-model="ruleForm.majorRegion">
      //-     <el-option v-for="major in majors" :key="major.value" :label="major.label" :value="major.value"></el-option>
      //-   </el-select>
      //- </el-form-item>
      //- <el-form-item label="请选择科目" prop="subjectRegion" class="choose-subject">
      //-   <el-select v-model="ruleForm.subjectRegion">
      //-     <el-option v-for="subject in subjects" :key="subject.value" :label="subject.label" :value="subject.value"></el-option>
      //-   </el-select>
      //- </el-form-item>
      <el-form-item label="请选择类别" prop="objectType" class="choose-subject">
        <el-select v-model="ruleForm.objectType">
          <el-option label="笔记" value=0></el-option>
          <el-option label="课件" value=1></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="sub-option">
        <el-button @click="resetForm('ruleForm')" class="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-upload class="upload-demo" action="/api/file/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :on-success="sendFileInfo">
      <el-button :disabled="ruleForm.name === '' || ruleForm.acadamy === '' || ruleForm.majorRegion === '' || ruleForm.subjectRegion === '' || ruleForm.objectType === ''">点击上传</el-button>
    </el-upload>
  </div>
</div>
</template>
<script>
let fake = {
  "acadamys" : [
      {
          "value" : '1',
          "label": '计算机院'
        }, 
        {
          "value": '2',
          "label": '信通院'
        }, 
        {
          "value": '3',
          "label": '电子院'
        }, 
        {
          "value": '4',
          "label": '经管院'
        }, {
          "value": '5',
          "label": '现代邮政学院'
        }
    ],
  "majors" : [
      {
        "value" : '6',
        "label" : '计算机科学与技术',
      },
      {
        "value" : '7',
        "label" : '信息安全',
      },
      {
        "value" : '8',
        "label" : '人工智能',
      },
      {
        "value" : '9',
        "label" : '通信工程',
      }
    ],
  "subjects" : [
      {
        "value" : '10',
        "label" : '高等数学',
      },
      {
        "value" : '11',
        "label" : '数字逻辑',
      },
      {
        "value" : '12',
        "label" : '大学英语',
      },
      {
        "value" : '13',
        "label" : '大学物理',
      }
    ],
};

export default {
  data () {
    return {
      activeIndex2: '1',
      fileList: [],
      input:'',
      acadamy: '',
      acadamys: [],
      value1: '',
      value2: '',
      value3: '',
      ifNote: true,
      ifText: false,
      ifSubmit: false,
      ruleForm: {
        name: '',
        acadamy: '',
        objectType: ''   
      },
      rules: {
        name: [
          {required: true, message: '请输入标题', trigger: 'change'},
          {min: 3,max: 15, message: '长度在3到15个字符', trigger: 'blur'}
        ],
        acadamy: [
          {required: true, message: '请选择所属学院', trigger: 'change' }
        ],
        objectType: [
          {required: true, message: '请选择所属类别', trigger: 'change'}
        ],
      },
      tableData: [],
      download: '',
      downloads: [],
      fileName: '',
      noteList: [],
      coursewareList: [],
      activeNames: ['1']
    }
  },
  mounted() {
        this.getInitFake();
  },
  methods: {
    getInitFake() {
      let result = fake;
      this.acadamys = result.acadamys;
      this.majors = result.majors;
      this.subjects = result.subjects;
    },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    sendFileInfo (res) {
      if (res.success) {
        this.$http.post('/api/file-info', {
          info: this.ruleForm,
          id: res.id
        }).then(res => {})
      }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    getData() {
      this.$http.get('/api/file')
        .then(res => {
          this.downloads = res.body.data
          this.noteList = []
          this.coursewareList = []
          this.downloads.forEach((el) => {
            el.url = `/api/download?name=${el.fileUrl}&raw=${el.fileName}`
            el.objectType === 0 ? this.noteList.push(el) : this.coursewareList.push(el)
          })
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
  .file-back {
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-menu-vertical-demo {
    .el-menu-item {
      height: 80px;
      line-height: 80px;
    }
    background-color: white;
    width: 200px;
  }
 a :hover {
   color: red;
  }
  .note-download {
    margin: 30px 0;
    height: 50px;
    border-bottom: 1px solid #d6d6d6;
    .note-name {
      float: left;
      margin-left: 20px;
    }
    .note-size {
      float: left;
      position: absolute;
      left: 600px;
    }
    .note-time {
      float: left;
      position: absolute;
      left: 800px;
    }
    .note-button {
      position: absolute;
      left: 1200px;
      a {
        text-decoration: none;
        color: #2c3e50;
      }
    }
  }
  .submit {
    margin-top: 20px;
    .title {
      width: 400px;
      margin: 20px auto;
      }
      .choose-acadamy {
        width: 400px;
      margin: 20px auto;
      }
      .choose-major {
        width: 400px;
      margin: 20px auto;
      }
      .choose-subject {
        width: 400px;
      margin: 20px auto;
      }
      .upload-demo {
      width: 400px;
      margin: 10px auto;
      position: relative;
      top: -90px;
      left: 10px;
      button {
        width:390px;
      }
      }
      .sub-option {
        position: relative;
        left: 450px;
        top: 90px;
      }
      .el-select {
        width:300px;
      }
      .reset {
        width: 390px;
        margin: 20px auto;
        position: relative;
        top: -40px;
        left: -100px;
      }
  }
</style>