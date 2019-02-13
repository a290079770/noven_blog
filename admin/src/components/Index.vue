<template>
  <div class="content-main-wrap">
    <div class="index-header">
		<el-row class="title">
		  <span class="blue">首页</span>
		  <span class="gray">/TotalView</span>
		  <hr>
		</el-row>

		<el-row class="index-total">
	      <div class="index-total-resource">
	        <div class="index-total-resource-left">
	        	<div class="left-icon">
	        		<i class="iconfont icon-article"></i>
	        	</div>
	        </div>
	    		<div class="index-total-resource-right">
	        	<div class="right-statistics">
	        		<p class="statistics-info">{{ statistics.articles }}</p>
	        		<p class="statistics-description">Articles</p>
	        	</div>
	        </div>
	      </div>

	      <div class="index-total-resource">
	        <div class="index-total-resource-left">
	        	<div class="left-icon">
	        		<i class="iconfont icon-banner"></i>
	        	</div>
	        </div>
	        <div class="index-total-resource-right">
	        	<div class="right-statistics">
	        		<p class="statistics-info">{{ statistics.comments }}</p>
	        		<p class="statistics-description">Comments</p>
	        	</div>
	        </div>
	      </div>

	      <div class="index-total-resource">
	        <div class="index-total-resource-left">
	        	<div class="left-icon">
	        		<i class="iconfont icon-xinqing"></i>
	        	</div>
	        </div>
			    <div class="index-total-resource-right">
	        	<div class="right-statistics">
	        		<p class="statistics-info">{{ statistics.moods }}</p>
	        		<p class="statistics-description">Moods</p>
	        	</div>
	        </div>
	      </div>
		</el-row>
    </div>


    <div class="index-statistics">
    	<div class="index-statistics-left">
    		<el-row class="title">
			  <span class="blue">网站流量统计</span>
			    <el-date-picker
			      v-model="statisticsTimeRange"
			      type="daterange"
			      align="right"
			      size="mini"
			      unlink-panels
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      :picker-options="pickerOptions2"
			      style="float:right;width:250px;margin-top: -3px"
			      >
			    </el-date-picker>
			  <hr>
			</el-row>
    	</div>

    	<div class="index-statistics-right">
    		<el-row class="title">
			  <span class="blue">资源统计</span>
			  <hr>
			</el-row>
    	</div>
    </div>

    <div class="index-today-login">
       	<el-row class="title">
	   		<span class="blue">今日登录用户</span>
	 	</el-row>

		<el-row style="padding: 0 15px">
			<el-table
		      :data="dataList"
		      :border="true">
		        <el-table-column
		          prop="Id"
		          label="ID"
		          width="80"
		          >
		        </el-table-column>

		        <el-table-column
		          prop="NickName"
		          label="昵称"
		          >
		        </el-table-column>

		        <el-table-column
		          prop="LastTime"
		          label="上次登录时间"
		          show-overflow-tooltip
		          >
		        </el-table-column>

		        <el-table-column
		          prop="LastIp"
		          label="上次登录IP"
		          >
		        </el-table-column>

		        <el-table-column
		          prop="ThisTime"
		          label="本次登录时间"
		          show-overflow-tooltip
		          >
		        </el-table-column>

		        <el-table-column
		          prop="ThisIp"
		          label="本次登录IP"
		          >
		        </el-table-column>


		        <el-table-column
		          label="用户类型">
		          <template slot-scope="scope">
		              <el-tag type="success" v-if="scope.row.UserType == 3">超级管理员</el-tag>
		              <el-tag type="info" v-if="scope.row.UserType == 1">普通用户</el-tag>
		              <el-tag type="warning" v-if="scope.row.UserType == 2">管理员</el-tag>
		          </template>
		        </el-table-column>

		    </el-table>
		</el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近半年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          },
          ]
        },
        statisticsTimeRange: '',
        dataList: [],
        statistics: {
        	articles: 0,
        	moods: 0,
        	comments: 0
        }
    }
  },
  mounted(){
  	this.getActiveUser();
  	this.getArcticleList();
  	this.getCommentList();
  },
  methods: {
    // 当前活跃用户详情
    getActiveUser() {
      this.$http.get('/user/activeUserList').then((res) => {
          if(res.data.code === 200) {
            // this.NickName = res.data.Data.NickName;
            this.dataList = res.data.data.list
          }
      })
    },
    //获取 文章 列表
	  getArcticleList(keyword,cp,ps) {
			// keywords,cp,ps
			cp = cp || 1;
			ps = ps || 10;
			this.$http.get('/arcticle/arcticleList',{
			  params:{
			     keywords:keyword,
			     cp:cp,
			     ps:ps
			  }
			}).then((res) => {
				if(res.data.code === 200) {
				  this.statistics.articles = res.data.recordCount;
	            } else {
	              this.$message({
	                message: res.data.description,
	                type: 'error',
	                center: true
	              });
	            }
			})
		},

		//获取评论数量
		//获取 comment图 列表
		async getCommentList() {
			let { keywords , cp , ps , type } = this;

			let { data: { code , description , data, recordCount } } = await this.$http.get('/comment/commentListAdmin',{
			  params:{
			  }
			})
			
			if(code !== 200) {
				this.$message.error(description);
				return;
			}
			this.statistics.comments = recordCount;
		},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
   .bxshadow() {
     background: white;
     box-shadow: 5px 5px 5px #ddd,-5px 5px 5px #ddd;
   }
   .index-header {
     padding: 15px;
     padding-bottom: 60px;
     .bxshadow()
   }
   .index-total {
   	 display: flex;
   	 justify-content: space-between;
   	 margin-top: 20px;
   	 &-resource {
	   	 width: 30%;
	   	 height: 95px;
	   	 border: 1px solid #ddd;
	   	 cursor: pointer;

         &:hover .left-icon {
           background: white !important;
 		 };

 		 &:hover i {
 		  color:#ff5d6a !important;
 		  font-size: 30px !important;
 		 }

		 &-left {
		 	float: left;
		 	width: 95px;
		 	height: 100%;
		 	text-align: center;
		 	position: relative;
		 	.left-icon {
		 		position: absolute;
		 		left: 50%;
		 		margin-left: -25px;
		 		top: 50%;
		 		margin-top: -25px;

		 		width: 50px;
		 		height: 50px;
		 		line-height: 50px;
		 		border-radius: 50%;
		 		background: #ff5d6a;

	        	transition: all 0.75s;

		 		i {
					transition: all 0.75s;
		 			font-size: 20px;
		 			color: #fff;
		 		}
		 	}
		 }
		 &-right {
		 	float: right;
		 	min-width: 95px;
		 	height: 100%;
		 	.right-statistics {
		 		padding-right: 20px;
		 		line-height: 1;
		 		text-align: right;
		 		color: #676a6d;
		 		.statistics-info {
		 			margin-top: 24px;
		 			font-size: 26px;
		 		}
		 		.statistics-description {
		 			margin-top: 5px;
		 			font-size: 16px;
		 		}
		 	}
		 }
	   }
   }


   .index-statistics {
    margin-top: 20px;
   	height: 400px;
   	width: 100%;

   	&-left {
   		float:left;
   		width: 60%;
   		height: 100%;
   		.bxshadow()
   	}

   	&-right {
   		float: right;
   		width: calc(40% - 20px);
   		height: 100%;
   		.bxshadow();
   	}
   }


   .index-today-login {
   	    margin-top: 20px;
    	min-height: 300px;
     	width: 100%;
     	.bxshadow()
   }

   .index-statistics .title,.index-today-login .title {
   	   padding: 15px;
   	   .blue {
   	   	 font-size: 18px !important;
   	   }
   }
</style>
