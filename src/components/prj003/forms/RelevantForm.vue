<template>
  <el-dialog title="相关检查" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="relevantForm" :model="relevantForm" label-width="210px" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider></el-divider>

      <el-form-item label="体格检查">
        <el-checkbox v-for="(val, key) in body_check" :key="key" :label="val" v-model="relevantForm[key]">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="辅助检查">
        <el-checkbox v-for="(val, key) in assist_check" :key="key" :label="val" v-model="relevantForm[key]">
        </el-checkbox>
      </el-form-item>
      <el-form-item label="检查结果">
        <label>以上检查结果如有异常请输入检查结果</label>
        <el-input v-model="relevantForm.check_result"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="primary" v-if="exist"  @click="updaterelevantForm">确定</el-button>
      <el-button type="primary" v-else  @click="createrelevantForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj003'
export default {
  name:'relevantForm',
  data() {
    return {
      body_check:{body_check_wu:"无",body_check_fuke:"妇科检查",body_check_quan:"全身检查"},
      assist_check:{assist_check_wu:"无",assist_check_chao:"超声",assist_check_mri:"盆腔MRI检查",assist_check_gong:"宫腔镜检查",assist_check_fu:"腹腔镜检查",assist_check_zi:"子宫输卵管造影",assist_check_ji:"基础体温测定",assist_check_ji_dan:"单相",assist_check_ji_shuang:"双相",assist_check_pen:"盆腔血流图检查",assist_check_jing:"经血前列腺素测定"},
      relevantForm:{
          check_gaotong:'',           //睾酮（T）
          check_ci:'',                //雌二醇（E2）
          check_huangti:'',           //黄体生成素（LH）
          check_luanpao:'',           //卵泡刺激素（FSH）
          check_xue:'',               //血清泌乳素（PRL）
          check_xuetang:'',           //空腹血糖（FPG）
          check_kangmiao:'',          //抗苗勒氏测定（AMH
          check_yidaosu:'',           //空腹胰岛素（FINS）
          check_canxue:'',            //餐后30mins血糖（FPG）
          check_canyi:'',             //餐后30mins胰岛素（FINS）
          check_cantang:'',           //餐后60mins血糖（FPG）
          check_candao:'',            //餐后60mins胰岛素（FINS）
          check_canxuetang:'',        //餐后120mins血糖（FPG）
          check_canyidao:'',          //餐后1200mins胰岛素（FINS）
          check_xuezhi:'',            //空腹血脂
          check_gaomizhi:'',          //空腹高密度脂蛋白
          check_dimizhi:'',           //空腹低密度脂蛋白
          yidaosu_dikang:'',          //胰岛素抵抗指数（HOMA-IR） （空腹血糖×空腹胰岛素）/22.5
          yidaosu_mingan:''           //胰岛素敏感指数（ISI） 1/（空腹血糖×空腹胰岛素）
      },

      dialogVisible: false,
      exist: true,
      formName:''
    }
  },
  computed:{
    HOMAIR () {
      const ratio = Number(this.relevantForm.check_xuetang) * Number(this.relevantForm.check_yidaosu) / 22.5
      this.relevantForm.yidaosu_dikang = ratio.toFixed(2)
      return ratio.toFixed(2)
    },
    ISI () {
      const flag = (this.relevantForm.check_xuetang == undefined) || (this.relevantForm.check_yidaosu == undefined)
                || (this.relevantForm.check_xuetang == null) || (this.relevantForm.check_yidaosu == null)
                || Number(this.relevantForm.check_xuetang)== 0 || Number(this.relevantForm.check_yidaosu == 0)
      if (!flag) {
        const ratio = 1 / ( Number(this.relevantForm.check_xuetang) * Number(this.relevantForm.check_yidaosu) )
        this.relevantForm.yidaosu_mingan = ratio.toFixed(5)
        return ratio.toFixed(5)
      } else {
        this.relevantForm.yidaosu_mingan = 0
        return 0
      }
    }
  },
  methods: {
    updaterelevantForm () {
      apiUpdatePatientDataForm({formData:this.relevantForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch()
    },
    createrelevantForm () {
      apiCreatePatientDataForm({formData:this.relevantForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch()
    },
    resetDialog () {
      this.relevantForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      if (!data.exist) {
        //未创建
        this.relevantForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.relevantForm = data.formData
      }
    })
  }

};
</script>
<style lang="">
</style>
