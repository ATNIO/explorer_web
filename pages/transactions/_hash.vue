<template>
<div>
    <Header/>
      
  <el-main class="main">
    <br><br>
        <div class="right-nav">
            <el-input v-model="input" class="input" placeholder="Search Address / Tx / Block / Dbot"></el-input>
            <el-button icon="el-icon-search" class="button" v-on:click="this.search">Search</el-button>
        </div><br><br>
    <div class="table">
        <div class="network-status">
            <div class="description">
                <p class="status">
                    Transaction Details
                </p>
                <br/>
                <p class="details">
                    <span>Transaction:</span>
                    <span> {{ this.hash }} </span>
                </p>
            </div>
            <div class="overview">
                <br><br><br>
                <el-tabs v-model="activeName2"  type="border-card" @tab-click="handleClick" style="width: 100%;height: 100%">
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
                                    <template v-if="this.status == 'Success'">
                                        <span class="receipt-status-success" >{{ this.status }}</span><br/>
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
                                    <template v-if="this.inputData != '0x'" >
                                        <br/>
                                        <span class="value">Contract &nbsp;<nuxt-link :to="'/accounts/' + this.to">{{ this.to }}</nuxt-link></span><br/>
                                    </template>
                                    <template v-if="this.inputData == '0x'" class="value">
                                        <span><nuxt-link :to="'/accounts/' + this.to">{{ this.to }}</nuxt-link></span><br/>
                                    </template>
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
                                    <div class="value">
                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="0x"
                                            v-model="this.inputData"
                                            :disabled="true"
                                            class="textarea"
                                        >
                                        </el-input>
                                    </div>
                                </div>
                                <br/>
                                <p></p><br/>
                            </div>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="Internal Transactions" name="second">
                    </el-tab-pane>
                </el-tabs>
            </div>
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
        font-size: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .value {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 1000px;
        font-size: 10px;
    }

    .inputData {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
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
        height: 100%;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 90%;
        height: 100%;
        font-size: 10px;

    }

    .receipt-status-success {
        color:green;
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

    .overview {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 60%;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
    }

    .form .balance {
        display: flex;
        flex-direction: row;
        align-items: space-around;
        justify-content: center;
        width: 100%;
    }

    .description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 60%;
    }

    a {
        color: #74B8FB;
        text-decoration: none;
    }

    .network-status {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
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


    .table{
        //  background-color: #F7F7F9;
        //  background-color: rgb(3, 3, 205); 
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
        .panel {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 1200px;
        }
        p {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            // width: 200px;
            height: 50px;
        }
        .details {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 15px;
            font-weight: 350;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            word-break: break-all;
        }

        .value {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            width: 100%;
            font-size: 10px;
            flex-wrap: wrap;
            word-break: break-all;
        }
        .status {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .overview {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        .textarea {
            width: 350px;
        }
        .description {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            width: 100%;
        }
        .inputData {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
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
            status: 'Success',
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
      };
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        async showData() {
            
            await this.$axios.$get("/transactions/hash/" + this.hash).then(res => {
                this.blockHeight = res.BlockNumber;
                this.timeStamp = toDate(res.Timestamp);
                this.from = res.From;
                this.to = res.To;
                this.value = res.Value / 1e18 + " ATN";
                this.gasLimit = res.Gas;
                this.gasUsedByTxn = res.GasUsed;
                this.gasPrice = toDecimals(res.GasPrice / 1e18) + " ATN";
                this.actualTxCost = toDecimals((parseFloat(res.GasUsed) * parseFloat(res.GasPrice) / 1e18)) + " ATN";
                this.nonce = res.Nonce;
                this.inputData = res.Input;
                if(res.Status == "1")this.status = "Success";
                else this.status = "Failed";
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);

        },
        handleClick(tab, event) {
            // console.log(tab, event);
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
      
    },
  }
</script>