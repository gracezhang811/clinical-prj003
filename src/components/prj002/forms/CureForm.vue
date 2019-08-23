<template>
  <el-dialog title="治疗" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="cureForm" :model="cureForm" label-width="auto" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider></el-divider>

      <el-form-item label="中西医结合治疗">
        <el-switch v-model="cureForm.is_jiehe" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>

      <div>
        <div>
          <h3>中医治疗</h3>
          <h4>(1)治法</h4>
          <el-form-item label="虚证">
            <el-checkbox v-for="(val, key) in mydata.xu"
            :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.xu_qita"></el-input>
          </el-form-item>
          <el-form-item label="实证">
            <el-checkbox v-for="(val, key) in mydata.shi"
            :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.shi_qita"></el-input>
          </el-form-item>
          <el-form-item label="虚实夹杂证">
            <el-checkbox v-for="(val, key) in mydata.xushi"
            :key="key" :label="val" v-model="cureForm[key]">
            </el-checkbox>
            <el-input v-model="cureForm.xushi_qita"></el-input>
          </el-form-item>
          <h4>(2)方剂</h4>
          <el-form-item label="选用方剂">
            <el-input v-model="cureForm.xuanji"></el-input>
          </el-form-item>
          <el-form-item label="具体组成及剂量">
            <el-input v-model="cureForm.zucheng"></el-input>
          </el-form-item>
          <h4>(3)中成药</h4>
          <el-form-item label="是否使用中成药">
            <el-switch v-model="cureForm.zhongcheng" active-text="是" inactive-text="否"></el-switch>
            <el-input v-model="cureForm.zhongcheng_juti" v-show="cureForm.zhongcheng" placeholder="具体药物"></el-input>
          </el-form-item>
        </div>
        <div>
          <h3>西医治疗</h3>
          <el-form-item label="高雄激素血症的治疗">
            <el-switch v-model="cureForm.gaoxiong" active-text="是" inactive-text="否"></el-switch>
            <el-input v-model="cureForm.gaoxiong_juti" v-show="cureForm.gaoxiong" placeholder="具体药物"></el-input>
          </el-form-item>
          <el-form-item label="高胰岛素血症的治疗">
            <el-switch v-model="cureForm.yidao" active-text="是" inactive-text="否"></el-switch>
            <el-input v-model="cureForm.yidao_juti" v-show="cureForm.yidao" placeholder="具体药物"></el-input>
          </el-form-item>
          <el-form-item label="调周治疗">
            <el-switch v-model="cureForm.tiaozhou" active-text="是" inactive-text="否"></el-switch>
            <el-input v-model="cureForm.tiaozhou_juti" v-show="cureForm.tiaozhou" placeholder="具体药物"></el-input>
          </el-form-item>
          <el-form-item label="促排卵治疗">
            <el-switch v-model="cureForm.pailuan" active-text="是" inactive-text="否"></el-switch>
            <el-input v-model="cureForm.pailuan_juti" v-show="cureForm.pailuan" placeholder="具体药物"></el-input>
          </el-form-item>
          <el-form-item label="手术治疗">
            <el-switch v-model="cureForm.shoushu" active-text="是" inactive-text="否"></el-switch>
            <el-input v-model="cureForm.shoushu_juti" v-show="cureForm.shoushu" placeholder="具体手术方式"></el-input>
          </el-form-item>
          <el-form-item label="其他治疗">
            <el-input v-model="cureForm.gaoxiong_juti"></el-input>
          </el-form-item>
        </div>

      </div>
    </el-form>

    <span slot="footer">
      <el-button :disabled="check_status=='审核通过'" type="primary" v-if="exist"  @click="updateCureForm">确定</el-button>
      <el-button type="primary" v-else  @click="createCureForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'CureForm',
  data() {
    return {
      mydata: {
        'is_jiehe': '中西医结合治疗',
        xu:{'xu_yiqi': '益气健脾，养血调经','xu_bushen': '补肾助阳，温中健脾','xu_jian': '健脾温阳调经','xu_chong': '补肾益气，调补冲任','xu_ziyin': '滋阴补肾调经','xu_zhuyang': '温肾助阳，调补冲任','xu_buxue': '补血益气调经','xu_yangyin': '养阴清热调经'},
        'xu_qita': '虚症其他',
        shi:{'shi_xie': '泻肝清热除湿','shi_tiao': '疏肝解郁，理气调冲','shi_qing': '疏肝解郁，清热调经','shi_huo': '理气化瘀，活血调经','shi_zao': '燥湿化痰调经','shi_xue': '活血化瘀调经','shi_tan': '化痰祛瘀，活血调经'},
        'shi_qita': '实证其他',
        xushi:{'xushi_qushi': '健脾祛湿化痰','xushi_yijing': '补肾益精，疏肝理气调经','xushi_hua': '补肾益精，化痰燥湿','xushi_xue': '补肾益精，活血化痰调经','xushi_ziyin': '滋肾清热调经'},
        'xushi_qita': '虚实夹杂其他',
        'xuanji': '选用方剂',
        'zucheng': '具体组成及剂量',
        'zhongcheng': '中成药',
        'zhongcheng_juti': '中成药-具体药物',
        'gaoxiong': '高雄激素血症的治疗',
        'gaoxiong_juti': '高雄激素血症的治疗-具体药物',
        'yidao': '高胰岛素血症的治疗',
        'yidao_juti': '高胰岛素血症的治疗-具体药物',
        'tiaozhou': '调周治疗',
        'tiaozhou_juti': '调周治疗-具体药物',
        'pailuan': '促排卵治疗',
        'pailuan_juti': '促排卵治疗-具体药物',
        'shoushu': '手术治疗',
        'shoushu_juti': '手术治疗-具体手术方式',
        'cure_qita': '其他治疗',
      },
      cureForm:{
        is_jiehe: '',
        xu_yiqi: '',
        xu_bushen: '',
        xu_jian: '',
        xu_chong: '',
        xu_ziyin: '',
        xu_zhuyang: '',
        xu_buxue: '',
        xu_yangyin: '',
        xu_qita: '',
        shi_xie: '',
        shi_tiao: '',
        shi_qing: '',
        shi_huo: '',
        shi_zao: '',
        shi_xue: '',
        shi_tan: '',
        shi_qita: '',
        xushi_qushi: '',
        xushi_yijing: '',
        xushi_hua: '',
        xushi_xue: '',
        xushi_ziyin: '',
        xushi_qita: '',
        xuanji: '',
        zucheng: '',
        zhongcheng: '',
        zhongcheng_juti: '',
        gaoxiong: '',
        gaoxiong_juti: '',
        yidao: '',
        yidao_juti: '',
        tiaozhou: '',
        tiaozhou_juti: '',
        pailuan: '',
        pailuan_juti: '',
        shoushu: '',
        shoushu_juti: '',
        cure_qita: '',
        },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
    }
  },
  methods: {
    updateCureForm () {
      apiUpdatePatientDataForm({formData:this.cureForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    createCureForm () {
      apiCreatePatientDataForm({formData:this.cureForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    resetDialog () {
      this.cureForm = {}
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
        this.cureForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.cureForm = data.formData
      }

    })
  }

};
</script>
<style lang="">
</style>