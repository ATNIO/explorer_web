<template>
<div>
    <Header/>
      
    <el-main class="main">
        <br><br>
        <div class="table">

            <div class="network-status">
            <p class="status">
                ATN Network Status
            </p>
            <br>
            <el-header height="220px" class="header" >
                <el-row
                class="row"
                type="flex"
                align="middle"
                justify="center"
                >
                <el-col :span="6">
                    <div class="grid-content" >
                    <div>
                        <img src="~/assets/blocks.png" class="icon">
                    </div>
                    <div>  
                        <p>
                        BLOCK
                        </p>
                        <p >
                        #{{latestBlockNumber}}
                        </p>
                    </div>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="grid-content" >
                    <div>
                    <img src="~/assets/sandclock.png" class="icon">
                    </div>
                    <div>  
                    <p class="last-block">
                        LAST
                    </p>
                    <p class="last-block">
                        BLOCK
                    </p>
                    <p class="last-block">
                    {{lastBlockTime}}
                    </p>
                    </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content" >
                    <div>
                    <img src="~/assets/clock.png" class="icon">
                    </div>&nbsp;
                    <div>  
                    <p class="last-block">
                        BLOCK
                    </p>
                    <p class="last-block">
                        TIME
                    </p>
                    <p >
                        {{blockTime}}S
                    </p>
                    </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content" >
                    <div>
                    <img src="~/assets/dollar.png" class="icon">
                    </div>
                    <div>  
                    <p class="last-block">
                        USD/ATN
                    </p>
                    
                    <p class="last-block">
                        {{atnPrice}}
                    </p>
                    </div>
                    </div>
                </el-col>
                </el-row>
            </el-header>
            </div>
        </div>

        <br> <br> <br> <br> <br>

        <el-header height="50%" class="table">
        <el-row
            type="flex"
            align="middle"
            justify="center"
        >
            <div class="recent-blocks" style="margin-left: 10%">
            <p class="status">
                Recent Blocks
            </p>
            <br>
            <el-col >
                <el-table
                :data="blockTable"
                style="width: 90%;"
                type="flex"
                align="middle"
                justify="center">

                <el-table-column
                    prop="number"
                    label="Block"
                    width="150">
                    <template slot-scope="scope">
                        <nuxt-link :to="'/blocks/' + scope.row.number">{{ scope.row.number }}</nuxt-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="txns"
                    label="TXns"
                    width="150"
                    >
                </el-table-column>
                <el-table-column
                    prop="blockHash"
                    label="Hash"
                    width="220"
                    >
                    <template slot-scope="scope">
                        <nuxt-link :to="'/blocks/' + scope.row.number">{{ scope.row.blockHash }}</nuxt-link>
                    </template>
                </el-table-column>
                </el-table>
            </el-col>
            </div>

            <div class="recent-blocks">
            <p class="status">
                Recent Transactions
            </p>
            <br>
            <el-col >
                <el-table
                :data="transactionTable"
                style="width: 100%"
                type="flex"
                align="middle"
                justify="center">

                <el-table-column
                    prop="txId"
                    label="Hash"
                    width="180">
                    <template slot-scope="scope">
                        <nuxt-link :to="'/transactions/' + scope.row.hash">{{ scope.row.txId }}</nuxt-link>
                    </template>
                </el-table-column>
                    
                <el-table-column
                    prop="from"
                    label="From"
                    width="180">
                    <template slot-scope="scope">
                        <nuxt-link :to="'/accounts/' + scope.row.fromAddress">{{ scope.row.from }}</nuxt-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="to"
                    label="To"
                    width="180"
                    >
                    <template slot-scope="scope">
                        <nuxt-link :to="'/accounts/' + scope.row.toAddress">{{ scope.row.to }}</nuxt-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="Value"
                    width="150"
                    >
                </el-table-column>
                </el-table>
            </el-col>
            </div>

        </el-row>
        </el-header>
    </el-main>
    <br><br><br>
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

    .recent-blocks {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
    }

    .network-status {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        // margin-right: 5%;
    }

    .status {
        font-family:  "Helvetica Neue",Helvetica;
        font-size: 30px;
    }

    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // margin-left: 8%;
    }

    .last-block {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .row {
        width: 1300px;
    }

    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family:  "Helvetica Neue",Helvetica;
        color: #757589;
        font-size: 22px;
    }

    .block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .icon {
        width: 80px;
        height: 80px;
    }

    .card {
        padding: 0px;
        width: 280px;
        height: 180px;
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
import { toDecimals } from '~/common/method.js'
// import * as axios from '../static/js/axios.js'
// import api from '../static/js/api.js'

    export default {

        // async asyncData({ app }) {
        // let data = await app.$axios.get('/block/getBlocks')
        // console.log(data)
        // let blocks = await api.getBlocks();
        // let blockTable = [];
        // for(let block of blocks) {
        //   let temp = {}
        //   temp.blockNumber = block.Number;
        //   temp.txns = block.Txns;
        //   temp.hash = block.Hash;
        //   blockTable.push(temp);
        // }
        // this.blockTable = blockTable
        // },
        components: {
            Header,
            Footer
        },
        created() {
            this.showData();
            // this.timer = setInterval(this.showBlocks, 5000)
        },
        data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            input: '',
            latestBlockNumber: '',
            lastBlockTime: '',
            blockTime: '5.000',
            atnPrice: '',
            blockTable: [],
            transactionTable: [],
            // timer: '',
        };
        },
        methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        async showData() {
            await this.$axios.$get("/blocks/list/5").then(res => {
            // console.log(res);

            var date = new Date(res[0].Timestamp*1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            this.latestBlockNumber = res[0].Number;
            this.lastBlockTime = formattedTime;


            for( let r of res ) {
                let block = {};
                block.number = r.Number;
                block.txns = r.Txns;
                block.blockHash = r.Hash.toString().substr(0,9) + '...';
                console.log(block.blockHash)
                this.blockTable.push(block);
            }
            })
            await this.$axios.$get("/transactions/list/5").then(res => {
            for( let r of res ) {
                let transaction = {};
                transaction.txId = r.Hash.toString().substr(0,9) + '...';
                transaction.hash = r.Hash.toString();
                transaction.from = r.From.toString().substr(0,9) + '...';
                transaction.fromAddress = r.From.toString();
                transaction.to = r.To.toString().substr(0,9) + '...';
                transaction.toAddress = r.To.toString();
                transaction.value = toDecimals(r.Value / 1e18) + " ATN";
                this.transactionTable.push(transaction);
            }
            }),
            this.$axios.$get("https://api.coinmarketcap.com/v1/ticker/atn/").then(res => {
                this.atnPrice = res[0].price_usd;
            })
        },
        // cancelAutoUpdate: function() { clearInterval(this.timer) },
        
        },
        // beforeDestroy() {
        //   clearInterval(this.timer)
        // }

    }
</script>