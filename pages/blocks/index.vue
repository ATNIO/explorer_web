<template>
<div>
    <Header/>
      
  <el-main class="main">
    <br><br>
      <div class="table">

        <div class="network-status">
            <div class="description">
                <p class="status">
                    ATN Network Blocks
                </p>
            </div>
            <br><br>
            <el-table
                :data="blockTable"
                style="width: 800px; "
                type="flex"
                align="middle"
                justify="center">

                <el-table-column
                    prop="number"
                    label="Block"
                    min-width="100">
                    <template slot-scope="scope">
                        <nuxt-link :to="'/blocks/' + scope.row.number">{{ scope.row.number }}</nuxt-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="txns"
                    label="TXns"
                    min-width="20"
                >
                </el-table-column>
            </el-table>
            <br>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size=this.pageSize
                layout="total, prev, pager, next"
                :total=this.total>
            </el-pagination>
            </div>
        </div>
    </el-main>
    <br> <br>
  <el-footer>
    <Footer/>
  </el-footer>
</div>
</template>

<style scoped lang="less">

    a {
        color: #74B8FB;
        text-decoration: none;
    }

    .description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 800px;
    }

    .network-status {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .status {
        font-family:  "Helvetica Neue",Helvetica;
        font-size: 30px;
    }

    .table{
        //  background-color: #F7F7F9;
        //  background-color: rgb(3, 3, 255); 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .header{
        //  background-color: #F7F7F9;
        //  background-color: rgb(3, 3, 255); 
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }


    .table{
        //  background-color: #F7F7F9;
        //  background-color: rgb(3, 3, 255); 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .el-footer {
        // background-color: #00C8FF;
        text-align: center;
        line-height: 60px;
        
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #FFF;
        color: #333;
        text-align: center;
    }
    
    body > .el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import axios from 'axios'
  export default {

    components: {
        Header,
        Footer
    },
    created() {
        this.showData();
    },
    data() {
      return {
            blockTable: [],
            total: 0,
            currentPage: 1,
            pageSize: 15,
      };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        showData() {
            this.$axios.$get("/blocks/list/15").then(res => {
                for( let r of res ) {
                    let block = {};
                    block.number = r.Number;
                    block.txns = r.Txns;
                    this.blockTable.push(block);
                }
            })
            this.$axios.$get("/blocks/count").then(res => {
                console.log(res)
                this.total = res.count;
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$axios.$get("/blocks/list/15/" + ((parseInt(val) - 1) * 15)).then(res => {
                this.blockTable = [];
                for( let r of res ) {
                    let block = {};
                    block.number = r.Number;
                    block.txns = r.Txns;
                    this.blockTable.push(block);
                }
            })
        }
      
    },
  }
</script>