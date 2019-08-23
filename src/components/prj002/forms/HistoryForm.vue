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

      <el-form-item label="月经初潮年龄">
        <el-radio v-model="historyForm.first_time"
                  v-for="item in mydata.first_time"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.first_time_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="月经周期是否规律">
        <el-switch v-model="historyForm.is_normal" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item v-show="historyForm.is_normal" label="尚规律">
        <el-radio v-model="historyForm.normal"
                  v-for="item in mydata.normal"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>
      <el-form-item v-show="!historyForm.is_normal" label="不规律">
        <el-radio v-model="historyForm.abnormal"
                  v-for="item in mydata.abnormal"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="行经天数">
        <el-radio v-model="historyForm.cyclicity_sum"
                  v-for="item in mydata.cyclicity_sum"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.cyclicity_sum_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="总出血量">
        <el-radio v-model="historyForm.blood_cond"
                  v-for="item in mydata.blood_cond"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.blood_cond_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="出血颜色">
        <el-radio v-model="historyForm.blood_color"
                  v-for="item in mydata.blood_color"
                  :key="item" :label="item">
        </el-radio>
        <el-input v-model="historyForm.blood_color_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="出血质地">
        <el-radio v-model="historyForm.blood_quality"
                  v-for="item in mydata.blood_quality"
                  :key="item" :label="item">
        </el-radio>
        <el-radio v-model="historyForm.blood_block"
                  v-for="item in mydata.blood_block"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="出血特点">
        <el-radio v-model="historyForm.blood_character"
                  v-for="item in mydata.blood_character"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="经期伴随症状">
        <el-switch v-model="historyForm.menstruation_is_accompany" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>

      <el-form-item label="末次行经日期">
        <el-date-picker v-model="historyForm.last_time"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="平素带下情况">
        <el-select v-model="historyForm.leucorrhea_quantity" placeholder="请选择">
          <template slot="prefix">量</template>
          <el-option v-for="item in mydata.leucorrhea_quantity" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-select v-model="historyForm.leucorrhea_color" placeholder="请选择">
          <template slot="prefix">色</template>
          <el-option v-for="item in mydata.leucorrhea_color" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-select v-model="historyForm.leucorrhea_feature" placeholder="请选择">
          <template slot="prefix">质</template>
          <el-option v-for="item in mydata.leucorrhea_feature" :key="item" :value="item">
          </el-option>
        </el-select>
        <el-input v-model="historyForm.leucorrhea_color_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="婚姻史">
        <el-radio v-model="historyForm.marriage"
                  v-for="item in mydata.marriage"
                  :key="item" :label="item">
        </el-radio>
      </el-form-item>

      <el-form-item label="孕产史">
        <el-col :sm="24" :md="12" :lg="8" v-for="(val, key) in mydata.pastpreg" :key="key">
          <el-input type="number" min="0" v-model="historyForm[key]">
            <template slot="prepend">{{val}}</template>
            <template slot="append">次</template>
          </el-input>
        </el-col>
          <el-input v-model="historyForm.pastpreg_qita" placeholder="其他情况"></el-input>
      </el-form-item>

      <el-form-item label="避孕措施">
        <el-switch v-model="historyForm.prevent_wu" active-text="有" inactive-text="无"></el-switch>
        <div v-show="historyForm.prevent_wu">
          <el-checkbox v-model="historyForm.prevent_jieza" label="结扎" ></el-checkbox>
          <el-checkbox v-model="historyForm.prevent_jieyuqi" label="宫内节育器" ></el-checkbox>
          <el-checkbox v-model="historyForm.prevent_biyuntao" label="避孕套" ></el-checkbox>
          <el-checkbox v-model="historyForm.prevent_biyunyao" label="口服避孕药" ></el-checkbox>
        </div>
      </el-form-item>

      <el-form-item label="家族史">
        一级亲属（父母、兄弟姐妹、子女）其他疾病史
        <el-switch v-model="historyForm.is_pastfamily_womb" active-text="有" inactive-text="无"></el-switch>
        <div v-show="historyForm.is_pastfamily_womb">
          <el-checkbox v-model="historyForm.pastfamily_minus"  label="甲减" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_plus"  label="甲亢" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_duonangluanchao"  label="多囊卵巢综合征" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_tangniaobing"  label="糖尿病" ></el-checkbox>
          <el-checkbox v-model="historyForm.pastfamily_buxiang"  label="不详" ></el-checkbox>
          <el-input v-model="historyForm.pastfamily_qita"></el-input>
        </div>
      </el-form-item>

    </el-form>

    <span slot="footer">
      <el-button type="primary" :disabled="check_status=='审核通过'" v-if="exist"  @click="updateHistoryForm">确定</el-button>
      <el-button type="primary" v-else  @click="createHistoryForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'HistoryForm',
  data() {
    return {
      mydata:{
        first_time:["10岁以前","11岁以后","14岁以后","16岁以后"],
        is_normal:true,
        normal:["21-25天","26-30天","31-35天"],
        abnormal:["或1月多次","1-2个月1行","2-3个月1行","3-4个月1行","4-6个月1行",">6个月1行"],
        cyclicity_sum:["≤2天","3-7天","7天以上甚至半月"],
        blood_cond:["≤5张卫生巾(日用)","6-10张卫生巾(日用)","11-19张卫生巾(日用)","≥20张卫生巾(日用或夜用)","几乎不用卫生巾,用护垫即可"],
        blood_color:["淡红","鲜红","暗红","紫红","紫黯","紫黑","褐色",],
        blood_quality:["正常","粘稠","清稀"],
        blood_block:["无血块","经常出现血块","偶有血块","夹少量小血块","夹较大血块","其他"],
        blood_character:["顺畅","势急暴下","淋漓不断","点滴即净"],
        leucorrhea_quantity:["带下量正常","带下量少","带下量多"],
        leucorrhea_color:["带下透明","带下色黄","带下色白","带下色黄绿"],
        leucorrhea_feature:["带下质黏而不稠","带下质清稀","带下质稠"],
        marriage:["未婚无性生活","未婚有性生活","已婚同居","已婚分居","离婚","丧偶"],
        pastpreg:{pastpreg_yuncount:'怀孕', pastpreg_shunchan:'顺产', pastpreg_pougong:'剖宫产',
                  pastpreg_zaochan:'早产', pastpreg_yaoliu:'药物流产', pastpreg_renliu:'人工流产',
                  pastpreg_ziranliu:'自然流产', pastpreg_yiweirenshen:'异位妊娠',
                  pastpreg_qinggongshu:'清宫术'},
      },
      historyForm:{
      },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
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
      this.check_status = data.check_status
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
