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
                    ATN Network Accounts
                </p>
            </div>
            <br><br><br><br>
            <el-table
                :data="accountTable"
                style="width: 1000px; "
                type="flex"
                align="middle"
                justify="center">

                <el-table-column
                    prop="address"
                    label="Address"
                    min-width="400"
                    >
                    <template slot-scope="scope">
                        <nuxt-link :to="'/accounts/' + scope.row.address">{{ scope.row.address }}</nuxt-link>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="balance"
                    label="Balance"
                    min-width="200"
                >
                </el-table-column>

                <el-table-column
                    prop="percentage"
                    label="Percentage"
                    min-width="200"
                >
                </el-table-column>

                <el-table-column
                    prop="txCount"
                    label="TxCount"
                    min-width="100"
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

    .description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 1000px;
    }

    a {
        color: #74B8FB;
        text-decoration: none;
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

    .details {
        font-family:  "Helvetica Neue",Helvetica;
        font-size: 27px;
        font-weight: 300
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
    .right-nav {
        display: none;
    }
    @media screen and (max-width: 991px) {
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
        .status {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
            float: left;
        }
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
            accountTable: [],
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
            this.$axios.$get("/accounts/list/15").then(res => {
                for( let r of res ) {
                    let account = {};
                    console.log("accounts list res", res)
                    account.address = r.Address;
                    account.balance = parseInt(r.Balance) / 1e18 + " ATN";
                    let temp = (parseInt(r.Balance) / 1e18 / 1e12).toFixed(11);
                    var e = parseInt(temp.toString().split('e-')[1]);
                    // console.log("e",e)
                    if (e) {
                        temp *= Math.pow(10,e-1);
                        temp = '0.' + (new Array(e)).join('0') + temp.toString().substring(2);
                    }
                    account.percentage = temp + "%";
                    account.txCount = (r.TransactionHashes.toString().match(new RegExp(",", "g")) || []).length
                    this.accountTable.push(account);
                }
            })
            this.$axios.$get("/accounts/count").then(res => {
                console.log(res)
                this.total = res.count;
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.$axios.$get("/accounts/list/15/" + ((parseInt(val) - 1) * 15)).then(res => {
                this.accountTable = [];
                for( let r of res ) {
                    let block = {};
                    block.blockNumber = r.Number;
                    block.txns = r.Txns;
                    this.accountTable.push(block);
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