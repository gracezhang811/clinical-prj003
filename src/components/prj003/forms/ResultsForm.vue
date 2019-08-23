<template>
  <el-dialog title="疗效" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
    <el-form ref="resultsForm" :model="resultsForm" label-width="140px" label-position="right">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider></el-divider>

      <el-form-item label="VAS评分">
        <el-radio-group v-model="resultsForm.vas">
          <el-radio-button   v-for="item in radio_pain_level"  :key="item" :label="item">
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="自评">
        <el-radio-group v-model="resultsForm.result" @change="changeHandler">
          <el-radio class="radio" label="无效">无效</el-radio>
          <el-radio class="radio" label="好转">好转</el-radio>
          <el-radio class="radio" label="痊愈">痊愈</el-radio>
        </el-radio-group>
        <el-form-item v-show="wuxiao">
          <label>经治疗</label>
          <el-input v-model="resultsForm.result_days" style="width:100px" type="number" min="0">
          </el-input>
          <label>个周期后，痛经症状未减轻。</label>
        </el-form-item>
        <el-form-item v-show="jianqing">
          <label>经治疗</label>
          <el-input v-model="resultsForm.result_days" style="width:100px" type="number" min="0">
          </el-input>
          <label>个周期后，痛经症状减轻，减轻</label>
          <el-input v-model="resultsForm.result_reduce" style="width:100px" type="number" min="0">
          </el-input>
          <label>％（百分数）</label>
        </el-form-item>
        <el-form-item v-show="quanyu">
          <label>经治疗</label>
          <el-input v-model="resultsForm.result_days" style="width:100px" type="number" min="0">
          </el-input>
          <label>个周期后，痛经症状消失。</label>
        </el-form-item>
      </el-form-item>
      <el-form-item label="停药3个月经周期后复发" label-width="250px">
          <el-radio v-model="resultsForm.stop_medicine"
                    v-for="item in radio_stop_medicine"
                    :key="item" :label="item">
          </el-radio>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" v-if="exist"  @click="updateresultsForm">确定</el-button>
      <el-button type="primary" v-else  @click="createresultsForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj003'
export default {
  name:'resultsForm',
  data() {

    return {
      radio_pain_level: [0,1,2,3,4,5,6,7,8,9,10],
      radio_stop_medicine:["否","是"],
      wuxiao:false,
      jianqing:false,
      quanyu:false,
      resultsForm:{
        },
      dialogVisible: false,
      exist: true,
      formName:''
    }
  },

  methods: {
    changeHandler(value) {
      if(value == "无效"){
        this.wuxiao=true
        this.jianqing=false
        this.quanyu=false
      }else if(value == "好转"){
        this.wuxiao=false
        this.jianqing=true
        this.quanyu=false
      }else if(value == "痊愈"){
        this.wuxiao=false
        this.jianqing=false
        this.quanyu=true
      }
    },
    updateresultsForm () {
      apiUpdatePatientDataForm({formData:this.resultsForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    createresultsForm () {
      apiCreatePatientDataForm({formData:this.resultsForm,formName:this.formName})
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
      this.resultsForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      console.log('疗效获取到的数据',data)
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      if (!data.exist) {
        //未创建
        this.resultsForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.resultsForm = data.formData
          if(this.resultsForm.result == "无效"){
            this.wuxiao=true
            this.jianqing=false
            this.quanyu=false
          }else if(this.resultsForm.result == "好转"){
            this.wuxiao=false
            this.jianqing=true
            this.quanyu=false
          }else if(this.resultsForm.result == "痊愈"){
            this.wuxiao=false
            this.jianqing=false
            this.quanyu=true
          }
      }

    })
  }

}
</script>
<style lang="">
</style>
