<template>
  <div>
    <Header/>

    <el-main class="main">
      <div class="table">
        <div class="network-status">
          <div class="right-nav">
            <div class="search">
              <el-input
                v-model="input"
                class="input"
                placeholder="Search"
                @keyup.enter.native="search"
              ></el-input>
              <i class="search-icon" v-on:click="this.search"></i>
            </div>
          </div>
          <br>
          <br>
          <div class="description">
            <template v-if="this.isContract == 'false'">
              <p>Account Details</p>
            </template>
            <template v-if="this.isContract == 'true'">
              <p>Contract Details</p>
            </template>
          </div>
          <el-card class="table-card">
            <div slot="header" class="clearfix">
              <img src="~/assets/address.png" class="address_image">
              <span class="address">Address: {{ this.address }}</span>
              <a href="#">
                <img
                  src="~/assets/copy.png"
                  class="copy_image"
                  v-clipboard:copy="this.address"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
              </a>
            </div>
            <div class="table">
              <div class="form">
                <el-table
                  :data="leftTable"
                  :show-header="false"
                  class="left-table"
                  type="flex"
                  align="middle"
                  justify="space-between"
                >
                  <el-table-column prop="attribute"></el-table-column>

                  <el-table-column prop="value" label align="right"></el-table-column>
                </el-table>

                <div class="common-right-table">
                  <el-table
                    :data="rightTable"
                    :show-header="false"
                    class="right-table"
                    type="flex"
                    align="middle"
                    justify="space-between"
                  >
                    <el-table-column prop="attribute" label min-width="150"></el-table-column>

                    <el-table-column prop="value" label align="right" min-width="200"></el-table-column>
                  </el-table>
                </div>

                <div class="mobile-right-table">
                  <el-table
                    :data="rightTable"
                    :show-header="false"
                    class="right-table"
                    type="flex"
                    align="middle"
                    justify="space-between"
                  >
                    <el-table-column prop="attribute" label></el-table-column>

                    <el-table-column prop="value" label align="right"></el-table-column>
                  </el-table>
                </div>
              </div>
              <br>
              <br>
              <br>
              <el-tabs
                v-model="activeName2"
                type="border-card"
                @tab-click="handleClick"
                style="width: 100%;"
              >
                <el-tab-pane label="Transactions" name="first">
                  <el-table
                    :data="transactionTable"
                    style="width: 100%; "
                    :header-cell-style="{ 
                                        padding:'0px',
                                        textAlign:'center'
                                    }"
                    :cell-style="{
                                        textAlign:'center',
                                        color:'#788091'
                                    }"
                  >
                    <el-table-column prop="blockNumber" label="Block">
                      <template slot-scope="scope">
                        <nuxt-link
                          :to="'/blocks/' + scope.row.blockNumber"
                        >{{ scope.row.blockNumber }}</nuxt-link>
                      </template>
                    </el-table-column>

                    <el-table-column prop="time" label="Time"></el-table-column>

                    <el-table-column prop="txId" label="hash" width="200">
                      <template slot-scope="scope">
                        <nuxt-link :to="'/transactions/' + scope.row.hash">{{ scope.row.txId }}</nuxt-link>
                      </template>
                    </el-table-column>

                    <el-table-column prop="from" label="From">
                      <template slot-scope="scope">
                        <nuxt-link :to="'/accounts/' + scope.row.fromAddress">{{ scope.row.from }}</nuxt-link>
                      </template>
                    </el-table-column>

                    <!-- <el-table-column
                                        prop="tag"
                                        label=""
                                        >
                                        <template slot-scope="scope">
                                            <el-tag :type="scope.row.tag" size="small" class="tag">{{ scope.row.tagValue }}</el-tag>
                                        </template>
                    </el-table-column>-->
                    <el-table-column prop="to" label="To">
                      <template slot-scope="scope">
                        <nuxt-link :to="'/accounts/' + scope.row.toAddress">{{ scope.row.to }}</nuxt-link>
                      </template>
                    </el-table-column>

                    <el-table-column prop="value" label="Value" min-width="100"></el-table-column>
                  </el-table>
                  <br>
                  <el-pagination
                    small
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="this.pageSize"
                    layout="total, prev, pager, next"
                    :total="this.total"
                  ></el-pagination>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-card>
        </div>
      </div>
    </el-main>
    <br>
    <br>
    <el-footer>
      <Footer/>
    </el-footer>
  </div>
</template>

<style scoped lang="less">
.tag {
  font-size: 14px;
}

.form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 1100px;
  margin: 27px 60px 0 60px;

  .left-table {
    // width: 150px;
    margin-right: 50px;

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
    width: 300px;
    margin-left: 20px;

    // & /deep/ .el-table_2_column_3 {
    //     font-family: PingFangSC-Medium;
    //     font-size: 16px;
    //     color: #0D2138;
    // }

    // & /deep/ .el-table_2_column_4 {
    //     font-family: PingFangSC-Regular;
    //     font-size: 16px;
    //     color: #788091;
    //     text-align: right;
    // }
  }
}
.method-table {
  width: 1100px;
  // margin-left: 60px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #0d2138;
  }
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
  justify-content: center;
  margin-bottom: 64px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #ffffff;
}

& /deep/ .el-card__body {
  padding: 0;
  width: 1200px;
  height: 754px;
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
  height: 576px;
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
  // width: 1000px;
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
  margin-top: 800px;
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

.common-right-table {
  display: flex;
  width: 550px;
}

.mobile-right-table {
  display: none;
}
@media screen and (max-width: 991px) {
  & /deep/ .el-card__body {
    padding: 0;
    width: 675px;
    height: 1075px;
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
    height: 876px;
  }

  .el-tabs {
    height: 1000px;
  }

  .common-right-table {
    display: flex;
    width: 500px;
  }

  .mobile-right-table {
    display: none;
  }

  .form {
    display: flex;
    flex-direction: column;
    width: 500px;
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
    }
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

  .right-nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .search {
    width: 644px;
    height: 40px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;

    .search-icon {
      width: 24px;
      height: 24px;
      background-image: url(~/assets/home-search-icon.png);
      position: absolute;
      right: 34px;
      top: 8px;
    }
    & /deep/ .el-input__inner {
      border-radius: 20px;
      width: 640px;
      text-align: center;
    }
  }

  .el-footer {
    // background-color: #00C8FF;
    text-align: center;
    line-height: 60px;
    margin-top: 1350px;
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
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #000;
    font-family: "Helvetica Neue", Helvetica;
    font-size: 20px;
    float: left;
  }
  .network-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 1400px;
    margin-top: -50px;
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
  & /deep/ .el-card__body {
    padding: 0;
    width: 375px;
    height: 1075px;
    flex: 1;
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
    width: 375px;
    background: #f4f6f9;
    display: flex;
    align-items: center;
  }

  & /deep/ .el-tabs__content {
    height: 876px;
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

    .search-icon {
      width: 24px;
      height: 24px;
      background-image: url(~/assets/home-search-icon.png);
      position: absolute;
      right: 34px;
      top: 8px;
    }
    & /deep/ .el-input__inner {
      border-radius: 20px;
      width: 330px;
      text-align: center;
    }
  }

  .el-footer {
    // background-color: #00C8FF;
    text-align: center;
    line-height: 60px;
    margin-top: 1350px;
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
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #000;
    font-family: "Helvetica Neue", Helvetica;
    font-size: 20px;
    float: left;
  }
  .network-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 1400px;
    margin-top: -50px;
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
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import axios from "axios";
import { toDate, toTime, addressSimplify, search } from "~/common/method.js";
import VueClipboard from "vue-clipboard2";
import Vue from "vue";

Vue.use(VueClipboard);

export default {
  components: {
    Header,
    Footer
  },
  asyncData({ params }) {
    console.log("params address", params.address);
    return { address: params.address };
  },

  created() {},
  mounted() {
    this.showData();
  },
  data() {
    return {
      address: "",
      leftTable: [],
      rightTable: [],
      accountDetailsTable: [],
      total: 0,
      currentPage: 1,
      pageSize: 9,
      atn: "",
      atnValue: "",
      txns: "",
      activeName2: "first",
      transactionTable: [],
      input: "",
      isContract: "false"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    async showData() {
      this.$axios.$get("/accounts/address/" + this.address).then(res => {
        this.atn = parseInt(res.Balance) / 1e18;
        this.isContract = res.IsContract;
        this.leftTable.push({
          attribute: "Balance: ",
          value: this.atn.toString() + " ATN"
        });
      });

      this.transactionTable = [];
      this.$axios
        .$get(
          "/transactions/list/account/" +
            this.address +
            "?page_size=" +
            this.pageSize +
            "&page_number=" +
            this.currentPage
        )
        .then(res => {
          this.txns = res.count;
          this.rightTable.push({
            attribute: "Transactions: ",
            value: this.txns + " txns"
          });
          this.total = res.count;
          for (let r of res.transactionsList) {
            let tx = {};
            tx.blockNumber = r.BlockNumber;
            tx.time = toTime(r.Timestamp);
            tx.from = addressSimplify(r.From);
            tx.txId = addressSimplify(r.Hash);
            tx.hash = r.Hash.toString();
            tx.to = addressSimplify(r.To);
            tx.fromAddress = r.From.toString();
            tx.toAddress = r.To.toString();
            tx.value = r.Value / 1e18 + " ATN";
            this.transactionTable.push(tx);
          }
          // console.log(Date.now())
        });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.transactionTable = [];
      this.$axios
        .$get(
          "/transactions/list/account/" +
            this.address +
            "?page_size=" +
            this.pageSize +
            "&page_number=" +
            this.currentPage
        )
        .then(res => {
          for (let r of res.transactionsList) {
            let tx = {};
            tx.blockNumber = r.BlockNumber;
            tx.time = toTime(r.Timestamp);
            tx.from = addressSimplify(r.From);
            tx.txId = addressSimplify(r.Hash);
            tx.hash = r.Hash.toString();
            tx.to = addressSimplify(r.To);
            tx.fromAddress = r.From.toString();
            tx.toAddress = r.To.toString();
            tx.value = r.Value / 1e18 + " ATN";
            this.transactionTable.push(tx);
          }
          // console.log(Date.now())
        });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
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
</script>