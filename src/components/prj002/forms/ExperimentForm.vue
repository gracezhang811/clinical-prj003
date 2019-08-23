<template>
  <el-dialog title="实验室检查" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="experimentForm" :model="experimentForm" label-width="210px" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>

      <el-divider></el-divider>

      <el-form-item v-for="(val, key) in mydata" :key="key" :label="val[0]">
        <!-- 这里应该提供度量单位 -->
        <el-input v-model="experimentForm[key]" type="number" min="0">
          <template slot="append">{{val[1]}}</template>
        </el-input>
      </el-form-item>

      <el-form-item label="胰岛素抵抗指数(HOMA-IR)">
        <el-input type="number" min="0" v-model="HOMAIR" disabled></el-input>
      </el-form-item>
      <el-form-item label="胰岛素敏感指数(ISI)">
        <el-input type="number" min="0" v-model="ISI" disabled></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" v-if="exist"  @click="updateExperimentForm">确定</el-button>
      <el-button type="primary" v-else  @click="createExperimentForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'ExperimentForm',
  data() {
    return {
      experimentForm:{
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
      mydata:{
            'check_gaotong':['睾酮（T）','ng/dl'],'check_ci':['雌二醇（E2）','pg/ml'],'check_huangti':['黄体生成素（LH）','W/ml'],
            'check_luanpao':['卵泡刺激素（FSH）','W/l'],'check_xue':['血清泌乳素（PRL）','ng/ml'],'check_xuetang':['空腹血糖（FPG）','uV/ml'],
            'check_yidaosu':['空腹胰岛素（FINS）',' mmol/l'],'check_canxue':['餐后30mins血糖（FPG）',' uV/ml'],
            'check_canyi':['餐后30mins胰岛素（FINS）','mmol/l'],'check_cantang':['餐后60mins血糖（FPG）',' uV/ml'],
            'check_candao':['餐后60mins胰岛素（FINS）','mmol/l'],'check_canxuetang':['餐后120mins血糖（FPG）','uV/ml'],
            'check_canyidao':['餐后1200mins胰岛素（FINS）','mmol/l'],'check_xuezhi':['空腹血脂','mmol/l'],'check_gaomizhi':['空腹高密度脂蛋白','mmol/l'],
            'check_dimizhi':['空腹低密度脂蛋白','mmol/l']
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
    }
  },
  computed:{
    HOMAIR () {
      const ratio = Number(this.experimentForm.check_xuetang) * Number(this.experimentForm.check_yidaosu) / 22.5
      this.experimentForm.yidaosu_dikang = ratio.toFixed(2)
      return ratio.toFixed(2)
    },
    ISI () {
      const flag = (this.experimentForm.check_xuetang == undefined) || (this.experimentForm.check_yidaosu == undefined)
                || (this.experimentForm.check_xuetang == null) || (this.experimentForm.check_yidaosu == null)
                || Number(this.experimentForm.check_xuetang)== 0 || Number(this.experimentForm.check_yidaosu == 0)
      if (!flag) {
        const ratio = 1 / ( Number(this.experimentForm.check_xuetang) * Number(this.experimentForm.check_yidaosu) )
        this.experimentForm.yidaosu_mingan = ratio.toFixed(5)
        return ratio.toFixed(5)
      } else {
        this.experimentForm.yidaosu_mingan = 0
        return 0
      }
    }
  },
  methods: {
    updateExperimentForm () {
      apiUpdatePatientDataForm({formData:this.experimentForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch()
    },
    createExperimentForm () {
      apiCreatePatientDataForm({formData:this.experimentForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch()
    },
    resetDialog () {
      this.experimentForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
      if (!data.exist) {
        //未创建
        this.experimentForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.experimentForm = data.formData
      }
    })
  }

};
</script>
<style lang="">
</style>