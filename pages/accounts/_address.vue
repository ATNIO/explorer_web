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
                    Account Details
                </p>
                <br/>
                <p class="details">
                    <span>Address:</span>
                    <span> {{ this.address }} </span>
                </p>
            </div>
            <br><br><br>
            <div class="overview">
                <p class="p-overview">Overview</p>
                <br>
                <div class="form">
                    <el-table
                    border
                    :data="accountDetailsTable"
                    :show-header = false
                    class="tableOverview"
                    type="flex"
                    align="middle"
                    justify="space-between">
                    
                        <el-table-column
                            prop="attribute"
                            label=""
                            >
                        </el-table-column>

                        <el-table-column
                            prop="value"
                            label=""
                            >
                        </el-table-column>
                        
                    </el-table>
                </div>
                <br><br><br>
                <el-tabs v-model="activeName2"  type="border-card" @tab-click="handleClick" style="width: 100%">
                    <el-tab-pane label="Transactions" name="first">
                        <el-table
                            :data="transactionTable"
                            style="width: 100%; "
                            type="flex"
                            align="middle"
                            justify="center">

                            <el-table-column
                                prop="blockNumber"
                                label="Block"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="time"
                                label="Time"
                                >
                            </el-table-column>

                            <el-table-column
                                prop="txId"
                                label="hash"
                                >
                                <template slot-scope="scope">
                                    <nuxt-link :to="'/transactions/' + scope.row.hash">{{ scope.row.txId }}</nuxt-link>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="from"
                                label="From"
                                >
                                <template slot-scope="scope">
                                    <nuxt-link :to="'/accounts/' + scope.row.fromAddress">{{ scope.row.from }}</nuxt-link>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="tag"
                                label=""
                                >
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.tag" size="small" class="tag">{{ scope.row.tagValue }}</el-tag>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="to"
                                label="To"
                                >
                                <template slot-scope="scope">
                                    <nuxt-link :to="'/accounts/' + scope.row.toAddress">{{ scope.row.to }}</nuxt-link>
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="value"
                                label="Value"
                                
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
                    </el-tab-pane>
                </el-tabs>
            </div>
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

    .tableOverview {
        width: 60%;
    }

    .tag {
        font-size: 14px;
    }

    .overview {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 70%;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
    }

    .form .balance {
        display: flex;
        flex-direction: row;
        align-items: space-around;
        justify-content: center;
        width: 100%;
    }

    span {
        font-size: 20px;
    }

    .description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 70%;
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
        float: left;
    }

    .details {
        font-family:  "Helvetica Neue",Helvetica;
        font-size: 20px;
        font-weight: 350
    }

    .table{
        //  background-color: #F7F7F9;
        //  background-color: rgb(3, 3, 205); 
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
        //  background-color: rgb(3, 3, 205); 
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }


    .table{
        //  background-color: #F7F7F9;
        //  background-color: rgb(3, 3, 205); 
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
        .right-nav {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }
        .input {
            width: 200px;
        }
        .button {
            background: #00c8ff;
            color: #fff;
        }
        .details {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 15px;
            font-weight: 350;
            display: flex;
            flex-direction: column;
            align-items: center;
            // justify-content: flex-start;
            word-break: break-all;
        }
        .status {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .description {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
        }
        p {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            height: 50px;
        }
        span {
            font-size: 16px;
        }
        
        .tableOverview {
            width: 100%;
        }

        .overview {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
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
import { toDate, cutStr } from '~/common/method.js'

  export default {

    components: {
        Header,
        Footer
    },
    asyncData({ params }) {
        console.log("params address", params.address)
        return { address: params.address }
    },

    created() {
        this.showData();
    },
    data() {
      return {
            address: '',
            accountDetailsTable: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            atn: '',
            atnValue: '',
            txns: '',
            activeName2: 'first',
            transactionTable: [],
            input: '',
      };
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        async showData() {
            // console.log("this address", this.address)
            this.$axios.$get("/accounts/address/" + this.address).then(res => {
                // console.log("parseInt(res.Balance)", parseInt(res.Balance))
                this.atn = parseInt(res.Balance) / 1e18;
                // console.log(this.atn)
                this.accountDetailsTable.push({attribute: "Balance: ", value: cutStr(this.atn.toString()) + " ATN"});
                this.atnValue = (this.atn * 0.233416).toFixed(2)
                this.accountDetailsTable.push({attribute: "ATN Value: ", value: "$" + cutStr(this.atnValue.toString()) });
            })
            // await this.$axios.$get("https://api.coinmarketcap.com/v1/ticker/atn/").then(res => {
            //     let atnPrice = res[0].price_usd;
            //     this.atnValue = (this.atn * atnPrice).toFixed(2)
            //     this.accountDetailsTable.push({attribute: "ATN Value: ", value: "$" + cutStr(this.atnValue.toString()) });
            // })
            this.$axios.$get("/accounts/address/" + this.address).then(res => {
                this.txns = res.TransactionHashes.match(new RegExp(",", "g")).length;
                // console.log(this.txns)
                this.accountDetailsTable.push({attribute: "Transactions: ", value: this.txns + " txns"});
            })

            this.$axios.$get("/transactions/count/account/" + this.address).then(res => {
                // console.log(res)
                this.total = res.count;
            })

            this.$axios.$get("/transactions/list/10/0/account/" + this.address).then(res => {
                // console.log(res);
                res.sort((a, b) => {
                    let keyA = parseInt(a.Timestamp),
                        keyB = parseInt(b.Timestamp);
                    // console.log(keyA, keyB);
                    if(keyA < keyB) return 1;
                    if(keyA > keyB) return -1;
                    return 0;
                })
                // console.log("res", res);
                for(let r of res) {
                    let tx = {};
                    tx.blockNumber = r.BlockNumber;
                    tx.time = toDate(r.Timestamp);
                    tx.from = r.From.toString().substr(0,15) + '...';
                    tx.txId = r.Hash.toString().substr(0,15) + '...'
                    tx.hash = r.Hash.toString();
                    tx.to = r.To.toString().substr(0,15) + '...';
                    tx.fromAddress = r.From.toString();
                    tx.toAddress = r.To.toString();
                    tx.value = r.Value / 1e18 + ' ATN';
                    if(r.From.toString() == this.address) {
                        tx.tag = "warning";
                        tx.tagValue = "OUT"
                    }
                    else {
                        tx.tag = "success"
                        tx.tagValue = "IN"
                    }
                    this.transactionTable.push(tx);
                }
                // console.log(Date.now())
            })
            
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.$axios.$get("/transactions/list/10/" + ((parseInt(val) - 1) * 10) + "/account/" + this.address).then(res => {
                // console.log(res);
                this.transactionTable = [];
                for(let r of res) {
                    let tx = {};
                    tx.blockNumber = r.BlockNumber;
                    tx.time = toDate(r.Timestamp);
                    tx.from = r.From.toString().substr(0,15) + '...';
                    tx.txId = r.Hash.toString().substr(0,15) + '...'
                    tx.hash = r.Hash.toString();
                    tx.to = r.To.toString().substr(0,15) + '...';
                    tx.fromAddress = r.From.toString();
                    tx.toAddress = r.To.toString();
                    tx.value = r.Value / 1e18 + ' ATN';
                    if(r.From.toString() == this.address) {
                        tx.tag = "warning";
                        tx.tagValue = "OUT"
                    }
                    else {
                        tx.tag = "success"
                        tx.tagValue = "IN"
                    }
                    this.transactionTable.push(tx);
                }
                // console.log(Date.now())
            })

        },
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        search() {
            // console.log("search")
            // console.log("input", this.input)
            // console.log(this.$route.path);
            // this.$router.push('blocks/248703')
            this.$axios.$get("/search/" + this.input).then(res => {
                // console.log(res)
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