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

                    <span class="title-small green-circle">Top 31</span>
                    <span class="title-small orange-circle">Standby</span>
                    <span class="title-small total">总计:</span><span class="title-small">{{this.total}} 个</span>
                    
                </div>
                <el-table
                    ref="candidates"
                    :data="candidatesTable"
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
                    highlight-current-row
                    >

                    <el-table-column
                        prop="rank"
                        label="排名"
                        width="80"
                        >
                        <template slot-scope="scope">
                            <template v-if="scope.row.rank <= 31"> 
                                <el-tag size="success">{{ scope.row.rank }}</el-tag>
                            </template>
                            <template v-else> 
                                <el-tag size="warning">{{ scope.row.rank }}</el-tag>
                            </template>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="rankChange"
                        label=""
                        width="50"
                        >
                        
                        <template slot-scope="scope">
                            <template v-if="scope.row.rankIncrease == true" >
                                <i class="green-icon up" ></i>
                                <span class="green-rank-change">{{ scope.row.rankChange }}</span>
                            </template>
                            <template v-if="scope.row.rankDecrease == true" >
                                <i class="red-icon down" ></i>
                                <span class="red-rank-change">{{ scope.row.rankChange }}</span>
                            </template>
                        </template>
                    </el-table-column >

                    <el-table-column
                        prop="name"
                        label="名称"
                        width="300"
                        >
                        <template slot-scope="scope" class="name-template">
							<AccountIcon class="name-icon" :value="scope.row.address" size="10"/>
                            <nuxt-link :to="'/votes/' + scope.row.address">{{ scope.row.name }}</nuxt-link>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="pVotes"
                        label="得票率"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="voters"
                        label="投票账户数"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="seal"
                        label="已生产区块数"
                        >
                    </el-table-column>

                    
                </el-table>
                <br>
                <div class="page">
                    <el-pagination
                        small
                        @current-change="handleCurrentChange1"
                        :current-page.sync="currentPage"
                        :page-size=this.pageSize
                        layout="total, prev, pager, next"
                        :total=this.total>
                    </el-pagination>
                </div>
                <div class="mobile-page">
                    <el-pagination
                        small
                        @current-change="handleCurrentChange1"
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
                    :data="delegatersTable"
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
                        width="300"
                        >
                        <template slot-scope="scope">
                            <AccountIcon class="name-icon" :value="scope.row.address" size="10"/>
                            <nuxt-link :to="'/accounts/' + scope.row.address">{{ scope.row.name }}</nuxt-link>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="votes"
                        label="总票数"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="lastSeal"
                        label="最近确认"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="sealInEpoch"
                        label="当前周期出块数量"
                        >
                    </el-table-column>

                    <el-table-column
                        prop="lastSealTime"
                        label="时间"
                        >
                    </el-table-column>

                    
                </el-table>
                <br>
                <div class="page">
                    <el-pagination
                        small
                        @current-change="handleCurrentChange2"
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
    <!-- <Footer/> -->
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
        height: 2108px;
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

    & /deep/ .el-tag--success {
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

    & /deep/ .el-tag--warning {
        width: 36px;
        // height: 20px;
        background: #FFF5EA;
        border-radius: 9.5px;
        opacity: 1;
        display: inline-block;
        border: none;
        color: #FF9500;
        font-size: 13px;
    }

    .orange-rag {
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
    }
    

    .name-template {
        display: flex;
        flex-direction: row;
        align-items: space-around;
    }
    .name-icon{
        margin-right: 10px;
        margin-bottom: -5px;
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
    .up{
        background:url("../../assets/up.png") no-repeat center center / contain;
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: -10px;
    }
    .down{
       background:url("../../assets/down.png") no-repeat center center / contain;
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: -10px; 
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
import { toDecimals, toTime } from '~/common/method.js'

  export default {

    components: {
        Header,
        Footer,
    },
    head: {
        script: [
        ],
        link: [
            { rel: 'sylesheet', href: '~assets/icon/iconfont.css' },
        ]
    },
    created() {
    },
    mounted() {
        this.showData();
        this.refresh();
    },
    data() {
      return {
            candidatesTable: [],
            delegatersTable:[],
            total: 40,
            currentPage: 1,
            pageSize: 32,
            loading: true,
            input: '',
            lastCandidatesTable: [],
            candidatesPage: 1,
            delegatersPage: 1,
            currentRow: 0,
      };
    },
    methods: {
        handleSelect(key, keyPath) {
        },
        
        showData() {

            this.$axios.$get("/votes/candidatesStatus?page_size=" + this.pageSize + "&page_number=1").then(res => {
                let i = 1;
                let candidates = res;
                for(let j = 0; j < candidates.length && j < this.pageSize; j++) {
                    let candidate = {};
                    candidate.rank = i;
                    candidate.address = candidates[j].address;
                    candidate.name = candidates[j].address.toString().substr(0,25) + '...';
                    candidate.pVotes = candidates[j].pVotes.toFixed(3) + "%";
                    candidate.voters = parseInt(candidates[j].voters).toLocaleString('en-US');
                    candidate.seal = parseInt(candidates[j].seal).toLocaleString('en-US');
                    this.candidatesTable.push(candidate);
                    this.lastCandidatesTable.push(candidate);
                    i++;
                }
                this.loading = false;
            })

            this.$axios.$get("/votes/delegatersStatus?page_size=" + this.pageSize + "&page_number=1").then(res => {
                // console.log(res)
                for( let r of res ) {
                    let delegater = {};
                    delegater.address = r.address;
                    delegater.name = r.address.toString().substr(0,25) + '...';
                    delegater.lastSeal = r.lastSeal;
                    delegater.sealInEpoch = r.sealInEpoch;
                    delegater.votes = parseInt(r.votes).toLocaleString('en-US');

                    let date = new Date(parseInt(r.lastSealTime));
                    let hours = date.getHours();
                    let minutes = "0" + date.getMinutes();
                    let seconds = "0" + date.getSeconds();
                    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                    delegater.lastSealTime = formattedTime;
                    this.delegatersTable.push(delegater)
                }
                this.loading = false;
            })
        },

        refresh() {
            let self = this;
            this.setCurrent();
            let count = 0;
            let interval = setInterval(async function() {
                self.getCandidatesStatus(self);

                self.$axios.$get("/votes/delegatersStatus?page_size=" + self.pageSize + "&page_number=" + self.delegatersPage).then(res => {
                    // console.log(res)
                    // console.log("delegatersPage", self.delegatersPage);
                    self.delegatersTable = [];
                    for( let r of res ) {
                        let delegater = {};
                        delegater.address = r.address;
                        delegater.name = r.address.toString().substr(0,25) + '...';
                        delegater.lastSeal = r.lastSeal;
                        delegater.sealInEpoch = r.sealInEpoch;
                        delegater.votes = parseInt(r.votes).toLocaleString('en-US');

                        let date = new Date(parseInt(r.lastSealTime));
                        let hours = date.getHours();
                        let minutes = "0" + date.getMinutes();
                        let seconds = "0" + date.getSeconds();
                        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                        delegater.lastSealTime = formattedTime;

                        // for(let m = 0; m < self.delegatersTable.length; m++) {
                        //     if(self.delegatersTable[m].address === delegater.address) {
                        //         self.delegatersTable[m] = delegater;
                        //     }
                        // }
                        self.delegatersTable.push(delegater)
                    }
                    self.loading = false;
                })
                // count++;
                // if(count === 2)clearInterval(interval);
                // console.log("this.pageName", self.$route.name)
                if(self.$route.name !== 'votes') {
                    console.log("clear interval...")
                    clearInterval(interval);
                }


            }, 5000)
        },

        async getCandidatesStatus(self) {
            await self.$axios.$get("/votes/candidatesStatus?page_size=" + self.pageSize + "&page_number=" + self.candidatesPage).then(async function(res){
                // console.log(res)
                // console.log("candidatesPage", self.candidatesPage);
                let i = self.pageSize * (self.candidatesPage - 1) + 1;
                // self.candidatesTable = [];
                let tempCandidatesTable = [];
                let candidates = res;
                let currentRow, test;
                for(let j = 0; j < candidates.length && j < self.pageSize; j++) {
                    let candidate = {};
                    candidate.rank = i;
                    candidate.address = candidates[j].address;
                    candidate.name = candidates[j].address.toString().substr(0,25) + '...';
                    candidate.pVotes = candidates[j].pVotes.toFixed(3) + "%";
                    candidate.voters = parseInt(candidates[j].voters).toLocaleString('en-US');
                    candidate.seal = parseInt(candidates[j].seal).toLocaleString('en-US');

                    // console.log("candidate.address", candidate.address);
                    // console.log("lastCAndidatesTable", self.lastCandidatesTable)
                    for(let k = 0; k < self.lastCandidatesTable.length; k++) {
                        if(candidates[j].address === self.lastCandidatesTable[k].address) {
                            if(j < k) {
                                candidate.rankIncrease = true;
                                candidate.rankChange = k - j;
                            }
                            else if(j > k) {
                                candidate.rankDecrease = true;
                                candidate.rankChange = j - k;
                            }
                            if(candidates[j].seal > self.lastCandidatesTable[k].seal) {
                                currentRow = j;
                                test = k;
                                
                            }
                            break;
                        }
                    }
                    tempCandidatesTable.push(candidate);
                    i++;
                }
                self.setCurrent(self.candidatesTable[test]);
                await self.sleep(1000);
                self.candidatesTable = tempCandidatesTable;
                self.setCurrent(self.candidatesTable[currentRow]);
                self.lastCandidatesTable = self.candidatesTable;
            })
        },

        sleep(ms) {
	        return new Promise(resolve => setTimeout(resolve, ms))
        },
        setCurrent(row) {
            console.log("row", row);
            this.$refs.candidates.setCurrentRow(row);
        },
        timeStamp2String (time){
             var datetime = new Date();
             datetime.setTime(time);
             var year = datetime.getFullYear();
             var month = datetime.getMonth() + 1;
             var date = datetime.getDate();
             var hour = datetime.getHours();
             var minute = datetime.getMinutes();
             var second = datetime.getSeconds();
             var mseconds = datetime.getMilliseconds();
             return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second+"."+mseconds;
        },
        handleCurrentChange1(val) {
            // console.log("val", val)
            this.candidatesPage = val;
            this.$axios.$get("/votes/candidatesStatus?page_size=" + this.pageSize + "&page_number="+val).then(res => {
                // console.log("****", res)
                let i = this.pageSize * (val - 1) + 1;
                this.candidatesTable = [];
                res = res.candidates;
                for( let r of res ) {
                    let candidate = {};
                    candidate.rank = i;
                    candidate.address = r.address;
                    candidate.name = r.address.toString().substr(0,25) + '...';
                    candidate.pVotes = r.pVotes.toFixed(3) + "%";
                    candidate.voters = parseInt(r.voters).toLocaleString('en-US');
                    candidate.seal = parseInt(r.seal).toLocaleString('en-US');
                    this.candidatesTable.push(candidate)
                    i++;
                }
                this.loading = false;
            })
        },
        handleCurrentChange2(val) {
            // console.log("val", val)
            this.delegatersPage = val;
            this.$axios.$get("/votes/delegatersStatus?page_size=" + this.pageSize + "&page_number=" + this.delegatersPage).then(res => {
                // console.log(res)
                this.delegatersTable = [];
                for( let r of res ) {
                    let delegater = {};
                    delegater.address = r.address;
                    delegater.name = r.address.toString().substr(0,25) + '...';
                    delegater.lastSeal = r.lastSeal;
                    delegater.sealInEpoch = r.sealInEpoch;
                    delegater.votes = parseInt(r.votes).toLocaleString('en-US');

                    let date = new Date(parseInt(r.lastSealTime));
                    let hours = date.getHours();
                    let minutes = "0" + date.getMinutes();
                    let seconds = "0" + date.getSeconds();
                    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                    delegater.lastSealTime = formattedTime;
                    this.delegatersTable.push(delegater)
                }
                this.loading = false;
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
