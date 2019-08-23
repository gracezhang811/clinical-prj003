<template>
  <el-dialog title="专科病史" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="historyForm" :model="historyForm" label-width="130px" label-position="right">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider></el-divider>

      <h3>（一）既往史</h3>
      <el-form-item label="既往史" >
          <el-switch v-model="historyForm.has_history" active-text="有" inactive-text="无"></el-switch>
          <el-input v-model="historyForm.history_content" ></el-input>
      </el-form-item>

      <h3>（二）个人史</h3>
      <el-form-item label="特殊嗜好">
        <el-checkbox v-for="(val, key) in mydata.hobbies" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>
        <el-input v-model="historyForm.hobby_qita" ></el-input>
      </el-form-item>
      <el-form-item label="体力状况">
        <el-radio v-model="historyForm.physical"
                  v-for="item in mydata.body_cond"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="职业体力活动">
        <el-radio v-model="historyForm.physical_career"
                  v-for="item in mydata.career_labor"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item label="体育锻炼">
        <el-switch v-model="historyForm.is_exercise" active-text="有" inactive-text="无"></el-switch>
        <el-form-item  v-show="historyForm.is_exercise" label="(1)频次">
          <el-radio v-model="historyForm.exercise_pinci"
                    v-for="item in mydata.physical_exercise"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item v-show="historyForm.is_exercise" label="(2)强度">
          <el-radio v-model="historyForm.exercise_qiangdu"
                    v-for="item in mydata.physical_intensity"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
      </el-form-item>

      <h3>（三）月经带下史</h3>
      <el-form-item label="月经初潮年龄">
        <el-radio v-model="historyForm.first_time"
                  v-for="item in mydata.first_time"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="月经周期是否规律" label-width="170px">
        <el-switch v-model="historyForm.is_normal" active-text="尚规律" inactive-text="不规律"></el-switch>
      </el-form-item>
        <el-form-item v-show="historyForm.is_normal" label="尚规律">
          <el-radio v-model="historyForm.normal"
                    v-for="item in mydata.normal"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item v-show="!historyForm.is_normal" label="不规律">
          <el-radio v-model="historyForm.not_normal"
                    v-for="item in mydata.abnormal"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="historyForm.not_normal_qita" ></el-input>
        </el-form-item>
      <el-form-item label="月经经期">
        <el-radio v-model="historyForm.total_days"
                  v-for="item in mydata.cyclicity_sum"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.total_days_qita" placeholder="其他情况"></el-input>
      </el-form-item>
      <el-form-item label="末次行经日期">
        <el-date-picker v-model="historyForm.last_time"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="平素带下情况">
      </el-form-item>
      <el-form-item label="量">
        <el-select v-model="historyForm.daixia_liang" placeholder="请选择">
          <el-option v-for="item in mydata.leucorrhea_quantity" :key="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="色">
        <el-select v-model="historyForm.daixia_se" placeholder="请选择">
          <el-option v-for="item in mydata.leucorrhea_color" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-input v-model="historyForm.daixia_se_qita" placeholder="其他情况"></el-input>
      </el-form-item>
      <el-form-item label="质">
        <el-select v-model="historyForm.daixia_zhi" placeholder="请选择">
          <el-option v-for="item in mydata.leucorrhea_feature" :key="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <h3>（四）平素全身症状</h3>
      <el-form-item label="平素全身症状" >
          <el-switch v-model="historyForm.body_all" active-text="有" inactive-text="无"></el-switch>
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="精神情绪">
        <el-radio v-model="historyForm.body_spirit"
                  v-for="item in mydata.body_spirit"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.body_spirit_qita" ></el-input>
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="头面">
        <el-radio v-model="historyForm.body_face_head"
                  v-for="item in mydata.body_face_head"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.body_face_head_qita" ></el-input>
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="形体、四肢">
        <el-radio v-model="historyForm.body_limb"
                  v-for="item in mydata.body_limb"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.body_limb_qita" ></el-input>
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="胸腹部">
        <el-radio v-model="historyForm.body_belly"
                  v-for="item in mydata.body_belly"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.body_belly_qita" ></el-input>
      </el-form-item>
      <el-form-item v-show="historyForm.body_all" label="睡眠">
        <el-radio v-model="historyForm.body_sleep"
                  v-for="item in mydata.body_sleep"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.body_sleep_qita" ></el-input>
      </el-form-item>

      <h3>（五）婚姻史</h3>
      <el-form-item label="婚姻史">
        <el-radio v-model="historyForm.marriage_history"
                  v-for="item in mydata.marriage"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <h3>（六）孕产史</h3>
      <el-form-item label="孕产史">
        <el-col :sm="24" :md="12" :lg="8" v-for="(val, key) in mydata.pastpreg" :key="key">
          <el-input type="number" min="0" v-model="historyForm[key]">
            <template slot="prepend">{{val}}</template>
            <template slot="append">次</template>
          </el-input>
        </el-col>
          <el-input v-model="historyForm.pregnancy_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <h3>（七）避孕措施（请有性生活者填写）</h3>
      <el-form-item label="避孕措施">
        <el-checkbox v-for="(val, key) in mydata.biyun" :key="key" :label="val" v-model="historyForm[key]">
        </el-checkbox>
        <el-input v-model="historyForm.biyun_qita" ></el-input>
      </el-form-item>

      <h3>（八）家族史</h3>
        <el-form-item label="一级亲属（母亲、姐妹、女儿）痛经史" label-width="300px">
          <el-radio v-model="historyForm.family_history"
                    v-for="item in mydata.family_history"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="historyForm.family_history_qita" ></el-input>
        </el-form-item>
        <el-form-item label="是否为原发性"  label-width="300px">
          <el-radio v-model="historyForm.family_history_is_origin"
                    v-for="item in mydata.family_history_is_origin"
                    :key="item" :label="item">
          </el-radio>
        </el-form-item>
        <el-form-item label="一级亲属（父母、兄弟姐妹、子女）其他疾病史" label-width="400px">
          <el-radio v-model="historyForm.relative_history"
                    v-for="item in mydata.relative_history"
                    :key="item" :label="item">
          </el-radio>
          <el-input v-model="historyForm.relative_history_you" ></el-input>
        </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button type="primary" v-if="exist"  @click="updateHistoryForm">确定</el-button>
      <el-button type="primary" v-else  @click="createHistoryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj003'
export default {
  name:'HistoryForm',
  data() {
    return {
      mydata:{
        'hobbies':['无', '吸烟', '饮酒'],
        'body_cond':['好','一般','易疲倦'],
        'career_labor':[
                "重体力劳动（如：搬运工、清洁工、农场工人、畜牧场工人等）",
                "中体力劳动（如：家政服务人员、服务生、厨师、护士等）",
                "轻体力劳动（如：教师、美容美发师、批发商、职员等）",
                "坐式的工作（如：收银员、出纳员、接线员、秘书等）"],
        'physical_exercise':["很少（≤1次/周）","偶尔（≤3次/周）","经常（≥4次/周）"],
        'physical_intensity':["一般(少量出汗，心率≤120次/分)","高强度(大汗淋漓，心率>120次/分)"],
        first_time:["<11岁","11岁","12岁","13岁","14岁","15岁",">16岁"],
        is_normal:true,
        normal:["21~25天","26~30天","31~35天"],
        abnormal:["36~60天","61~90天"],
        cyclicity_sum:["1天","2天","3天","4天","5天","6天","7天"],
        leucorrhea_quantity:["正常","量少","量多"],
        leucorrhea_color:["色白","色黄","透明","色黄绿"],
        leucorrhea_feature:["黏而不稠","质清稀","质稠"],
        body_spirit:["神疲肢倦","气短懒言","精神抑郁","烦躁易怒","时欲叹息"],
        body_face_head:["正常","面色萎黄","面色晦暗","面有黯斑","面浮肢肿","颧赤唇红","口苦咽干","头晕耳鸣","眼花"],
        body_limb:["正常","形体肥胖","形体瘦小","畏寒肢冷","手足心热","腰酸腿软","腰痛如折"],
        body_belly:["胸闷不舒","经前乳房胀痛","经前胸胁胀痛","经前少腹胀痛","腹空坠","小腹空痛","小腹刺痛","小腹胀痛","小腹冷痛","小腹隐痛"],
        body_sleep:["心悸失眠","夜寐不宁","夜寐梦多"],
        marriage:["无性生活","未婚有性生活","已婚同居","已婚分居","离婚","丧偶"],
        pastpreg:{pregnancy_yun:'怀孕', pregnancy_shun:'顺产', pregnancy_pou:'剖宫产',
                  pregnancy_zao:'早产', pregnancy_yao:'药物流产', pregnancy_ren:'人工流产',
                  pregnancy_zi:'自然流产', pregnancy_yi:'异位妊娠',
                  pregnancy_qing:'清宫术'},
        biyun:{biyun_wu:"无",biyun_jiezha:"结扎",biyun_gongnei:"宫内节育器",biyun_biyun:"避孕套",biyun_koufu:"口服避孕药"},
        family_history:["无","有","不详"],
        family_history_is_origin:["是","否","不详"],
        relative_history:["无","有","不详"],
      },
      historyForm:{
        first_time:'', first_time_qita:'',            //月经初潮年龄
        is_normal:true, normal:'', abnormal:'',       //月经周期
        cyclicity_sum:'', cyclicity_sum_qita:'',      //行经天数
        blood_cond:'', blood_cond_qita:'',            //总出血量
        blood_color:'', blood_color_qita:'',          //出血颜色
        blood_quality:'', blood_block:'',             //出血质地
        blood_character:'',                           //出血特点
        menstruation_is_accompany:'',                 //经期伴随症状
        last_time:'',                                 //末次行经日期
        leucorrhea_quantity:'',                       //平素带下情况
        leucorrhea_color:'', leucorrhea_color_qita:'',//平素带下情况
        leucorrhea_feature:'',                        //平素带下情况
        marriage:'',                                  //婚姻史
        //孕产史
        pastpreg_yuncount:'', pastpreg_shunchan:'', pastpreg_pougong:'', pastpreg_zaochan:'', pastpreg_yaoliu:'', pastpreg_renliu:'', pastpreg_ziranliu:'', pastpreg_yiweirenshen:'', pastpreg_qinggongshu:'', pastpreg_qita:'',
        //避孕措施
        prevent_wu:'', prevent_jieza:'', prevent_jieyuqi:'', prevent_biyuntao:'', prevent_biyunyao:'',
        //家族史
        is_pastfamily_womb:'', pastfamily_minus:'', pastfamily_plus:'', pastfamily_duonangluanchao:'', pastfamily_tangniaobing:'', pastfamily_buxiang:'', pastfamily_qita:''
      },
      dialogVisible: false,
      exist: true,
      formName:''
    }
  },
  methods: {
    updateHistoryForm () {
      apiUpdatePatientDataForm({formData:this.historyForm, formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    createHistoryForm () {
      apiCreatePatientDataForm({formData:this.historyForm,formName:this.formName})
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
      this.historyForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      if (!data.exist) {
        //未创建
        this.historyForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.historyForm = data.formData
      }
    })
  }

};
</script>
<style scoped>
.el-input {
  margin-top: 10px;
}
</style>
