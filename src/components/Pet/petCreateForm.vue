<template>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogFormVisible" title="新增宠物信息" width="40%" center @close="close">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="宠物昵称">
                <el-input v-model="form.name" maxlength="10" style="width: 407.6px"/>
            </el-form-item>
            <el-form-item label="品种">
                <el-select
                        v-model="form.category.classification.name"
                        placeholder="请选择宠物分类"
                        filterable
                        @change="classificationChanged">
                    <el-option
                            v-for="item in classificationList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"/>
                </el-select>
                <el-select
                        v-model="form.category.name"
                        placeholder="请选择宠物品种"
                        filterable>
                    <el-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio :label="0">公</el-radio>
                    <el-radio :label="1">母</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
                <el-select
                        v-model="form.age"
                        placeholder="请选择年龄"
                        filterable>
                    <el-option
                            v-for="item in ageList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="体重(kg)">
                <el-input v-model="form.weight" maxlength="5"/>
            </el-form-item>
            <el-form-item label="疫苗情况">
                <el-radio-group v-model="form.isVaccine">
                    <el-radio :label="0">不详</el-radio>
                    <el-radio :label="1">未接种</el-radio>
                    <el-radio :label="2">接种中</el-radio>
                    <el-radio :label="3">已接种</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="驱虫情况">
                <el-radio-group v-model="form.isRepellant">
                    <el-radio :label="0">不详</el-radio>
                    <el-radio :label="1">未驱虫</el-radio>
                    <el-radio :label="2">已驱虫</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="绝育情况">
                <el-radio-group v-model="form.isSterilization">
                    <el-radio :label="0">不详</el-radio>
                    <el-radio :label="1">未绝育</el-radio>
                    <el-radio :label="2">已绝育</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="详细图片">
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:3000/organization/uploadHeading"
                        accept="image/jpeg,image/png"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.petInformation.imageSrc" :src="imageSrcBase64" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="宠物描述">
                <tinymce :height="300" v-model="form.petInformation.petDesc" v-if="dialogFormVisible"/>
            </el-form-item>
            <el-form-item label="宠物状态" style="margin-bottom: 0;">
                <el-radio-group v-model="form.status">
                    <el-radio :label="0">已上架</el-radio>
                    <el-radio :label="1">已下架</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 0 10px;">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="saveOrUpdate">新增</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import { createPet } from '@/api/pet'
  import { getCategoryList, getClassificationList } from '@/api/main'
  import { validChineseAlphabet, validFloat1 } from '@/utils/validate'

  export default {
    name: 'petCreateForm',
    components: {
      Tinymce
    },
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          sex: 0,
          age: '',
          weight: '',
          isVaccine: 0,
          isRepellant: 0,
          isSterilization: 0,
          status: 0,
          category: {
            name: '',
            classification: {
              name: ''
            }
          },
          petInformation: {
            imageSrc: '',
            petDesc: ''
          }
        },
        imageSrcBase64: '',
        classificationList: [], //分类列表
        categoryList: [],       //品种列表
        ageList: [
          {
            value: 0,
            label: '0-3个月'
          }, {
            value: 1,
            label: '4-6个月'
          }, {
            value: 2,
            label: '7-12个月'
          }, {
            value: 3,
            label: '1岁'
          }, {
            value: 4,
            label: '2岁'
          }, {
            value: 5,
            label: '3岁'
          }, {
            value: 6,
            label: '4岁'
          }, {
            value: 7,
            label: '5岁'
          }, {
            value: 8,
            label: '6岁'
          }, {
            value: 9,
            label: '7岁'
          }, {
            value: 10,
            label: '8岁'
          }, {
            value: 11,
            label: '9岁'
          }, {
            value: 12,
            label: '10岁'
          }, {
            value: 13,
            label: '11岁'
          }, {
            value: 14,
            label: '12岁'
          }, {
            value: 15,
            label: '13岁'
          }, {
            value: 16,
            label: '14岁'
          }, {
            value: 17,
            label: '15岁'
          }, {
            value: 18,
            label: '16岁'
          }, {
            value: 19,
            label: '17岁'
          }, {
            value: 20,
            label: '18岁'
          }, {
            value: 21,
            label: '19岁'
          }, {
            value: 22,
            label: '20岁'
          }]
      }
    },
    created() {
      this.InitOptionList()
    },
    methods: {
      InitOptionList() {
        getClassificationList().then(result => {
          result.data.classificationInfo.forEach(classification => {
            this.classificationList.push(classification)
          })
        })
      },
      classificationChanged(label) {
        this.form.category.name = ''
        this.categoryList = []
        for (let i = 0; i < this.classificationList.length; i++) {
          if (this.classificationList[i].id === label) {
            getCategoryList(label).then(result => {
              result.data.categoryInfo.forEach(category => {
                this.categoryList.push(category)
              })
            })
          }
        }
      },
      saveOrUpdate() {
        if (this.form.name.length === 0) {
          this.$message.error('请输入宠物昵称！')
        } else if (!validChineseAlphabet(this.form.name)) {
          this.$message.error('昵称请输入中文或英文！')
        } else if (this.form.category.classification.name.length === 0) {
          this.$message.error('请选择宠物分类！')
        } else if (this.form.category.name.length === 0) {
          this.$message.error('请选择宠物品种！')
        } else if (this.form.age.length === 0) {
          this.$message.error('请选择年龄！')
        } else if (!validFloat1(this.form.weight)) {
          this.$message.error('体重请输入0.1-100.0的整数或小数！')
        } else if (this.form.petInformation.imageSrc.length === 0) {
          this.$message.error('请上传图片！')
        } else if (this.form.petInformation.petDesc.length === 0) {
          this.$message.error('请输入宠物描述！')
        } else {
          createPet(this.form).then(result => {
            if (result.code === 200) {
              this.dialogFormVisible = false
              this.$message.success('新增成功')
              // 调用父组件监听函数
              this.$emit('onSaveSuccess')
            }
          })
        }
      },
      open() {
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
        this.form.name = ''
        this.form.sex = 0
        this.form.age = ''
        this.form.weight = ''
        this.form.isVaccine = 0
        this.form.isRepellant = 0
        this.form.isSterilization = 0
        this.form.status = 0
        this.form.category.name = ''
        this.form.category.classification.name = ''
        this.form.petInformation.imageSrc = ''
        this.form.petInformation.petDesc = ''
      },
      handleAvatarSuccess(res, file) {
        this.imageSrcBase64 = URL.createObjectURL(file.raw)     // base64编码
        this.form.petInformation.imageSrc = res.data.heading
      },
      beforeAvatarUpload(file) {
        const isIMAGE = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式！')
          return isIMAGE
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB！')
          return isLt1M
        }
      }
    }
  }
</script>

<style scoped>
    .el-input {
        width: 203.8px;
    }

    /*头像*/
    .avatar-uploader {
        width: 178px;
        height: 178px;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px solid #eaeaea;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    /*富文本*/
    .tinymce-container {
        position: relative;
        line-height: normal;
        width: 470px;
    }
</style>
