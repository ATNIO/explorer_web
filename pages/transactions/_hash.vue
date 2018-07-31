<template>
<div>
    <Header/>
      
  <el-main class="main">
    <br><br>
    <div class="table">

        <div class="network-status">
            <div class="description">
                <p class="status">
                    Transaction Details
                </p>
                <br/>
                <p class="details">
                    Transaction: {{ this.hash }}
                </p>
            </div>
            <div class="overview">
                <br><br><br>
                <el-tabs v-model="activeName2"  type="border-card" @tab-click="handleClick" style="width: 100%">
                    <el-tab-pane label="Overview" name="first">
                        <div class="panel">
                            <div class="name">
                                <p>TxHash:</p><br/>
                                <p>TxReceipt Status:</p><br/>
                                <p>Block Height:</p><br/>
                                <p>TimeStamp:</p><br/>
                                <p>From:</p><br/>
                                <p>To:</p><br/>
                                <p>Value:</p><br/>
                                <p>Gas Limit:</p><br/>
                                <p>Gas Used By Txn:</p><br/>
                                <p>Gas Price:</p><br/>
                                <p>Actual Tx Cost/Fee:</p><br/>
                                <p>Nonce:</p><br/>
                                <p>InputData:</p><br/>
                                <p></p><br/>
                                <p></p><br/>
                            </div>

                            <div class="value">
                                <p>{{ this.hash }}</p><br/>
                                <template v-if="this.status == 'Success'">
                                    <p class="receipt-status-success" >{{ this.status }}</p><br/>
                                </template>
                                <template v-if="this.status == 'Failed'">
                                    <p class="receipt-status-failed" >{{ this.status }}</p><br/>
                                </template>
                                <p>{{ this.blockHeight }}</p><br/>
                                <p>{{ this.timeStamp }}</p><br/>
                                <p><nuxt-link :to="'/accounts/' + this.from">{{ this.from }}</nuxt-link></p><br/>

                                <template v-if="this.inputData != '0x'">
                                    <p>Contract <nuxt-link :to="'/accounts/' + this.to">{{ this.to }}</nuxt-link></p><br/>
                                </template>
                                <template v-if="this.inputData == '0x'">
                                    <p><nuxt-link :to="'/accounts/' + this.to">{{ this.to }}</nuxt-link></p><br/>
                                </template>
                                <p>{{ this.value }}</p><br/>
                                <p>{{ this.gasLimit }}</p><br/>
                                <p>{{ this.gasUsedByTxn }}</p><br/>
                                <p>{{ this.gasPrice }}</p><br/>
                                <p>{{ this.actualTxCost }}</p><br/>
                                <p>{{ this.nonce }}</p><br/>
                                <p><el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="0x"
                                    v-model="this.inputData"
                                    :disabled="true"
                                    class="textarea"
                                    >
                                    </el-input>
                                </p><br/>
                            </div>
                        </div>
                        
                        <br>
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

    .textarea {
        width: 350%;
    }

    .panel{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .name {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 30%;
        height: 100%;
        font-size: 15px;
    }

    .value {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 60%;
        height: 100%;
        font-size: 15px;
    }

    .receipt-status-success {
        color:green;
        font-size: 15px;
    }

    .receipt-status-failed {
        color:red;
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

    span {
        font-size: 20px;
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
        cell({row, column, rowIndex, columnIndex}) {
            //第八列添加 red 类
            // return 'red'
            if(columnIndex == 0) {
                return 'red'
            }
            // if(columnIndex == 1 && rowIndex == 2){
                
            // }
        }
      
    },
  }
</script>