<template>
  <el-dialog title="一般情况" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="90%" center>
    <el-form ref="infoForm" :model="infoForm" label-width="90px" label-position="right">
      <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
      </el-alert>

      <el-divider></el-divider>

      <el-form-item label="患者姓名">
        <el-input v-model="infoForm.name"></el-input>
        <!-- <el-input v-model="infoForm.name"><template slot="prepend">患者姓名</template></el-input> -->
      </el-form-item>

      <el-form-item label="民族">
        <el-select v-model="infoForm.nation" placeholder="请选择">
          <el-option v-for="item in nationSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职业">
        <el-select v-model="infoForm.career" placeholder="请选择">
          <el-option v-for="item in careerSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="病人现住址">
        <el-input v-model="infoForm.address"></el-input>
      </el-form-item>

      <el-form-item label="身高">
        <el-input v-model="infoForm.height" type="number" min="0">
            <template slot="append">cm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="体重">
        <el-input v-model="infoForm.weight" type="number" min="0">
          <template slot="append">kg</template>
        </el-input>
      </el-form-item>

      <el-form-item label="体重指数">
        <el-tag>
          {{infoForm.weight2height = BMI }}kg/m<sup>2</sup>
        </el-tag>
      </el-form-item>

      <el-form-item label="臀围">
        <el-input v-model="infoForm.hipline" type="number" min="0">
          <template slot="append">cm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="腰围">
        <el-input v-model="infoForm.waistline" type="number" min="0">
          <template slot="append">cm</template>
        </el-input>
      </el-form-item>

      <el-form-item label="腰臀比">
        <el-tag>
          {{infoForm.waist2hip =  waist2hip }}
        </el-tag>
      </el-form-item>

      <el-form-item label="特殊工作环境">
        <el-checkbox v-for="(val, key) in specialCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
      </el-form-item>

      <el-form-item label="饮食偏好">
        <el-checkbox v-for="(val, key) in dietCheckbox" :key="key" :label="val" v-model="infoForm[key]">
        </el-checkbox>
        <el-input v-model="infoForm.yinshi_qita" placeholder="其他"></el-input>
      </el-form-item>

      <el-form-item label="多毛评分">
        <el-input v-model="infoForm.hairy" type="number" min="0"></el-input>
      </el-form-item>

      <h4>患者是否有痤疮&nbsp;&nbsp;<el-switch v-model="infoForm.acne" active-text="是" inactive-text="否"></el-switch></h4>
        <div v-show="infoForm.acne">
          <el-col :sm="24" :md="12">
            <el-input v-model="infoForm.acne_part">
              <template slot="prepend">请描述具体部位</template>
            </el-input>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-input v-model="infoForm.acne_score" type="number" min="0" max="5">
              <template slot="prepend">评分</template>
            </el-input>
          </el-col>
            <el-table :data="acneData" style="width: 100%">
              <el-table-column prop="field1" label="评分"></el-table-column>
              <el-table-column prop="field2" label="类型"></el-table-column>
              <el-table-column prop="field3" label="部位"></el-table-column>
            </el-table>
        </div>

      <h4>患者是否有皮脂腺分泌过旺 &nbsp;&nbsp;<el-switch v-model="infoForm.glandula" active-text="是" inactive-text="否"></el-switch></h4>
        <div v-if="infoForm.glandula">
          <el-form-item label="具体部位">
            <el-input v-model="infoForm.glandula_part"></el-input>
          </el-form-item>
          <el-form-item label="分泌程度">
            <el-radio-group v-model="infoForm.glandula_level">
              <el-radio label="轻">轻</el-radio>
              <el-radio label="中">中</el-radio>
              <el-radio label="重">重</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

      <h4>患者是否有雄性脱发&nbsp;&nbsp;<el-switch v-model="infoForm.male" active-text="是" inactive-text="否"></el-switch></h4>
        <div v-if="infoForm.male">
          <el-form-item label="具体部位">
            <el-input v-model="infoForm.male_part"></el-input>
          </el-form-item>
          <el-form-item label="脱发程度">
            <el-radio-group v-model="infoForm.male_level">
              <el-radio label="轻">轻</el-radio>
              <el-radio label="中">中</el-radio>
              <el-radio label="重">重</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

    </el-form>
    <span slot="footer">
        <el-button :disabled="check_status=='审核通过'" type="primary" @click="updateInfoForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from '@/api/api-prj002'
export default {
  name: "InfoForm",
  data() {
    return {
      dialogVisible: false,
      infoForm: {},
      nationSelection: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
      careerSelection: ["学生","个体","农民","军人","工人","财会人员","技术人员","服务业","科教文卫","行政管理","无业","其它"],
      specialCheckbox: {"special_gaowen":"高温","special_diwen":"低温","special_yeban":"夜班","special_zao":"噪声","special_fu":"辐射","special_hua":"化工污染","special_ju":"剧烈运动","special_qi":"汽油","special_kong":"高空","special_wu":"无"},
      dietCheckbox:    {"yinshi_wuteshu":"无特殊","yinshi_sushi":"素食","yinshi_suan":"酸","yinshi_xian":"咸","yinshi_xinla":"辛辣","yinshi_you":"油","yinshi_shengleng":"生冷","yinshi_cafei":"含咖啡因食物或饮品"},
      acneData:[{field1: '0', field2: '无', field3: '无'},
                {field1: '1', field2: '轻微', field3: '痤疮≥2mm，面部或躯干<10个'},
                {field1: '2', field2: '轻', field3: '痤疮10-20个'},
                {field1: '3', field2: '中', field3: '痤疮>20个或脓疱<20个'},
                {field1: '4', field2: '重', field3: '脓疱≥20个'},
                {field1: '5', field2: '囊性', field3: '炎性病损≥5mm'}],
      exist: true,
      formName:'',
      check_status:''
    }
  },
  computed:{
    BMI () {
      const flag = (this.infoForm.weight==undefined) || (this.infoForm.height==undefined) || (this.infoForm.weight==null) || (this.infoForm.height==null) || Number(this.infoForm.height)== 0
      if (!flag) {
        var bmi = 10000 * Number(this.infoForm.weight) / (Number(this.infoForm.height) * Number(this.infoForm.height))
        return bmi.toFixed(1)
      }
      else {
        return 0
      }
    },
    waist2hip () {
      const flag = (this.infoForm.waistline==undefined) || (this.infoForm.hipline==undefined) || (this.infoForm.waistline==null) || (this.infoForm.hipline==null) || Number(this.infoForm.hipline)== 0
      if (!flag) {
        var ratio = Number(this.infoForm.waistline) / Number(this.infoForm.hipline)
        return ratio.toFixed(2)
      }
      else {
        return 0
      }
    }
  },
  methods: {
    showmsg(message){
      console.log(message)
    },
    updateInfoForm () {
      apiUpdatePatientDataForm({formData:this.infoForm,formName:this.formName})
      .then((res)=> {
        this.$message({message: '提交成功',type: 'success'})
        this.dialogVisible = false
        this.$parent.getPatients()
      })
      .catch(
        // this.$message({message: '修改失败',type: 'error'})
      )
    }
  },
  created() {
      this.$on("openEvent", (data)=>{
        console.log('一般情况获取到的数据',data)
        this.dialogVisible = true
        this.exist = data.exist
        this.formName = data.formName
        this.check_status = data.check_status
        if (!data.exist) {
          //未创建
          this.infoForm.info = data.formData.info
        } else {
          //已创建(修改)
          this.infoForm = data.formData
        }
      });
    }
};
</script>
