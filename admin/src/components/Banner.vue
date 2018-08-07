<template>
  <div class="content-main-wrap boxshadow">
    <el-row class="title">
		<span class="blue">banner</span>
		<span class="gray">/列表</span>
		<hr>
	</el-row>

	<!-- 新增 & 搜索 -->
	<el-row class="search">
		<el-col :span="2">
			<el-button size="mini" type="primary" icon="el-icon-plus" @click="bannerAdd">新增</el-button>
  		</el-col>
  		<el-col :span="10">&nbsp;</el-col>
		<el-col :span="12">
			<el-input
      		 	size="small"
		    	placeholder="请输入关键字进行搜索..."
		    	suffix-icon="el-icon-search"
		    	v-model="keyword"
            	@keyup.enter.native="search">
		  	</el-input>
		</el-col>
	</el-row>

	<!-- banner图列表 -->
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
		      label="缩略图"
		      >
		      <template slot-scope="scope">
		      	<img :src="scope.row.Url" style="width: 60px">
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="Link"
		      label="超链接"
		      width="108">
		      <!-- <template slot-scope="scope">{{ scope.row.Brief }}</template> -->
		    </el-table-column>
		    <el-table-column
		      prop="CreateTime"
		      label="加入时间"
		      width="133">
		      <!-- <template slot-scope="scope">{{ scope.row.CreateTime }}</template> -->
		    </el-table-column>
		    <el-table-column
		      label="状态"
		      width="100">
		      <template slot-scope="scope">
		      	
		      	<el-tag
                    plain
                    size="mini"
                    :type="scope.row.IsShow === 1 ? 'info' : 'success'">
                    {{ scope.row.IsShow === 1 ? '已上架' : '已下架' }}
                </el-tag>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" width="252">
	          <template slot-scope="scope">
	          	<el-button
	           	  plain
	              style="margin-left:0"
	              :icon="scope.row.IsShow === 1 ? 'el-icon-download' : 'el-icon-upload2'"
	              size="mini"
	              :type="scope.row.IsShow === 1 ? 'success' : 'info'"
	              @click="changeShow(scope.$index, scope.row)">
	              	{{ scope.row.IsShow === 1 ? '下架' : '上架' }}
	          	</el-button>
	          	<el-button
	           	  plain
	              style="margin-left:0"
	              icon="el-icon-edit"
	              size="mini"
	              type="warning"
	              @click="bannerEdit(scope.$index, scope.row)">修改
	          	</el-button>
	            <el-button
	           	  plain
	              style="margin-left:0"
	              icon="el-icon-delete"
	              size="mini"
	              type="danger"
	              @click="bannerDelete(scope.$index, scope.row)">删除
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
	      :page-size="10"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="totality">
	    </el-pagination>
	  </el-col>
	</el-row>

	<!-- 新增banner弹框 -->
	<el-dialog
	  top="10vh"
	  title="新增文章"
	  :visible.sync="bannerAddDialog"
	  width="80%"
	  >
	  <div>
		<el-form :label-position="labelPosition" label-width="100px" :model="bannerInfo">
		  <el-form-item label="banner图ID" v-if="bannerInfo.Id">
		    <el-input v-model="bannerInfo.Id"></el-input>
		  </el-form-item>
		  <el-form-item label="标题">
		    <el-input v-model="bannerInfo.Title"></el-input>
		  </el-form-item>
		  <el-form-item label="类型">
		    <el-input v-model="bannerInfo.Type"></el-input>
		  </el-form-item>
		  <el-form-item label="是否展示">
		    <el-input v-model="bannerInfo.IsShow"></el-input>
		  </el-form-item>
		  <el-form-item label="banner地址">
		    <el-input v-model="bannerInfo.Url"></el-input>
		  </el-form-item>
		  <el-form-item label="banner对应的超链接">
		    <el-input v-model="bannerInfo.Link"></el-input>
		  </el-form-item>
		  <el-form-item label="创建时间">
		    <el-input v-model="bannerInfo.CreateTime"></el-input>
		  </el-form-item>
		  <el-form-item label="所属用户ID">
		    <el-input v-model="bannerInfo.AuthorId"></el-input>
		  </el-form-item>
		</el-form>
	  </div>
	  <div slot="footer" class="dialog-footer">
	    <el-button size="mini" @click="bannerAddCancle">取 消</el-button>
	    <el-button size="mini" type="primary" @click="bannerAddSure">确 定</el-button>
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
			bannerAddDialog: false,
			bannerInfo: {
				Title: '',
	            Type: '',// 1首页展示，2用户展示
	            IsShow: '',// 0 - 前台不展示 1 - 前台展示
	            Id: '',
	            Url: '',
	            Link: '',
	            CreateTime: '',
	            UserId: ''   //所属用户id，如果有该数据，则是用户的banner
			},
			labelPosition: 'right'
      }
    },
    methods: {
		//获取 banner图 列表
		getBannerList(keyword,cp,ps) {
			// keywords,cp,ps
			cp = cp || 1;
			ps = ps || 10;
			this.$http.get('/banner/bannerList',{
			  params:{
			     keywords:keyword,
			     cp:cp,
			     ps:ps
			  }
			}).then((res) => {
				this.tableData3 = [];
				this.tableData3 = res.data.data;

				this.totality = res.data.recordCount;
				this.currentPage = cp || this.currentPage;
				this.ps = ps || this.ps;
			})
		},
		// 新增banner图
		bannerAdd() {
			this.bannerAddDialog = true;
		},
		bannerAddCancle() {
			this.bannerAddDialog = false;
		},
		bannerAddSure() {
			this.bannerAddDialog = false;
			this.$http.post('/banner/createOrUpdate',{
              Title: this.bannerInfo.Title,
              Type: this.bannerInfo.Type,// 1首页展示，2用户展示
              IsShow: this.bannerInfo.IsShow,// 0 - 前台不展示 1 - 前台展示
              Id: this.bannerInfo.Id,
              Url: this.bannerInfo.Url,
              Link: this.bannerInfo.Link,
              CreateTime: this.bannerInfo.CreateTime,
              UserId: this.bannerInfo.UserId   //所属用户id，如果有该数据，则是用户的banner
            }).then((res) => {
              console.log(res.data);
              if(res.data.code === 200) {
                this.$message({
                  message: res.data.description,
                  type: 'success',
                  center: true
                });
                this.getBannerList();
                this.bannerInfo = {};
              } else {
                this.$message({
                  message: res.data.description,
                  type: 'error',
                  center: true
                });
              }
            })
		},
		bannerEdit(index, row) {
			console.log(index, row);
		},
		// 上架/下架
		changeShow(index, row) {
			console.log(index, row);
			let bannerIsShow = row.IsShow === 1 ? '下架' : '上架';
			console.log(bannerIsShow);
			this.$confirm('是否' + bannerIsShow + '该banner图?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	        }).then(() => {
	            this.$http.post('/banner/publish',{
	              Id: row.Id,
	              isShow: row.IsShow ? 0 : 1
	            }).then((res) => {
	              console.log(res.data);
	              if(res.data.code === 200) {
	                this.$message({
	                  message: res.data.description,
	                  type: 'success',
	                  center: true
	                });
	                this.getBannerList();
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
	              message: '已取消' + bannerIsShow + '该banner图!'
	            });
	        });
		},
		// 删除文章
		bannerDelete(index, row) {
		  console.log(index, row);
          this.$confirm('删除后将不可恢复，是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/banner/delete',{
              Id:row.Id,
            }).then((res) => {
              console.log(res.data);
              if(res.data.code === 200) {
                this.$message({
                  message: res.data.description,
                  type: 'success',
                  center: true
                });
                this.getBannerList();
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
              message: '已取消删除该Banner！'
            });
          });
		},

		//分页
		handleSizeChange(val) {
	    this.getBannerList('','',val);
		  // console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
	    this.getBannerList('',val,'');
		  // console.log(`当前页: ${val}`);
		},

		//搜索
		search() {
			this.getBannerList(this.keyword);
		},
	},

    mounted() {
      this.getBannerList();
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

</style>
