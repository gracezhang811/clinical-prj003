<template>
  <el-dialog title="新增患者信息" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="70%" center>

    <el-form ref="patientInfo" :model="patientInfo" :rules="rules" label-width="130px" label-position="left">

      <el-form-item label="姓名" prop="name">
        <el-input v-model="patientInfo.name"></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="patientInfo.phone"></el-input>
      </el-form-item>

      <el-form-item label="就诊医院" prop="hospital">
        <el-input v-model="patientInfo.hospital"></el-input>
      </el-form-item>

      <el-form-item label="出生日期" prop="birth">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="patientInfo.birth"
                        type="month" placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="职业" prop="career">
        <el-select v-model="patientInfo.career" placeholder="请选择">
          <el-option v-for="item in careerSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
      <span slot="footer">
        <el-button type="primary" @click="addPatient">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { apiAddPatient } from '@/api/api-prj002'
export default {
    name:'AddPatient',
    data () {
      return {
        patientInfo: {name:'测试用', phone:'13110983476', hospital:'汉典医院', birth:'1980-09', career:'个体'},
        // patientInfo: {name:'', phone:'', hospital:'', birth:'', career:''},
        careerSelection: ["学生","个体","农民","军人","工人","财会人员","技术人员","服务业","科教文卫","行政管理","无业","其它"],
        dialogVisible: false,
        rules:{
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            {required: true, pattern: /^1\d{10}$/, message: '请输入11位手机号码',trigger: 'blur'}
          ],
          hospital:[{required: true, message: '请填写就诊医院名称'}],
          birth:   [{required: true, message: '请填写出生日期'}],
          career:  [{required: true, message: '请填写职业'}]
        }
      }

    },
    methods: {
      addPatient () {
        this.$refs.patientInfo.validate( (valid) => {
          if (valid) {
            let para = {
              patientInfo: this.patientInfo
            }
            apiAddPatient(para)
            .then( (res)=> {
              this.$message({message: '提交成功',type: 'success'})
              this.dialogVisible = false
              this.$parent.getPatients()
              }
            )
            .catch()
          } else {
            this.$message({message: '请填写完整信息',type: 'warning'})
            return false;
          }
        })

      }
    },
    created() {
      this.$on("addEvent", function(data) {
        this.dialogVisible = true;
      });
    }
}

    // // 新增
    // addSubmit: function () {
    //   this.$refs.addForm.validate((valid) => {
    //     if (valid) {
    //       this.$confirm('确认提交吗？', '提示', {}).then(() => {
    //         this.addLoading = true
    //         // NProgress.start();
    //         let para = Object.assign({}, this.addForm)
    //         para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
    //         addUser(para).then((res) => {
    //           this.addLoading = false
    //           // NProgress.done();
    //           this.$message({
    //             message: '提交成功',
    //             type: 'success'
    //           })
    //           this.$refs['addForm'].resetFields()
    //           this.addFormVisible = false
    //           this.getPatients()
    //         })
    //       })
    //     }
    //   })
    // },
</script>

<style lang="scss">

</style>
