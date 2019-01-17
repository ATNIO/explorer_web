<template>
  <div class="body">
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
            <p>ATN Accounts</p>
          </div>
          <el-card class="table-card">
            <el-table
              :data="accountTable"
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
              empty-text=""
              v-loading="loading"
              element-loading-text="Loading..."
              element-loading-spinner="el-icon-loading"
              element-loading-customClass="loading"
            >
              <el-table-column prop="address" label="Address" min-width="400">
                <template slot-scope="scope">
                  <nuxt-link :to="'/accounts/' + scope.row.address">{{ scope.row.address }}</nuxt-link>
                </template>
              </el-table-column>

              <el-table-column prop="balance" label="Balance" min-width="200"></el-table-column>

              <el-table-column prop="percentage" label="Percentage" min-width="200"></el-table-column>

              <!-- <el-table-column
                            prop="txCount"
                            label="TxCount"
                            min-width="100"
                        >
              </el-table-column>-->
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
            <div class="mobile-page">
              <el-pagination
                small
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="this.pageSize"
                layout="prev, pager,next"
                :total="this.total"
                :pager-count="3"
              ></el-pagination>
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
.body {
  background-color: #f5f7fa;
  height: 1275px;
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

& /deep/ .el-card__body {
  padding: 0;
  width: 1050px;
  height: 754px;
  flex: 1;
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
  font-family: "Helvetica Neue", Helvetica;
  font-size: 30px;
}

.details {
  font-family: "Helvetica Neue", Helvetica;
  font-size: 27px;
  font-weight: 300;
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

.table {
  //  background-color: #F7F7F9;
  //  background-color: rgb(3, 3, 255);
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
  //  background-color: rgb(3, 3, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.el-footer {
  text-align: center;
  line-height: 60px;
  margin-top: 680px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  // background-color: #F5F7FA;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}
.right-nav {
  display: none;
}
.mobile-page {
  display: none;
}
@media screen and (max-width: 991px) {
  & /deep/ .el-card__body {
    padding: 0;
    width: 450px;
    height: 880px;
    flex: 1;
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
    height: 850px;
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
import { search } from "~/common/method.js";
import axios from "axios";
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
      accountTable: [],
      total: 0,
      currentPage: 1,
      pageSize: 11,
      input: "",
      loading: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    showData() {
      this.$axios
        .$get(
          "/accounts/list?page_size=" +
            this.pageSize +
            "&page_number=" +
            this.currentPage
        )
        .then(res => {
          this.total = res.count;
          for (let r of res.accountsList) {
            let account = {};
            // console.log("accounts list res", res)
            account.address = r.Address;
            account.balance =
              Math.floor((parseInt(r.Balance) / 1e18) * 100) / 100 + " ATN";
            let temp = (parseInt(r.Balance) / 1e18 / 1e56).toFixed(11);
            var e = parseInt(temp.toString().split("e-")[1]);
            // console.log("e",e)
            if (e) {
              temp *= Math.pow(10, e - 1);
              temp =
                "0." + new Array(e).join("0") + temp.toString().substring(2);
            }
            account.percentage = temp + "%";
            this.accountTable.push(account);
          }
          this.loading = false;
        })
        .catch(error => {
          console.log("error", error);
          this.loading = false;
        });
    },
    handleCurrentChange(val) {
      this.accountTable = [];
      this.currentPage = val;
      this.$axios
        .$get(
          "/accounts/list?page_size=" +
            this.pageSize +
            "&page_number=" +
            this.currentPage
        )
        .then(res => {
          this.total = res.count;
          for (let r of res.accountsList) {
            let account = {};
            // console.log("accounts list res", res)
            account.address = r.Address;
            account.balance =
              Math.floor((parseInt(r.Balance) / 1e18) * 100) / 100 + " ATN";
            let temp = (parseInt(r.Balance) / 1e18 / 1e56).toFixed(11);
            var e = parseInt(temp.toString().split("e-")[1]);
            // console.log("e",e)
            if (e) {
              temp *= Math.pow(10, e - 1);
              temp =
                "0." + new Array(e).join("0") + temp.toString().substring(2);
            }
            account.percentage = temp + "%";
            this.accountTable.push(account);
          }
          this.loading = false;
        })
        .catch(error => {
          console.log("error", error);
          this.loading = false;
        });
    },
    search() {
      search(this);
    }
  }
};
</script>