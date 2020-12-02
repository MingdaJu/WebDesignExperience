<template lang="pug">
<div class="download-detail">
  <div v-for="(el,index) in searchList" :key="index" :index="index+''" class="note-download">
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
</template>
<script>
export default {
	name: 'search',
	data () {
		return {
      keyword: '',
      searchList: [],
      collectFileidList:[]
		}	
	},
	created() {
    this.keyword = this.$route.query.keyword,
    this.handleIconClick()
	},
	mounted() {
		
	},
	methods: {
    handleIconClick() {
			this.$http.post('/api/getfilebyblurry', {
				keywords: this.keyword,
				fields: [],
			}).then(res => {
				if(res.body.success) {
					// this.searched = true;
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
          console.log(this.searchList)
				}
				else {
					this.$message.error(res.body.msg)
				}
			})
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
    }
  }
}
</script>
<style lang="less" scoped>
  .download-detail {
    min-height: 300px;
    border: 1px solid #eaeefb;
    position: relative;
    padding: 20px,5px;
    // top: -200px;
    // left: 20%;
    width: 80%;
    margin: 50px auto;
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
        margin: 20px auto;
      }
      .choose-acadamy {
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
  }
.user-store {
  position: relative;
  top: 80px;
}
.see-note {
  position: relative;
  top: 80px;
}
.see-text {
  position: relative;
  top: 80px;
}
.submit {
  position: relative;
  top: 80px;
}
</style>