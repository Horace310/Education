<template>
  <div class="pagination">
    <el-pagination
      v-if="total>0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "pagination",
    data() {
      return {
      };
    },
    props: {
      pageSize: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 1
      },
      currentPage: {
        type:Number,
        default:1
      }
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.$emit('handleSizeChangeSub', val);
      },
      handleCurrentChange(val) {
      //  console.log(`当前页: ${val}`);
        this.$emit('handleCurrentChangeSub', val);
      }
    }
  }
</script>

<style scoped>
  .pagination {
    text-align: center;
    padding: 50px 0 30px 0;
  }
</style>
