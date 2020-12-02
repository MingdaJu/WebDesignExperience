<template lang="pug">
<div class="home">
	<el-carousel indicator-position="outside">
		<el-carousel-item v-for="(item,index) in imgs" :key="index" :index="index">
		<img :src="item.image" style="width:100%">
		</el-carousel-item>
	</el-carousel>
<div class="title">
	<p>Your NEU Life to Success</p>
</div>
<div class="stitle">
	<p>Build study with News, Q&A, and Videos </br>from all your peers in Northeastern</p>
</div>
<div class="box" id="rectangle"></div>
<div class="link-pic">
	<div class="to-question" @click="toQuestion">
		<img src="/static/image/ask.png">
		<div class="qcontain">Q&A</div>
	</div>
	<div class="to-file" @click="toFile">
		<img src="/static/image/share.png">
		<div class="fcontain">Share</div>
	</div>
	<div class="to-video" @click="toMy">
		<img src="/static/image/login.png">
		<div class="vcontain">My</div>
	</div>
	<div class="to-news" @click="toNews">
		<img src="/static/image/news.png">
		<div class="ncontain">News</div>
	</div>
	<div class="to-vid" @click="toVid">
		<img src="/static/image/video.png">
		<div class="vidcontain">Video</div>
	</div>
</div>

</div>
</template>
<script>
import anime from 'animejs'
import cookieManage from '../../mixins/cookieManage'
import initHandle from '../../mixins/initInfo'
export default {
	name:'home',
	mixins:[cookieManage, initHandle],
	data() {
		return {
			imgs:[
				{
                    "image": "/static/image/900.jpg"
                },
				{
					 "image":"/static/image/110.jpg"
                    
                },
				{
                    "image": "/static/image/200.jpg"
                },
				
			],
			tableData:[],
			question:'',
			questions: [],
			questionTitle: '',
			fuzzySearch: '',
			searched: false,//搜索
			searchFile: '',
			searchList: [],
			quesList: [],//热点问题
			file: '',
			files: [],
			fileTitle: '',
			fileTime: '',//最新资料
			fileList: [],
			topic: '',
			topics: [],
			topicImage: '',
			topicTitle: '',//热门问题
			collectFileidList:[],
			uploadFileidList:[],
			downloadList: [],
			issueList:[],
			answerList: [],
			watchIssueList:[]
		}
	},
	mounted() {},
	methods: {
		getData() {
			this.$http.get('/api/file')
				.then(res => {
					if(res.body.success) {
						var downloads = res.body.data
						this.fileList = []
						downloads.forEach((el) => {
							el.url = `/api/download?name=${el.fileUrl}&raw=${el.fileName}&id=${el._id}&user_id=${this.$store.state.userid}`
							this.fileList.push(el)
						})
					}
					else {
						this.$message.error(res.body.msg)
					}
			})
		},
		getQues() {
			this.$http.get('/api/issue')
				.then(res => {
					if(res.body.success) {
						this.quesList = res.body.data
					}
					else {
						this.$message.error(res.body.msg)
					}
				})
		},
		handleIconClick() {
			this.$http.post('/api/getfilebyblurry', {
				keywords: this.fuzzySearch,
				fields: [],
			}).then(res => {
				if(res.body.success) {
					this.searched = true;
					var downloads = res.body.data;
					if(downloads.length == 0) {
						this.$alert('没有找到您要搜索的文件，换个姿势试试吧～', '', {
							confirmButtonText: '确定',
						});
					}
					this.searchList = [];
					downloads.forEach((el) => {
						el.url = `/api/download?name=${el.fileUrl}&raw=${el.fileName}&id=${el._id}&user_id=${this.$store.state.userid}`
						this.searchList.push(el)
					})
				}
				else {
					this.$message.error(res.body.msg)
				}
			})
		},
		toQuestion() {
			this.$router.push({
				path: '/issue',
			});
		},
		toFile() {
			this.$router.push({
				path: '/file',
			});
		},
		toMy() {
			this.$router.push({
				path: '/log',
			});
		},
		toNews() {
			this.$router.push({
				path: '/news',
			});
		},
		toVid() {
			this.$router.push({
				path: '/video',
			});
		},
		animate() {
		},
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
		this.getData()
		this.getQues()
		this.animate()
      	if (this.initInfo()) {
			this.getUserInfo()
		}
	}
}
</script>
<style lang="less" scope>
//   .home {
 	.hmtable {
		 padding:80px 0;
		 border-spacing: 125px 0;
	 }
	 .qcontain{
		 padding-top:5px;
		 padding-left:30px;
	 }
	 .fcontain{
		 padding-top:5px;
		 padding-left:35px;
	 }
	 .vcontain{
		 padding-top:5px;
		 padding-left:55px;
	 }
.ncontain{
		 padding-top:5px;
		 padding-left:55px;
	 }
	 .vidcontain{
		 padding-top:5px;
		 padding-left:45px;
	 }

// 		margin: 0 auto;
// 		.to-question {
// 			float: left;
// 			position: relative;
// 			top: -400px;
// 			width: 33%;
// 			img {
// 				display: block;
// 				margin: 0 auto;
// 				width: 140px;
// 				height: 140px;
// 			}
// 			.qcontain {
// 				margin: 10px 10px 0 0;
// 				text-align: center;
// 				color: white;
// 				cursor: pointer;
// 			}
// 		}
// 		.to-file {
// 			float: left;
// 			position: relative;
// 			top: -400px;
// 			width: 34%;
// 			margin: 0 auto;
// 			img {
// 				display: block;
// 				margin: 0 auto;
// 				width: 140px;
// 				height: 140px;
// 			}
// 			.fcontain {
// 				margin: 10px 0 0 0;
// 				text-align: center;
// 				color: white;
// 				cursor: pointer;
// 			}
// 		}
// 		.to-video {
// 			float: left;
// 			position: relative;
// 			top: -400px;
// 			width: 33%;
// 			margin: 0 auto;
// 			img {
// 				display: block;
// 				margin: 0 auto;
// 				width: 150px;
// 				height: 150px;
// 			}
			// .vcontain {
			// 	margin: 10px 0 0 0;
			// 	text-align: center;
			// 	color: white;
			// 	cursor: pointer;
			// }
// 		}
// 	}
 
// 	  }


  .title{
	  z-index: 1000;
	  position:absolute;
	  left:90px;
	  top:120px;
	  color:white;
	  font-weight:bold;
	  font-size:37px;
  }
  .box{
	  
	  z-index: 999;
	  position:absolute;
	  left:80px;
	  top:140px;
	  
  }

  #rectangle {
     width: 480px;
     height: 130px;
    background: rgba(71,71,71,.5);
 }
  .stitle{
	  z-index: 1000;
	  position:absolute;
	  left:90px;
	  top:180px;
	  color:white;
	  //font-weight:bold;
	  font-size:20px;
	  padding-top:10px;
  }
  .back {
	  height: 330px;
	  z-index: -998;
	  background: linear-gradient(90deg,#496eaa,#944fa8,#a8804f,#496eaa);
	  background-size: 1400% 300%;
	  animation: AnimationName 20s ease infinite;
  }
  @keyframes AnimationName {
	  0% {
		  background-position: 0% 0%;
	  }
	  50% {
		  background-position: 50% 100%;
	  }
	  100% {
		  background-position: 100% 0%;
	  }
  }
  svg {
	display: block;
	margin: 0 auto;
	}

	path {
	fill: none;
	stroke: black;
	stroke-width: 4;
	stroke-linecap: round;
	stroke-linejoin: round;
  }


  .el-carousel__container{
	  
	  height:420px;
	  
  }
  
 .link-pic {
	 display: flex;
	 justify-content: space-around;
	 margin: 80px 0;
 } 
	 
</style>