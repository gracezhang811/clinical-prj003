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
      <h3>中医诊断</h3>
      <el-form-item label="痛经" >
          <el-switch v-model="clinicalForm.zhong_tongjing" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="实证">
        <el-radio v-model="clinicalForm.shizheng"
                  v-for="item in shizheng"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.shizheng_qita" ></el-input>
      </el-form-item>
      <el-form-item label="虚证">
        <el-radio v-model="clinicalForm.xuzheng"
                  v-for="item in xuzheng"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="clinicalForm.xuzheng_qita" ></el-input>
      </el-form-item>
      <el-form-item label="虚实夹杂证">
        <el-input v-model="clinicalForm.xushi" ></el-input>
      </el-form-item>

      <h3>西医诊断</h3>
      <el-form-item label="原发性痛经" >
          <el-switch v-model="clinicalForm.xi_tongjing" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button type="primary" v-if="exist"  @click="updateClinicalForm">确定</el-button>
      <el-button type="primary" v-else  @click="createClinicalForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj003'
export default {
  name:'ClinicalForm',
  data() {
    return {
      shizheng:["寒凝血瘀证","气滞血瘀证","湿热瘀阻证","肝郁化火证"],
      xuzheng:["肾虚证","肾气亏虚证","肝肾亏损证","阳虚内寒证","气血虚弱证"],
      clinicalForm: {
        "zhong_bijing":'', "zhong_buyun":'', "zhong_zhengjia":'', "zhong_benglou":'', "zhong_shitiao":'', "zhong_qita":'',
        "xu_piqixu":'', "xu_piyangxu":'', "xu_shenqixu":'', "xu_shenyinxu":'', "xu_shenyangxu":'', "xu_xuexu":'', "xu_yinxuneire":'', "xu_qita":'',
        "shi_shire":'', "shi_qizhi":'', "shi_yure":'', "shi_qizhixueyu":'', "shi_tanshi":'', "shi_xueyu":'', "shi_hujie":'', "shi_qita":'',
        "xushi_pixutanshi":'', "xushi_shenxuganyu":'', "xushi_shenxutanshi":'', "xushi_shenxuxueyu":'', "xushi_shenxuneire":'', "xushi_qita":'',
        "xiyi_duonang":'', "xiyi_qita":'',
      },
      dialogVisible: false,
      exist: true,
      formName:''
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
