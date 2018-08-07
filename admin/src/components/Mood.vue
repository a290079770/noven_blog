<template>
  <div class="content-main-wrap boxshadow">
    <el-row class="title">
		<span class="blue">心情</span>
		<span class="gray">/列表</span>
		<hr>
	</el-row>

	<!-- 搜索 -->
	<el-row class="search">
  		<el-col :span="12">&nbsp;</el-col>
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

	<!-- 心情列表 -->
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
		      prop="Author"
		      label="作者"
		      >
		      <!-- <template slot-scope="scope">{{ scope.row.Author }}</template> -->
		    </el-table-column>
		    <el-table-column
		      prop="Content"
		      label="内容"
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
		      prop="ReadCount"
		      label="点击率"
		      width="100">
		      <!-- <template slot-scope="scope">{{ scope.row.ReadCount }}</template> -->
		    </el-table-column>
		    <el-table-column label="操作" width="195">
	          <template slot-scope="scope">
	          	<el-button
	           	  plain
	              style="margin-left:0"
	              icon="el-icon-view"
	              size="mini"
	              type="success"
	              @click="moodDetail(scope.$index, scope.row)">查看详情
	          	</el-button>
	            <el-button
	           	  plain
	              style="margin-left:0"
	              icon="el-icon-delete"
	              size="mini"
	              type="danger"
	              @click="moodDelete(scope.$index, scope.row)">删除
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

	<!-- 心情详情弹框 -->
	<el-dialog
	  top="10vh"
	  title="心情详情"
	  :visible.sync="moodDetailDialog"
	  width="80%"
	  >
	  <div class="moodDetail">
		<el-form :label-position="labelPosition" label-width="100px" :model="moodDetailInfo">
		  <el-form-item label="所属用户ID">
		    <el-input v-model="moodDetailInfo.AuthorId"></el-input>
		  </el-form-item>
		  <el-form-item label="作者">
		    <el-input v-model="moodDetailInfo.Author"></el-input>
		  </el-form-item>
		  <el-form-item label="内容">
		    <textarea v-model="moodDetailInfo.Content"></textarea>
		  </el-form-item>
		  <el-form-item label="创建时间">
		    <el-input v-model="moodDetailInfo.CreateTime"></el-input>
		  </el-form-item>
		  <el-form-item label="点击率">
		    <el-input v-model="moodDetailInfo.ReadCount"></el-input>
		  </el-form-item>
		  <el-form-item label="心情缩略图">
		    <a :href="moodDetailInfo.Url" target="_blank">
		    	<img :src="moodDetailInfo.ThumbUrl">
		    	<span>点击打开新页面查看原图</span>
		    </a>
		  </el-form-item>
		</el-form>
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
				moodDetailDialog: false,
				moodDetailInfo: {}
	      }
	    },
	    methods: {
		//获取 用户 列表
		getArcticleList(keyword,cp,ps) {
			// keywords,cp,ps
			cp = cp || 1;
			ps = ps || 10;
			this.$http.get('/mood/moodList',{
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
		// 获取心情详情
		moodDetail(index, row) {
			this.moodDetailDialog = true;
			console.log(index, row);
			this.$http.get('/mood/detail',{
			  params:{
			     Id: row.Id
			  }
			}).then((res) => {
				console.log(res.data);
				this.moodDetailInfo = {};
				this.moodDetailInfo = res.data.data;
			})
		},

		// 删除心情
		moodDelete(index, row) {
		  console.log(index, row);
          this.$confirm('删除后将不可恢复，是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/mood/delete',{
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
              message: '已取消删除该心情！'
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
  .moodDetail {
  	a {
  		color: blue;
  		img {
	  		width: 60px;
	  		cursor: pointer;
	  	}
  	}
  }
</style>
