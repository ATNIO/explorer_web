<template>
<div>
    <div class="body">
        <Header/>      
        <el-main class="main">
            <div class="right-nav">
                <div class="search">
                    <el-input v-model="input" class="input" placeholder="Search"></el-input>
                    <i class="search-icon" v-on:click="this.search"></i>
                </div>
            </div><br><br>
            <div class="table">
                <div class="network-status">
                    <div class="header" >
                        <el-card>
                            <div class="grid-content" >
                                <div>  
                                    <p class="last-block">
                                    {{ $t('home.block' )}}
                                    </p>
                                    <transition name="fade">
                                        <p v-show="update" class="last-block1">
                                        {{latestBlockNumber}}
                                        </p>
                                    </transition>
                                </div>
                                <div>
                                    <img src="~/assets/home-block-icon.png" class="icon">
                                </div>
                            </div>
                        </el-card>
                        <el-card>
                        <div class="grid-content" >
                                <div>  
                                    <p class="last-block">
                                        {{ $t('home.last_block' )}}
                                    </p>
                                    <transition name="fade">
                                        <p v-show="update" class="last-block1">
                                            {{lastBlockTime}}
                                        </p>
                                    </transition>
                                </div>
                                <div>
                                    <img src="~/assets/home-last block-icon.png" class="icon">
                                </div>
                            </div>
                        </el-card>
                        <el-card>
                            <div class="grid-content" >
                                <div>  
                                    <p class="last-block">
                                        {{ $t('home.block_time' )}}
                                    </p>
                                    <p  class="last-block1">
                                        {{blockTime}}S
                                    </p>
                                </div>
                                <div>
                                    <img src="~/assets/atn-icon.png" class="icon">
                                </div>
                            </div>
                        </el-card>
                        <!-- shadow="hover"-->
                        <el-card>
                            <div class="grid-content" >
                                <div>  
                                    <p class="last-block">
                                        {{ $t('home.usd_atn' )}}
                                    </p>
                                    <p class="last-block1">
                                        {{atnPrice}}
                                    </p>
                                </div>
                                <div>
                                    <img src="~/assets/home-block time-icon.png" class="icon">
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>

            <div class="table2">
                <div class="wrapper-blocks">
                    <div class="left-wrapper">
                        <div class="typeface">{{ $t('home.recent_blocks') }}</div>
                        <el-card class="box-card blocks">
                            <el-table
                            v-loading="loading1"
                            element-loading-text="Loading..."
                            element-loading-spinner="el-icon-loading"
                            :data="blockTable"
                            empty-text="Loading..."
                            :header-cell-style="{ 
                                background:'#51B3FA',
                                padding:'0px', 
                                textAlign:'center',   
                                color: '#fff',                        
                            }"
                            :header-row-style="{
                                height:'36px'
                            }"
                            :cell-style="{
                                textAlign:'center',
                                height:'60px', 
                                color:'#788091',
                                fontFamily: 'PingFangSC-Regular',
                            }"
                            :row-class-name="tableRowClassName"
                            >
                                <el-table-column
                                    prop="number"
                                    :label="this.$t('blockTable.block')"
                                    class="home-left-table"
                                    width="90px"
                                    >
                                    <template slot-scope="scope">
                                        <nuxt-link :to="'/blocks/' + scope.row.number">{{ scope.row.number }}</nuxt-link>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="time"
                                    :label="this.$t('blockTable.time')"
                                    class="home-left-table"
                                    width="110"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="txns"
                                    :label="this.$t('blockTable.txns')"
                                    class="home-left-table"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="blockHash"
                                    :label="this.$t('blockTable.blockHash')"
                                    class="home-left-table"
                                    width="120px">
                                    <template slot-scope="scope">
                                        <nuxt-link :to="'/blocks/' + scope.row.number">{{ scope.row.blockHash }}</nuxt-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>

                    <div class="right-wrapper">
                        <div class="typeface">{{ $t('home.recent_transactions' )}}</div>
                        <el-card class="box-card transactions">
                            <!-- <transition-group name="list" tag="p"> -->
                                <el-table
                                    :data="transactionTable"
                                    :header-cell-style="{ 
                                        background:'#51B3FA',
                                        padding:'0px',
                                        textAlign:'center',
                                        color: '#fff',
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
                                    v-loading="loading2"
                                    element-loading-text="Loading..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-customClass="loading"
                                    empty-text="Loading..."
                                    >

                                    <el-table-column
                                        prop="txId"
                                        :label="this.$t('transactionTable.txHash')">
                                        <template slot-scope="scope">
                                            <nuxt-link :to="'/transactions/' + scope.row.hash">{{ scope.row.txId }}</nuxt-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="time"
                                        :label="this.$t('transactionTable.time')"
                                        width="110">
                                    </el-table-column>    
                                    <el-table-column
                                        prop="from"
                                        :label="this.$t('transactionTable.from')">
                                        <template slot-scope="scope">
                                            <nuxt-link :to="'/accounts/' + scope.row.fromAddress">{{ scope.row.from }}</nuxt-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="to"
                                        :label="this.$t('transactionTable.to')"
                                        >
                                        <template slot-scope="scope">
                                            <nuxt-link :to="'/accounts/' + scope.row.toAddress">{{ scope.row.to }}</nuxt-link>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="value"
                                        :label="this.$t('transactionTable.value')"
                                        >
                                    </el-table-column>
                                </el-table>
                            <!-- </transition-group> -->
                        </el-card>
                    </div>

                </div>
            </div>
        </el-main>
        
        <el-footer>
            <Footer/>
        </el-footer>
    </div>
</div>
</template>

<style scoped lang="less">

.body {
    background-color: #F5F7FA;
    height: 1275px;
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .table {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 64px;
  }

  .table2 {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 128px;
  }
}

.network-status {
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 230px;

    .header {
        display: flex;
        width: 1050px;
        justify-content: space-between;

         & /deep/ .el-card__body {
            padding: 0;
            width: 244px;
            height: 106px;
            flex: 1;
        }


        .grid-content {
            border-radius: 5px;
            display: flex;
            font-size: 22px;
            width: 244px;
            height: 106px;
            position: relative;
            box-shadow: 0 2px 6px 5px rgba(47,83,151,0.04);
            background: #FFFFFF;
            border-radius: 5px;
        }

        .last-block {
            height: 20px;
            line-height: 1.5;
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            color: #000000;
            float: left;
            position: absolute;
            top: 17px;
            left: 19px;
        }
        .last-block1{
            font-family: PingFangSC-Light;
            font-size: 28px;
            color: #00C7FB;
            float: left;
            position: absolute;
            top: 44px;
            left: 19px; 
        }

        .fade-enter {
            opacity: 0.5;
        }
        .fade-enter-active {
            transition: opacity .1s;
        }
        .fade-enter-to {
            opacity: 0.5;
        }
        .fade-leave {
            opacity: 0.2;
        }
        .fade-leave-active {
            transition: opacity .1s;
        }
        .fade-leave-to {
            opacity: 0.5;
        }

        .icon {
            width: 74px;
            height: 78px;
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
}


.wrapper-blocks{
    width: 1050px;
    display: flex;
    justify-content: space-between;

    //公共的写最上面了
    .typeface{  
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #0D2138;
        text-align: left;
    }
    a{
        color: #74B8FB ;
        font-size: 16px;
        text-decoration: none;
        font-family: PingFangSC-Regular;
        // white-space: nowrap; 
        // overflow:hidden;
    }
    & /deep/ .el-card__body{
        padding: 0;
    }

    .left-wrapper{
        .blocks{
            width: 396px;
            height: 518px;
        }
    }
    .right-wrapper{
        .transactions{
            width: 630px;
            height: 518px;

        }
    }  
}

& /deep/ .el-main{
    padding: 0;
}

.loading {
    width: 100%;
    height: 518px;
}

// & /deep/ .el-table__empty-block {
//     height: 518px;
//     background-color: #fff;
//     color: #fff;
// }

.el-footer {
  text-align: center;
  line-height: 60px;
  margin-top: -100px;
}
.right-nav{
    display: none;
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
    .recent-blocks{
        width: 100px;
    }
    // .header /deep/ .el-card {
    //     flex: 1 1 100%;
    //     background-color: #fff;
    // }
    .right-nav {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 50px;
        .search{
            width: 306px;
            height: 36px;
            position: relative;
            
            .search-icon{
                width: 20px;
                height: 20px;
                background-image: url(../assets/home-search-icon.png);
                position: absolute;
                right: 16px;
                bottom: 9px;
            }
            & /deep/ .el-input__inner{
                border-radius: 20px;
            }
        }
    }
    .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 550px;
    }
    .button {
      background: #00c8ff;
      color: #fff;
    }
    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .table {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            // width: 100%;
            margin-bottom: 64px;
            height: 580px;
        }
        .table2 {
            display: flex;
            justify-content: space-around;
            width: 100%;
            margin-bottom: 128px;
        }
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        // height: 100%;
    }

    .wrapper-blocks{
        // width: 1050px;
        // margin-top: 500px;
        // height: 1000px;
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        //公共的写最上面了
        .typeface{  
            font-family: PingFangSC-Medium;
            font-size: 28px;
            color: #0D2138;
            text-align: left;
        }
        a{
            color: #74B8FB ;
            font-size: 16px;
            text-decoration: none;
            font-family: PingFangSC-Regular;
            // white-space: nowrap; 
            // overflow:hidden;
        }
        & /deep/ .el-card__body{
            padding: 0;
        }
        .left-wrapper{
            .blocks{
                width: 260px;
                height: 518px;
                margin-bottom: 64px;
            }
        }
        .right-wrapper{
            .transactions{
                width: 260px;
                height: 538px;

            }
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


}
</style>

<style lang="less">
    .el-table .warning-row {
        animation:  1s rainbow 3;
    }

    @keyframes rainbow {
        0% { color: #000; }
        100% { color: #fff }
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
        created() {
        },

        mounted() {
            this.showData();
            this.refresh();
        },

        computed: {
            pageName () {
                return this.$route.name;
            },
        },
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                input: '',
                latestBlockNumber: 'loading...',
                lastBlockTime: 'loading...',
                blockTime: '5.000',
                atnPrice: 'loading...',
                blockTable: [],
                transactionTable: [],
                loading1: true,
                loading2: true,
                update: true,
            };
        },
        methods: {
            handleSelect(key, keyPath) {
            },

            tableRowClassName({row, rowIndex}) {
                // if(rowIndex === 0) {
                //     return 'warning-row';
                // } 
            },

            search() {
                // this.$router.push('blocks/248703')
                this.$axios.$get("/search/" + this.input).then(res => {
                    let type = res.type;
                    if(type === "block") {
                        let value = res.value;
                        let number = value.Number;
                        this.$router.push('/blocks/' + number);
                    }
                    else if(type === "transaction") {
                        this.$router.push('/transactions/' + this.input);
                    }
                    else if(type === "dbot") {
                        this.$router.push('/dbots/' + this.input);
                    }
                    else if(type === "account") {
                        this.$router.push('/accounts/' + this.input);
                    }
                }).catch(error => {
                        this.$router.push('/error');
                })
            },

            refresh() {
                let vm = this;
                let count = 0;
                let interval = setInterval(async function() {
                    // vm.update = !vm.update;
                    vm.update = false;
                    // console.log("vm.update", vm.update);
                    await vm.$axios.$get("/blocks/list?limit=" + 8).then(async function(res){
                        // console.log("res", res)
                        // console.log(new Date())
                        let date = new Date(res[0].Timestamp*1000);
                        let hours = date.getHours();
                        let minutes = "0" + date.getMinutes();
                        let seconds = "0" + date.getSeconds();
                        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                        vm.latestBlockNumber = res[0].Number;
                        vm.lastBlockTime = formattedTime;
                        vm.blockTable = [];
                        for( let r of res ) {
                            let block = {};
                            block.number = r.Number;
                            block.txns = r.Txns;
                            block.time = toTime(r.Seconds);
                            block.blockHash = r.Hash.toString().substr(0,9) + '...';
                            // console.log("block", block);
                            vm.blockTable.push(block);
                        }
                        vm.loading1 = false;
                    })
                    await vm.$axios.$get("/transactions/list?limit=8").then(res => {
                        vm.transactionTable = [];
                        for( let r of res ) {
                            let transaction = {};
                            transaction.txId = r.Hash.toString().substr(0,9) + '...';
                            transaction.hash = r.Hash.toString();
                            transaction.from = r.From.toString().substr(0,9) + '...';
                            transaction.fromAddress = r.From.toString();
                            transaction.to = r.To.toString().substr(0,9) + '...';
                            transaction.toAddress = r.To.toString();
                            let number = (r.Value / 1e18).toString();
                            // console.log('number', r.Value / 1e18)
                            if(number.includes("e+")) {
                                let array = number.split("e+");
                                array[0] = Math.floor(array[0] * 100) / 100;
                                number = array[0] + "e+" + array[1];
                            }
                            // console.log("number", number)
                            transaction.value = Math.floor(toDecimals(number) * 100) / 100 + " ATN";
                            transaction.time = toTime(r.Seconds);
                            // transaction.time = "2 years ago"
                            vm.transactionTable.push(transaction);
                        }
                        vm.loading2 = false;
                    }),

                    vm.update = true;
                    // count++;
                    // if(count === 2)clearInterval(interval);
                    // console.log("this.pageName", vm.$route.name)
                    if(vm.$route.name !== 'index') {
                        console.log("clear interval...")
                        clearInterval(interval);
                    }
                }, 5000)
            },

            async showData() {

                this.blockTable = [];

                this.$axios.$get("/blocks/list?limit=8").then(res => {
                    let date = new Date(res[0].Timestamp*1000);
                    let hours = date.getHours();
                    let minutes = "0" + date.getMinutes();
                    let seconds = "0" + date.getSeconds();
                    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                    this.latestBlockNumber = res[0].Number;
                    this.lastBlockTime = formattedTime;
                    let flag = false;
                    for( let r of res ) {
                        let block = {};
                        block.number = r.Number;
                        block.txns = r.Txns;
                        block.time = toTime(r.Seconds);
                        // block.time = '2 days ago'
                        block.blockHash = r.Hash.toString().substr(0,9) + '...';
                        // console.log("block", block);

                        if(block.time[0] === '-') {
                            flag = true;
                        }
                        if(flag) {
                            console.log("flag", flag);
                            if(block.time[0] === '-') {
                                block.time = (parseInt(block.time[1]) + 5).toString() + block.time.substr(2);
                            }
                            else {
                                block.time = (parseInt(block.time[0]) + 5).toString() + block.time.substr(1);
                            }
                            console.log("block time", block.time)
                        }

                        this.blockTable.push(block);
                    }
                    this.loading1 = false;
                })
                
                this.$axios.$get("/transactions/list?limit=8").then(res => {
                    for( let r of res ) {
                        let transaction = {};
                        transaction.txId = r.Hash.toString().substr(0,9) + '...';
                        transaction.hash = r.Hash.toString();
                        transaction.from = r.From.toString().substr(0,9) + '...';
                        transaction.fromAddress = r.From.toString();
                        transaction.to = r.To.toString().substr(0,9) + '...';
                        transaction.toAddress = r.To.toString();
                        let number = (r.Value / 1e18).toString();
                        // console.log('number', r.Value / 1e18)
                        if(number.includes("e+")) {
                            let array = number.split("e+");
                            array[0] = Math.floor(array[0] * 100) / 100;
                            number = array[0] + "e+" + array[1];
                        }
                        // console.log("number", number)
                        transaction.value = Math.floor(toDecimals(number) * 100) / 100 + " ATN";
                        transaction.time = toTime(r.Seconds);
                        // transaction.time = "2 years ago"
                        this.transactionTable.push(transaction);
                    }
                    this.loading2 = false;
                }),

                this.$axios.$get("https://api.coinmarketcap.com/v1/ticker/atn/").then(res => {
                    this.atnPrice = parseFloat(res[0].price_usd).toFixed(5);
                })
                // this.atnPrice = 0.233416
            },
            // cancelAutoUpdate: function() { clearInterval(this.timer) },
            
            },
            // beforeDestroy() {
            //   clearInterval(this.timer)
            // }

        }
</script>
