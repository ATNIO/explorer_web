<template>
  <div class="body">
    <Header />

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
              <i
                class="search-icon"
                v-on:click="this.search"
              ></i>
            </div>
          </div>
          <br>
          <br>
          <div class="description">
            <p>{{ this.$t('ans.ans') }}</p>
          </div>

          <el-tabs
            v-model="activeTab"
            type="border-card"
            @tab-click="handleClick"
          >
            <el-tab-pane
              :label="this.$t('ans.ans')"
              name="first"
              class="tab-pane"
            >
              <div class="wrapper-search">
                <div class="search">
                  <el-input
                    v-model="inputAns"
                    class="input"
                    :placeholder="this.$t('ans.search')"
                    @keyup.enter.native="searchAns"
                  ></el-input>
                  <i
                    class="search-icon"
                    v-on:click="this.searchAns"
                  ></i>
                </div>
              </div>
              <el-table
                :data="ansTable"
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
                    color:'#788091',
                    fontFamily: 'PingFangSC-Regular',
                }"
                :empty-text="this.$t('utils.empty_text')"
                v-loading="loading"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-customClass="loading"
              >
                <el-table-column
                  prop="name"
                  :label="this.$t('ans.name')"
                  min-width="120"
                ></el-table-column>

                <el-table-column
                  prop="owner"
                  :label="this.$t('ans.owner')"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <nuxt-link :to="'/accounts/' + scope.row.owner">{{ scope.row.ownerAddress }}</nuxt-link>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="price"
                  :label="this.$t('ans.price')"
                  min-width="150"
                ></el-table-column>

                <el-table-column
                  prop="content"
                  :label="this.$t('ans.content')"
                  min-width="160"
                ></el-table-column>

                <el-table-column
                  prop="bidPrice"
                  :label="this.$t('ans.highestPrice')"
                  min-width="150"
                ></el-table-column>

                <el-table-column
                  prop="bidder"
                  :label="this.$t('ans.bidder')"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <nuxt-link :to="'/accounts/' + scope.row.bidder">{{ scope.row.bidderAddress }}</nuxt-link>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="blockNumber"
                  :label="this.$t('ans.blockNo')"
                >
                  <template slot-scope="scope">
                    <nuxt-link :to="'/blocks/' + scope.row.blockNumber">{{ scope.row.blockNumber }}</nuxt-link>
                  </template>
                </el-table-column>
              </el-table>
              <br>
              <div class="page">
                <el-pagination
                  small
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="this.pageSize"
                  layout="total, prev, pager, next"
                  :total="this.total"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-main>
    <br>
    <br>
    <el-footer>
      <!-- <Footer/> -->
    </el-footer>
  </div>
</template>

<style scoped lang="less">
.body {
  background-color: #f5f7fa;
  height: 3515px;
  position: relative;
}

a {
  color: #74b8fb;
  text-decoration: none;
}

.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #ffffff;
}

.wrapper-search {
  margin-bottom: 20px;
  .search {
    width: 306px;
    height: 36px;
    position: relative;

    .search-icon {
      width: 20px;
      height: 20px;
      background-image: url(~/assets/home-search-icon.png);
      position: absolute;
      right: 16px;
      bottom: 9px;
    }
    & /deep/ .el-input__inner {
      border-radius: 20px;
    }
  }
}
& /deep/ .el-card__body {
  padding: 0;
  width: 950px;
  height: 2108px;
  flex: 1;
  margin: 50px 50px;
}

.tab-pane {
  padding: 0;
  width: 950px;
  height: 2108px;
  flex: 1;
  margin: 20px 50px;
}

& /deep/ .el-table--fit {
  margin-top: 20px;
}

.table-card {
  margin-top: 20px;
}

.el-card {
  margin-top: -55px;
  margin-bottom: 85px;
}
.title {
  width: 100px;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  color: rgba(13, 33, 56, 1);
  margin: -20px auto 0px;
}

& /deep/ .el-tag--success {
  width: 36px;
  // height: 20px;
  background: #eef9f4;
  border-radius: 9.5px;
  opacity: 1;
  display: inline-block;
  border: none;
  color: #44c58e;
  font-size: 13px;
}

& /deep/ .el-tag--warning {
  width: 36px;
  // height: 20px;
  background: #fff5ea;
  border-radius: 9.5px;
  opacity: 1;
  display: inline-block;
  border: none;
  color: #ff9500;
  font-size: 13px;
}

.orange-rag {
  & /deep/ .el-tag--medium {
    width: 36px;
    // height: 20px;
    background: #eef9f4;
    border-radius: 9.5px;
    opacity: 1;
    display: inline-block;
    border: none;
    color: #44c58e;
    font-size: 13px;
  }
}

.name-template {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
}

.name-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  font-family: PingFangSC-Semibold;
  font-size: 15px;
}

.content-style {
  font-family: PingFangSC-Semibold;
  font-size: 10px;
  font-weight: lighter;
}

.name-icon {
  margin-right: 10px;
  // margin-bottom: -5px;
}

.green-icon {
  margin-left: -20px;
  color: #00d555;
  width: 6.2px;
  height: 8.2px;
}

.red-icon {
  margin-left: -20px;
  color: #f13a30;
  width: 6.2px;
  height: 8.2px;
}
.up {
  background: url("../../assets/up.png") no-repeat center center / contain;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: -10px;
}
.down {
  background: url("../../assets/down.png") no-repeat center center / contain;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: -10px;
}

.green-rank-change {
  color: #00d555;
  font-size: 1px;
  margin-left: 15px;
}

.red-rank-change {
  color: #f13a30;
  font-size: 1px;
  margin-left: 15px;
}

.title-small {
  width: 53px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(120, 128, 145, 1);
  line-height: 20px;
  margin-right: 30px;
}
.total {
  margin-right: 5px !important;
}

.green-circle:before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background: rgba(68, 197, 142, 1);
  border-radius: 100%;
  margin-right: 10px;
}
.orange-circle:before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background: rgba(255, 149, 0, 1);
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
  width: 1090px;
  position: absolute;
  top: 110px;
}

.status {
  font-family: "Helvetica Neue", Helvetica;
  font-size: 30px;
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

.el-footer {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 35px;
}

.el-aside {
  background-color: #d3dce6;
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
    background-color: #f5f7fa;
    height: 2300px;
    position: relative;
  }
  & /deep/ .el-card__body {
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
  & /deep/ .el-card__body {
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
    margin-top: 1050px;
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
import {
  search,
  addressSimplify,
  timeFormat,
  hexToUtf8,
  valueToATN
} from "~/common/method.js";
const Web3 = require("web3");

export default {
  components: {
    Header,
    Footer
  },
  created() {},
  mounted() {
    this.showData();
  },
  data() {
    return {
      ansTable: [],
      total: 0,
      currentPage: 1,
      pageSize: 11,
      input: "",
      inputAns: "",
      loading: true,
      activeTab: "first"
    };
  },
  methods: {
    handleSelect(key, keyPath) {},
    showData() {
      this.getAnsList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.inputAns) {
        this.searchNameAnsList();
      } else {
        this.getAnsList();
      }
    },
    search() {
      search(this);
    },
    searchAns() {
      if (this.inputAns) {
        this.searchNameAnsList();
      } else {
        this.getAnsList();
      }
    },
    getAnsList() {
      this.ansTable = [];
      this.$axios
        .$get(
          "/ans/list?page_size=" +
            this.pageSize +
            "&page_number=" +
            this.currentPage
        )
        .then(res => {
          this.total = res.count;
          res.ansList.forEach(e => {
            let ans = {};
            ans.name = e.Name;
            ans.blockNumber = e.BlockNumber;
            ans.owner = e.Owner;
            ans.ownerAddress = addressSimplify(e.Owner);
            ans.txId = addressSimplify(e.TransactionHash);
            ans.time = timeFormat(e.Timestamp);
            ans.content = hexToUtf8(e.Content);
            ans.bidPrice = valueToATN(e.BidPrice);
            ans.price = valueToATN(e.Price);
            ans.bidder = e.Bidder;
            ans.bidderAddress = addressSimplify(e.Bidder);
            this.ansTable.push(ans);
          });
          this.loading = false;
        })
        .catch(error => {
          console.log("error", error);
          this.loading = false;
        });
    },
    searchNameAnsList() {
      this.ansTable = [];
      this.$axios
        .$get(
          "/ans/name/" +
            this.inputAns +
            "?page_size=" +
            this.pageSize +
            "&page_number=" +
            this.currentPage
        )
        .then(res => {
          this.total = res.count;
          res.ansList.forEach(e => {
            let ans = {};
            ans.name = e.Name;
            ans.blockNumber = e.BlockNumber;
            ans.owner = e.Owner;
            ans.ownerAddress = addressSimplify(e.Owner);
            ans.txId = addressSimplify(e.TransactionHash);
            ans.time = timeFormat(e.Timestamp);
            ans.content = hexToUtf8(e.Content);
            ans.bidPrice = valueToATN(e.BidPrice);
            ans.price = valueToATN(e.Price);
            ans.bidder = e.Bidder;
            ans.bidderAddress = addressSimplify(e.Bidder);
            this.ansTable.push(ans);
          });
          this.loading = false;
        })
        .catch(error => {
          console.log("error", error);
          this.loading = false;
        });
    },
    handleClick() {}
  }
};
</script>