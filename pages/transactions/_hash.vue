<template>
<div>
    <Header/>
  <el-main class="main">
      <div class="table">
        <div class="network-status">
            <div class="right-nav">
                <div class="search">
                    <el-input v-model="input" class="input" placeholder="Search" @keyup.enter.native="search"></el-input>
                    <i class="search-icon" v-on:click="this.search"></i>
                </div>
            </div><br><br>
            <div class="description">
                <p>Transaction Details</p>
            </div>
            <el-card class="table-card">
                <div slot="header" class="clearfix">
                    <img src="~/assets/address.png" class="address_image" />
                    <span class="address">Hash: {{ this.hash }}</span>
                    <a href="#"><img src="~/assets/copy.png" class="copy_image"
                        v-clipboard:copy="this.hash"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"/></a>
                </div>
                <div class="overview">
                    <el-tabs v-model="activeName2"  type="border-card" @tab-click="handleClick" style="width: 100%">
                        <el-tab-pane label="Overview" name="first">
                            <div class="panel">
                                <div class="content">
                                    <p>
                                        <span class="name">
                                            TxHash:
                                        </span>
                                        <span class="value">
                                            {{ this.hash }}
                                        </span>
                                    </p>
                                    <br/>
                                    <p>
                                        <span class="name">
                                            TxReceipt Status:
                                        </span>
                                        <template v-if="this.pending == 'true'">
                                            <span class="receipt-pending-true" ><i class="el-icon-loading"></i>&nbsp;{{ this.status }}</span><br/>
                                        </template>
                                        <template v-if="this.status == 'Success'">
                                            <span class="receipt-status-success">{{ this.status }}</span><br/>
                                        </template>
                                        <template v-if="this.status == 'Failed'">
                                            <span class="receipt-status-failed" >{{ this.status }}</span><br/>
                                        </template>
                                    </p>
                                    <br/>
                                    <p>
                                        <span class="name">
                                            Block Height:
                                        </span>
                                        <span class="value">
                                            <nuxt-link :to="'/blocks/' + this.blockHeight">{{ this.blockHeight }}</nuxt-link>
                                            &nbsp;{{ this.confirmations }}
                                        </span>
                                    </p>
                                    <br/>
                                    <p>
                                        <span class="name">
                                            TimeStamp:
                                        </span>
                                        <span class="value">
                                            {{ this.timeStamp }}
                                        </span>
                                    </p><br/>
                                    <p>
                                        <span class="name">
                                            From:
                                        </span>
                                        <span class="value">
                                            <nuxt-link :to="'/accounts/' + this.from">
                                                {{ this.from }}
                                            </nuxt-link>
                                        </span>
                                    </p><br/>
                                    <p>
                                        <span class="name">
                                            To:
                                        </span>
                                        <span class="value">
                                            <template v-if="this.isContract == 'true'" >
                                                <br/>
                                                <span>Contract
                                                    <nuxt-link :to="'/accounts/' + this.to">{{ this.to }}</nuxt-link>
                                                </span><br/>
                                            </template>
                                            <template v-if="this.isContract == 'false'">
                                                <span>
                                                    <nuxt-link :to="'/accounts/' + this.to">{{ this.to }}</nuxt-link>
                                                </span><br/>
                                            </template>
                                        </span>
                                        <br/>
                                        
                                    </p><br/>
                                    <p>
                                        <span class="name">
                                            Value:
                                        </span>
                                        <span class="value">
                                            {{ this.value }}
                                        </span>
                                    </p>
                                    <br/>
                                    <p>
                                        <span class="name">
                                            Gas Limit:
                                        </span>
                                        <span class="value">
                                            {{ this.gasLimit }}
                                        </span>
                                    </p>
                                    <br/>
                                    <p>
                                        <span class="name">
                                            Gas Used By Txn:
                                        </span>
                                        <span class="value">
                                            {{ this.gasUsedByTxn }}
                                        </span>
                                    </p>
                                    <br/>
                                    <p>
                                        <span class="name">
                                            Gas Price:
                                        </span>
                                        <span class="value">
                                            {{ this.gasPrice }}
                                        </span>
                                    </p>
                                    <br/>
                                    <p>
                                        <span class="name">
                                            Actual Tx Cost/Fee:
                                            </span>
                                        <span class="value">
                                            {{ this.actualTxCost }}
                                        </span>
                                    </p>
                                    <br/>
                                    <p>
                                        <span class="name">
                                            Nonce:
                                        </span>
                                        <span class="value">
                                            {{ this.nonce }}
                                        </span>
                                    </p>
                                    <br/>
                                    <div class="inputData">
                                        <span class="name">InputData:</span><br/>
                                        <div class="decodeHex">
                                            <div class="value">
                                                <el-input
                                                    type="textarea"
                                                    :rows="6"
                                                    placeholder="0x"
                                                    v-model="this.inputData"
                                                    :disabled="true"
                                                >
                                                </el-input>
                                            </div>
                                                <!-- <el-dropdown>
                                                <el-button plain type="info" class="viewButton">
                                                    View Input As<i class="el-icon-arrow-down el-icon--right"></i>
                                                </el-button>
                                                    <el-dropdown-menu slot="dropdown">
                                                        <el-dropdown-item>Default View</el-dropdown-item>
                                                        <el-dropdown-item>UTF-8</el-dropdown-item>
                                                        <el-dropdown-item>Original</el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </el-dropdown> -->
                                           
                                        </div>
                                    </div>
                                    <br/>
                                    <p></p><br/>
                                </div>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="Internal Transactions" name="second">
                            <el-table
                                :data="internalData"
                                style="width: 100%"
                                type="flex"
                                align="middle"
                                justify="center"
                                >
                                <el-table-column
                                    prop="type"
                                    label="Type"
                                    >
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
                                    prop="to"
                                    label="To"
                                    >
                                    <template slot-scope="scope">
                                        <nuxt-link :to="'/accounts/' + scope.row.toAddress">{{ scope.row.to }}</nuxt-link>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="value"
                                    label="Value">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
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


    .name {
        width: 300px;
        font-size: 15px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-family: Helvetica Neue;
    }
    .value {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 1000px;
        font-size: 15px;
        font-family: Helvetica Neue;
        span {
            font-size: 15px;
            font-family: Helvetica Neue;
        }
    }


    .inputData {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        width: 100%;
    }

    .decodeHex {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 898px;
    }

    .viewButton {
        width: 130px;
        height: 35px;
        font-size: 10px;
        text-align: center;
        color: #FFF;
        background-color: #95A5A6;
    }

    p {
        display: flex;
        flex-direction: row;
        align-items: center;
        // justify-content: flex-start;
        width: 100%;
        // height: 100%;
    }

    .panel{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        // height: 100%;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        // height: 100%;
        font-size: 15px;

    }

    .receipt-status-success {
        color:green;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 1000px;
        font-size: 15px;
    }

    .receipt-pending-true {
        color:#000;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 1000px;
        font-size: 15px;
    }

    .receipt-status-failed {
        color:red;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 1000px;
        font-size: 15px;
    }

    .tag {
        font-size: 14px;
    }

    span {
        font-size: 20px;
    }

    .description {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 64px;
        font-family: PingFangSC-Semibold;
        font-size: 36px;
        color: #FFFFFF;
    }

    & /deep/ .el-card__body{
        padding: 0;
        width: 1200px;
        height: 724px;
        flex: 1;
    }

    & /deep/ .el-card__header {
        height: 93px;
        width: 1200px;
        background: #F4F6F9;
        display: flex;
        align-items: center;
    }

    & /deep/ .el-tabs__content {
        height: 754px;
    }

    & /deep/ .el-textarea__inner {
        width: 898px;
    }

    .clearfix {
        display: flex;
        // content: "";
        justify-content: flex-start;
        align-items: center;
    }

    .address_image {
        width: 30px;
        height: 30px;
        margin-left: 56px;
    }

    .address {
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #788091;
        width: 1000px;
        margin-left: 16px;
        margin-right: 16px;
    }

    .copy_image {
        width: 27px;
        height: 27px;
    }
    
    .network-status {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1100px;
        position: absolute;
        top: 110px;
    }

    a {
        color: #74B8FB;
        text-decoration: none;
    }

    .el-footer {
        text-align: center;
        line-height: 60px;
        margin-top: 750px;
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
    .overview {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 1200px;
        // height: 754px;
    }

    @media screen and (max-width: 991px) {

        & /deep/ .el-card__body{
            padding: 0;
            width: 675px;
            height: 875px;
            flex: 1;
        }

        .el-main {
            display: none;
        }
        .address_image {
            width: 20px;
            height: 20px;
            // margin-left: 56px;
        }
        .address {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #788091;
            width: 500px;
            word-break: break-all;
        }
        & /deep/ .el-card__header {
            height: 93px;
            width: 100%;
            background: #F4F6F9;
            display: flex;
            align-items: center;
        }

        & /deep/ .el-tabs__content {
            height: 875px;
        }

        .inputData {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
        }

        & /deep/ .el-textarea__inner {
            width: 650px;
            height: 50px;
        }

        .table{
            //  background-color: #F7F7F9;
            //  background-color: rgb(3, 3, 205); 
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            // width: 100%;
        }

        .content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            width: 100%;
            // height: 800px;
            font-size: 15px;
            p {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
            }
          }

        .right-nav {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }

        .search {
            width: 644px;
            height: 40px;
            margin: 0 auto;
            position: relative;
            display: flex;
            align-items: center;

            .search-icon{
                width: 24px;
                height: 24px;
                background-image: url(~/assets/home-search-icon.png);
                position: absolute;
                right: 34px;
                top: 8px;
            }
            & /deep/ .el-input__inner{
                border-radius: 20px;
                width: 640px;
                text-align: center;
            }
        }

        .el-footer {
            // background-color: #00C8FF;
            text-align: center;
            line-height: 60px;
            margin-top: 1100px;
            width: 100%;
        }
        .status {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
            float: left;
        }
        
        .input {
            width: 200px;
        }
        .button {
            background: #00c8ff;
            color: #fff;
        }
        .description {
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #000;
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
        }
        .network-status {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 1200px;
            margin-top: -50px;
        }
        .main {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 100%;
        }
    }

    @media screen and (max-width: 591px) {
        & /deep/ .el-card__body{
            padding: 0;
            width: 375px;
            height: 875px;
            flex: 1;
        }

        .address_image {
            width: 20px;
            height: 20px;
            margin-left: -10px;
        }
        .address {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #788091;
            width: 260px;
            word-break: break-all;
        }
        & /deep/ .el-card__header {
            height: 93px;
            width: 375px;
            background: #F4F6F9;
            display: flex;
            align-items: center;
        }

        & /deep/ .el-textarea__inner {
            width: 320px;
            height: 50px;
        }
        
        .common-right-table {
            display: none;
        }
        
        .mobile-right-table {
            display: flex;
            width: 300px;
            align-items: center;
            justify-content: center;
        }

        .form {
            display: flex;
            flex-direction: column;
            width: 300px;
            align-items: center;
            justify-content: center;
            margin: 0 0 0 0;

            .left-table {
                width: 500px;
                margin-right: 0;

                // & /deep/ .el-table_1_column_1 {
                //     font-family: PingFangSC-Medium;
                //     font-size: 16px;
                //     color: #0D2138;
                // }

                // & /deep/ .el-table_1_column_2 {
                //     font-family: PingFangSC-Regular;
                //     font-size: 16px;
                //     color: #788091;
                //     text-align: right;
                // }
            }
            .right-table {
                width: 500px;
                margin-left: 0px;
                text-align: left;
            }
        }
        .table{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 400px;
        }
        .search {
            width: 250px;
            height: 40px;
            margin: 0 auto;
            position: relative;
            display: flex;
            align-items: center;

            .search-icon{
                width: 24px;
                height: 24px;
                background-image: url(~/assets/home-search-icon.png);
                position: absolute;
                right: 34px;
                top: 8px;
            }
            & /deep/ .el-input__inner{
                border-radius: 20px;
                width: 230px;
                text-align: center;
            }
        }

        .el-footer {
            // background-color: #00C8FF;
            text-align: center;
            line-height: 60px;
            margin-top: 1100px;
            width: 100%;
        }
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
            width: 200px;
        }
        .button {
            background: #00c8ff;
            color: #fff;
        }
        .description {
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: #000;
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
        }
        .network-status {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 1200px;
            margin-top: -50px;
        }
        .main {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
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
import { toDate, toDecimals } from '~/common/method.js'
const Web3 = require('web3')
import VueClipboard from 'vue-clipboard2';
import Vue from 'vue'
import { setInterval, clearInterval } from 'timers';
const bigInt = require("big-integer");

Vue.use(VueClipboard);

  export default {

    components: {
        Header,
        Footer
    },
    asyncData({ params }) {
        // console.log("params address", params.address)
        return { hash: params.hash }
    },

    created() {
        this.showData();
    },
    data() {
      return {
            hash: '',
            status: '',
            blockHeight: '',
            timeStamp: '',
            from: '',
            to: '',
            value: '',
            gasLimit: '',
            gasUsedByTxn: '',
            gasPrice: '',
            actualTxCost: '',
            nonce: '',
            inputData: '',
            activeName2: 'first',
            input: '',
            internalData: [],
            isContract: 'false',
            pending: 'false',
            confirmations: ''
      };
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        async showData() {
            
            await this.$axios.$get("/transactions/hash/" + this.hash).then(res => {
                console.log(res.BlockNumber)
                this.blockHeight = res.BlockNumber;
                let blockHeight = this.blockHeight;
                this.$axios.$get("/blocks/count").then(res => {
                    console.log("====", blockHeight, res.count)
                    let confirmations = res.count - blockHeight;
                    console.log("confirmations", confirmations)
                    if(confirmations > 1)
                        this.confirmations = "(" + confirmations + " block confirmations)";
                    else this.confirmations = "(" + confirmations + " block confirmation)";
                })
                this.timeStamp = toDate(res.Timestamp);
                this.from = res.From;
                this.to = res.To;
                this.$axios.$get("/accounts/address/" + this.to).then(res => {
                    // console.log("account details", res)
                    this.isContract = res.IsContract
                })
                this.value = res.Value / 1e18 + " ATN";
                this.gasLimit = res.Gas;
                this.gasUsedByTxn = res.GasUsed;
                this.gasPrice = toDecimals(res.GasPrice / 1e18) + " ATN";
                this.actualTxCost = toDecimals((parseFloat(bigInt(res.GasUsed)) * parseFloat(bigInt(res.GasPrice)) / 1e18)) + " ATN";
                this.nonce = res.Nonce;
                this.inputData = res.Input;
                // console.log("inputdata", Web3.utils.hexToUtf8(this.inputData))
                this.pending = res.Pending;
                if(res.Pending === 'true') {
                    this.status = "Pending...";
                    console.log("pending this.pending", this.pending)
                    let vm = this;
                    let interval = setInterval(async function() {
                        console.log("send vm.pending", vm.pending)
                        if(vm.pending == 'true') {
                            await vm.$axios.$get("/transactions/hash/" + vm.hash).then(res => {
                                vm.pending = res.Pending;
                            })
                        }
                        else {
                            console.log("res.Status", res.Status)
                            if(res.Status == "1") {
                                vm.status = "Success";
                            }
                            else vm.status = "Failed";
                            clearInterval(interval);
                        }
                    }, 5000)
                    
                }
                else {
                    this.pending = 'false';
                    if(res.Status == "1") {
                        this.status = "Success";
                    }
                    else this.status = "Failed";
                }
                
            })
            this.$axios.$get("/traces/hash/" + this.hash).then(res => {
                let trace = res.Trace;
                console.log(res)
                for(let t of trace) {
                    let data = {};
                    data.from = t.From.toString().substr(0,10) + '...';
                    data.fromAddress = t.From;
                    data.to = t.To.toString().substr(0,10) + '...';
                    data.toAddress = t.To;
                    data.input = t.Input;
                    data.value = t.Value;
                    data.type = t.Op;
                    this.internalData.push(data);
                }
            })
            .catch(error => {
                console.log("trace error", error)
            })
        },

        handleCurrentChange(val) {

        },
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        search() {
            // this.$router.push('blocks/248703')
            this.$axios.$get("/search/" + this.input).then(res => {
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
        onCopy() {
            alert("复制成功！");
        },
        onError() {
            // alert();
        },
    },
  }
</script>