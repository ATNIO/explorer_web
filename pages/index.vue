<template>
<div>
    <Header/>
      
    <el-main class="main">
        <div class="right-nav">
                    <el-input v-model="input" class="input" placeholder="Search"></el-input>
                    <el-button icon="el-icon-search" class="button" v-on:click="this.search">Search</el-button>
        </div><br><br>
        <div class="table">
            
            <div class="network-status">
            <p class="status">
                ATN Network Status
            </p>
            <div height="220px" class="header" >
                    <el-card shadow="hover">
                        <div class="grid-content" >
                            <div>
                                <img src="~/assets/blocks.png" class="icon">
                            </div>
                            <div>  
                                <p class="last-block">
                                BLOCK
                                </p>
                                <p class="last-block">
                                #{{latestBlockNumber}}
                                </p>
                            </div>
                        </div>
                    </el-card>

                    <el-card shadow="hover">
                    <div class="grid-content" >
                    <div>
                    <img src="~/assets/sandclock.png" class="icon">
                    </div>
                    <div>  
                    <p class="last-block">
                        LAST BLOCK
                    </p>
                    <!-- <p class="last-block">
                        BLOCK
                    </p> -->
                    <p class="last-block">
                    {{lastBlockTime}}
                    </p>
                    </div>
                    </div>
                    </el-card>
                    <el-card shadow="hover">
                    <div class="grid-content" >
                    <div>
                    <img src="~/assets/clock.png" class="icon">
                    </div>&nbsp;
                    <div>  
                    <p class="last-block">
                        BLOCK TIME
                    </p>
                    <!-- <p class="last-block">
                        TIME
                    </p> -->
                    <p  class="last-block">
                        {{blockTime}}S
                    </p>
                    </div>
                    </div>
                    </el-card>
                    <el-card shadow="hover">
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
                    </el-card>
            </div>
            </div>
        </div>

        <div height="50%" class="table">
            <div class="recent-blocks">
                <p class="status">
                    Recent Blocks
                </p>
            
                <el-table
                    :data="blockTable"
                    type="flex"
                    align="middle"
                    justify="center">

                    <el-table-column
                        prop="number"
                        label="Block"
                        width="150"
                        class="home-left-table">
                        <template slot-scope="scope">
                            <nuxt-link :to="'/blocks/' + scope.row.number">{{ scope.row.number }}</nuxt-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="txns"
                        label="TXns"
                        width="150"
                        class="home-left-table">
                    </el-table-column>
                    <el-table-column
                        prop="blockHash"
                        label="Hash"
                        width="220"
                        class="home-left-table">
                        <template slot-scope="scope">
                            <nuxt-link :to="'/blocks/' + scope.row.number">{{ scope.row.blockHash }}</nuxt-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        
            <div class="recent-blocks">
                <p class="status">
                    Recent Transactions
                </p>
                <el-table
                    :data="transactionTable"
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
            </div>
        </div>
    </el-main>

    <el-footer>
        <Footer/>
    </el-footer>
</div>
</template>

<style scoped lang="less">
a {
  color: #74b8fb;
  text-decoration: none;
}

.recent-blocks {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 48px;
}

.right-nav {
  display: none;
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
  margin-bottom: 16px;
  font-family: "Helvetica Neue", Helvetica;
  font-size: 30px;
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // margin-left: 8%;
  padding-top: 64px;
}

.last-block {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  line-height: 1.5;

  &:last-of-type {
    color: rgb(68, 68, 68);
  }
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
  justify-content: flex-start;
  font-family: "Helvetica Neue", Helvetica;
  color: #757589;
  font-size: 22px;
  padding-left: 16px;
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
  margin-right: 16px;
}

.card {
  padding: 0px;
  width: 280px;
  height: 180px;
}

.header {
  //  background-color: #F7F7F9;
  //  background-color: rgb(3, 3, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 32px;

  & /deep/ .el-card {
    width: 300px;
    margin: 8px;
  }
}

.table {
  //  background-color: #F7F7F9;
  //  background-color: rgb(3, 3, 255);
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 128px;
}

.el-footer {
  // background-color: #00C8FF;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
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

@media screen and (max-width: 1174px) {
  .header /deep/ .el-card {
    flex: 0 1 48%;
  }

  .table {
    flex-wrap: wrap;

    .recent-blocks {
      flex: 100%;
    }

    & /deep/ .el-table {
      width: 100%;
    }
  }
}

@media screen and (max-width: 991px) {
  .header /deep/ .el-card {
    flex: 1 1 100%;
  }

  .table {
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 64px;
  }

  .row {
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
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #fff;
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
  @media screen and (max-width: 991px) {
    .row {
      flex-direction: column;
      align-items: center;
      margin-top: 200px;
    }
    .icon {
      margin: 10px 0;
      margin-right: 50px;
    }
    .home-blocks {
      flex-direction: column;
      top: 150px;
    }
    .status {
      margin: 0 auto;
    }
    .home-left-table {
      width: 230px;
    }
    .right-nav {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      display: flex;
    }
    .input {
      width: 200px;
    }
    .button {
      background: #00c8ff;
      color: #fff;
    }
  }
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
            // this.$axios.$get("https://api.coinmarketcap.com/v1/ticker/atn/").then(res => {
            //     this.atnPrice = res[0].price_usd;
            // })
            this.atnPrice = 0.233416
        },
        // cancelAutoUpdate: function() { clearInterval(this.timer) },
        
        },
        // beforeDestroy() {
        //   clearInterval(this.timer)
        // }

    }
</script>