<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看宠物信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="宠物编号">
                <div class="formText">{{ form.petId }}</div>
            </el-form-item>
            <el-form-item label="宠物昵称">
                <div class="formText">{{ form.revisitPet.name }}</div>
            </el-form-item>
            <el-form-item label="宠物分类">
                <div class="formText">{{ form.revisitPet.category.classification.name }}</div>
            </el-form-item>
            <el-form-item label="宠物品种">
                <div class="formText">{{ form.revisitPet.category.name }}</div>
            </el-form-item>
            <el-form-item label="性别">
                <div class="formText" v-if="form.revisitPet.sex === 0">公</div>
                <div class="formText" v-if="form.revisitPet.sex === 1">母</div>
            </el-form-item>
            <el-form-item label="体重(kg)" style="margin-bottom: 0;">
                <div class="formText">{{ form.revisitPet.weight }}</div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { getRevisitPet } from '@/api/revisit'

  export default {
    name: 'petSelectForm',
    data() {
      return {
        dialogFormVisible: false,
        form: {
          petId: '',
          revisitPet: {
            name: '',
            sex: '',
            weight: '',
            category: {
              name: '',
              classification: {
                name: ''
              }
            }
          }
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getRevisitPet(id).then(result => {
            this.form = result.data.petInfo
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.petId = ''
        this.form.revisitPet.name = ''
        this.form.revisitPet.sex = ''
        this.form.revisitPet.weight = ''
        this.form.revisitPet.category.name = ''
        this.form.revisitPet.category.classification.name = ''
      }
    }
  }
</script>

<style scoped>
    .formText {
        padding: 0 15px;
    }
</style>
