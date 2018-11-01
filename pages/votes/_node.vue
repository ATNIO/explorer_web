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
                <p>Vote Details</p>
            </div>
            <el-card class="first-card">
                    <div slot="header" class="clearfix">
                        <span class="address">超级节点: <span class="node_address">{{ this.nodeAddress }}</span></span>
                        <a href="#"><img src="~/assets/copy.png" class="copy_image"
                            v-clipboard:copy="this.nodeAddress"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"/></a>
                    </div>
                    <div class="details_tag">
                      得分：<span class="details_value"> {{this.votes}}</span>
                    </div>
                    <div class="details_tag">
                      投票账户：<span class="details_value"> {{this.votingAccounts}}</span>
                    </div>
                    <div class="details_tag">
                      票数排名：<span class="details_value"> {{this.votingRank}}</span>
                    </div>
                    <div class="details_tag">
                      首次出块时间：<span class="details_value"> {{this.scores}}</span>
                    </div>
            </el-card>
            <br/>

            <el-card class="second-card">
                <p class="title">投票人</p>
                <el-table
                    :data="transactionTable"
                    :header-cell-style="{ 
                        background:'#F4F6F9',
                        padding:'0px',
                        textAlign:'center'
                    }"
                    :header-row-style="{
                        height:'36px',
                    }"
                    :cell-style="{
                        textAlign:'center',
                        height:'60px',                                                               
                        color:'#788091'
                    }"
                    empty-text=" "
                    v-loading="loading"
                    element-loading-text="Loading..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-customClass="loading"
                    >

                    <el-table-column
                        prop="number"
                        label="见证人"
                        >
                        <template slot-scope="scope">
                            <nuxt-link :to="'/accounts/' + scope.row.number">{{ scope.row.number }}</nuxt-link>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="time"
                        label="投票数"
                        >
                    </el-table-column>

                </el-table>
                <br>
                <div class="page">
                    <el-pagination
                        small
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size=this.pageSize
                        layout="total, prev, pager, next"
                        :total=this.total>
                    </el-pagination>
                </div>
                <!-- <div class="mobile-page">
                    <el-pagination
                        small
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size=this.pageSize
                        layout="prev, pager,next"
                        :total=this.total
                        >
                    </el-pagination>
                </div> -->
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

    .method-table {
        width: 930px;
        // margin-left: 60px;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        p{
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #0D2138;
        }
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
        justify-content: center;
        margin-bottom: 64px;
        font-family: PingFangSC-Semibold;
        font-size: 36px;
        color: #FFFFFF;
    }

    // & /deep/ .el-card__body{
    //     padding: 0;
    //     width: 1050px;
    //     height: 226px;
    //     flex: 1;
    //     border-radius: 5px;
    // }

    & /deep/ .el-card__header {
        height: 60px;
        width: 1050px;
        background: #FFF;
        display: flex;
        align-items: center;
        border: none;
    }

    .first-card{
        width: 1050px;
        height: 206pt;
        flex: 1;
        border-radius: 5px;
    }

    .second-card {
        width: 1050px;
        height: 1424px;
        flex: 1;
        border-radius: 5px;
    }

    .el-card {
        display: flex;
        margin-top: -55px;
        margin-bottom: 85px;
        flex-direction: column;
            .details_tag {
                display: flex;
                justify-content: flex-start;
                font-size: 14pt;
                color: #0D2138;
                font-family: PingFangSC;
                width: 100%;
                margin-bottom: 12px;
                margin-left: 15px;
                .details_value {
                    color: #788091;
                    font-size: 14pt;
                }
            }
        }

    .title{
        width:100px;
        height:28px;
        font-size:20px;
        font-family:PingFangSC-Regular;
        color:rgba(13,33,56,1);
        margin: auto auto 10px auto;
    }

    .title-small{
        width:53px;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        color:rgba(120,128,145,1);
        line-height:20px;
        margin-right: 30px;
      }

    .clearfix {
        display: flex;
        // content: "";
        justify-content: flex-start;
        align-items: center;
    }

    .address_image {
        width: 86px;
        height: 28px;
        margin-left: 30px;
    }

    .address {
        font-family: PingFangSC;
        font-size: 20px;
        color: #0D2138;
        margin-left: 16px;
        margin-right: 16px;
        .node_address {
          color: #74B8FB;
          margin-left: 15px;
        }
    }

    .copy_image {
        width: 27px;
        height: 27px;
        margin-top: 5px;
    }
    
    .network-status {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1050px;
        position: absolute;
        top: 110px;
    }

    .try-button {
        background: #74B8FB;
        box-shadow: 0 2px 9px 0 rgba(120,171,221,0.60);
        border-radius: 28px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        width: 363px;
        height: 56px;
    }

    a {
        color: #74B8FB;
        text-decoration: none;
    }

    .el-footer {
        text-align: center;
        line-height: 60px;
        margin-top: 800px;
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
    .common-right-table {
        display: flex;
        width: 550px;
    }
    
    .mobile-right-table {
        display: none;
    }
    @media screen and (max-width: 991px) {
        & /deep/ .el-card__body{
            padding: 0;
            width: 675px;
            height: 875px;
            flex: 1;
        }

        .method-table {
            width: 672px;
            // margin-left: 60px;
            min-height: 100px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            p{
                font-family: PingFangSC-Medium;
                font-size: 24px;
                color: #0D2138;
            }
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

        .common-right-table {
            display: flex;
            width: 500px;
        }
        
        .mobile-right-table {
            display: none;
        }

        .form {
            display: flex;
            flex-direction: column;
            width: 500px;
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
            }
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
            align-items: center;
            justify-content: center;
            width: 100%;
            color: #000;
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
            float: left;
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

        .method-table {
            width: 320px;
            // margin-left: 60px;
            min-height: 100px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            p{
                font-family: PingFangSC-Medium;
                font-size: 24px;
                color: #0D2138;
            }
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
            width: 350px;
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
                width: 330px;
                text-align: center;
            }
        }
        .try-button {
            background: #74B8FB;
            box-shadow: 0 2px 9px 0 rgba(120,171,221,0.60);
            border-radius: 28px;
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #FFFFFF;
            text-align: center;
            width: 300px;
            height: 56px;
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
            align-items: center;
            justify-content: center;
            width: 100%;
            color: #000;
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
            float: left;
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
import { toDate, toDecimals, toTime } from '~/common/method.js'
const Web3 = require('web3')
import VueClipboard from 'vue-clipboard2';
import Vue from 'vue'

Vue.use(VueClipboard);

  export default {

    components: {
        Header,
        Footer
    },
    asyncData({ params }) {
        console.log("params node", params.node)
        return { nodeAddress: params.node }
    },

    created() {
        this.showData();
    },
    data() {
        return {
                nodeAddress: "0xbea000b3b0ee446bb03d3ca223d552b88096f977",
                votes: "510,486,696,748,407,872.00 (2.204%)",
                votingAccounts: "10,186",
                votingRank: 1,
                scores: "2018-06-15 01:42:36",
                leftTable: [],
                rightTable: [],
                activeName2: 'first',
                methodTable: [],
                input: '', 
                isRegistered: 'false',
                marketUrl: 'https://market-test.atnio.net/detail/',
                transactionTable: [],
                pageSize: 21,
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        async showData() {
            this.$axios.$get("/transactions/list/" + this.pageSize).then(res => {
                let i = 1;
                for( let r of res ) {
                    let transaction = {};
                    transaction.number = r.BlockNumber;
                    transaction.time = toTime(r.Seconds);
                    transaction.txId = r.Hash.toString().substr(0,10) + '...';
                    transaction.hash = r.Hash.toString();
                    transaction.from = r.From.toString().substr(0,10) + '...';
                    transaction.to = r.To.toString().substr(0,10) + '...';
                    transaction.fromAddress = r.From.toString()
                    transaction.toAddress = r.To.toString()
                    let number = (r.Value / 1e18).toString();
                    // console.log('number', r.Value / 1e18)
                    if(number.includes("e+")) {
                        let array = number.split("e+");
                        array[0] = Math.floor(array[0] * 100) / 100;
                        number = array[0] + "e+" + array[1];
                    }
                    // console.log("number", number)
                    transaction.value = Math.floor(toDecimals(number) * 100) / 100 + " ATN";
                    this.transactionTable.push(transaction);
                }
                this.loading = false;
            })
            this.$axios.$get("/transactions/count").then(res => {
                this.total = res.count;
            })
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
            this.$notify({
                title: 'success',
                message: '复制成功！',
                type: 'success'
            });
        },
        onError() {
            // alert();
        },
      
    },
  }
</script>