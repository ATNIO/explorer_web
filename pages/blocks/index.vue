<template>
<div>
    <Header/>
      
  <el-main class="main">
    <br><br>
        <div class="right-nav">
            <el-input v-model="input" class="input" placeholder="Search Address / Tx / Block / Dbot"></el-input>
            <el-button icon="el-icon-search" class="button" v-on:click="this.search">Search</el-button>
        </div><br><br>
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
                >
                </el-table-column>
            </el-table>
            <br>
            <el-pagination
                small
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
    .right-nav {
        display: none;
    }
    @media screen and (max-width: 991px) {
        .status {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
            float: left;
        }
        .right-nav {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }
        .input {
            width: 260px;
        }
        .button {
            background: #00c8ff;
            color: #fff;
        }
        .description {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
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
            input: '',
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
        },
        search() {
            console.log("search")
            console.log("input", this.input)
            console.log(this.$route.path);
            // this.$router.push('blocks/248703')
            this.$axios.$get("/search/" + this.input).then(res => {
                console.log(res)
                let type = res.type;
                if(type == "block") {
                    let value = res.value;
                    let number = value.Number;
                    this.$router.push('/blocks/' + number);
                }
                else if(type == "transaction") {
                    this.$router.push('/transactions/' + this.input);
                }
                else if(type == "dbot") {
                    this.$router.push('/dbots/' + this.input);
                }
                else if(type == "account") {
                    this.$router.push('/accounts/' + this.input);
                }
            }).catch(error => {
                    this.$router.push('/error');
            })
        },
      
    },
  }
</script>