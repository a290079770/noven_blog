<template>
  <div class="content-main-wrap boxshadow">
    <el-row class="title">
		<span class="blue">文章</span>
		<span class="gray">/列表</span>
		<hr>
	</el-row>

	<!-- 搜索 -->
	<el-row class="search">
  		<el-col :span="12">&nbsp;</el-col>
		<el-col :span="12">
			<el-input
      		 	size="small"
		    	placeholder="请输入标题、作者、简介关键字进行搜索..."
		    	suffix-icon="el-icon-search"
		    	v-model="keyword"
            	@keyup.enter.native="search">
		  	</el-input>
		</el-col>
	</el-row>

	<!-- 文章列表 -->
	<el-row>
		<el-table
			border
		    :data="tableData3"
		    tooltip-effect="dark"
		    style="width: 100%">
		    <el-table-column
		      prop="Id"
		      label="编号"
		      width="80">
		      <!-- <template slot-scope="scope">{{ scope.row.Id }}</template> -->
		    </el-table-column>
		    <el-table-column
		      prop="Title"
		      label="标题"
		      >
		      <!-- <template slot-scope="scope">{{ scope.row.Title }}</template> -->
		    </el-table-column>
		    <el-table-column
		      prop="Author"
		      label="作者"
		      >
		      <!-- <template slot-scope="scope">{{ scope.row.Author }}</template> -->
		    </el-table-column>
<!-- 		    <el-table-column
		      prop="Brief"
		      label="简介">
		    </el-table-column> -->
		    <el-table-column
		      prop="CreateTime"
		      label="加入时间"
		      width="133">
		      <!-- <template slot-scope="scope">{{ scope.row.CreateTime }}</template> -->
		    </el-table-column>
		    <el-table-column
		      prop="ReadCount"
		      label="点击率"
		      width="100">
		      <!-- <template slot-scope="scope">{{ scope.row.ReadCount }}</template> -->
		    </el-table-column>
		    <el-table-column label="操作" width="275">
	          <template slot-scope="scope">
	          	<el-button
	           	  plain
	              style="margin-left:0"
	              icon="el-icon-view"
	              size="mini"
	              type="success"
	              @click="articleDetail(scope.$index, scope.row)">查看详情
	          	</el-button>
	          	<el-button
	           	  plain
	              style="margin-left:0"
	              :icon=" scope.row.IsUpShelf == 1 ? 'el-icon-download' : 'el-icon-upload2'"
	              size="mini"
	              :type="scope.row.IsUpShelf == 1 ? 'warning' : 'primary'"
	              @click="upOrDownShelf(scope.$index, scope.row)">{{ scope.row.IsUpShelf == 1 ? "下架" : "上架" }}
	          	</el-button>
	            <el-button
	           	  plain
	              style="margin-left:0"
	              icon="el-icon-delete"
	              size="mini"
	              type="danger"
	              @click="articleDelete(scope.$index, scope.row)">删除
	          	</el-button>
	          </template>
        	</el-table-column>
		</el-table>
	</el-row>

	<!-- 分页 -->
	<el-row class="fullPagination">
	  <el-col :span="4">&nbsp;</el-col>
	  <el-col :span="20">
	    <el-pagination
	      style="float: right;margin-top: 15px"
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 40, 50, 100]"
	      :page-size="ps"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="totality">
	    </el-pagination>
	  </el-col>
	</el-row>

	<!-- 文章详情弹框 -->
	<el-dialog
	  top="10vh"
	  title="文章详情"
	  :visible.sync="articleDetailDialog"
	  width="80%"
	  >
	  <div class="articleDetail">
		<el-form :label-position="labelPosition" label-width="100px" :model="articleDetailInfo">
		  <!-- <el-form-item label="文章ID">
		    <el-input v-model="articleDetailInfo.Id"></el-input>
		  </el-form-item> -->
		  <el-form-item label="标题">
		    <el-input v-model="articleDetailInfo.Title" readonly></el-input>
		  </el-form-item>
		  <el-form-item label="作者">
		    <el-input v-model="articleDetailInfo.Author" readonly></el-input>
		  </el-form-item>
		  <el-form-item label="简介">
		    <el-input type="textarea " v-model="articleDetailInfo.Brief" readonly></el-input>
		  </el-form-item>
		  <el-form-item label="内容">
		    <el-input type="textarea " v-model="articleDetailInfo.Content" readonly></el-input>
		  </el-form-item>
		  <!-- <el-form-item label="所属用户ID">
		    <el-input v-model="articleDetailInfo.AuthorId"></el-input>
		  </el-form-item> -->
		  <el-form-item label="创建时间">
		    <el-input v-model="articleDetailInfo.CreateTime" readonly></el-input>
		  </el-form-item>
		  <el-form-item label="点击率">
		    <el-input v-model="articleDetailInfo.ReadCount" readonly></el-input>
		  </el-form-item>
		  <el-form-item label="文章缩略图">
		    <a :href="articleDetailInfo.Url" target="_blank">
		    	<!-- <img :src="articleDetailInfo.Url || 'http://temp.im/100x100'"> -->
		    	<div class="suoluetu" :style="{'background': 'url(' + articleDetailInfo.Url  + ') center center / cover no-repeat'}">
        		</div>
		    	<span>点击打开新页面查看原图</span>
		    </a>
		  </el-form-item>
		  <!-- <el-form-item label="文章标签列表">
		    <ul>
		    	<li v-for="(item,index) in articleDetailInfo.TagList">
		    		<el-tag size="mini">{{item.Title}}</el-tag>
		    	</li>
		    </ul>
		  </el-form-item> -->
		</el-form>

		<span slot="footer" class="dialog-footer" style="display: flex; justify-content: flex-end">
		  <!-- <el-button @click="articleDetailDialog = false">取 消</el-button> -->
		  <el-button type="primary" @click="articleDetailDialog = false">确 定</el-button>
		</span>
	  </div>
	</el-dialog>
  </div>
</template>

<script>
export default {
	    data() {
	      	return {
				keyword: '',
				tableData3: [],
				currentPage:1,
				ps:10,
				totality: 1,
				labelPosition: 'right',
				articleDetailDialog: false,
				articleDetailInfo: {},
	      }
	    },
	    methods: {
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
				console.log(res.data);
				this.tableData3 = [];
				this.tableData3 = res.data.data.list;

				this.totality = res.data.recordCount;
				this.currentPage = cp || this.currentPage;
				this.ps = ps || this.ps;
			})
		},
		// 获取文章详情
		articleDetail(index, row) {
			this.articleDetailDialog = true;
			this.isShowSureBtn = false;
			console.log(index, row);
			this.$http.get('/arcticle/detail',{
			  params:{
			    Id: row.Id
			  }
			}).then((res) => {
				console.log(res.data);
				if(res.data.code === 200) {
					this.articleDetailInfo = {};
					this.articleDetailInfo = res.data.data;
				}else {
					this.$message({
	                  message: res.data.description,
	                  type: 'error',
	                  center: true
	                });
				}
			})
		},

		upOrDownShelf(index, row) {
		  console.log(index, row);
		  let isUpShelf = row.IsUpShelf == 1 ? -1 : 1;
		  this.$http.post('/arcticle/upOrDownShelf',{
			Id: row.Id,
			IsUpShelf: isUpShelf
		  }).then((res) => {
			console.log(res.data);
			if(res.data.code === 200) {
				this.$message({
	              message: res.data.description,
	              type: 'success',
	              center: true
	            })
				this.getArcticleList();
			}else {
				this.$message({
	              message: res.data.description,
	              type: 'error',
	              center: true
	            });
			}
		  })
		},

		// 删除文章
		articleDelete(index, row) {
		  console.log(index, row);
          this.$confirm('删除后将不可恢复，是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/arcticle/delete',{
              Id:row.Id,
            }).then((res) => {
              console.log(res.data);
              if(res.data.code === 200) {
                this.$message({
                  message: res.data.description,
                  type: 'success',
                  center: true
                });
                this.getArcticleList();
              } else {
                this.$message({
                  message: res.data.description,
                  type: 'error',
                  center: true
                });
              }

            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除该文章！'
            });
          });
		},

		//分页
		handleSizeChange(val) {
	    this.getArcticleList('','',val);
		  // console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
	    this.getArcticleList('',val,'');
		  // console.log(`当前页: ${val}`);
		},

		//搜索
		search() {
			this.getArcticleList(this.keyword);
			// this.keyword = '';
		},
	},

    mounted() {
      this.getArcticleList();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .el-dialog__footer {
  	text-align: center;
  }
  .el-form-item {
  	margin-bottom: 8px;
  }
  .articleDetail {
  	ul {
  		li {
  			float: left;
  			margin-left: 15px;
  			&:first-child {
  				margin-left: 0;
  			}
  		}
  	}
  	a {
  		display: block;
  		color: blue;
  		.suoluetu {
	  		width: 100px;
	  		height: 100px;
	  		cursor: pointer;
	  	}
  	}
  }
</style>
