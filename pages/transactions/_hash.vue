<template>
  <div>
    <Header />
    <el-main class="main">
      <div class="table">
        <div class="network-status">
          <div class="right-nav">
            <div class="search">
              <el-input
                v-model="input"
                class="input"
                :placeholder="this.$t('header.search')"
                @keyup.enter.native="search"
              ></el-input>
              <i
                class="search-icon"
                v-on:click="this.search"
              ></i>
            </div>
          </div><br><br>
          <div class="description">
            <p>{{ this.$t('transaction.details') }}</p>
          </div>
          <el-card class="table-card">
            <div
              slot="header"
              class="clearfix"
            >
              <img
                src="~/assets/address.png"
                class="address_image"
              />
              <span class="address">{{ this.$t('transaction.txHash') }}: {{ this.hash }}</span>
              <a href="#"><img
                  src="~/assets/copy.png"
                  class="copy_image"
                  v-clipboard:copy="this.hash"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                /></a>
            </div>
            <div class="overview">
              <el-tabs
                v-model="activeName2"
                type="border-card"
                @tab-click="handleClick"
                style="width: 100%"
              >
                <el-tab-pane
                  :label="this.$t('transaction.overview')"
                  name="first"
                >
                  <div class="panel">
                    <div class="content">
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.txHash') }}:
                        </span>
                        <span class="value">
                          {{ this.hash }}
                        </span>
                      </p>
                      <br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.txStatus') }}:
                        </span>
                        <template v-if="this.pending == 'true'">
                          <span class="receipt-pending-true"><i class="el-icon-loading"></i>&nbsp;{{ this.status }}</span><br />
                        </template>
                        <template v-if="this.status == 'Success'">
                          <span class="receipt-status-success">{{ this.$t('transaction.txSuccess') }}</span><br />
                        </template>
                        <template v-if="this.status == 'Failed'">
                          <span class="receipt-status-failed">{{ this.$t('transaction.txFailed') }}</span><br />
                        </template>
                      </p>
                      <br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.blockHeight') }}:
                        </span>
                        <template v-if="this.pending == 'true'">
                          <span class="blockheight-pending-true">
                            (Pending...)
                          </span><br />
                        </template>
                        <template v-if="this.pending == 'false'">
                          <span class="value">
                            <nuxt-link :to="'/blocks/' + this.blockHeight">{{ this.blockHeight }}</nuxt-link>
                            &nbsp;{{ this.confirmations }}
                          </span><br />
                        </template>
                        <!-- <span class="value">
                                            <nuxt-link :to="'/blocks/' + this.blockHeight">{{ this.blockHeight }}</nuxt-link>
                                            &nbsp;{{ this.confirmations }}
                                        </span> -->
                      </p>
                      <br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.timestamp') }}:
                        </span>
                        <span class="value">
                          {{ this.timeStamp }}
                        </span>
                      </p><br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.from') }}:
                        </span>
                        <span class="value">
                          <nuxt-link :to="'/accounts/' + this.from">
                            {{ this.from }}
                          </nuxt-link>
                        </span>
                      </p><br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.to') }}:
                        </span>
                        <span class="value">
                          <template v-if="this.isContract == true">
                            <br />
                            <span>Contract
                              <nuxt-link :to="'/accounts/' + this.to">{{ this.to }}</nuxt-link>
                            </span><br />
                          </template>
                          <template v-else>
                            <span>
                              <nuxt-link :to="'/accounts/' + this.to">{{ this.to }}</nuxt-link>
                            </span><br />
                          </template>
                        </span>
                        <br />

                      </p><br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.value') }}:
                        </span>
                        <span class="value">
                          {{ this.value }}
                        </span>
                      </p>
                      <br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.gasLimit') }}:
                        </span>
                        <span class="value">
                          {{ this.gasLimit }}
                        </span>
                      </p>
                      <br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.gasUsedByTxn') }}:
                        </span>
                        <span class="value">
                          {{ this.gasUsedByTxn }}
                        </span>
                      </p>
                      <br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.gasPrice') }}:
                        </span>
                        <span class="value">
                          {{ this.gasPrice }}
                        </span>
                      </p>
                      <br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.actualTxCost') }}:
                        </span>
                        <span class="value">
                          {{ this.actualTxCost }}
                        </span>
                      </p>
                      <br />
                      <p>
                        <span class="name">
                          {{ this.$t('transaction.nonce') }}:
                        </span>
                        <span class="value">
                          {{ this.nonce }}
                        </span>
                      </p>
                      <br />
                      <div class="inputData">
                        <span class="name">{{ this.$t('transaction.inputData') }}:</span><br />
                        <div class="decodeHex">
                          <div class="value">
                            <el-input
                              type="textarea"
                              :rows="4"
                              placeholder="0x"
                              v-model="this.inputData"
                              :disabled="true"
                            >
                            </el-input>
                          </div>
                          <el-dropdown @command="handleCommand">
                            <el-button
                              plain
                              type="info"
                              class="viewButton"
                            >
                              View Input As<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item command="default">Default View</el-dropdown-item>
                              <!-- <el-dropdown-item>UTF-8</el-dropdown-item> -->
                              <el-dropdown-item command="original">Original</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>

                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                </el-tab-pane>

                <el-tab-pane
                  :label="this.$t('transaction.internalTransactions')"
                  name="second"
                >
                  <div class="internal_tx">
                    <el-table
                      :data="internalData"
                      style="width: 100%"
                      type="flex"
                      align="middle"
                      justify="center"
                      :header-cell-style="{ 
                                        padding:'0px',
                                        textAlign:'center'
                                    }"
                      :cell-style="{
                                        textAlign:'center',
                                        color:'#788091'
                                    }"
                      :empty-text="this.$t('utils.empty_text')"
                    >
                      <el-table-column
                        prop="type"
                        :label="this.$t('transaction.type')"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="from"
                        :label="this.$t('transaction.from')"
                      >
                        <template slot-scope="scope">
                          <nuxt-link :to="'/accounts/' + scope.row.fromAddress">{{ scope.row.from }}</nuxt-link>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="to"
                        :label="this.$t('transaction.to')"
                      >
                        <template slot-scope="scope">
                          <nuxt-link :to="'/accounts/' + scope.row.toAddress">{{ scope.row.to }}</nuxt-link>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="value"
                        :label="this.$t('transaction.value')"
                      >
                      </el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-card>
        </div>
      </div>
    </el-main>
    <br> <br>
    <el-footer>
      <Footer />
    </el-footer>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import axios from "axios";
import { toDate, toDecimals, search, getAbi } from "~/common/method.js";
const Web3 = require("web3");
import VueClipboard from "vue-clipboard2";
import Vue from "vue";
import { setInterval, clearInterval } from "timers";
const bigInt = require("big-integer");
const abiDecoder = require("abi-decoder");
const fs = require("fs");

Vue.use(VueClipboard);

export default {
  components: {
    Header,
    Footer
  },
  asyncData({ params }) {
    // console.log("params address", params.address)
    return { hash: params.hash };
  },

  created() {},
  mounted() {
    this.showData();
  },
  data() {
    return {
      hash: "",
      status: "",
      blockHeight: "",
      timeStamp: "",
      from: "",
      to: "",
      value: "",
      gasLimit: "",
      gasUsedByTxn: "",
      gasPrice: "",
      actualTxCost: "",
      nonce: "",
      inputData: "",
      inputDataString: "",
      inputTemp: "",
      decodedData: "",
      activeName2: "first",
      input: "",
      internalData: [],
      isContract: "false",
      pending: "false",
      confirmations: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    async showData() {
      let self = this;
      await this.$axios
        .$get("/transactions/hash/" + this.hash)
        .then(async function(res) {
          // console.log(res.BlockNumber)
          self.pending = res.Pending;
          self.blockHeight = res.BlockNumber;
          let blockHeight = self.blockHeight;
          self.$axios.$get("/blocks/count").then(res => {
            // console.log("====", blockHeight, res.count)
            let confirmations = Math.abs(res - blockHeight);
            // console.log("confirmations", confirmations)
            if (confirmations > 1)
              self.confirmations =
                "(" + confirmations + " block confirmations)";
            else
              self.confirmations = "(" + confirmations + " block confirmation)";
          });

          self.timeStamp = toDate(res.Timestamp);
          self.from = res.From;
          self.to = res.To;

          await self.$axios
            .$get("/accounts/address/" + self.to)
            .then(res => {
              self.isContract = res.IsContract;
            })
            .catch(error => {
              console.log("trace error", error);
            });
          console.log("res.value", res.Value);
          self.value = toDecimals(res.Value / 1e18) + " ATN";
          self.gasLimit = res.Gas;
          self.gasUsedByTxn = res.GasUsed;
          self.gasPrice = toDecimals(res.GasPrice / 1e18) + " ATN";
          self.actualTxCost =
            toDecimals(
              (parseFloat(bigInt(res.GasUsed)) *
                parseFloat(bigInt(res.GasPrice))) /
                1e18
            ) + " ATN";
          self.nonce = res.Nonce;
          self.inputData = res.Input;

          abiDecoder.addABI(dbotFactoryABI);
          abiDecoder.addABI(transferChannelsABI);
          abiDecoder.addABI(ansABI);
          const testData = self.inputData.toString();
          const decodedData = abiDecoder.decodeMethod(testData);
          // console.log('decodedData', decodedData)
          self.inputDataString = self.inputData;
          if (decodedData != undefined) {
            let functionName = decodedData.name;
            let params = decodedData.params;
            let paramsName = [];
            let paramsValue = [];
            let paramsType = [];
            for (let p of params) {
              paramsName.push(p.name);
              paramsType.push(p.type);
              paramsValue.push(p.value);
            }
            console.log(functionName, params);

            self.inputDataString = "Function: " + functionName + "(";
            for (let i = 0; i < paramsName.length; i++) {
              self.inputDataString +=
                paramsType[i] + "  " + paramsName[i] + ",";
            }
            if (params.length === 0)
              self.inputDataString = self.inputDataString + ") \n\n";
            else
              self.inputDataString =
                self.inputDataString.substr(
                  0,
                  self.inputDataString.length - 1
                ) + ") \n\n";
            // console.log("inputdata", this.inputData)
            let methodId = self.inputData.substr(0, 10);
            self.inputDataString += "MethodID:  " + methodId;
            for (let i = 0; i < paramsValue.length; i++) {
              self.inputDataString +=
                "\n[" + i + "]:     " + paramsValue[i] + "\n";
            }
            // console.log("inputDataString", this.inputDataString)
          } else {
            try {
              self.inputDataString = Web3.utils.hexToUtf8(self.inputData);
            } catch (error) {
              self.inputDataString = self.inputData;
            }
            // console.log("web3", Web3.utils.hexToUtf8(this.inputData))
          }
          self.inputTemp = self.inputData;
          self.inputData = self.inputDataString;

          // console.log('res.Pending', res.Pending)
          if (res.Pending === "true") {
            self.status = "Pending...";
            // console.log("pending this.pending", this.pending)
            let interval = setInterval(async function() {
              // console.log("send self.pending", self.pending)
              if (self.pending == "true") {
                await self.$axios
                  .$get("/transactions/hash/" + self.hash)
                  .then(res => {
                    self.pending = res.Pending;
                  });
              } else {
                // console.log("res.Status", res.Status)
                if (res.Status == "1") {
                  self.status = "Success";
                } else self.status = "Failed";
                clearInterval(interval);
              }
            }, 5000);
          } else {
            self.pending = "false";
            if (res.Status == "1") {
              self.status = "Success";
            } else self.status = "Failed";
          }
        })
        .catch(error => {
          console.log("trace error", error);
        });
      this.$axios.$get("/traces/hash/" + this.hash).then(res => {
        let trace = res.Trace;
        for (let t of trace) {
          let data = {};
          data.from = t.From.toString().substr(0, 10) + "...";
          data.fromAddress = t.From;
          data.to = t.To.toString().substr(0, 10) + "...";
          data.toAddress = t.To;
          data.input = t.Input;
          data.value = toDecimals(t.Value / 1e18) + " ATN";
          data.type = t.Op;
          this.internalData.push(data);
        }
      });
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command === "default") {
        // this.inputTemp = this.inputData;
        this.inputData = this.inputDataString;
      } else if (command === "original") {
        this.inputData = this.inputTemp;
      }
    },
    search() {
      search(this);
    },
    onCopy() {
      this.$notify({
        title: "success",
        message: "复制成功！",
        type: "success"
      });
    },
    onError() {
      // alert();
    }
  }
};

//inputdata to contract function
let dbotFactoryABI = [
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "idToAddress",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_dbotAddress", type: "address" }],
    name: "register",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "dbots",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "id", type: "uint256" },
      { indexed: false, name: "dbotAddress", type: "address" }
    ],
    name: "Register",
    type: "event"
  }
];
let transferChannelsABI = [
  {
    constant: true,
    inputs: [
      { name: "_receiver_address", type: "address" },
      { name: "_open_block_number", type: "uint32" },
      { name: "_balance", type: "uint256" },
      { name: "_balance_msg_sig", type: "bytes" }
    ],
    name: "extractBalanceProofSignature",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_sender_address", type: "address" },
      { name: "_receiver_address", type: "address" },
      { name: "_open_block_number", type: "uint32" }
    ],
    name: "getChannelInfo",
    outputs: [
      { name: "", type: "bytes32" },
      { name: "", type: "uint256" },
      { name: "", type: "uint32" },
      { name: "", type: "uint256" },
      { name: "", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_receiver_address", type: "address" },
      { name: "_open_block_number", type: "uint32" },
      { name: "_balance", type: "uint256" }
    ],
    name: "uncooperativeClose",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_trusted_contracts", type: "address[]" }],
    name: "removeTrustedContracts",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "bytes32" }],
    name: "withdrawn_balances",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_sender_address", type: "address" },
      { name: "_receiver_address", type: "address" }
    ],
    name: "createChannelDelegate",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_receiver_address", type: "address" },
      { name: "_open_block_number", type: "uint32" },
      { name: "_balance", type: "uint256" },
      { name: "_balance_msg_sig", type: "bytes" },
      { name: "_closing_sig", type: "bytes" }
    ],
    name: "cooperativeClose",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_open_block_number", type: "uint32" },
      { name: "_balance", type: "uint256" },
      { name: "_balance_msg_sig", type: "bytes" }
    ],
    name: "withdraw",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "version",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_receiver_address", type: "address" },
      { name: "_open_block_number", type: "uint32" }
    ],
    name: "settle",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "channel_deposit_bugbounty_limit",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_receiver_address", type: "address" }],
    name: "createChannel",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "bytes32" }],
    name: "closing_requests",
    outputs: [
      { name: "closing_balance", type: "uint256" },
      { name: "settle_block_number", type: "uint32" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "bytes32" }],
    name: "channels",
    outputs: [
      { name: "deposit", type: "uint256" },
      { name: "open_block_number", type: "uint32" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_receiver_address", type: "address" },
      { name: "_open_block_number", type: "uint32" }
    ],
    name: "topUp",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_sender_address", type: "address" },
      { name: "_receiver_address", type: "address" },
      { name: "_open_block_number", type: "uint32" }
    ],
    name: "getKey",
    outputs: [{ name: "data", type: "bytes32" }],
    payable: false,
    stateMutability: "pure",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_trusted_contracts", type: "address[]" }],
    name: "addTrustedContracts",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "ownerAddress",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "trusted_contracts",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_sender_address", type: "address" },
      { name: "_open_block_number", type: "uint32" },
      { name: "_balance", type: "uint256" },
      { name: "_closing_sig", type: "bytes" }
    ],
    name: "extractClosingSignature",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_sender_address", type: "address" },
      { name: "_receiver_address", type: "address" },
      { name: "_open_block_number", type: "uint32" }
    ],
    name: "topUpDelegate",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "challengePeriod",
    outputs: [{ name: "", type: "uint32" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_sender_address", type: "address" },
      { indexed: true, name: "_receiver_address", type: "address" },
      { indexed: false, name: "_deposit", type: "uint256" }
    ],
    name: "ChannelCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_sender_address", type: "address" },
      { indexed: true, name: "_receiver_address", type: "address" },
      { indexed: true, name: "_open_block_number", type: "uint32" },
      { indexed: false, name: "_added_deposit", type: "uint256" }
    ],
    name: "ChannelToppedUp",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_sender_address", type: "address" },
      { indexed: true, name: "_receiver_address", type: "address" },
      { indexed: true, name: "_open_block_number", type: "uint32" },
      { indexed: false, name: "_balance", type: "uint256" }
    ],
    name: "ChannelCloseRequested",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_sender_address", type: "address" },
      { indexed: true, name: "_receiver_address", type: "address" },
      { indexed: true, name: "_open_block_number", type: "uint32" },
      { indexed: false, name: "_balance", type: "uint256" },
      {
        indexed: false,
        name: "_receiver_remaining_balance",
        type: "uint256"
      }
    ],
    name: "ChannelSettled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_sender_address", type: "address" },
      { indexed: true, name: "_receiver_address", type: "address" },
      { indexed: true, name: "_open_block_number", type: "uint32" },
      { indexed: false, name: "_withdrawn_balance", type: "uint256" }
    ],
    name: "ChannelWithdraw",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_trusted_contract_address",
        type: "address"
      },
      { indexed: false, name: "_trusted_status", type: "bool" }
    ],
    name: "TrustedContract",
    type: "event"
  }
];
let ansABI = [
  {
    constant: false,
    inputs: [],
    name: "reBid",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_content", type: "bytes32" }],
    name: "setContent",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_name", type: "string" }],
    name: "bidPrice",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_name", type: "string" }],
    name: "buy",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_name", type: "string" }],
    name: "getNameSpace",
    outputs: [
      { name: "addr", type: "address" },
      { name: "price", type: "uint256" },
      { name: "name", type: "string" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "nss",
    outputs: [
      { name: "name", type: "string" },
      { name: "content", type: "bytes32" },
      { name: "price", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_addr", type: "address" }],
    name: "getAuction",
    outputs: [
      { name: "price", type: "uint256" },
      { name: "blockNo", type: "uint256" },
      { name: "name", type: "string" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_price", type: "uint256" }],
    name: "setPrice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_to", type: "address" }],
    name: "sell",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "unregister",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_name", type: "string" }],
    name: "getAuction",
    outputs: [
      { name: "addr", type: "address" },
      { name: "price", type: "uint256" },
      { name: "blockNo", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_content", type: "bytes32" },
      { name: "_price", type: "uint256" }
    ],
    name: "setContentAndPrice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_name", type: "string" }],
    name: "register",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_name", type: "string" }
    ],
    name: "EventRegister",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_name", type: "string" }
    ],
    name: "EventUnRegister",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_name", type: "string" },
      { indexed: false, name: "_price", type: "uint256" }
    ],
    name: "EventSetPrice",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_name", type: "string" },
      { indexed: false, name: "_content", type: "bytes32" }
    ],
    name: "EventSetContent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_name", type: "string" },
      { indexed: false, name: "_content", type: "bytes32" },
      { indexed: false, name: "_price", type: "uint256" }
    ],
    name: "EventContentAndPrice",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_to", type: "address" },
      { indexed: false, name: "_price", type: "uint256" }
    ],
    name: "EventBuy",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_name", type: "string" },
      { indexed: false, name: "_price", type: "uint256" }
    ],
    name: "EventBidPrice",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_to", type: "address" },
      { indexed: false, name: "_name", type: "string" },
      { indexed: false, name: "_price", type: "uint256" }
    ],
    name: "EventSell",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "_from", type: "address" },
      { indexed: false, name: "_name", type: "string" },
      { indexed: false, name: "_price", type: "uint256" }
    ],
    name: "EventReBid",
    type: "event"
  }
];

</script>

<style scoped lang="less">
.name {
  width: 300px;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-family: Helvetica Neue;
}
.value {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  font-size: 15px;
  font-family: Helvetica Neue;
  span {
    font-size: 15px;
    font-family: Helvetica Neue;
  }
}

& /deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: rgb(92, 92, 97);
  font-family: Arial, Helvetica, sans-serif;
}

.inputData {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 130px;
}

.decodeHex {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.viewButton {
  width: 130px;
  height: 35px;
  font-size: 10px;
  text-align: center;
  color: #fff;
  background-color: #95a5a6;
}

p {
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: flex-start;
  width: 100%;
  // height: 100%;
}

.panel {
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
  justify-content: flex-start;
  width: 100%;
  // height: 100%;
  // height: 100vh;
  font-size: 15px;
  margin-left: 5px;
}

.receipt-status-success {
  color: green;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  font-size: 15px;
}

.receipt-pending-true {
  color: #000;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  font-size: 15px;
}

.receipt-status-failed {
  color: red;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  font-size: 15px;
}

.blockheight-pending-true {
  color: #000;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  font-size: 15px;
  font-weight: thin;
  font-style: italic;
}

.tag {
  font-size: 14px;
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
  color: #ffffff;
}

& /deep/ .el-card__body {
  padding: 0;
  width: 1200px;
  height: 724px;
  flex: 1;
}

& /deep/ .el-card__header {
  height: 93px;
  width: 1200px;
  background: #f4f6f9;
  display: flex;
  align-items: center;
}

.el-card {
  margin-top: -55px;
}

& /deep/ .el-tabs__content {
  height: 754px;
}

& /deep/ .el-textarea__inner {
  width: 898px;
}

.clearfix {
  display: flex;
  // content: "";
  justify-content: flex-start;
  align-items: center;
}

.address_image {
  width: 30px;
  height: 30px;
  margin-left: 56px;
}

.address {
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #788091;
  width: 1000px;
  margin-left: 16px;
  margin-right: 16px;
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
  color: #74b8fb;
  text-decoration: none;
}

.el-footer {
  text-align: center;
  line-height: 60px;
  margin-top: 750px;
}

.status {
  font-family: "Helvetica Neue", Helvetica;
  font-size: 30px;
  float: left;
}

.details {
  font-family: "Helvetica Neue", Helvetica;
  font-size: 20px;
  font-weight: 350;
}

.table {
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

.header {
  //  background-color: #F7F7F9;
  //  background-color: rgb(3, 3, 205);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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

.right-nav {
  display: none;
}
.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  // height: 754px;
}

@media screen and (max-width: 991px) {
  & /deep/ .el-card__body {
    padding: 0;
    width: 675px;
    height: 975px;
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
    background: #f4f6f9;
    display: flex;
    align-items: center;
  }

  & /deep/ .el-tabs__content {
    height: 1200px;
  }

  .inputData {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  & /deep/ .el-textarea__inner {
    width: 650px;
    height: 50px;
  }

  .table {
    //  background-color: #F7F7F9;
    //  background-color: rgb(3, 3, 205);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    // height: 800px;
    font-size: 15px;
    p {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  .right-nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .search {
    width: 425px;
    height: 40px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;

    .search-icon {
      width: 24px;
      height: 24px;
      background-image: url(~assets/home-search-icon.png);
      position: absolute;
      right: 34px;
      top: 8px;
    }
    & /deep/ .el-input__inner {
      border-radius: 20px;
      width: 400px;
      text-align: center;
    }
  }

  .el-footer {
    // background-color: #00C8FF;
    text-align: center;
    line-height: 60px;
    margin-top: 1150px;
    width: 100%;
  }
  .status {
    font-family: "Helvetica Neue", Helvetica;
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
    justify-content: center;
    color: #000;
    font-family: "Helvetica Neue", Helvetica;
    font-size: 20px;
  }
  .network-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 1200px;
    top: 110px;
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
  & /deep/ .el-card {
    width: 100%;
    height: 1100px;
  }

  & /deep/ .el-card__body {
    padding: 0;
    width: 430px;
    height: 1100px;
    flex: 1;
  }

  & /deep/ .el-tabs__content {
    width: 355px;
    height: 1100px;
    overflow: auto;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    // height: 800px;
    font-size: 15px;
    p {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
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
    width: 100%;
    background: #f4f6f9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & /deep/ .el-textarea__inner {
    width: 320px;
    height: 50px;
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
  .table {
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
    margin-top: 20px;

    .search-icon {
      width: 24px;
      height: 24px;
      background-image: url(~assets/home-search-icon.png);
      position: absolute;
      right: 34px;
      top: 8px;
    }
    & /deep/ .el-input__inner {
      border-radius: 20px;
      width: 330px;
      text-align: center;
      margin-left: 10px;
    }
  }

  .el-footer {
    // background-color: #00C8FF;
    text-align: center;
    line-height: 60px;
    margin-top: 1200px;
    width: 100%;
  }
  .status {
    font-family: "Helvetica Neue", Helvetica;
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
    justify-content: center;
    color: #000;
    font-family: "Helvetica Neue", Helvetica;
    font-size: 20px;
  }
  .network-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 1300px;
    margin-top: -50px;
  }
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }

  .internal_tx {
    width: 350px;
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
