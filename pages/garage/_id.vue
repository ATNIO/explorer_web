<template>
<div>
    <Header/>
      
  <el-main class="main">
    <br><br>
      <div class="table">
        <div class="network-status">
            <div class="right-nav">
                <div class="search">
                    <el-input v-model="input" class="input" placeholder="Search" @keyup.enter.native="search"></el-input>
                    <i class="search-icon" v-on:click="this.search"></i>
                </div>
            </div><br><br>
            <div class="description">
                <p>车库详情</p>
            </div>
            <el-card class="table-card">
                <div slot="header" class="clearfix">
                    <!-- <img src="~/assets/address.png" class="address_image" /> -->
                    <span class="address">车库ID: {{ this.garageId }}</span>
                    <!-- <a href="#"><img src="~/assets/copy.png" class="copy_image" -->
                        <!-- v-clipboard:copy="this.serialNum" -->
                        <!-- v-clipboard:success="onCopy" -->
                        <!-- v-clipboard:error="onError"/></a> -->
                </div>
                <div class="table">
                        <div class="form">
                            <el-table
                                :data="leftTable"
                                :show-header="false"
                                class="left-table"
                                type="flex"
                                align="middle"
                                justify="space-between"
                                >
                            
                                <el-table-column
                                    prop="attribute"
                                    >
                                </el-table-column>

                                <el-table-column
                                    prop="value"
                                    label=""
                                    align="right"
                                    >
                                </el-table-column>
                                
                            </el-table>
                            <div class="common-right-table">
                                <el-table
                                    :data="rightTable"
                                    :show-header = false
                                    class="right-table"
                                    type="flex"
                                    align="middle"
                                    justify="space-between">
                                
                                        <el-table-column
                                            prop="attribute"
                                            label=""
                                            width="120"
                                            >
                                        </el-table-column>

                                        <el-table-column
                                            prop="value"
                                            label=""
                                            align="right"
                                            min-width="400"
                                            >
                                        </el-table-column>
                                </el-table>
                            </div>

                            <div class="mobile-right-table">
                                <el-table
                                :data="rightTable"
                                :show-header = false
                                class="right-table"
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
                                        align="left"
                                        >
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    <br><br><br>
                    <el-tabs v-model="activeName2"  type="border-card" @tab-click="handleClick" style="width: 100%;">
                        <el-tab-pane label="车位列表" name="first">
                        <el-table
                            :data="stallsStable"
                            style="width: 100%; "
                            :header-cell-style="{ 
                                padding:'0px',
                                textAlign:'center'
                            }"
                            :cell-style="{
                                textAlign:'center',
                                color:'#788091'
                            }">

                            <el-table-column
                                prop="Serial"
                                label="车位编号"
                                >
                            </el-table-column>
                                
                            <el-table-column
                                prop="StallId"
                                label="车位ID"
                                >
                                <template slot-scope="scope">
                                    <nuxt-link :to="'/stall/' + scope.row.StallId">{{ scope.row.StallId }}</nuxt-link>
                                </template>
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


    .tag {
        font-size: 14px;
    }

    .form {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 1100px;
        margin: 27px 60px 0 60px;

        .left-table {
            // width: 150px;
            margin-right: 50px;

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
            width: 300px;
            margin-left: 20px;

            // & /deep/ .el-table_2_column_3 {
            //     font-family: PingFangSC-Medium;
            //     font-size: 16px;
            //     color: #0D2138;
            // }

            // & /deep/ .el-table_2_column_4 {
            //     font-family: PingFangSC-Regular;
            //     font-size: 16px;
            //     color: #788091;
            //     text-align: right;
            // }
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

    & /deep/ .el-card__body{
        padding: 0;
        width: 1200px;
        height: 754px;
        flex: 1;
    }

    .el-card {
        margin-top: -55px;
    }
        

    & /deep/ .el-card__header {
        height: 93px;
        width: 1200px;
        background: #F4F6F9;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & /deep/ .el-tabs__content {
        height: 576px;
    }


    .clearfix {
        display: flex;
        // content: "";
        justify-content: center;
        align-items: center;
    }

    .address_image {
        width: 30px;
        height: 30px;
        margin-left: 56px;
    }

    .address {
        width: 100%;
        font-family: PingFangSC-Medium;
        font-size: 21px;
        color: #788091;
        // width: 100%;
        // width: 1000px;
        // margin-left: 46px;
        // margin-right: 16px;
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
        margin-top: 700px;
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
import { toDate, toTime } from '~/common/method.js'
import VueClipboard from 'vue-clipboard2';
import Vue from 'vue'

Vue.use(VueClipboard);

  export default {

    components: {
        Header,
        Footer
    },
    asyncData({ params }) {
        // console.log("params address", params.address)
        return { garageId: params.id }
    },

    created() {
    },
    mounted() {
        this.showData();
    },
    data() {
      return {
            garageId: 1,
            leftTable: [],
            rightTable: [],
            total: 0,
            currentPage: 1,
            pageSize: 8,
            activeName2: 'first',
            transactionTable: [],
            input: '',
            stallsStable:[],
      };
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        async showData() {
            this.$axios.$get("/garages/id/" + this.garageId).then(res => {
                console.log(res);
                let garage = res.garage;
                this.stallsStable = res.stalls;
                this.leftTable.push({attribute: "车库名称", value: garage.Name});
                this.rightTable.push({attribute: "车库地址", value: garage.Addr});
            })


        },
        handleCurrentChange(val) {
            this.$axios.$get("/transactions/list/" + this.pageSize + "/" + ((parseInt(val) - 1) * this.pageSize) + "/blocknumber/" + this.blockNumber).then(res => {
                for(let r of res) {
                    let tx = {};
                    // tx.txId = r.Hash.toString().substr(0,10) + '...';
                    tx.actor = '角色1';
                    tx.address = r.Hash.toString().substr(0,20) + '...';
                    // tx.time = toTime(r.Seconds);
                    // tx.from = r.From.toString().substr(0,10) + '...';
                    // tx.fromAddress = r.From.toString()
                    // tx.to = r.To.toString().substr(0,10) + '...';
                    // tx.toAddress = r.To.toString();
                    // tx.value = r.Value / 1e18 + ' ATN';
                    this.transactionTable.push(tx);
                }
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