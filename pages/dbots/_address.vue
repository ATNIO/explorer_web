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
                    Dbot Details
                </p>
                <br/>
                <p class="details">
                    Address: {{ this.dbotAddress }}
                </p>
            </div>
            <br><br><br>
            <div class="overview">
                <p class="p-overview">Overview</p>
                <br>
                <div class="form">
                    <el-table
                    border
                    :data="dbotDetailsTable"
                    :show-header = false
                    style="width: 60% "
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
                            >
                        </el-table-column>
                        
                    </el-table>
                </div>
                <br><br><br>
                <el-tabs v-model="activeName2"  type="border-card" @tab-click="handleClick" style="width: 100%">
                    <el-tab-pane label="Methods" name="first">
                        <el-table
                            :data="methodTable"
                            style="width: 100%; "
                            type="flex"
                            align="middle"
                            justify="center">

                            <el-table-column
                                prop="method"
                                label="Method"
                                min-width="70">
                                </el-table-column>
                            <el-table-column
                                prop="price"
                                label="Price"
                                min-width="80">
                            </el-table-column>

                            <el-table-column
                                prop="uri"
                                label="Uri"
                                min-width="70">
                            </el-table-column>
                        </el-table>
                        <br>
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

    .tag {
        font-size: 14px;
    }

    .overview {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 70%;
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
        width: 70%;
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
            width: 260px;
        }
        .button {
            background: #00c8ff;
            color: #fff;
        }
        .details {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 15px;
            font-weight: 350;
            display: flex;
            flex-direction: column;
            // align-items: flex-start;
            justify-content: flex-start;
            word-break: break-all;
        }
        .status {
            font-family:  "Helvetica Neue",Helvetica;
            font-size: 20px;
            float: left;
        }
        .description {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
        }
        p {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            height: 50px;
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
import { toDate } from '~/common/method.js'
const Web3 = require('web3')

  export default {

    components: {
        Header,
        Footer
    },
    asyncData({ params }) {
        // console.log("params address", params.address)
        console.log("params", params)
        return { dbotAddress: params.address }
    },

    created() {
        this.showData();
    },
    data() {
      return {
            dbotAddress: '',
            dbotDetailsTable: [],
            activeName2: 'first',
            methodTable: [],
            input: '',
      };
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        async showData() {
            console.log("this dbotAddress", this.dbotAddress)
            this.$axios.$get("/dbots/address/" + this.dbotAddress).then(res => {
                this.dbotDetailsTable.push({attribute: "Address:", value: res.Address});
                this.dbotDetailsTable.push({attribute: "Name:", value: Web3.utils.hexToAscii(res.Name)});
                this.dbotDetailsTable.push({attribute: "Domain", value: Web3.utils.hexToAscii(res.Domain)});
                let keyToEndPoints = res.KeyToEndPoints;
                for(let k of keyToEndPoints) {
                    let method = {};
                    method.method = Web3.utils.hexToAscii(k.Endpoint.Method);
                    method.price = Web3.utils.hexToNumber(k.Endpoint.Price);
                    method.uri = Web3.utils.hexToAscii(k.Endpoint.Uri);
                    this.methodTable.push(method);
                }
            })
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