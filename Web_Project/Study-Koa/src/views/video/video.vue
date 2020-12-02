<template lang="pug">
<div class="video">
  <div class="left-plat">
  <div class="el-menu-demo">
  <el-menu :default-active="activeIndex2" mode="vertical" @open="handleOpen" @close="handleClose">
  <el-submenu index="1">
    <template slot="title">
    <i class="el-icon-document"></i>
      <span>6150 Class Video</span>
    </template>
    <el-menu-item-group title = "Css Class">
      <el-menu-item index="1-1"  @click="toClass1">Class 1</el-menu-item>
      <el-menu-item index="1-2"  @click="toClass2">Class 2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title = "Node.js Class">
      <el-menu-item index="1-3">Class 1</el-menu-item>
      <el-menu-item index="1-4" >Class 2</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-submenu index="2">
  <template slot="title">
  <span>
  <i class="el-icon-document"></i>
  <span>5100 Class Video</span>
  </span>
  </template>
    <el-menu-item-group title = "Java Class">
      <el-menu-item index="2-1" >Class 1</el-menu-item>
      <el-menu-item index="2-2" >Class 2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title = "Application Design Class">
      <el-menu-item index="2-3" >Class 1</el-menu-item>
      <el-menu-item index="2-4" >Class 2</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  </el-menu>

  </div>
  </div>
  <div class="file-back">
    <div class="video-demo">
    <div v-if="ifClass1">
      <video width="620" height="350" controls>
        <source src="../../../static/video.mp4" type="video/mp4">
      </video>
    </div>
    <div v-if="ifClass2">
      <video width="620" height="350" controls>
        <source src="../../../static/video2.mp4" type="video/mp4">
      </video>
    </div>
      <div class="pay-button-block">
       
    </div>
    </div>
    
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
    activeIndex2: '2',
    ifClass1:true,
    ifClass2:false,
    }
  },
  mounted() {
             
  },
  methods: {
    toClass1() {
      this.ifClass1=true;
      this.ifClass2=false;
		},
		toClass2() {
      this.ifClass1=false;
      this.ifClass2=true;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created () {
  		
  }
}
</script>

<style lang="less" scoped>
.video {
  display: flex;
}
  .file-back {
    // float:left;
    // background-color: silver;
    background-color: #f5f5f5;
    width: 80%;
    margin: 0.2%;
    height: 1000px;
    .video-demo {
      margin:4% 15%;
      .pay-button-block{
      margin:5px 25%;
      color: #4682b4;;
      .pay-button{
        margin:0% 23%;
      }
    }
    }
    
  }
  .left-plat{
	// float:left;
	width:18%;
	margin: 0.2%;
	box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
	background-color: silver;
	.el-menu-demo {
	position: relative;
	width: 100%;
  height:1000px;
  background: rgb(239,241,246);
  }
}

</style>