<template>
  <div class="content-main-wrap boxshadow">
    <el-row class="title">
		<span class="blue">留言评论</span>
		<span class="gray">/列表</span>
		<hr>
	</el-row>

	<!-- 新增 & 搜索 -->
	<el-row class="search">
  	<el-col :span="18">
  		<el-select size="small" v-model="type" placeholder="全部" @change="search">
		    <el-option label="全部" :value="0"></el-option>
		    <el-option label="留言" :value="1"></el-option>
		    <el-option label="文章评论" :value="2"></el-option>
		  </el-select>
  	</el-col>
		<el-col :span="6">
			<el-input
			  style="width: 100%"
  		 	size="small"
       	placeholder="请输入关键字进行搜索..."
     	  suffix-icon="el-icon-search"
    	  v-model="keywords"
        @keyup.enter.native="search">
		  </el-input>
		</el-col>
	</el-row>

	<!-- comment图列表 -->
	<el-row>
		<el-table
		border
    :data="dataList"
    tooltip-effect="dark"
    style="width: 100%">
    <el-table-column
      prop="Id"
      label="编号"
      width="60">
      <!-- <template slot-scope="scope">{{ scope.row.Id }}</template> -->
    </el-table-column>
    <el-table-column
      prop="NickName"
      label="作者"
      width="100"
      >
      <!-- <template slot-scope="scope">{{ scope.row.Title }}</template> -->
    </el-table-column>
    <el-table-column
      label="内容"
      >
      <template slot-scope="scope">
        <span style="font-size: 12px;">{{ scope.row.Content }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="类型"
      width="60">
      <template slot-scope="scope">{{ ['未知','留言','文章'][scope.row.Type] }}</template>
    </el-table-column>
    <el-table-column
      prop="ReplyNickName"
      label="被回复人"
      width="100"
      >
    </el-table-column>
    <el-table-column
      prop="Pid"
      label="被回复Id"
      width="60"
      >
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="133">
      <template slot-scope="scope">
      	<span style="font-size: 12px;">{{ scope.row.CreateTime }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="层级"
      width="60">
      <template slot-scope="scope">
        <el-tag
          plain
          size="mini"
          :type="scope.row.Pid > 0 ? 'warning' : 'success'">
          {{ scope.row.Pid > 0 ? '二级' : '一级' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="80">
      <template slot-scope="scope">
      	<el-tag
          plain
          size="mini"
          :type="scope.row.IsShow === 1 ? 'success' : 'info'">
          {{ scope.row.IsShow === 1 ? '已上架' : '已下架' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100">
        <template slot-scope="scope">
        	<el-button
         	  plain
            :icon="scope.row.IsShow === 1 ? 'el-icon-download' : 'el-icon-upload2'"
            size="mini"
            :type="scope.row.IsShow === 1 ? 'danger' : 'success'"
            @click="changeShow(scope.$index, scope.row)">
            	{{ scope.row.IsShow === 1 ? '下架' : '上架' }}
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
	      :current-page="cp"
	      :page-sizes="[5,10, 20, 30]"
	      :page-size="ps"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
	  </el-col>
	</el-row>


  </div>
</template>

<script>
export default {
  data() {
    return {
    	dataList:[],
			keywords: '',
			cp:1,
			ps:10,
			total: 0,
			type: 0,
    }
  },
  methods: {
	  //获取 comment图 列表
		async getCommentList() {
			let { keywords , cp , ps , type } = this;

			let { data: { code , description , data, recordCount } } = await this.$http.get('/comment/commentListAdmin',{
			  params:{
			    keywords,
			    cp,
			    ps,
			    type
			  }
			})
			
			if(code !== 200) {
				this.$message.error(description);
				return;
			}

			this.dataList = data;
			this.total = recordCount;
		},

		search() {
			this.cp = 1;
			this.getCommentList();
		},
	
		// 上架/下架
		async changeShow(index, row) {
			let commentIsShow = row.IsShow === 1 ? '下架' : '上架';

			let confirm = await this.$confirm('是否' + commentIsShow + '该留言（评论）?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })

      if(!confirm) return;

      let { data: { code ,description }} = await this.$http.post('/comment/upOrDownShelf',{
        Id: row.Id,
        IsShow: row.IsShow ? 0 : 1
      })

      if(code !== 200) {
				this.$message.error(description);
				return;
			}

			this.$message.success('操作成功');

      this.getCommentList();
		},
		// 删除文章
		commentDelete(index, row) {
      this.$confirm('删除后将不可恢复，是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/comment/delete',{
          Id:row.Id,
        }).then((res) => {
          if(res.data.code === 200) {
            this.$message({
              message: res.data.description,
              type: 'success',
              center: true
            });
            this.getCommentList();
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
          message: '已取消删除该Comment！'
        });
      });
		},

		//分页
		handleSizeChange(val) {
			this.ps = val;
	    this.getCommentList();
		},
		handleCurrentChange(val) {
			this.cp = val;
	    this.getCommentList();
		},
	},
	created() {
    this.getCommentList();
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
