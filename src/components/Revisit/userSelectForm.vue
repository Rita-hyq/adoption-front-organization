<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看用户信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="用户账号">
                <div class="formText">{{ form.revisitUser.mobile }}</div>
            </el-form-item>
            <el-form-item label="用户昵称">
                <div class="formText">{{ form.revisitUser.name }}</div>
            </el-form-item>
            <el-form-item label="身份证号">
                <div class="formText">{{ form.revisitUser.idcard }}</div>
            </el-form-item>
            <el-form-item label="性别" style="margin-bottom: 0;">
                <div class="formText" v-if="form.revisitUser.sex === 0">男</div>
                <div class="formText" v-if="form.revisitUser.sex === 1">女</div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getRevisitUser } from '@/api/revisit'

  export default {
    name: 'userSelectForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          revisitUser: {
            mobile: '',
            name: '',
            idcard: '',
            sex: ''
          }
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getRevisitUser(id).then(result => {
            this.form = result.data.userInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.revisitUser.mobile = ''
        this.form.revisitUser.name = ''
        this.form.revisitUser.idcard = ''
        this.form.revisitUser.sex = ''
      }
    }
  }
</script>

<style scoped>
    .formText {
        padding: 0 15px;
    }
</style>
