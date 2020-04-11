<!-- 手环管理页 -->
<template>
  <div class="handManage">
    <!-- 搜索部分 -->
    <mu-container class="demo-container is-stripe fixedHead">
      <mu-flex class="flex-wrapper pt1" justify-content="end">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item label="手环">
            <el-input v-model="formData.number" placeholder="请输入手环编号或ID" />
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="formData.status" placeholder="请选择手环状态" />
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="formData.dataDay" type="date" :picker-options="pickerOptions" :clearable="false" placeholder="选择日期" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryDataList()">查询</el-button>
          </el-form-item>
        </el-form>
      </mu-flex>
    </mu-container>
    <!-- table部分 -->
    <div class="table">
      <h2 class="title">
        手环列表
        <el-button type="primary" class="btn" icon="el-icon-download" size="small" @click="export2Excel(exportTable, '手环管理列表')">下载模版</el-button>
        <el-button type="primary" class="btn" icon="el-icon-circle-plus-outline" size="small" @click="addExport">批量导入</el-button>
        <el-button type="primary" class="btn" icon="el-icon-circle-plus-outline" size="small" @click="dialog2 = true">单个添加</el-button>
      </h2>
      <el-table v-loading="dataListLoading" :data="dataList" stripe height="500" @selection-change="dataListSelectionChangeHandle">
        <el-table-column label="手环编号" prop="id" align="center" />
        <el-table-column label="手环ID" prop="Mac" align="center" />
        <el-table-column label="手环状态" prop="BraceletStatus" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.BraceletStatus === 0" class="color6">已绑定</span>
            <span v-if="scope.row.BraceletStatus === 1">备用</span>
            <span v-if="scope.row.BraceletStatus === 2">故障</span>
            <span v-if="scope.row.BraceletStatus === 3">丢失</span>
          </template>
        </el-table-column>
        <el-table-column label="入库日期" prop="CreateTime" align="center" />
        <el-table-column label="操作" prop="attendance" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="editInfo(scope.row.id)">编辑</el-button>
              <el-button v-if="scope.row.BraceletStatus === 0" type="text" class="del" @click="untyingInfo(scope.row.id)">解绑</el-button>
              <el-button v-else type="text" class="del" @click="deleteInfo(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作记录" prop="time" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="viewInfo(scope.row.id)">查看记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="sizes, prev, pager, next, jumper"
        @size-change="pageSizeChangeHandle"
        @current-change="pageCurrentChangeHandle"
      />
    </div>
    <!-- 查看记录弹窗 -->
    <mu-dialog width="460" :open.sync="dialog1">
      <mu-appbar color="#204EFF" :title="dialogTitle">
        <mu-button slot="right" icon @click="closeDialog">
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
    <!-- 单个添加 -->
    <mu-dialog width="460" :open.sync="dialog2">
      <mu-appbar color="#204EFF" :title="dialogTitle2" />
      <div class="dialogList">
        <div class="search">
          <el-input v-model="handId" placeholder="请输入手环编号或手环ID">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>
        <h2>入库方式</h2>
        <div class="ruku">
          <el-radio v-model="ruku1" label="1">根据手环编号入库</el-radio>
          <el-radio v-model="ruku1" label="2">根据手环ID入库</el-radio>
        </div>
      </div>
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
        <h3 class="info">注意：若系统中手环信息与手环实际信息不一致，请勿入库</h3>
        <div class="footer">
          <el-button round size="mini" @click="closeDialog2">取消入库</el-button>
          <el-button type="primary" round class="btn" size="mini">确认入库</el-button>
        </div>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
// 状态 0 已绑定 1 备用 2 故障 3 丢失
import mixinViewModule from '@/mixins/view-module'
export default {
  mixins: [mixinViewModule],
  data() {
    return {
      mixinViewModuleOptions: {
        //  获取手环列表数据
        getDataListURL: '/handManage/page',
        getDataListIsPage: true
      },
      dialog1: false,
      dialogTitle: '手环记录',
      dialog2: false,
      dialogTitle2: '单个入库',
      // 手环ID
      handId: '',
      ruku1: '1',
      formData: {
        number: '',
        status: '',
        dataDay: ''
      },
      exportTable: {
        id: '手环编号',
        Mac: '手环ID',
        BraceletStatus: '手环状态',
        CreateTime: '入库日期',
        attendance: '操作',
        time: '操作记录'
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      tableData: [],
      handDetail: {
        color: '蓝色',
        id: 456,
        mac: 'C8:66:F3:33:04:9D',
        cardId: '1238545623156',
        name: '李沐雪',
        studentId: 20180501,
        sex: '女',
        class: '三年级二班'
      }
    }
  },
  created() {
    this.$store.state.handStatus = 1
  },
  methods: {
    // 批量导入
    addExport() {
      this.$message.closeAll()
      this.$message({
        type: 'success',
        message: '批量导入',
        offset: 200
      })
    },
    // 单个添加
    addOne() {
      this.$message.closeAll()
      this.$message({
        type: 'success',
        message: '单个添加',
        offset: 200
      })
    },
    // 关闭手环详情 弹窗
    closeDialog() {
      this.dialog1 = false
    },
    // 单个入库 弹窗 关闭
    closeDialog2() {
      this.dialog2 = false
    },
    // 编辑
    editInfo(obj) {
      console.log(obj)
    },
    // 删除
    deleteInfo(obj) {
      this.$message.closeAll()
      this.$confirm('是否将该手环删除?', '提示', {
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
    untyingInfo(obj) {
      this.$message.closeAll()
      this.$confirm('是否将该手环解绑?', '提示', {
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
    // 查看记录
    viewInfo(obj) {
      this.dialog1 = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/public.scss';
@import '../../styles/work-class';
.handManage {
  max-width: 1140px;
  .fixedHead {
    background: #fff;
    .pt1 {
      padding-top: 15px;
    }
  }
  .table {
    margin-top: 30px;
    .del {
      color: red;
    }
  }
}
// 查看详情里面的弹窗
.dialogList {
  background: #F0F0F7;
  padding-top: 20px;
  position: relative;
  .search {
    padding: 0 24px 20px;
    .el-input {
      border-radius: 30px;
    }
  }
  h2 {
    font-size: 16px;
    color: #43425D;
    height: 48px;
    line-height: 48px;
    padding-left: 20px;
    box-sizing: border-box;
    font-weight: bold;
    border-bottom: 1px solid #e9e9e9;
    background: #fff;
  }
  dl {
    background: #fff;
    display: flex;
    justify-content: flex-start;
    padding: 24px;
    dt {
      width: 96px;
      height: 96px;
      img {
        width: 96px;
        height: 96px;
        border-radius: 96px;
      }
    }
    dd {
      margin-left: 30px;
      p {
        font-size: 14px;
        line-height: 25px;
        span {
          text-align: right;
          display: inline-block;
          width: 90px;
        }
      }
    }
  }
  .info {
    font-size: 12px;
    color: #999;
    background: #fff;
    padding-left: 24px;
  }
  .footer {
    text-align: right;
    background: #fff;
    padding: 20px;
  }
  .ruku {
    background: #fff;
    padding: 24px;
  }
  .status {
    width: 0;
    height: 0;
    border-bottom: 40px solid #3FC376;
    border-left: 40px solid transparent;
    position: absolute;
    z-index: 10;
    right: 0;
    bottom: 0;
  }
  .status:after {
    content: '已绑';
    display: block;
    width: 40px;
    font-size: 10px;
    height: 40px;
    position: absolute;
    left: -20px;
    bottom: -50px;
    color: #fff;
    transform: rotate(-45deg)
  }
}
</style>
