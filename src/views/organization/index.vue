<template>
    <div class="app-container">
        <el-row :gutter="30">

            <el-col :span="10" :xs="24">
                <el-card>
                    <el-form>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="用户头像:">
                                    <img style="width: 100px; height: 100px" :src="heading">
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="用户账号：">
                                    <div>{{ mobile }}</div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="用户昵称：">
                                    <div>{{ name }}</div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>

            <el-col :span="13" :xs="24">
                <el-card>
                    <el-form :model="form">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="省：">
                                    <div>{{ form.orgProvince.name }}</div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="市：">
                                    <div>{{ form.orgCity.name }}</div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="详细地址：">
                                    <div>{{ form.detail }}</div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="描述：">
                                    <div v-html="form.desc" style="margin-left: 40px;width: 595px"></div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getOneOrganization } from '@/api/organization'

  export default {
    name: 'index',
    computed: {
      ...mapGetters([
        'heading',
        'mobile',
        'name'
      ])
    },
    data() {
      return {
        form: {
          orgProvince: {
            name: ''
          },
          orgCity: {
            name :''
          },
          detail: '',
          desc: ''
        },
      }
    },
    created() {
      this.InitOptionList()
    },
    methods: {
      InitOptionList() {
        getOneOrganization().then(result => {
          this.form = result.data.organization
          const regex = new RegExp('<img', 'gi')
          this.form.desc = this.form.desc.replace(regex, `<img style="max-width: 100%; height: auto"`)
        })
      }
    }
  }
</script>

<style scoped>

</style>
