<!-- 用户中心 - 学生管理 -->
<template>
  <div class="userCenter">
    <mu-container class="demo-container is-stripe">
      <div class="head">
        <h2>按组织结构查询</h2>
        <p>
          <el-input v-model="searchVal" placeholder="请输入姓名或学号">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </p>
      </div>
      <el-form ref="formData" :model="formData" label-width="60px">
        <el-form-item label="校区">
          <el-radio-group v-model="formData.radio">
            <el-radio :label="1">西直门校区</el-radio>
            <el-radio :label="2">百万庄校区</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年级">
          <el-radio-group v-model="formData.gradeId">
            <el-radio v-for="(item, index) in gradeData" :key="index" :label="item.id">
              {{ item.value }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="班级">
          <el-radio-group v-model="formData.classId">
            <el-radio v-for="(item, index) in classData" :key="index" :label="item.id">
              {{ item.value }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </mu-container>
    <!-- table -->
    <div class="table">
      <div class="table-top">
        <h2>用户列表</h2>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addUser">添加用户</el-button>
      </div>
      <el-table :data="tableData" stripe>
        <el-table-column label="头像" min-width="100">
          <template slot-scope="scope">
            <el-avatar size="medium" :src="scope.row.imgUrl" class="userImg" />
          </template>
        </el-table-column>
        <el-table-column prop="studentId" label="学号" min-width="140" />
        <el-table-column prop="studentName" label="姓名" min-width="80" />
        <el-table-column prop="sex" label="性别" min-width="80" />
        <el-table-column prop="classId" label="班级" />
        <el-table-column label="启用" min-width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="editInfo(scope.row)">编辑</el-button>
            <el-button type="text" class="del" @click="deleteInfo(scope.row)">删除</el-button>
            <!-- <el-button type="text">重置密码</el-button> -->
          </template>
        </el-table-column>
        <el-table-column label="手环" min-width="150">
          <template slot-scope="scope">
            <p v-if="scope.row.status === false">
              <el-button type="text" @click="dialog2 = true">绑定手环</el-button>
            </p>
            <p v-if="scope.row.status === true">
              <el-button type="text" @click="untyIng(scope.row)">解绑</el-button>
              <el-button type="text" @click="viewInfo(scope.row)">详情</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 用户详情 -->
    <mu-dialog width="460" :open.sync="dialog1">
      <mu-appbar color="#204EFF" :title="dialogTitle">
        <mu-button slot="right" icon @click="dialog1 = false">
          <mu-icon value="close" />
        </mu-button>
      </mu-appbar>
      <div class="dialogList">
        <h2>手环信息</h2>
        <dl>
          <dt><img src="../../assets/shouhuan.png" alt=""></dt>
          <dd>
            <p><span>手环颜色：</span> {{ handDetail.color }}</p>
            <p><span>手环编号：</span> {{ handDetail.id }}</p>
            <p><span>手环ID：</span> {{ handDetail.mac }}</p>
            <p><span>一卡通卡号：</span> {{ handDetail.color }}</p>
          </dd>
        </dl>
        <!-- 手环的状态 -->
        <div class="status" />
      </div>
      <div class="dialogList">
        <h2>已绑定人员</h2>
        <dl>
          <dt><img src="../../assets/user.jpg" alt=""></dt>
          <dd>
            <p><span>姓名：</span> {{ handDetail.name }}</p>
            <p><span>学号：</span> {{ handDetail.studentId }}</p>
            <p><span>性别：</span> {{ handDetail.sex }}</p>
            <p><span>班级：</span> {{ handDetail.class }}</p>
          </dd>
        </dl>
      </div>
    </mu-dialog>
    <!--  添加用户 -->
    <mu-dialog width="460" :open.sync="addDialog">
      <mu-appbar color="#204EFF" :title="addTitle">
        <mu-button slot="right" icon @click="addDialog = false">
          <mu-icon value="close" />
        </mu-button>
      </mu-appbar>
      <div class="dialogList">
        <h2>填写基本信息</h2>
        <el-form ref="userForm" :model="userForm" label-width="100px">
          <el-form-item label="设置头像">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="userForm.imageUrl" :src="userForm.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="userForm.studentId" placeholder="请输入学号" clearable />
          </el-form-item>
          <el-form-item label="姓名" prop="studentName">
            <el-input v-model="userForm.studentName" placeholder="请输入姓名" clearable />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="userForm.sex" placeholder="请选择性别" clearable>
              <el-option label="男" :value="1" />
              <el-option label="女" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="手环ID" prop="handId">
            <el-input v-model="userForm.handId" placeholder="请输入手环ID或手环编号" clearable />
          </el-form-item>
          <el-form-item class="textR">
            <el-button @click="addDialog = false">取消</el-button>
            <el-button type="primary" @click="saveUser">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </mu-dialog>
    <!-- 绑定手环 -->
    <mu-dialog width="460" :open.sync="dialog2">
      <mu-appbar color="#204EFF" title="绑定手环">
        <mu-button slot="right" icon @click="dialog2 = false">
          <mu-icon value="close" />
        </mu-button>
      </mu-appbar>
      <div class="dialogList">
        <p style="width: 100%; padding: 0 20px 10px;">
          <el-input v-model="searchVal2" placeholder="请输入手环编号或手环ID">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </p>
        <h2>备用手环列表</h2>
        <el-table :data="tableData2" stripe>
          <el-table-column prop="number" label="手环编号" />
          <el-table-column prop="id" label="手环ID" />
          <el-table-column prop="color" label="手环颜色" />
          <el-table-column label="操作">
            <template>
              <el-button type="text">绑定</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p style="text-align: right; padding: 10px;">
          <el-button @click="dialog2 = false">取消</el-button>
          <el-button type="primary" @click="dialog2 = false">保存</el-button>
        </p>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog1: false,
      dialog2: false,
      addDialog: false,
      addTitle: '添加用户',
      dialogTitle: '已绑定详情',
      searchVal: '',
      searchVal2: '',
      formData: {
        radio: 1,
        gradeId: 1,
        classId: 1
      },
      gradeData: [
        {
          value: '一年级',
          id: 1
        }, {
          value: '二年级',
          id: 2
        }, {
          value: '三年级',
          id: 3
        }, {
          value: '四年级',
          id: 4
        }, {
          value: '五年级',
          id: 5
        }, {
          value: '六年级',
          id: 6
        }, {
          value: '初一',
          id: 7
        }
      ],
      classData: [
        {
          id: 1,
          value: '1班'
        }, {
          id: 2,
          value: '2班'
        }, {
          id: 3,
          value: '3班'
        }, {
          id: 4,
          value: '4班'
        }, {
          id: 5,
          value: '5班'
        }, {
          id: 6,
          value: '6班'
        }, {
          id: 7,
          value: '7班'
        }
      ],
      tableData: [
        {
          imgUrl: require('../../assets/user.jpg'),
          studentId: '20200101',
          studentName: '李沐雪',
          sex: '女',
          classId: '一年级1班',
          status: true,
          id: 1,
          handId: 123
        }, {
          imgUrl: require('../../assets/user.jpg'),
          studentId: '20200101',
          studentName: '李沐雪',
          sex: '女',
          classId: '一年级1班',
          status: false,
          id: 2,
          handId: 456
        }
      ],
      handDetail: {
        color: '蓝色',
        id: 456,
        mac: 'C8:66:F3:33:04:9D',
        cardId: '1238545623156',
        name: '李沐雪',
        studentId: 20180501,
        sex: '女',
        class: '三年级二班'
      },
      userForm: {
        imageUrl: '',
        studentId: '',
        sex: '',
        studentName: '',
        handId: ''
      },
      tableData2: [
        {
          id: 20220202,
          number: 122221,
          color: '蓝色'
        }
      ]
    }
  },
  created() {
    this.$store.state.userStatus = 1
  },
  methods: {
    // 删除功能
    deleteInfo(obj) {
      this.$confirm('是否删除该用户？删除之后无法恢复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          offset: 200
        })
      }).catch(() => {})
    },
    // 解绑
    untyIng(obj) {
      this.$confirm('是否确定解绑该手环？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '解绑成功!',
          offset: 200
        })
      }).catch(() => {})
    },
    // 查看详情
    viewInfo(obj) {
      this.dialog1 = true
    },
    handleAvatarSuccess(res, file) {
      this.userForm.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 保存用户
    saveUser() {
      this.$message.closeAll()
      this.$message({
        type: 'success',
        message: '保存成功',
        offset: 200
      })
      this.addDialog = false
    },
    // 添加用户
    addUser() {
      this.addDialog = true
      this.userForm.studentName = ''
      this.userForm.studentId = ''
      this.userForm.sex = ''
      this.userForm.handId = ''
      this.userForm.imageUrl = ''
    },
    // 编辑
    editInfo(obj) {
      this.addDialog = true
      this.userForm.studentName = obj.studentName
      this.userForm.studentId = obj.studentId
      this.userForm.sex = obj.sex
      this.userForm.handId = obj.handId
      this.userForm.imageUrl = obj.imgUrl
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/public.scss';
.userCenter {
  width: 1140px;
  text-align: left;
  .demo-container {
    background: #ffffff;
    .head {
      display: flex;
      justify-content: space-between;
      height: 56px;
      line-height: 56px;
      padding: 0 20px;
      border-bottom: 1px solid #efefef;
      h2 {
        font-size: 18px;
        color: #43425D;
        font-weight:500;
      }
    }
    .el-form {
      padding: 20px 0;
      .el-radio-group {
        margin-left: 20px;
        .el-radio {
          padding-right: 20px;
        }
      }
    }
  }
  .table {
    margin: 20px 0;
    background: #ffffff;
    .table-top {
      border-bottom: 1px solid #efefef;
      display: flex;
      justify-content: space-between;
      padding: 16px 20px;
      box-sizing: border-box;
      h2 {
        font-size: 18px;
        color: #43425D;
        font-weight: bold;
      }
    }
    .el-table {
      .userImg {
        vertical-align: middle;
      }
      .del {
        color: red;
      }
    }
  }
}
.dialogList {
  .el-form {
    width: 100%;
    background: #ffffff;
    padding: 20px 20px 0 10px;
    box-sizing: border-box;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      border: 1px solid #DCDFE6;
      text-align: center;
      border-radius: 3px;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
    .el-input,
    .el-select {
      width: 260px;
    }
    .textR {
      text-align: right;
    }
  }
}
</style>
