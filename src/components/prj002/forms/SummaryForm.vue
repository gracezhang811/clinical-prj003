<template>
  <el-dialog title="病情概要" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="summaryForm" :model="summaryForm" label-width="130px" label-position="left">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>

      <el-divider></el-divider>

      <template v-for="(q_val,q_key) in mydata">
        <el-form-item label="正常" :key="q_key">
          <el-switch v-model="summaryForm[q_key]" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item v-show="!summaryForm[q_key]" v-for="(val, key) in q_val" :label="val" :key="key">
          <el-radio-group v-model="summaryForm[key]">
            <el-radio-button label="无"></el-radio-button>
            <el-radio-button label="轻"></el-radio-button>
            <el-radio-button label="中"></el-radio-button>
            <el-radio-button label="重"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </template>

      <el-form-item label="舌质">
        <el-checkbox v-for="(val, key) in tongue_texture" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.texture_qita"></el-input>
      </el-form-item>
      <el-form-item label="舌苔">
        <el-checkbox v-for="(val, key) in tongue_coating" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.coating_qita"></el-input>
      </el-form-item>
      <el-form-item label="舌体">
        <el-checkbox v-for="(val, key) in tongue_body" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.tongue_qita"></el-input>
      </el-form-item>
      <el-form-item label="脉象">
        <el-checkbox v-for="(val, key) in pulse" :key="key" :label="val" v-model="summaryForm[key]">
        </el-checkbox>
        <el-input v-model="summaryForm.pulse_qita"></el-input>

      </el-form-item>

    </el-form>
    <span slot="footer">
        <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateSummaryForm">确定</el-button>
        <el-button type="primary" v-else  @click="createSummaryForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'SummaryForm',
  data() {
    return {
      mydata: {
        'face_head': {'face_head_tou':'头晕头胀','face_head_er':'耳鸣','face_head_muxuan':'目眩眼花','face_head_muse':'目涩干痒','face_head_zhong':'晨起眼睑浮肿'},
        'face_color':{'face_color_bai':'面白浮肿','face_color_an':'面色晦暗','face_color_huang':'面色萎黄','face_color_dan':'面色淡白无华','face_color_hong':'面色潮红','face_color_hei':'面目黧黑','face_color_chi':'面红唇赤'},
        'mouth':     {'mouth_chi':'齿松发脱','mouth_gan':'口干不欲饮','mouth_nian':'口黏','mouth_ku':'口苦咽干','mouth_throat':'咽痛咽痒','mouth_yi':'咽部异物感'},
        'spirit':    {'spirit_kun':'困倦嗜睡','spirit_pi':'神疲乏力','spirit_shao':'少气懒言','spirit_jian':'健忘','spirit_jiao':'焦虑抑郁','spirit_xi':'喜怒无常','spirit_bei':'悲伤欲哭'},
        'limbs':     {'limbs_wu':'无力','limbs_ma':'麻木','limbs_shou':'手足心热','limbs_zhi':'肢体困重','limbs_wei':'畏寒肢冷'},
        'body':      {'body_zhong':'肢体浮肿','body_fei':'形体肥胖','body_shou':'形体瘦弱'},
        'chest':     {'chest_huang':'心慌心悸','chest_men':'胸闷气短','chest_exin':'恶心呕吐','chest_xiong':'胸胁胀痛或刺痛','chest_ru':'乳房胀痛或刺痛','chest_yi':'溢乳','chest_suan':'嗳气反酸','chest_tan':'痰涎'},
        'cold_hot':  {'cold_hot_wei':'畏寒','cold_hot_hong':'烘热汗出','cold_hot_wu':'五心烦热','cold_hot_shi':'失眠盗汗','cold_hot_di':'低热不退','cold_hot_chao':'潮热颧红','cold_hot_dong':'动则汗出','cold_hot_dao':'盗汗'},
        'waist':     {'waist_zhang':'脘腹胀满','waist_juan':'小腹胀痛拒按','waist_xian':'小腹隐痛喜按','waist_zhui':'小腹有下坠感','waist_fuleng':'小腹冷痛','waist_fuci':'小腹刺痛','waist_yaosuan':'腰酸痛','waist_yaoleng':'腰冷痛'},
        'sleep':     {'sleep_yi':'易醒','sleep_shi':'嗜睡','sleep_duo':'多梦','sleep_mian':'失眠'},
        'diet':      {'diet_shiyu':'食欲不振','diet_duoshi':'多食易饥','diet_xire':'喜热饮','diet_xileng':'喜冷饮','diet_xixin':'喜辛辣','diet_bushu':'食后胃脘不舒','diet_shishao':'食少纳呆'},
        'skin':      {'skin_xihsu':'毛发稀疏','skin_nong':'毛发浓密','skin_cu':'皮肤粗糙','skin_zhi':'汗粘油脂多','skin_re':'身热不扬','skin_jia':'肌肤甲错'},
        'pee':       {'pee_pin':'频数','pee_ji':'尿急尿痛','pee_ye':'夜尿频多','pee_li':'余沥不尽','pee_qing':'小便清长','pee_chi':'小便黄赤'},
        'feces':     {'feces_tang':'大便溏','feces_mi':'大便秘结','feces_xi':'时干时稀','feces_xie':'天亮前泄泻','feces_nian':'大便黏腻','feces_jia':'夹杂未消化食物'},
      },
      tongue_texture: {'texture_danhong':'淡红','texture_danbai':'淡白','texture_xianhong':'鲜红','texture_shenhong':'深红','texture_zihong':'紫红','texture_anhong':'黯红','texture_danan':'淡黯','texture_zian':'紫黯','texture_yudian':'有瘀点或瘀斑','texture_jianhong':'舌边尖红'},
      texture_qita:   '其他',
      tongue_coating: {'coating_bai':'白','coating_huang':'黄','coating_bo':'薄','coating_hou':'厚','coating_ni':'腻','coating_run':'润','coating_hua':'滑','coating_gan':'干','coating_shaotai':'少苔','coating_huabo':'花剥','coating_wutai':'无苔'},
      coating_qita:   '其他',
      tongue_body:    {'tongue_zhengchang':'正常','tongue_shouxiao':'瘦小','tongue_pangda':'胖大','tongue_youchihen':'有齿痕','tongue_youliewen':'有裂纹'},
      tongue_qita:    '其他',
      pulse:          {'pulse_fu':'浮','pulse_chen':'沉','pulse_hua':'滑','pulse_shu':'数','pulse_xian':'弦','pulse_xi':'细','pulse_ruo':'弱','pulse_huan':'缓','pulse_chi':'迟','pulse_se':'涩','pulse_jin':'紧'},
      pulse_qita:     '其他',
      summaryForm:{
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
    }
  },
  methods: {
    updateSummaryForm () {
      apiUpdatePatientDataForm({formData:this.summaryForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
        // this.$message({message: '修改失败',type: 'error'})
      )
    },
    createSummaryForm () {
      apiCreatePatientDataForm({formData:this.summaryForm,formName:this.formName})
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
      // 清空
      this.summaryForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
      //如果summaryForm未创建,需要从infoForm取到url;如果summaryForm已创建,summaryForm都会被传入的summaryForm覆盖
      if (!data.exist) {
        //未创建,summaryForm的info接受data.url的值,其余字段初始化为空
        this.summaryForm.info = data.formData.info
      } else {
        //已创建(修改),summaryForm初始化为从api请求得到的数据
        this.summaryForm = data.formData
      }
    })
  }
}
</script>
<style lang="">
</style>
