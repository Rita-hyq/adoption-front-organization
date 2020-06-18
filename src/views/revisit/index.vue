<template>
    <div class="revisit-list-container">
        <!-- 新增与查询 -->
        <el-form :inline="true">
            <el-form-item>
                <el-form-item>
                    <el-input v-model="searchParams.userMobile"
                              placeholder="请输入用户账号"
                              maxlength="11"
                              clearable
                              style="width: 190px">
                    </el-input>
                </el-form-item>
                <el-input v-model="searchParams.petName"
                          placeholder="请输入宠物昵称"
                          maxlength="10"
                          clearable
                          style="width: 150px">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select
                        v-model="searchParams.status"
                        placeholder="请选择回访状态"
                        style="width: 160px"
                        clearable
                        filterable>
                    <el-option value="0" label="未审核"/>
                    <el-option value="1" label="审核失败"/>
                    <el-option value="2" label="审核通过"/>
                </el-select>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initRevisit()">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="resetRevisit()">清空</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table
                :data="revisitData"
                border
                @sort-change="changeTableSort"
                element-loading-text="数据加载中"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="回访编号"
                    sortable="custom"
                    align="center"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="orderId"
                    label="订单编号"
                    align="center"
                    width="125">
            </el-table-column>
            <el-table-column
                    prop="revisitUser.mobile"
                    label="用户账号"
                    align="center"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="用户信息"
                    align="center"
                    width="130">
                <template slot-scope="scope">
                    <el-button @click="selectUser(scope.row.id)" type="primary" size="mini">
                        查看用户信息
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="revisitPet.name"
                    label="宠物昵称"
                    align="center"
                    width="130">
            </el-table-column>
            <el-table-column
                    label="宠物信息"
                    align="center"
                    width="130">
                <template slot-scope="scope">
                    <el-button @click="selectPet(scope.row.id)" type="primary" size="mini">
                        查看宠物信息
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    label="发布时间"
                    align="center"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="回访状态"
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0" type="danger">未审核</el-tag>
                    <el-tag v-if="scope.row.status === 1">审核失败</el-tag>
                    <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="selectRevisit(scope.row.id)"
                               type="primary"
                               size="mini">
                        查看
                    </el-button>
                    <el-button v-if="scope.row.status === 0"
                               @click="messageBoxOpen(scope.row.id, 2)"
                               type="success"
                               size="mini">
                        审核通过
                    </el-button>
                    <el-button v-if="scope.row.status === 0"
                               @click="messageBoxOpen(scope.row.id, 1)"
                               type="danger"
                               size="mini">
                        审核失败
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
                :current-page="page"
                :page-size="limit"
                :total="total"
                layout="total, prev, pager, next, jumper"
                @current-change="initRevisit"
        />

        <!-- 查看用户信息表单对话框-->
        <user-select-form
                ref="userSelectForm"/>

        <!-- 查看宠物信息表单对话框-->
        <pet-select-form
                ref="petSelectForm"/>

        <!-- 查看领养申请表表单对话框-->
        <revisit-select-form
                ref="revisitSelectForm"
                @onSaveSuccess="refreshList"/>
    </div>
</template>

<script>
  import userSelectForm from '@/components/Revisit/userSelectForm'
  import petSelectForm from '@/components/Revisit/petSelectForm'
  import revisitSelectForm from '@/components/Revisit/revisitSelectForm'
  import { getRevisit, updateRevisit } from '@/api/revisit'

  export default {
    name: 'index',
    components: {
      userSelectForm,
      petSelectForm,
      revisitSelectForm
    },
    data() {
      return {
        revisitData: [],
        total: 0,   // 总记录数
        page: 1,    //页码
        limit: 10,  //每页记录数
        searchParams: {},    // 查询条件
      }
    },
    created() {
      this.initRevisit()
    },
    methods: {
      initRevisit(page = 1) {
        this.page = page
        getRevisit(this.page, this.limit, this.searchParams).then(result => {
          if (result.code === 200) {
            this.revisitData = result.data.revisitInfo.rows
            this.total = result.data.revisitInfo.count
          }
        })
      },
      refreshList() {
        this.initRevisit(this.page)
      },
      resetRevisit() {
        this.searchParams = {}
        this.refreshList()
      },
      selectUser(id) {
        this.$refs.userSelectForm.open(id)
      },
      selectPet(id) {
        this.$refs.petSelectForm.open(id)
      },
      selectRevisit(id) {
        this.$refs.revisitSelectForm.open(id)
      },
      messageBoxOpen(id, status) {
        this.$confirm(`确认要对该回访进行审核操作吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.updateRevisitBtn(id, status)
        }).catch((result) => {
          if (result === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消审核！'
            })
          }
        })
      },
      updateRevisitBtn(id, status) {
        updateRevisit(id, status).then(result => {
          if (result.code === 200) {
            this.$message.success('修改成功')
            this.refreshList()
          }
        })
      },
      changeTableSort(column) {
        if(column.order === 'descending') {
          this.searchParams.sort = 'desc'
        } else {
          this.searchParams.sort = 'asc'
        }
        this.refreshList()
      }
    }
  }
</script>

<style scoped>
    .revisit-list-container {
        margin: 15px 15px;
    }

    .el-form-item {
        margin-bottom: 15px;
    }
</style>
