<template>
<div>
    <Header/>
      
  <el-main class="main">
    <!-- <br><br>
        <div class="right-nav">
            <el-input v-model="input" class="input" placeholder="Search Address / Tx / Block / Dbot"></el-input>
            <el-button icon="el-icon-search" class="button" v-on:click="this.search">Search</el-button>
        </div><br><br> -->
      <div class="table">
        <div class="network-status">
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
                    color:'#788091'
                }">

                    <el-table-column
                        prop="name"
                        label="Name"
                        min-width="100">
                        <template slot-scope="scope">
                            <nuxt-link :to="'/dbots/' + scope.row.dbotAddress">{{ scope.row.name }}</nuxt-link>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="domain"
                        label="Domain"
                        min-width="100">
                    </el-table-column>

                    <el-table-column
                        prop="address"
                        label="Address"
                        min-width="100">
                        <template slot-scope="scope">
                            <nuxt-link :to="'/dbots/' + scope.row.dbotAddress">{{ scope.row.address }}</nuxt-link>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="txzhash"
                        label="TxzHash"
                        min-width="100">
                    </el-table-column>
                </el-table>
                <el-pagination
                    small
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size=this.pageSize
                    layout="total, prev, pager, next"
                    :total=this.total>
                </el-pagination>
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
        margin-top: 600px;
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
        .status {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
            float: left;
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
            pageSize: 10,
            input: '',
      };
    },
    methods: {
        handleSelect(key, keyPath) {
        },
        showData() {
            this.$axios.$get("/dbots/allList/10/0").then(res => {
                for( let r of res ) {
                    let dbot = {};
                    dbot.name = Web3.utils.hexToAscii(r.Name).toString();
                    dbot.domain = Web3.utils.hexToAscii(r.Domain).toString();
                    dbot.address = r.Address.toString().substr(0,20) + '...';
                    dbot.dbotAddress = r.Address.toString();
                    this.dbotTable.push(dbot);
                }
            })
            this.$axios.$get("/dbots/count").then(res => {
                this.total = res.count;
            })
        },
        handleCurrentChange(val) {
            this.$axios.$get("/dbots/allList/10/" + ((parseInt(val) - 1) * 15)).then(res => {
                this.dbotTable = [];
                for( let r of res ) {
                    let dbot = {};
                    dbot.name = Web3.utils.hexToAscii(r.Name).toString();
                    dbot.domain = Web3.utils.hexToAscii(r.Domain).toString();
                    dbot.address = r.Address.toString().substr(0,20) + '...';
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