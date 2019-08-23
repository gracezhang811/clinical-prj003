<template>
  <el-dialog title="B超" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'
            >
    <el-form ref="bxrayForm" :model="bxrayForm" label-width="140px" label-position="right">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider></el-divider>
      <!-- <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"> -->
      <div>
        <h3>1、子宫</h3>
        <el-form-item label="大小">
          <el-col :sm="24" :md="8" :lg="8">
            <el-input v-model="bxrayForm.zigong_chang" type="number" min="0">
              <template slot="prepend">长径</template>
              <template slot="append">mm</template>
            </el-input>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-input v-model="bxrayForm.zigong_kuan" type="number" min="0">
              <template slot="prepend">宽径</template>
              <template slot="append">mm</template>
            </el-input>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-input v-model="bxrayForm.zigong_qianhou" type="number" min="0">
              <template slot="prepend">前后径</template>
              <template slot="append">mm</template>
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="形态">
          <el-col :sm="24" :md="4" :lg="12">
            <el-switch v-model="bxrayForm.zigong_xingtai" active-text="正常" inactive-text="异常"></el-switch>
          </el-col>
          <el-col :sm="24" :md="20" :lg="12">
              <el-form-item label="具体为" v-show="!bxrayForm.zigong_xingtai">
                <el-input v-model="bxrayForm.zigong_juti"></el-input>
              </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="子宫内膜厚度">
          <el-input v-model="bxrayForm.zigong_neimo"></el-input>
        </el-form-item>

        <el-form-item label="是否有子宫肌瘤">
          <el-switch v-model="bxrayForm.zigong_is_jiliu" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <div v-show="bxrayForm.zigong_is_jiliu">
          <el-form-item label="子宫肌瘤的位置">
            <el-input v-model="bxrayForm.zigong_weizhi"></el-input>
          </el-form-item>
          <el-form-item label="子宫肌瘤的个数">
            <el-input v-model="bxrayForm.zigong_geshu" type="number" min="0">
              <template slot="append">个</template>
            </el-input>
          </el-form-item>
          <el-form-item label="最大子宫肌瘤的大小">
              <el-col :span="8">
                <el-input v-model="bxrayForm.zigong_daxiaochang" type="number" min="0">
                  <template slot="prepend">长径</template>
                  <template slot="append">mm</template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input v-model="bxrayForm.zigong_daxiaokuan" type="number" min="0">
                  <template slot="prepend">宽径</template>
                  <template slot="append">mm</template>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input v-model="bxrayForm.zigong_daxiaogao" type="number" min="0">
                  <template slot="prepend">前后径</template>
                  <template slot="append">mm</template>
                </el-input>
              </el-col>
          </el-form-item>
        </div>

        <el-form-item label="是否有子宫腺肌症">
          <el-switch v-model="bxrayForm.zigong_xainji" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
      </div>

      <div>
        <h3>2、左卵巢</h3>
        <el-form-item label="大小">
            <el-col :sm="12" :md="6" :lg="6">
              <el-input v-model="bxrayForm.zuo_chang" type="number" min="0">
                <template slot="prepend">长径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
              <el-input v-model="bxrayForm.zuo_kuan" type="number" min="0">
                <template slot="prepend">宽径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
              <el-input v-model="bxrayForm.zuo_qianhou" type="number" min="0">
                <template slot="prepend">前后径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
              <el-input v-model="bxrayForm.zuo_tiji" type="number" min="0">
                <template slot="prepend">体积</template>
                <template slot="append">cm<sup>3</sup></template>
              </el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="请选择">
          <el-checkbox v-model="bxrayForm.zuo_nangzhong">左卵巢是否有直径>10mm的囊肿</el-checkbox>
        </el-form-item>
        <el-form-item v-show="bxrayForm.zuo_nangzhong" label="左卵巢最大囊肿大小">
          <el-row>
            <el-col :sm="24" :md="12" :lg="10">
              <el-input v-model="bxrayForm.zuo_daxiaochang" type="number" min="0">
                <template slot="prepend">长径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="10">
              <el-input v-model="bxrayForm.zuo_daxiaokuan" type="number" min="0">
                <template slot="prepend">横径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="形态">
            <el-radio v-model="bxrayForm.zuo_xingtai" label="正常">正常</el-radio>
            <el-radio v-model="bxrayForm.zuo_xingtai" label="PCO （窦卵泡个数≥12个）">PCO （窦卵泡个数≥12个）</el-radio>
        </el-form-item>

        <el-form-item label="窦卵泡数">
          <el-input v-model="bxrayForm.zuo_paoshu" type="number" min="0">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

      </div>

      <div>
        <h3>3、右卵巢</h3>
        <el-form-item label="大小">
            <el-col :sm="12" :md="6" :lg="6">
              <el-input v-model="bxrayForm.you_chang" type="number" min="0">
                <template slot="prepend">长径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
              <el-input v-model="bxrayForm.you_kuan" type="number" min="0">
                <template slot="prepend">宽径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
              <el-input v-model="bxrayForm.you_qianhou" type="number" min="0">
                <template slot="prepend">前后径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
            <el-col :sm="12" :md="6" :lg="6">
              <el-input v-model="bxrayForm.you_tiji" type="number" min="0">
                <template slot="prepend">体积</template>
                <template slot="append">cm<sup>3</sup></template>
              </el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="请选择">
          <el-checkbox v-model="bxrayForm.you_nangzhong">右卵巢是否有直径>10mm的囊肿</el-checkbox>
        </el-form-item>
        <el-form-item v-show="bxrayForm.you_nangzhong" label="右卵巢最大囊肿大小">
          <el-row>
            <el-col :sm="24" :md="12" :lg="10">
              <el-input v-model="bxrayForm.you_daxiaochang" type="number" min="0">
                <template slot="prepend">长径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="10">
              <el-input v-model="bxrayForm.you_daxiaokuan" type="number" min="0">
                <template slot="prepend">横径</template>
                <template slot="append">mm</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="形态">
            <el-radio v-model="bxrayForm.you_xingtai" label="正常">正常</el-radio>
            <el-radio v-model="bxrayForm.you_xingtai" label="PCO （窦卵泡个数≥12个）">PCO （窦卵泡个数≥12个）</el-radio>
        </el-form-item>

        <el-form-item label="窦卵泡数">
          <el-input v-model="bxrayForm.you_paoshu" type="number" min="0">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>

      </div>

    </el-form>

      <span slot="footer">
        <el-button :disabled="check_status=='审核通过'" type="primary" v-if="exist"  @click="updateBxrayForm">确定</el-button>
        <el-button type="primary" v-else  @click="createBxrayForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj002'
export default {
  name:'BxrayForm',
  data() {
    return {
      bxrayForm:{
        zigong_chang: '', zigong_kuan: '', zigong_qianhou: '',
        zigong_xingtai: true, zigong_juti: '',
        zigong_neimo: '',
        zigong_is_jiliu: false, zigong_weizhi: '', zigong_geshu: '', zigong_daxiaochang: '', zigong_daxiaokuan: '', zigong_daxiaogao: '',
        zigong_xainji: false,
        zuo_chang: '', zuo_kuan: '', zuo_qianhou: '', zuo_tiji: '',
        zuo_nangzhong: false, zuo_daxiaochang: '', zuo_daxiaokuan: '',
        zuo_xingtai: '',
        zuo_paoshu: '',
        you_chang: '', you_kuan: '', you_qianhou: '', you_tiji: '',
        you_nangzhong: '', you_daxiaochang: '', you_daxiaokuan: '',
        you_xingtai: '',
        you_paoshu: '',
        },
      dialogVisible: false,
      exist: true,
      formName:'',
      check_status:''
    }
  },
  methods: {
    updateBxrayForm () {
      apiUpdatePatientDataForm({formData:this.bxrayForm,formName:this.formName})
      .then((res)=> {
        this.resetDialog()
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
      )
    },
    createBxrayForm () {
      apiCreatePatientDataForm({formData:this.bxrayForm,formName:this.formName})
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
      this.bxrayForm = {}
    }
  },
  created() {
    this.$on("openEvent", (data)=>{
      console.log('B超获取到的数据',data)
      this.dialogVisible = true
      this.exist = data.exist
      this.formName = data.formName
      this.check_status = data.check_status
      if (!data.exist) {
        //未创建
        this.bxrayForm.info = data.formData.info
      } else {
        //已创建(修改)
        this.bxrayForm = data.formData
      }

    })
  }

}
</script>
<style lang="">
</style>