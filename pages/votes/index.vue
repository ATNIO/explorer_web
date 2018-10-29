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
                <p>Vote</p>
            </div>
            <el-card class="table-card">
              <div>
                <p class="title">超级节点</p>

                  <span class="title-small green-circle">Top 21</span>
                  <span class="title-small orange-circle">Standby</span>
                  <span class="title-small total">总计:</span><span class="title-small">467 个</span>
                
              </div>
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
                        label="排名"
                        width="80"
                        >
                        <template slot-scope="scope">
                            <div class="rank">
                                <div slot="reference" >
                                    <el-tag size="medium">{{ scope.row.number }}</el-tag>
                                </div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="rankChange"
                        label=""
                        width="50"
                        >
                        
                        <template slot-scope="scope">
                            <template v-if="scope.row.rankIncrease == false" >
                                <i class="el-icon-upload2 green-icon" ></i>
                                <span class="green-rank-change">{{ scope.row.rankChange }}</span>
                            </template>
                            <template v-if="scope.row.rankIncrease == true" >
                                <i class="el-icon-download red-icon" ></i>
                                <span class="red-rank-change">{{ scope.row.rankChange }}</span>
                            </template>
                        </template>
                    </el-table-column >

                    <el-table-column
                        prop="time"
                        label="名称"
                        >
                        <template slot-scope="scope" class="name-template">
                            <svg width="25" height="25" data-jdenticon-value="icon value"></svg>
                            <nuxt-link :to="'/votes/' + scope.row.hash">{{ scope.row.txId }}</nuxt-link>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="txId"
                        label="得票率"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="from"
                        label="投票账户数"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="to"
                        label="已生产区块数"
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
                        >
                    </el-pagination>
                </div>
            </el-card>

            <el-card class="table-card">
              <div>
                <p class="title">活跃见证人</p> 
              </div>
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
                        label="最近确认"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="txId"
                        label="当前周期出块数量"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="from"
                        label="总票数"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="to"
                        label="时间"
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
        height: 3515px;
        position: relative;
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

    & /deep/ .el-card__body{
        padding: 0;
        width: 950px;
        height: 1508px;
        flex: 1;
        margin: 20px 50px;
    }
     & /deep/ .el-table--fit{
       margin-top: 20px;
     }

    .table-card{
      margin-top: 20px;
    }

    .el-card {
        margin-top: -55px;
        margin-bottom: 85px;
    }
    .title {
      width:100px;
      height:28px;
      font-size:20px;
      font-family:PingFangSC-Regular;
      color:rgba(13,33,56,1);
      margin: 30px auto 0px;
    }


    & /deep/ .el-tag--medium {
        width: 36px;
        // height: 20px;
        background: #EEF9F4;
        border-radius: 9.5px;
        opacity: 1;
        display: inline-block;
        border: none;
        color: #44C58E;
        font-size: 13px;
    }

    .name-template {
        display: flex;
        flex-direction: row;
        align-items: space-around;
    }

    .green-icon {
        margin-left: -20px;
        color: #00D555;
        width: 6.2px;
        height: 8.2px;
    }

    .red-icon {
        margin-left: -20px;
        color: #F13A30;
        width: 6.2px;
        height: 8.2px;
    }

    .green-rank-change {
        color: #00D555;
        font-size: 1px;
        margin-left: 15px;
    }

    .red-rank-change {
        color: #F13A30;
        font-size: 1px;
        margin-left: 15px;
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
    .total{
        margin-right: 5px !important;
    }
    
    .green-circle:before {
        content: "";
        display: inline-block;
        width:8px;
        height:8px;
        background:rgba(68,197,142,1);
        border-radius: 100%;
        margin-right: 10px;
    }
    .orange-circle:before{
        content: "";
        display: inline-block;
        width:8px;
        height:8px;
        background:rgba(255,149,0,1);
        border-radius: 100%;
        margin-right: 10px;
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

    .network-status {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1050px;
        position: absolute;
        top: 110px;
    }

    .status {
        font-family:  "Helvetica Neue",Helvetica;
        font-size: 30px;
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
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 35px;

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
    .right-nav {
        display: none;
    }
    .mobile-page {
        display: none;
    }

    @media screen and (max-width: 991px) {
       .body {
        background-color: #F5F7FA;
        height: 2300px;
        position: relative;
    }
        & /deep/ .el-card__body{
            padding: 0;
            width: 750px;
            height: 800px;
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
            height: 900px;
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
            margin-top: 1050px;
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
import { toDate, toDecimals, toTime } from '~/common/method.js'

  export default {

    components: {
        Header,
        Footer
    },
    head: {
        script: [
            { src: "https://cdn.jsdelivr.net/npm/jdenticon@2.1.0" },
        ],
        link: [
            { rel: 'sylesheet', href: '~assets/icon/iconfont.css' },
        ]
    },
    created() {
        this.showData();
    },
    data() {
      return {
            transactionTable: [],
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
            this.$axios.$get("/transactions/list/" + this.pageSize).then(res => {
                let i = 1;
                for( let r of res ) {
                    let transaction = {};
                    transaction.number = i;
                    i++;
                    if(i % 3 == 0) {
                        transaction.rankIncrease = true;
                        transaction.rankChange = 2;
                    }
                    else if(i % 4 == 0) {
                        transaction.rankIncrease = false;
                        transaction.rankChange = 1;
                    }
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
        handleCurrentChange(val) {
            this.$axios.$get("/transactions/list/" + this.pageSize + "/" + ((parseInt(val) - 1) * this.pageSize)).then(res => {
                this.transactionTable = [];
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
                    // let tempValue = Math.floor(r.Value / 1e18 * 100) / 100 + ' ATN';
                    // if(tempValue.includes('e')) {
                    //     tempValue = tempValue.substr(0, 5) + tempValue.substr(tempValue.length - 10, tempValue.length);
                    //     // console.log("tempValue", tempValue)
                    // }
                    // transaction.value = tempValue;
                    this.transactionTable.push(transaction);
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