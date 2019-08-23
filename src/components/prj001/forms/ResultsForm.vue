<template>
    <el-dialog title="相关治疗" class="my-dialog"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false" width="100%" center
            @close='resetDialog'>
            <!-- 这里改 -->
        <el-form ref="cureForm" :model="cureForm" label-width="auto" label-position="left">
      <el-alert v-if="is_checked=='审核通过'"
                title="此条信息已经审核通过,无法更改。如需修改, 请更改审核状态"
                type="warning" :closable="false" show-icon>
      </el-alert>
      <el-divider v-if="is_checked=='审核通过'"></el-divider>
    <span slot="footer">
        <el-button :disabled="is_checked=='审核通过'" type="primary" v-if="exist"  @click="updateDataForm">确定</el-button>
        <el-button type="primary" v-else  @click="createDataForm">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
    </span>

        </el-form>
    </el-dialog>
</template>

<script>
import { apiUpdatePatientDataForm, apiCreatePatientDataForm } from '@/api/api-prj001'

export default {
    name:'Relevant',
    data () {
        return {
            cureForm:{},//修改
            dialogVisible: false,
            exist: true,
            formName:'',
            is_checked:'',
        }
    },
    methods: {
        updateDataForm () {
            apiUpdatePatientDataForm({formData:this.cureForm,formName:this.formName})
            .then((res)=> {
                this.resetDialog()
                this.$message({message: '提交成功',type: 'success'})
                this.dialogVisible = false
                this.$parent.getPatients()
            })
            .catch()
        },
        createDataForm () {
            apiCreatePatientDataForm({formData:this.cureForm,formName:this.formName})
            .then((res)=> {
                this.resetDialog()
                this.$message({message: '提交成功',type: 'success'})
                this.dialogVisible = false
                this.$parent.getPatients()
            })
            .catch()
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
            this.is_checked = data.is_checked
            if (!data.exist) {
                //未创建
                this.cureForm.info = data.formData.info // 这里改cureForm
            } else {
                //已创建(修改)
                this.cureForm = data.formData // 这里改cureForm
            }
        })
    }
}
</script>
