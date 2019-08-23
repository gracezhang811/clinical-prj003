<template>
<el-row class="container">
  <!-- <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="6">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="8" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img src="@/assets/user.png" />
            {{userinfo.user_name}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>账户信息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
  </el-col> -->
  <Header @headerEvent="ret=>(collapsed=ret)"></Header>

  <el-col :span="23">
    <el-table :data="userinfo.myprojects"
              highlight-current-row
              style="width: 100%;"
              border>
      <el-table-column prop="name" label="项目名称">
      </el-table-column>
      <el-table-column prop="status" label="状态">
      </el-table-column>
      <el-table-column prop="linkurl" label="进入项目">
        <template v-slot="scope">
          <el-button type="btn-info" size="small" @click="enterPrj(scope.$index, scope.row)">进入</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="项目描述">
      </el-table-column>
    </el-table>
  </el-col>
</el-row>
</template>

<script>
import {apiHome,apiPrj} from '@/api/api-common'
import Header from '@/components/common/Header'

export default {
    name:"Home",
    components:{Header},
    data () {
        return {
            userinfo:{},
            sysName: "中医妇科临床流调数据中心",
            collapsed: true,
        }
    },
    methods: {
        // 退出登录
        logout: function () {
          var _this = this; //这条语句是防止this指向当前函数,这样赋值_this就指向vm对象了
          this.$confirm("确认退出吗?", "提示", {
            type: "warning"
          })
            .then(() => {
              sessionStorage.removeItem("user");
              _this.$router.push("/login");
            })
            .catch(() => {});
        },
        collapse: function() {
          this.collapsed = !this.collapsed;
        },
        enterPrj (index, row) {
            console.log(row.linkurl)
            const user = JSON.parse(sessionStorage.getItem("user"))
            let params = {
                linkurl:row.linkurl,
                email:user.email,
                password:user.password
            }
            apiPrj(params)
            .then( (res) => {
                this.$router.push(`${row.linkurl}table`)
            })
            .catch()

        }
    },
    created () {
        const user = JSON.parse(sessionStorage.getItem("user"))
        let params = {
            email:user.email,
            password:user.password
        }
        apiHome(params)
        .then( (res)=> {
          sessionStorage.setItem('userinfo', JSON.stringify(res.data.userinfo))
          this.userinfo = res.data.userinfo
        })
        .catch()
    }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/vars";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;

    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;

      .userinfo-inner {
        cursor: pointer;
        color: #fff;

        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }

    .logo {
      height: 60px;
      font-size: 17px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;

      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }

      .txt {
        color: #fff;
      }
    }

    .logo-width {
      width: $aside-width;
    }

    .logo-collapse-width {
      width: 60px;
    }

    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }

  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;

    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }

    .menu-expanded {
      flex: 0 0 $aside-width;
      width: $aside-width;

      .el-menu {
        /*打补丁的方式解决左侧菜单宽度显示不全*/
        width: 100% !important;
      }

      .el-submenu .el-menu-item {
        min-width: 0px !important;
      }
    }

    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;

      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }

        .breadcrumb-inner {
          float: right;
        }
      }

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
</style>


