<template>
  <el-dialog title="治疗" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="80%" center
            @close='resetDialog'>
    <el-form ref="cureForm" :model="cureForm" label-width="auto" label-position="left">
        <el-alert v-if="check_status=='审核通过'" effect="dark"
                  title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                  type="warning" :closable="false" show-icon>
        </el-alert>
        <el-divider></el-divider>

        <div>
            <h3>中西医结合治疗</h3>
            <el-form-item label="">
                <el-switch v-model="cureForm.is_together_cure" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
        </div>
        <div>
            <div>
                <h3>I. 中医治疗</h3>
                <h4>1. 治法</h4>
                <el-form-item label="实证治法">
                    <el-select v-model="cureForm.shizheng_cure" placeholder="请选择"  style="width:300px">
                        <el-option v-for="item in shizheng_cure_choices" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    <el-input v-model="cureForm.shizheng_cure_qita" placeholder="其他情况"></el-input>
                </el-form-item>

                <el-form-item label="虚证治法">
                    <el-select v-model="cureForm.xuzheng_cure" placeholder="请选择"  style="width:300px">
                        <el-option v-for="item in xuzheng_cure_choices" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>

                    <el-input v-model="cureForm.xuzheng_cure_qita"  placeholder="其他情况"></el-input>
                </el-form-item>

                <el-form-item label="虚实夹杂治法">
                    <el-input v-model="cureForm.xushi_cure"  placeholder="虚实夹杂治法"></el-input>
                </el-form-item>

                <h4>2. 代表方</h4>
                <el-form-item label="实证代表方">
                    <el-checkbox v-for="(val, key) in shizheng_daibiao" :key="key" :label="val" v-model="cureForm[key]">
                    </el-checkbox>
                    <el-input v-model="cureForm.shizheng_qita" placeholder="实证代表方-其他"></el-input>
                </el-form-item>

                <el-form-item label="虚证代表方">
                    <el-checkbox v-for="(val, key) in xuzheng_daibiao" :key="key" :label="val" v-model="cureForm[key]">
                    </el-checkbox>
                    <el-input v-model="cureForm.xuzheng_qita" placeholder="虚证代表方-其他"></el-input>
                </el-form-item>

                <el-form-item label="虚实夹杂证代表方">
                    <el-input v-model="cureForm.xushi_represent"  placeholder="虚实夹杂证代表方"></el-input>
                </el-form-item>

                <h4>3. 中成药</h4>
                <el-form-item label="">
                    <el-switch v-model="cureForm.zcy" active-text="是" inactive-text="否"></el-switch>
                </el-form-item>
                <el-form-item v-show="cureForm.zcy" label="">
                    <el-checkbox v-for="(val, key) in medicine" :key="key" :label="val" v-model="cureForm[key]">
                    </el-checkbox>
                    <el-input v-model="cureForm.medicine_qita"  placeholder="具体药物-其他"></el-input>
                </el-form-item>

                <h4>4. 中医其他治疗</h4>
                <el-form-item label="">
                    <el-checkbox v-for="(val, key) in zhongyi_qita_cure" :key="key" :label="val" v-model="cureForm[key]">
                    </el-checkbox>
                    <el-input v-model="cureForm.way_qita" placeholder="中医其他治疗-其他"></el-input>
                </el-form-item>
            </div>
        </div>

        <div>
            <h3>II. 西医治疗</h3>
            <el-form-item label="应用止痛药">
                <el-switch v-model="cureForm.is_zhitong" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>

            <el-form-item v-show="cureForm.is_zhitong" label="具体药物-口服">
                <el-checkbox v-for="(val, key) in koufu_zt" :key="key" :label="val" v-model="cureForm[key]">
                </el-checkbox>
                <el-input v-model="cureForm.xi_medicine_qita"  placeholder="其他"></el-input>
            </el-form-item>
            <el-form-item v-show="cureForm.is_zhitong" label="具体药物-注射">
                <el-checkbox v-for="(val, key) in zhushe_zt" :key="key" :label="val" v-model="cureForm[key]">
                </el-checkbox>
                <el-input v-model="cureForm.xi_zs_qita"  placeholder="其他"></el-input>
            </el-form-item>

            <el-form-item label="口服避孕药">
                <el-switch v-model="cureForm.is_biyunyao" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
            <el-form-item v-show="cureForm.is_biyunyao" label="避孕具体药物">
                <el-checkbox v-for="(val, key) in biyun" :key="key" :label="val" v-model="cureForm[key]">
                </el-checkbox>
                <el-input v-model="cureForm.biyun_qita"  placeholder="避孕具体药物-其他"></el-input>
            </el-form-item>
            <el-form-item label="西医其他治疗">
                <el-input v-model="cureForm.other_cure" placeholder="其他治疗"></el-input>
            </el-form-item>
        </div>

        <div>
            <h3>III. 药物具体使用情况（口服避孕药除外）</h3>
            <el-form-item label="服药频率">
                <el-select v-model="cureForm.eat_times" placeholder="请选择" style="width:300px">
                    <el-option v-for="item in eat_times_choices" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="始用药时间">
                <el-col :span="6">
                    <el-radio v-model="cureForm.eat_start_time"
                              v-for="item in eat_time_choices"
                              :key="item" :label="item">
                    </el-radio>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="cureForm.eat_start_time_days" type="number" min="0">
                        <template slot="append">天</template>
                    </el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="停药时间">
                <el-col :span="6">
                    <el-radio v-model="cureForm.eat_end_time"
                              v-for="item in eat_time_choices"
                              :key="item" :label="item">
                    </el-radio>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="cureForm.eat_end_time_days" type="number" min="0">
                        <template slot="append">天</template>
                    </el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="总用药">
                <el-col :span="6">
                <el-input v-model="cureForm.total_eat_days" type="number" min="0">
                    <template slot="append">天</template>
                </el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="1日服用次数">
                <el-col :span="6">
                <el-input v-model="cureForm.one_day_eat" type="number" min="0">
                    <template slot="append">次</template>
                </el-input>
                </el-col>
            </el-form-item>

        </div>


    </el-form>

    <span slot="footer">
      <el-button type="primary" v-if="exist"  @click="updateCureForm">确定</el-button>
      <el-button type="primary" v-else  @click="createCureForm">确定</el-button>
      <el-button @click="dialogVisible=false">取消</el-button>
    </span>

  </el-dialog>
</template>
<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj003'
export default {
  name:'CureForm',
  data() {
    return {
      mydata: {
      },
      eat_time_choices: ['经前', '经期', '经后'],
      eat_times_choices:['总是服用（每个月经周期）', '经常服用', '偶尔服用'],
      shizheng_cure_choices:['温经散寒，化瘀止痛', '行气活血，化瘀止痛', '清热除湿，化瘀止痛', '清热解郁，化瘀止痛'],
      xuzheng_cure_choices:['补肾通络，化瘀止痛', '补肾填精，养血止痛', '滋养肝肾，缓急止痛', '温经扶阳，暖宫止痛', '益气养血，调经止痛'],
      biyun: {
        'biyun_daying': '达英-35',
        'biyun_ming': '优思明',
        'biyun_yue': '优思悦',
        'biyun_ma': '妈富隆',
        'biyun_nuo': '复方炔诺酮片',
        'biyun_jia': '复方甲地孕酮片',
      },
      shizheng_daibiao: {
        'shizheng_shaofu': '少腹逐瘀汤',
        'shizheng_wenjing': '温经汤（《妇人大全良方》）',
        'shizheng_gexia': '膈下逐瘀汤',
        'shizheng_jiawei': '加味乌药汤',
        'shizheng_qingre': '清热调血汤',
        'shizheng_xuanyu': '宣郁通经汤',
        'shizheng_taohong': '桃红四物汤',
      },
      xuzheng_daibiao: {
        'xuzheng_juejin': '决津煎合折冲饮',
        'xuzheng_yishen': '益肾调经汤',
        'xuzheng_tiaogan': '调肝汤',
        'xuzheng_wenjing': '温经汤（《金匮要略》）',
        'xuzheng_shengyu': '圣愈汤',
        'xuzheng_huangqi': '黄芪建中汤',
        'xuzheng_yimu': '八珍益母汤',
        'xuzheng_bazhen': '八珍汤',
        'xuzheng_siwu': '四物汤',
        'xuzheng_jianzhong': '当归建中汤',
        'xuzheng_yiguan': '一贯煎',
        'xuzheng_sini': '当归四逆汤',
        'xuzheng_sahoyao': '当归芍药散',
      },
      medicine: {
        'medicine_tongjingbao': '痛经宝颗粒',
        'medicine_tongjing': '痛经片/丸',
        'medicine_yuanhu': '元胡止痛片/胶囊/滴丸',
        'medicine_shaofu': '少腹逐瘀丸/胶囊/颗粒',
        'medicine_xuefu': '血府逐瘀胶囊/丸/口服液/颗粒/片',
        'medicine_aifu': '艾附暖宫丸',
        'medicine_yimu': '益母草颗粒/胶囊/膏',
        'medicine_dane': '丹莪妇康煎膏',
        'medicine_jingdai': '经带宁胶囊',
        'medicine_tianqi': '田七痛经胶囊',
        'medicine_xiaoyao': '逍遥丸',
        'medicine_danzhi': '丹栀逍遥丸/胶囊',
        'medicine_zaizao': '妇科再造胶囊',
        'medicine_jinfo': '金佛止痛丸',
        'medicine_dangguitiaojing': '当归调经颗粒',
        'medicine_liqi': '九气拈痛丸',
        'medicine_dingkun': '定坤丹',
        'medicine_guizhi': '桂枝茯苓丸',
        'medicine_sanjie': '散结镇痛胶囊',
        'medicine_huahong': '花红片/胶囊',
        'medicine_qianzhi': '茜芷胶囊',
        'medicine_longxue': '龙血竭胶囊',
        'medicine_funv': '妇女痛经丸',
        'medicine_qizhi': '七制香附丸',
        'medicine_nvjin': '女金丸/胶囊',
        'medicine_bazhenyimu': '八珍益母丸/胶囊',
        'medicine_wuji': '乌鸡白凤丸',
        'medicine_nuangong': '暖宫七味丸',
        'medicine_yangkun': '妇科养坤丸',
        'medicine_tiaojing': '妇科调经片/颗粒',
        'medicine_shiwei': '妇科十味片',
        'medicine_zhitong': '调经止痛片',
        'medicine_tjing': '妇科通经丸',
        'medicine_babao': '八宝坤顺丸',
        'medicine_ershiqi': '二十七味定坤丸',
        'medicine_tj': '调经丸',
        'medicine_desheng': '得生丸',
        'medicine_fudesheng': '妇科得生丸',
        'medicine_buzhong': '补中益气丸/颗粒',
        'medicine_danggui': '当归片',
        'medicine_duyiwei': '独一味片',
        'medicine_dusheng': '独圣活血片',
      },
      zhongyi_qita_cure: {
        'way_ti': '体针',
        'way_er': '耳针',
        'way_fu': '腹针',
        'way_ai': '艾灸',
        'way_dou': '耳穴压豆',
        'way_she': '穴位注射',
        'way_tie': '穴位敷贴',
        'way_qi': '敷脐法',
        'way_re': '热熨法',
      },
      koufu_zt: {
        'xi_medicine_buluofen': '布洛芬片',
        'xi_medicine_fenbide': '芬必得缓释胶囊',
        'xi_medicine_asipilin': '复方阿司匹林片',
        'xi_medicine_qutong': '去痛片',
        'xi_medicine_xiaoyan': '消炎痛片',
        'xi_medicine_nimei': '尼美舒利颗粒',
        'xi_medicine_napu': '萘普生片',
        'xi_medicine_jiafen': '甲芬那酸片/胶囊',
        'xi_medicine_yantong': '炎痛喜康片',
        'xi_medicine_tongluo': '酮洛芬片/胶囊',
        'xi_medicine_quma': '曲马多缓释片',
        'xi_medicine_yansuan': '盐酸吗啡片/缓释片',
        'xi_medicine_shuang': '双氯芬酸钠缓释片/钾片',
      },
      zhushe_zt: {
        'xi_zs_bugui': '盐酸布桂嗪（强痛定）注射液',
        'xi_zs_paiti': '盐酸哌替啶（杜冷丁）注射液',
        'xi_zs_mafei': '盐酸吗啡注射液',
        'xi_zs_antong': '安痛定注射液',
      },
      cureForm:{
        zcy: false,
        is_together_cure: '',
        shizheng_cure: '',
        shizheng_cure_qita: '',
        xuzheng_cure: '',
        xuzheng_cure_qita: '',
        xushi_cure: '',
        shizheng_shaofu: '',
        shizheng_wenjing: '',
        shizheng_gexia: '',
        shizheng_jiawei: '',
        shizheng_qingre: '',
        shizheng_xuanyu: '',
        shizheng_taohong: '',
        shizheng_qita: '',
        xuzheng_juejin: '',
        xuzheng_yishen: '',
        xuzheng_tiaogan: '',
        xuzheng_wenjing: '',
        xuzheng_shengyu: '',
        xuzheng_huangqi: '',
        xuzheng_yimu: '',
        xuzheng_bazhen: '',
        xuzheng_siwu: '',
        xuzheng_jianzhong: '',
        xuzheng_yiguan: '',
        xuzheng_sini: '',
        xuzheng_sahoyao: '',
        xuzheng_qita: '',
        xushi_represent: '',
        medicine_tongjingbao: '',
        medicine_tongjing: '',
        medicine_yuanhu: '',
        medicine_shaofu: '',
        medicine_xuefu: '',
        medicine_aifu: '',
        medicine_yimu: '',
        medicine_dane: '',
        medicine_jingdai: '',
        medicine_tianqi: '',
        medicine_xiaoyao: '',
        medicine_danzhi: '',
        medicine_zaizao: '',
        medicine_jinfo: '',
        medicine_dangguitiaojing: '',
        medicine_liqi: '',
        medicine_dingkun: '',
        medicine_guizhi: '',
        medicine_sanjie: '',
        medicine_huahong: '',
        medicine_qianzhi: '',
        medicine_longxue: '',
        medicine_funv: '',
        medicine_qizhi: '',
        medicine_nvjin: '',
        medicine_bazhenyimu: '',
        medicine_wuji: '',
        medicine_nuangong: '',
        medicine_yangkun: '',
        medicine_tiaojing: '',
        medicine_shiwei: '',
        medicine_zhitong: '',
        medicine_tjing: '',
        medicine_babao: '',
        medicine_ershiqi: '',
        medicine_tj: '',
        medicine_desheng: '',
        medicine_fudesheng: '',
        medicine_buzhong: '',
        medicine_danggui: '',
        medicine_duyiwei: '',
        medicine_dusheng: '',
        medicine_qita: '',
        way_ti: '',
        way_er: '',
        way_fu: '',
        way_ai: '',
        way_dou: '',
        way_she: '',
        way_tie: '',
        way_qi: '',
        way_re: '',
        way_qita: '',
        is_zhitong: false,
        xi_medicine_buluofen: '',
        xi_medicine_fenbide: '',
        xi_medicine_asipilin: '',
        xi_medicine_qutong: '',
        xi_medicine_xiaoyan: '',
        xi_medicine_nimei: '',
        xi_medicine_napu: '',
        xi_medicine_jiafen: '',
        xi_medicine_yantong: '',
        xi_medicine_tongluo: '',
        xi_medicine_quma: '',
        xi_medicine_yansuan: '',
        xi_medicine_shuang: '',
        xi_medicine_qita: '',
        xi_zs_bugui: '',
        xi_zs_paiti: '',
        xi_zs_mafei: '',
        xi_zs_antong: '',
        xi_zs_qita: '',
        is_biyunyao: false,
        biyun_daying: '',
        biyun_ming: '',
        biyun_yue: '',
        biyun_ma: '',
        biyun_nuo: '',
        biyun_jia: '',
        biyun_qita: '',
        other_cure: '',
        eat_times: '',
        eat_start_time: '',
        eat_start_time_days: '',
        eat_end_time: '',
        eat_end_time_days: '',
        total_eat_days: '',
        one_day_eat: '',
        },
      dialogVisible: false,
      exist: true,
      formName:''
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
