<template>
<div class="body">
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
                <p>ATN Dbots</p>
            </div>
            <el-card class="table-card">
                <el-table
                :data="dbotTable"
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
                    color:'#788091',
                    fontFamily: 'PingFangSC-Regular',
                }"
                empty-text=" "
                v-loading="loading"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-customClass="loading"
                >

                    <el-table-column
                        prop="name"
                        label="Name"
                        min-width="120">
                        <template slot-scope="scope">
                            <nuxt-link :to="'/dbots/' + scope.row.dbotAddress">{{ scope.row.name }}</nuxt-link>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="domain"
                        label="Domain"
                        min-width="120"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="address"
                        label="Address"
                        min-width="120">
                        <template slot-scope="scope">
                            <nuxt-link :to="'/dbots/' + scope.row.dbotAddress">{{ scope.row.address }}</nuxt-link>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="txId"
                        label="TxHash"
                        min-width="120">
                        <template slot-scope="scope">
                            <nuxt-link :to="'/transactions/' + scope.row.txHash">{{ scope.row.txId }}</nuxt-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="isRegistered"
                        label="IsRegistered"
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
                <div class="mobile-page">
                    <el-pagination
                        small
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size=this.pageSize
                        layout="prev, pager,next"
                        :total=this.total
                        :pager-count=3
                        >
                    </el-pagination>
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

    .body {
        background-color: #F5F7FA;
        height: 1275px;
    }

    a {
        color: #74B8FB;
        text-decoration: none;
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
    
    
    .network-status {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1050px;
        position: absolute;
        top: 110px;
    }

    & /deep/ .el-card__body{
        padding: 0;
        width: 1050px;
        height: 754px;
        flex: 1;
    }

    .el-card {
        margin-top: -55px;
    }

    .loading {
        width: 100%;
        height: 754px;
    }

    & /deep/ .el-table__empty-block {
        height: 754px;
        background-color: #fff;
        color: #fff;
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

    .el-footer {
        text-align: center;
        line-height: 60px;
        margin-top: 680px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        color: #333;
        text-align: center;
    }

    .el-pagination {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #5E6062;
        margin-top: -10px;
    }

    .right-nav {
        display: none;
    }
    .mobile-page {
        display: none;
    }
    @media screen and (max-width: 991px) {
        & /deep/ .el-card__body{
            padding: 0;
            width: 450px;
            height: 880px;
            flex: 1;
        }
        .search {
            width: 425px;
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
                width: 400px;
                text-align: center;
            }
        }

        .el-footer {
            // background-color: #00C8FF;
            text-align: center;
            line-height: 60px;
            margin-top: 1000px;
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
        .mobile-page {
            display: inline;
        }
        .page {
            display: none;
        }
        & /deep/ .el-card__body{
            padding: 0;
            width: 400px;
            height: 880px;
            flex: 1;
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
            margin-top: 1000px;
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
const Web3 = require('web3')


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
            dbotTable: [],
            total: 0,
            currentPage: 1,
            pageSize: 11,
            input: '',
            loading: true,
      };
    },
    methods: {
        handleSelect(key, keyPath) {
        },
        showData() {
            this.$axios.$get("/dbots/allList/" + this.pageSize + "/0").then(res => {
                for( let r of res ) {
                    let dbot = {};
                    dbot.name = Web3.utils.hexToUtf8(r.Name).toString();
                    dbot.domain = Web3.utils.hexToUtf8(r.Domain).toString();
                    dbot.address = r.Address.toString().substr(0,20) + '...';
                    dbot.dbotAddress = r.Address.toString();
                    dbot.txId = r.TxHash.toString().substr(0,20) + '...';
                    dbot.txHash = r.TxHash.toString();
                    dbot.isRegistered = r.IsRegistered;
                    this.dbotTable.push(dbot);
                }
                this.loading = false;
            })
            this.$axios.$get("/dbots/count").then(res => {
                this.total = res.count;
            })
        },
        handleCurrentChange(val) {
            this.$axios.$get("/dbots/allList/" + this.pageSize + "/" + ((parseInt(val) - 1) * this.pageSize)).then(res => {
                this.dbotTable = [];
                console.log("res",res)
                for( let r of res ) {
                    let dbot = {};
                    dbot.name = Web3.utils.hexToUtf8(r.Name).toString();
                    dbot.domain = Web3.utils.hexToUtf8(r.Domain).toString();
                    dbot.address = r.Address.toString().substr(0,20) + '...';
                    dbot.dbotAddress = r.Address.toString();
                    dbot.txId = r.TxHash.toString().substr(0,20) + '...';
                    dbot.txHash = r.TxHash.toString();
                    dbot.isRegistered = r.IsRegistered;
                    this.dbotTable.push(dbot);
                }
            })
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
      
    },
  }
</script>