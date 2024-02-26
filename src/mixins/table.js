const tableMixins = {
  data() {
    return {
      isLoading: false,
      paginationConfig: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.paginationConfig['pageNum'] = val;
      this.initTableData();
    },
    handleSizeChange(val) {
      this.paginationConfig['pageNum'] = 1;
      this.paginationConfig['pageSize'] = val;
      this.initTableData();
    },
    searchData() {
      this.paginationConfig['pageNum'] = 1;
      this.initTableData();
    },
    /** 取消 */
    handleCancel() {
      document.body.click();
    },
  },
};

export default tableMixins;
