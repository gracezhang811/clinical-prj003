<template>
        <el-dialog title="一般情况" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
</template>
<script>
export default {
    name:'Info',
    data () {
        return {
          editFormVisible: false, // 编辑界面是否显示
          editLoading: false,
          editFormRules: {
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ]
          },
          // 编辑界面数据
          editForm: {
            id: 0,
            name: '',
            sex: -1,
            age: 0,
            birth: '',
            addr: ''
          },
        }
    },
    methods: {
          // 编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let para = Object.assign({}, this.editForm)
            para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            editUser(para).then((res) => {
              this.editLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getPatients()
            })
          })
        }
      })
    },
    }
}
</script>


        <!-- <template v-for="(item,index) in routes"> -->
            <!--if 有次级菜单, leaf是判断的flag -->
            <!-- <el-submenu :index="index+''" :key="item.name" v-if="item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>
                {{item.name}}
              </template>
              <el-menu-item
                v-for="child in routeChildren(item)"
                :index="child.path"
                :key="child.path"
              >{{child.name}}</el-menu-item>
            </el-submenu> -->
            <!--else 普通的没有次级的菜单项 -->
            <!-- <el-menu-item
              v-if="!item.leaf&&item.children.length>0"
              :key="item.name"
              :index="item.children[0].path"
            >
              <i :class="item.iconCls"></i>
              {{item.children[0].name}}
            </el-menu-item> -->
            <!-- </template> -->

        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in routes" :key="item.name" class="el-submenu item">
            <!--多级菜单route渲染-->
            <template v-if="!item.leaf">
              <!--经过菜单显示对应ul的事件-->
              <div
                class="el-submenu__title"
                style="padding-left: 20px;"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <i :class="item.iconCls"></i>
              </div>
              <ul
                class="el-menu submenu"
                :class="'submenu-hook-'+index"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <li
                  v-for="child in item.children"
                  :key="child.path"
                  class="el-menu-item"
                  style="padding-left: 40px;background: #f2f2f2;"
                  :class="$route.path===child.path?'is-active':''"
                  @click="$router.push(child.path)"
                >{{child.name}}</li>
              </ul>
            </template>
            <!-- 单级菜单 -->
            <template v-else>
              <li class="el-submenu">
                <div
                  class="el-submenu__title el-menu-item"
                  style="height: 56px;line-height: 56px;padding: 0 20px;"
                  :class="$route.path===item.children[0].path?'is-active':''"
                  @click="$router.push(item.children[0].path)"
                >
                  <i :class="item.iconCls"></i>
                </div>
              </li>
            </template>
          </li>
        </ul>