<template>
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':'中医妇科临床流调数据中心'}}
      </el-col>
      <el-col :span="6">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="8" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img src="@/assets/Nurse.png" />
            {{userinfo.user_name}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dialogVisible=true">账户信息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <!-- 这里的native不能删,native用来触发原生的事件,可以理解为把一个vue组件转化为一个普通的HTML标签 -->
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <!-- <UserInfo ref="userInfo"></UserInfo> -->
      <el-dialog
        title="用户信息"
        :visible.sync="dialogVisible" class="my-dialog"
        :close-on-click-modal="false" width="60%" center>
        <p>用户名:{{userinfo.user_name}}</p>
        <p>性别:{{userinfo.sex}}</p>
        <p>所属医院:{{userinfo.hospital}}</p>
        <p>地址:{{userinfo.address}}</p>
        <p>邮箱:{{userinfo.email}}</p>
        <p>电话:{{userinfo.phone}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-col>
</template>

<script>
export default {
    name:"Header",
    data () {
      return {
        collapsed: true,
        userinfo:{},
        dialogVisible:false
      }
    },
    methods:{
      // 登出
      logout: function () {
        var _this = this; //这条语句是防止this指向当前函数,这样赋值_this就指向vm对象了
        this.$confirm("确认退出吗?", "提示", {type: "warning"})
          .then(() => {
            sessionStorage.removeItem("user");
            _this.$router.push("/login");
          })
          .catch(() => {});
      },
      // 折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed
        this.$emit("headerEvent", this.collapsed)
      },
    },
    created () {
        this.userinfo = JSON.parse((sessionStorage.getItem("userinfo")))
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/vars";

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
</style>

