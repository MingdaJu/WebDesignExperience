<template lang="pug">
<div class="Issue-div">
	<div class = "left-plat">
	<!-- 导航栏 -->
	<div class="el-menu-demo">
	<el-menu :default-active="activeIndex2"  mode="vertical" @select="handleSelect">   
		<el-menu-item index="1" @click="toQues">Post a Question</el-menu-item>
		<el-menu-item index="2" @click="toAns">Answers</el-menu-item>
	</el-menu>
	</div>
	</div>
	<!-- 我要提问 -->
	<div class="want-ques" v-if="ifQues">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<div style="height: 30px"></div>
			<el-form-item label="Title" prop = "name" class = "name" size = "mini">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="Detail Description" prop="desc" class="desc">
				<el-input type="textarea" v-model="ruleForm.desc" :rows="10"></el-input>
			</el-form-item>
			<el-form-item label="Picture (Optional)">
				<el-upload class="upload-demo" drag action="/api/addIssueImage" multiple :on-success="imageUrlHandle">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">Drag, or <em>click here</em></div>
					<div class="el-upload__tip" slot="tip">You can upload PNG, JPG files of no more than 500kb</div>
				</el-upload>
			</el-form-item>
			<el-button :disabled="ruleForm.name === '' || ruleForm.desc === '' || ruleForm.acadamy === ''"class="submit" @click="sendIssueInfo">Submit</el-button>
			<div style="height: 50px"></div>
		</el-form>		
	</div>
	<!-- 我要解答 -->
	<div class="want-answer" v-if="ifAns">
		<div>
			<div v-if="quesList.length === 0" class="empty">No one's asking yet. Come on!</div>
			<div v-else v-for="(el,index) in quesList" :key="index" :index="index+''"  class="ques-list">
				<a :href="'/issuedetail?id=' + el._id" target="_blank" class="ques-title">
					<span>{{el.title}}</span>
				</a>
				<div class="ques-descrip">
					<span>{{el.detail}}</span>
				</div>
				<div class="ques-time">
					<span>time:{{el.publishTime.substr(0,10)}}</span>
				</div>
				<div class="ques-ans">
					<span>answer:{{el.answers}}</span>
				</div>
			</div>
		</div>
		<div style="height: 80px"></div>
	</div>
</div>
</template>
<script>
import cookieManage from '../../mixins/cookieManage'
import initHandle from '../../mixins/initInfo'
export default {
	name: 'issue',
	mixins: [cookieManage, initHandle],
	data () {
		return {
			activeIndex2: '2',
			ifQues: false,
			ifAns: true,
			acadamy: '',
			acadamys: [],
			acadamyLabels:{},  
			quesList: [],
			options:[],
			value: '',
			ruleForm: {
				name: '',
				desc: ''
			},
			rules: {
 				name: [
					{ required: true, message: 'Please enter title', trigger: 'blur' },
					{ min: 5, max: 500, message: 'Please enter more than five', trigger: 'blur' }
				],
				desc: [
					{ required: true, message: 'Please enter detail description', trigger: 'blur' }
				],
				acadamy: [
          			{required: true, message: 'Please enter your department', trigger: 'change' }
        		],
			},
			issueImageUrl: []
		}	
	},
	created() {
		this.getAcadamys()
		this.initInfo()
	},
	mounted() {
		
	},
	methods: {
		handleSelect(key, keyPath) {
			// console.log(key, keyPath);
		},
		toAns() {
			this.ifQues = false;
			this.ifAns = true;
		},
		toQues() {
			this.ifQues = true;
			this.ifAns = false;
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
		// 获取学院信息
		getAcadamys() {
		this.$http.get('/api/acadamylist')
			.then(res => {
				if(res.body.success) {
					this.acadamys = res.data.data
					this.acadamys.map(el => {
						this.acadamyLabels[el.key] = el.label
					})
					this.getQues()
				}
				else {
					this.$message.error(res.body.msg)
				}
			})
		},
		imageUrlHandle (res){
			this.issueImageUrl.push(res.body.url)
		},
		sendIssueInfo() {
			if(this.$store.state.isLogin) {
				// console.log(this.ruleForm)
				this.$http.post('/api/addIssue', {
					issue: {
						title: this.ruleForm.name,
						detail: this.ruleForm.desc,
						acadamy: this.ruleForm.acadamy,
						author_id: this.$store.state.userid,
						authorName: this.$store.state.name,
						imageUrl: this.issueImageUrl
					}
				}).then(res => {
					this.$message.success('success')
					this.issueImageUrl = []
					this.getQues()
					this.ifQues = false
					this.ifAns = true
				})
			}
			else {
				this.$message.warning('Please log in first')
			}
		},
		getUserInfo() {
			this.$http.get(`/api/user?user_id=${this.$store.state.userid}`)
				.then(res => {
					this.issueList = res.data.data.issueList
				})
		}
	}
}
</script>

<style lang="less">
.Issue-div {
	display: flex;
}
.left-plat{
	// float:left;
	width:18%;
	margin: 0.2%;
	box-shadow: 0 5px 7px rgba(0, 0, 0, 0.1);
	.el-menu-demo {
	position: relative;
	width: 100%;
	height:800px;
	background: rgb(239,241,246);
	// background-image: url("/static/image/blackboard grey.jpg");
    }
}


.file-back {
    width: 100%;
    height: 350px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
}

.want-ques {
	margin: 0.2%;
	background-color:lightgray;
	// background-color: #f5f5f5;
	// background-image: url("/static/image/blackboard black.jpg");
	height:800px;
	position: relative;
	// float: left;
	width: 80%;
	.demo-ruleForm{
		width:60%;
		position: relative;
		left:12%;
		label{
			color:#4682b4;
		}
	}
	.el-button {
		width:300px;
		margin: 0 40%;
	}

}
.want-answer {
	margin: 0.2%;
	background-color: #f5f5f5;
	height:800px;
	// background-image: url("/static/image/blackboard black.jpg");
	// background-color:lightgray;
	position: relative;
	width: 80%;
	// float:left;
	// top: 60px;
	// height: 115%;
	box-sizing: border-box;
	.ques-list {
		top:30px;
		background-color: white;
	  	position: relative;
	    padding: 16px 20px;
		background: #fff;
		overflow: hidden;
		border-radius: 2px;
		box-shadow: 0 1px 3px rgba(0,0,0,.1);
		// box-sizing: border-box;
		height: 100px;
		width: 70%;
		margin: 0 auto 10px 5%;
		.ques-acad {
			color: #8590a6;
			font-size: 15px;
		}
		.ques-title {
			font-size: 18px;
			font-weight: 700;
			line-height: 1.6;
			margin-top: 8px;
			text-decoration: none;
			color: #1e1e1e;
			cursor: pointer;
		}
		.ques-descrip {
			font-size: 15px;
			color: #262626;
			width: 75%;
			height: 38px;
			overflow-y: auto;
			cursor: pointer;
		}
		.ques-time {
			font-size: 14px;
			color: #8590a6;
			float: left;
			margin-top: 10px;
		}
		.ques-ans { 
			font-size: 14px;
			color: #8590a6;
			float: left;
			margin: 10px 0 0 15px;
		}
	}
	// .empty{
	// 	height: 100px;
    // text-align: center;
    // padding-top: 30px;
    // background: #fff;
    // color: gray;
	// }
}

</style>
