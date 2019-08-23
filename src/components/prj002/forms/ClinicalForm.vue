<template>
  <el-dialog title="临床诊断" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="clinicalForm" :model="clinicalForm" label-width="auto" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider></el-divider>

      <el-form-item label="中医诊断">
          <el-checkbox v-for="(val, key) in mydata.zhongyi" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.zhong_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="辩证分型">
        <el-form-item label="虚证">
          <el-checkbox v-for="(val, key) in mydata.xuzheng" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.xu_qita" placeholder="其他" ></el-input>
        </el-form-item>
        <!-- 单选 -->
        <!-- <el-form-item label="虚证">
            <el-radio-group v-model="clinicalForm.xuzheng">
              <el-radio v-for="(val, key) in mydata.xuzheng" :key="key" :label="val">{{val}}</el-radio>
            </el-radio-group>
        </el-form-item> -->
        <el-form-item label="实证">
          <el-checkbox v-for="(val, key) in mydata.shizheng" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.shi_qita" placeholder="其他"></el-input>
        </el-form-item>
        <el-form-item label="虚实夹杂证">
          <el-checkbox v-for="(val, key) in mydata.xushi" :key="key" :label="val" v-model="clinicalForm[key]"></el-checkbox>
          <el-input v-model="clinicalForm.xushi_qita" placeholder="其他"></el-input>
        </el-form-item>
      </el-form-item>

      <el-form-item label="西医诊断">
        <el-checkbox label="多囊卵巢综合征" v-model="clinicalForm.xiyi_duonang"></el-checkbox>
        <el-input v-model="clinicalForm.xiyi_qita" placeholder="其他" ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" v-if="exist"  @click="updateClinicalForm">确定</el-button>
      <el-button type="primary" v-else  @click="createClinicalForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'ClinicalForm',
  data() {
    return {
      mydata: {
        zhongyi:{"zhong_bijing":"闭经", "zhong_buyun":"不孕", "zhong_zhengjia":"癥瘕", "zhong_benglou":"崩漏", "zhong_shitiao":"月经失调"},
        xuzheng:{"xu_piqixu":"脾气虚证", "xu_pishenyangxu":"脾肾阳虚证", "xu_piyangxu":"脾阳虚证", "xu_shenqixu":"肾气虚证",
                "xu_shenyinxu":"肾阴虚证", "xu_shenyangxu":"肾阳虚证", "xu_xuexu":"血虚证", "xu_yinxuneire":"阴虚内热证"},
        shizheng:{"shi_shire":"肝经湿热证", "shi_qizhi":"肝郁气滞证", "shi_yure":"肝经郁热证", "shi_qizhixueyu":"气滞血瘀证",
                  "shi_tanshi":"痰湿证", "shi_xueyu":"血瘀证", "shi_hujie":"痰瘀互结证"},
        xushi:{"xushi_pixutanshi":"脾虚痰湿证", "xushi_shenxuganyu":"肾虚肝郁证", "xushi_shenxutanshi":"肾虛痰湿证", "xushi_shenxuxueyu":"肾虚血瘀证", "xushi_shenxuneire":"肾虚内热证"}
      },
      clinicalForm: {
        "zhong_bijing":'', "zhong_buyun":'', "zhong_zhengjia":'', "zhong_benglou":'', "zhong_shitiao":'', "zhong_qita":'',
        "xu_piqixu":'', "xu_piyangxu":'', "xu_shenqixu":'', "xu_shenyinxu":'', "xu_shenyangxu":'', "xu_xuexu":'', "xu_yinxuneire":'', "xu_qita":'',
        "shi_shire":'', "shi_qizhi":'', "shi_yure":'', "shi_qizhixueyu":'', "shi_tanshi":'', "shi_xueyu":'', "shi_hujie":'', "shi_qita":'',
        "xushi_pixutanshi":'', "xushi_shenxuganyu":'', "xushi_shenxutanshi":'', "xushi_shenxuxueyu":'', "xushi_shenxuneire":'', "xushi_qita":'',
        "xiyi_duonang":'', "xiyi_qita":'',
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
    }
  },
  methods: {
    updateClinicalForm () {
      apiUpdatePatientDataForm({formData:this.clinicalForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch()
    },
    createClinicalForm () {
      apiCreatePatientDataForm({formData:this.clinicalForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch()
    },
    resetDialog () {
      this.clinicalForm = {}
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
        this.clinicalForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.clinicalForm = data.formData
      }

    })
  }

};
</script>
<style lang="">
</style>