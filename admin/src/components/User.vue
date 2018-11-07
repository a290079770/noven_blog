<template>
  	<div class="content-main-wrap boxshadow">
  		<el-row class="title">
  			<span class="blue">用户</span>
  			<span class="gray">/列表</span>
  			<hr>
  		</el-row>

      <!-- 搜索 -->
  		<el-row class="search">
  			<el-col :span="12">&nbsp;</el-col>
  			<el-col :span="12">
  				<el-input
            size="small"
			    	placeholder="请输入手机号、昵称关键字进行搜索..."
			    	suffix-icon="el-icon-search"
			    	v-model="keyword"
            @keyup.enter.native="search">
  			  </el-input>
  			</el-col>
  		</el-row>

      <!-- 用户列表 -->
  		<el-row>
  			<el-table
  				border
  			    :data="tableData3"
  			    tooltip-effect="dark"
  			    style="width: 100%">
  			    <el-table-column
  			      prop="NickName"
  			      label="昵称"
  			      width="auto">
  			      <!-- <template slot-scope="scope">{{ scope.row.nickName }}</template> -->
  			    </el-table-column>
  			    <el-table-column
  			      label="年龄"
  			      >
  			      <template slot-scope="scope">{{ scope.row.Age ? scope.row.Age : '保密'  }}</template>
  			    </el-table-column>
  			    <el-table-column
  			      prop="Account"
  			      label="帐号">
  			      <!-- <template slot-scope="scope">{{ scope.row.account }}</template> -->
  			    </el-table-column>
  			    <el-table-column
  			      label="性别">
  			      <template slot-scope="scope">{{ scope.row.sex ? scope.row.sex : '保密' }}</template>
  			    </el-table-column>
  			    <el-table-column
  			      prop="CreateTime"
  			      label="创建时间"
              width="133">
  			      <!-- <template slot-scope="scope">{{ scope.row.time }}</template> -->
  			    </el-table-column>
            <el-table-column
              label="用户类型">
                <template slot-scope="scope">
                  <el-tag
                    plain
                    size="mini"
                    :type="scope.row.UserType == 3 ? 'primary' : (scope.row.UserType == 2 ? 'success' : 'info')">
                    {{ scope.row.UserType == 3 ? '超级管理员' : (scope.row.UserType == 2 ? '管理员' : '普通用户') }}
                  </el-tag>
                </template>
            </el-table-column>
            <el-table-column
              label="用户状态">
                <template slot-scope="scope">
                  <el-tag
                    plain
                    size="mini"
                    :type="scope.row.Status == 1 ? 'success' : 'warning'">
                    {{ scope.row.Status == 1 ? '正常' : '锁定' }}
                  </el-tag>
                </template>
            </el-table-column>
  			    <el-table-column label="操作" width="300">
		          <template slot-scope="scope" v-if="scope.row.UserType <= activeUserType">
                <el-button
                  plain
                  icon="el-icon-view"
                  size="mini"
                  type="success"
                  @click="seeDetail(scope.$index, scope.row)">查看详情
                </el-button>
                <el-button
                  plain
                  style="margin-left:0"
                  :icon=" scope.row.Status == 1 ? 'el-icon-goods' : 'el-icon-remove'"
                  size="mini"
                  type="info"
                  @click="lockOrOpen(scope.$index, scope.row)"
                  >{{ scope.row.Status == 1 ? '锁定' : '解锁' }}
                </el-button>
		            <el-button
                  plain
		              style="margin-left:0"
		              icon="el-icon-edit"
		              size="mini"
		              type="warning"
		              @click="resetPwd(scope.$index, scope.row)">重置密码
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

      <!-- 用户详情弹框 -->
      <el-dialog
        top="10vh"
        title="用户详情"
        :visible.sync="userDetailDialog"
        width="80%"
        >
        <div class="userDetail">
          <div class="touxiang" :style="{'background': 'url(' + userDetailInfo.CoverUrl  + ') center center / cover no-repeat', 'width': '150px', 'height': '150px', 'border-radius': '50%', 'margin': '0 auto', 'margin-bottom': '20px'}">
          </div>
          <el-form label-position="right" label-width="100px" :model="userDetailInfo">
            <el-form-item label="帐号">
              <el-input v-model="userDetailInfo.Account" readonly></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="userDetailInfo.NickName" readonly></el-input>
            </el-form-item>
            <el-form-item label="用户类型">
              <el-input v-model="userDetailInfo.UserType" readonly></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="userDetailInfo.Introduction" readonly></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="userDetailInfo.Age" readonly></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="userDetailInfo.Sex" readonly></el-input>
            </el-form-item>
            <el-form-item label="城市">
              <el-input v-model="userDetailInfo.City" readonly></el-input>
            </el-form-item>
          </el-form>
          
          <span slot="footer" class="dialog-footer" style="display: flex; justify-content: flex-end">
            <!-- <el-button @click="userDetailDialog = false">取 消</el-button> -->
            <el-button type="primary" @click="userDetailDialog = false">确 定</el-button>
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
            activeUserType: 1,
            userDetailInfo: {},
            userDetailDialog: false
	      }
	    },
	    methods: {
        //获取 用户 列表
        getUserList(keyword,cp,ps) {
          // keywords,cp,ps
          cp = cp || 1;
          ps = ps || 10;
          this.$http.get('/user/userList',{
            params:{
               keywords: keyword,
               cp: cp,
               ps: ps
            }
          }).then((res) => {
            console.log(res.data);
            if(res.data.code === 200) {
              this.tableData3 = [];
              // res.data.data.forEach((item,index) => {
              //   if(item.UserType === 1) {
              //     item.UserType = '普通用户';
              //   } else if (item.UserType === 2) {
              //     item.UserType = '管理员';
              //   } else if (item.UserType === 3) {
              //     item.UserType = '超级管理员';
              //   }
              // });
              this.tableData3 = res.data.data.list;

              this.totality = res.data.recordCount;
              this.currentPage = cp || this.currentPage;
              this.ps = ps || this.ps;
            } else {
              this.$message({
                message: res.data.description,
                type: 'error',
                center: true
              });
            }
          })
        },

    	  // 锁定/解锁
  			lockOrOpen(index, row) {
  				console.log(index, row);
  				// this.$router.push('/wrap/adminEdit');

          // 保存本行有关信息
          // this.$router.push({
          //   path:'/wrap/lockUser',
          //   query:{
          //     id:row.id,
          //     nickName: row.nickName,
          //     age: row.age,
          //     account: row.account,
          //     sex:row.sex,
          //     tel:row.tel,
          //     profession: row.profession,
          //   }
          // })
          // console.log(this.$route.query.tel);
          let userStatus = row.Status == 1 ? "锁定" : "解锁";
          this.$confirm('是否' + userStatus + '该用户', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('/user/lockUser',{
              Id: row.Id,
              Status: row.Status == 1 ? 2 : 1
            }).then((res) => {
              console.log(res.data);
              if(res.data.code === 200) {
                this.$message({
                  message: userStatus + "成功！",
                  type: 'success',
                  center: true
                });
                this.getUserList();
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
              message: '已取消' + userStatus + '!'
            });
          });
  			},
  			resetPwd(index, row) {
          let resetPwd = '123456';
          let resetPwdJiami = hex_sha1('123456');
          this.$confirm('是否将密码重置为' + resetPwd + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(index, row);
            this.$http.post('/user/updatePwd',{
              Id:row.Id,
              Password: resetPwdJiami
            }).then((res) => {
              console.log(res.data);
              if(res.data.code === 200) {
                this.$message({
                  message: res.data.description,
                  type: 'success',
                  center: true
                });
                // this.getUserList();
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
              message: '已取消重置密码！',
              center: true
            });
          });
  			},
        seeDetail(index, row) {
          console.log(index, row);
          this.userDetailDialog = true;
          this.$http.get('/user/detail', {
            params: {
              Id: row.Id
            }
          }).then((res) => {
            console.log(res.data);
            if(res.data.code === 200) {
              this.userDetailInfo = res.data.data;
              this.userDetailInfo.CoverUrl = this.userDetailInfo.CoverUrl || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541610478229&di=46134ec1a7b7c9a8823de9d8ad15629d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0152b457d1129b0000012e7e2d081f.jpg%401280w_1l_2o_100sh.jpg';
              this.userDetailInfo.UserType = this.userDetailInfo.UserType == 3 ? '超级管理员' : (this.userDetailInfo.UserType == 2 ? '管理员' : '普通用户')
            } else {
              this.$message({
                message: res.data.description,
                type: 'error',
                center: true
              });
            }

          })
        },

      	//分页
      	handleSizeChange(val) {
          this.getUserList('','',val);
      	  // console.log(`每页 ${val} 条`);
      	},
      	handleCurrentChange(val) {
          this.getUserList('',val,'');
      	  // console.log(`当前页: ${val}`);
      	},

        //搜索
        search() {
          this.getUserList(this.keyword);
          // this.keyword = '';
        },
	    },
      created() {
        this.getUserList();
        this.activeUserType = JSON.parse(sessionStorage.getItem('userDetail')).UserType;
      },
      mounted() {
        
      }
  	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.cell {
    font-size: 12px;
    padding: 0 5px;
  }
  .userDetail {

  }
</style>
