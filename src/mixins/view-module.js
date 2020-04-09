export default {
  data () {
    /* eslint-disable */
    return {
      // 设置属性
      mixinViewModuleOptions: {
        createdIsNeed: true,       // 此页面是否在创建时，调用查询数据列表接口？
        activatedIsNeed: true,    // 此页面是否在激活（进入）时，调用查询数据列表接口？
        getDataListURL: '',       // 数据列表接口，API地址
        getDataListIsPage: false, // 数据列表接口，是否需要分页？
        deleteURL: '',            // 删除接口，API地址
        deleteIsBatch: false,     // 删除接口，是否需要批量？
        deleteIsBatchKey: 'id',   // 删除接口，批量状态下由那个key进行标记操作？比如：pid，uid...
        exportURL: ''             // 导出接口，API地址
      },
      // 默认属性
      formData: {},               // 查询条件
      dataList: [],               // 数据列表
      page: 1,                    // 当前页码
      limit: 10,                  // 每页数
      total: 0,                   // 总条数
      dataListLoading: false,     // 数据列表，loading状态
      dataListSelections: [],     // 数据列表，多选项
      addOrUpdateVisible: false   // 新增／更新，弹窗visible状态
    }
    /* eslint-enable */
  },
  created () {
    if (this.mixinViewModuleOptions.createdIsNeed) {
      this.queryDataList()
    }
  },
  activated () {
    console.log('object11342');
    if (this.mixinViewModuleOptions.activatedIsNeed) {
      this.queryDataList()
    }
  },
  methods: {
    // 获取数据列表
    queryDataList () {
      this.dataListLoading = true
      this.$http.get(
        this.mixinViewModuleOptions.getDataListURL,
        {
          params: {
            page: this.mixinViewModuleOptions.getDataListIsPage ? this.page : null,
            limit: this.mixinViewModuleOptions.getDataListIsPage ? this.limit : null,
            ...this.formData
          }          
        }
      ).then(({ data: res }) => {
        this.dataListLoading = false
        console.log('res :', res);
        if (res.code !== 0) {
          this.dataList = []
          this.total = 0
          return this.$message.error('查询错误，请稍后重试！')
        }
        this.dataList = this.mixinViewModuleOptions.getDataListIsPage ? res.data.list : res.data
        this.total = this.mixinViewModuleOptions.getDataListIsPage ? res.data.total : 0
      }).catch(() => {
        this.dataListLoading = false
      })
    },
    // 多选
    dataListSelectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 分页, 每页条数
    pageSizeChangeHandle (val) {
      this.page = 1
      this.limit = val
      this.queryDataList()
    },
    // 分页, 当前页
    pageCurrentChangeHandle (val) {
      this.page = val
      this.queryDataList()
    },
    getDataList: function () {
      this.page = 1
      this.queryDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.formData.id = id
        this.$refs.addOrUpdate.init()
      })
    },
    // 删除
    deleteHandle (id) {
      if (this.mixinViewModuleOptions.deleteIsBatch && !id && this.dataListSelections.length <= 0) {
        return this.$message({
          message: '请选择你要批量删除的数据？',
          type: 'warning',
          duration: 500
        })
      }
      this.$confirm(`确定对[id=${this.dataListSelections.join(',')}]进行[${this.mixinViewModuleOptions.deleteIsBatch ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(
          `${this.mixinViewModuleOptions.deleteURL}${this.mixinViewModuleOptions.deleteIsBatch ? '' : '/' + id}`,
          this.mixinViewModuleOptions.deleteIsBatch ? {
            'data': id ? [id] : this.dataListSelections.map(item => item[this.mixinViewModuleOptions.deleteIsBatchKey])
          } : {}
        ).then(({ data: res }) => {
          if (res.code !== 0) {
            return this.$message.error('查询错误，请稍后重试！')
          }
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 500,
            onClose: () => {
              this.queryDataList()
            }
          })
        }).catch(() => {})
      }).catch(() => {})
    },
    // 导出
    exportHandle () {
      console.log('导出')
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    export2Excel(tableList, fileName = '列表详情') {
      var  list = []
      this.dataList.forEach((item,index)=>{
        for(let key in item){
          if(item[key] == null){
            item[key] = ''
          }
        }
        list.push(item)
      })
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        let tHeader = []
        let filterVal = []
        Object.entries(tableList).map(([key, label])=>{
          filterVal.push(key)
          tHeader.push(label)
        })
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, fileName)
      })
    }
  }
}
