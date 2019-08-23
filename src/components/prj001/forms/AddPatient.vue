<template>
  <el-dialog title="新增患者信息" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="70%" center>

    <el-form ref="patientInfo" :model="patientInfo" :rules="rules" label-width="130px" label-position="left">

      <el-form-item label="患者姓名" prop="name">
        <el-input v-model="patientInfo.name"></el-input>
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

      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="patientInfo.phone"></el-input>
      </el-form-item>

      <el-form-item label="	填表专家姓名" prop="expert">
        <el-input v-model="patientInfo.expert"></el-input>
      </el-form-item>

      <el-form-item label="	职称" prop="title">
        <el-input v-model="patientInfo.title"></el-input>
      </el-form-item>

      <el-form-item label="民族">
        <el-select v-model="patientInfo.nation" placeholder="请选择">
          <el-option v-for="item in nationSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
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
import { apiAddPatient } from '@/api/api-prj001'
export default {
    name:'AddPatient',
    data () {
      return {
        dialogVisible: false,
        patientInfo: {name:'测试用',
                      hospital:'汉典医院',
                      birth:'',
                      telephone:'13110983476',
                      expert:'填表专家',
                      title:'职称',
                      nation:'汉族',
                      career:'学生'},
        nationSelection: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
        careerSelection: ["学生","个体","农民","军人","工人","财会人员","技术人员","服务业","科教文卫","行政管理","无业","其它"],
        rules:{
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            {required: true, pattern: /^1\d{10}$/, message: '请输入11位手机号码',trigger: 'blur'}
          ],
          hospital:[{required: true, message: '请填写就诊医院名称'}],
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

</script>

<style lang="scss">

</style>
