<template>
  <el-dialog title="一般情况" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="90%" center>

    <el-form ref="infoForm" :model="infoForm" label-width="100px" label-position="left">
      <el-alert v-if="is_checked=='审核通过'"
                title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider v-if="is_checked=='审核通过'"></el-divider>

      <el-form-item label="就诊日期" prop="recdate">
        <!-- format表示显示在页面的日期格式, value-format表示传递给后台的真实的数据格式 -->
        <el-date-picker v-model="infoForm.recdate"
                        type="date" placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="问卷编码">
        <el-input v-model="infoForm.serial" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="辅助医生邮箱">
        <el-input v-model="infoForm.owner"></el-input>
      </el-form-item>
      <el-form-item label="医院名称">
        <el-input v-model="infoForm.hospital"></el-input>
      </el-form-item>
      <el-form-item label="填表专家姓名">
        <el-input v-model="infoForm.expert"></el-input>
      </el-form-item>
      <el-form-item label="职称">
        <el-select v-model="infoForm.title" placeholder="请选择">
          <el-option v-for="item in titleSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="患者姓名">
        <el-input v-model="infoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电话(手机)">
        <el-input v-model="infoForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="患者现住址">
        <el-input v-model="infoForm.address"></el-input>
      </el-form-item>
      <el-form-item label="患者来源">
        <el-select v-model="infoForm.entrance" placeholder="请选择">
          <el-option v-for="item in entranceSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="患者出生年月">
        <el-date-picker v-model="infoForm.birth"
                        type="month" placeholder="选择日期"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM">
        </el-date-picker>
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

      <el-form-item label="文化程度">
        <el-select v-model="infoForm.culture" placeholder="请选择">
          <el-option v-for="item in cultureSelection" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
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

    </el-form>
    <span slot="footer">
        <el-button type="primary" :disabled="is_checked=='审核通过'" @click="updateInfoForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm } from '@/api/api-prj001'
export default {
  name: "InfoForm",
  data() {
    return {
      dialogVisible: false,
      infoForm: {},
      entranceSelection:["门诊","病房"],
      titleSelection: ["主任医师","副主任医师","主治医师"],
      nationSelection: ["汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族","满族","侗族",
                        "瑶族","白族","土家族","哈尼族","哈萨克族","傣族","黎族","傈傈族","佤族","畲族","高山族","拉祜族",
                        "水族","东乡族","纳西族","景颇族","科尔克孜族","土族","达斡尔族","仫佬族","羌族","布朗族","撒拉族",
                        "毛难族","仡佬族","锡伯族","阿昌族","普米族","塔吉克族","怒族","乌孜别克族","俄罗斯族","鄂温克族",
                        "崩龙族","保安族","裕固族","京族","塔塔尔族","独龙族","鄂伦春族","赫哲族","门巴族","珞巴族","基诺族","其它"],
      careerSelection: ["学生","个体","农民","军人","工人","财会人员","技术人员","服务业","科教文卫","行政管理","无业","其它"],
      cultureSelection: ["未接受国家教育","小学及以下","初中","高中","大专","本科","研究生及以上"],
      specialCheckbox: {"special_gaowen":"高温","special_diwen":"低温","special_yeban":"夜班","special_zao":"噪声","special_fu":"辐射","special_hua":"化工污染","special_ju":"剧烈运动","special_qi":"汽油","special_kong":"高空","special_wu":"无"},
      dietCheckbox:    {"yinshi_wuteshu":"无特殊","yinshi_sushi":"素食","yinshi_suan":"酸","yinshi_xian":"咸","yinshi_xinla":"辛辣","yinshi_you":"油","yinshi_shengleng":"生冷","yinshi_cafei":"含咖啡因食物或饮品"},
      exist: true,
      formName:'',
      is_checked:''
    }
  },
  computed:{
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
        this.is_checked = data.is_checked
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
