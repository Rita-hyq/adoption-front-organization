<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="查看回访信息" width="40%" center>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="回访编号">
                <div class="formText">{{ form.id }}</div>
            </el-form-item>
            <el-form-item label="回访内容" style="margin-bottom: 0;">
<!--                <tinymce :height="300" v-model="form.content" v-if="dialogFormVisible"/>-->
                <div class="formText" v-html="form.content"></div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { getOneRevisit } from '@/api/revisit'

  export default {
    name: 'revisitSelectForm',
    components: {
      Tinymce
    },
    data() {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          content: ''
        }
      }
    },
    methods: {
      open(id) {
        this.dialogFormVisible = true
        if (id) {
          getOneRevisit(id).then(result => {
            this.form = result.data.revisitInfo
            const regex = new RegExp('<img', 'gi')
            this.form.content = this.form.content.replace(regex, `<img style="max-width: 100%; height: auto"`)
          })
        }
      },
      close() {
        this.dialogFormVisible = false
        this.form.id = ''
        this.form.content = ''
      }
    }
  }
</script>

<style scoped>
    .formText {
        padding: 0 15px;
    }
</style>
