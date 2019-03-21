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
                :placeholder="this.$t('header.search')"
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
            <p>{{ this.$t("vote.details") }}</p>
          </div>
          <el-card class="first-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span class="address">
                {{ this.$t("vote.supernodes") }}:
                <span class="node_address">{{ this.address }}</span>
              </span>
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
            <div class="details_tag">
              {{ this.$t("vote.votes") }}：
              <span class="details_value">{{this.scores}}</span>
            </div>
            <div class="details_tag">
              {{ this.$t("vote.voters") }}：
              <span class="details_value">{{this.voters}}</span>
            </div>
            <div class="details_tag">
              {{ this.$t("vote.voteRank") }}：
              <span class="details_value">{{this.rank}}</span>
            </div>
            <div class="details_tag">
              {{ this.$t("vote.time") }}：
              <span class="details_value">{{this.lastSealTime}}</span>
            </div>
          </el-card>
          <br>

          <el-card class="second-card">
            <p class="title">{{ this.$t("vote.voterSlice") }}:</p>
            <el-table
              :data="votersTable"
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
              :empty-text="this.$t('utils.empty_text')"
              v-loading="loading"
              element-loading-text="Loading..."
              element-loading-spinner="el-icon-loading"
              element-loading-customClass="loading"
            >
              <el-table-column
                prop="number"
                :label="this.$t('vote.voter')"
              >
                <template slot-scope="scope">
                  <nuxt-link :to="'/accounts/' + scope.row.address">{{ scope.row.name }}</nuxt-link>
                </template>
              </el-table-column>

              <el-table-column
                prop="votes"
                :label="this.$t('vote.voterVotings')"
              ></el-table-column>
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
            <!-- <div class="mobile-page">
                    <el-pagination
                        small
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size=this.pageSize
                        layout="prev, pager,next"
                        :total=this.total
                        >
                    </el-pagination>
            </div>-->
          </el-card>
        </div>
      </div>
    </el-main>
    <br>
    <br>
    <el-footer>
      <Footer />
    </el-footer>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import axios from "axios";
import {
  toDate,
  toDecimals,
  toTime,
  addressSimplify2,
  timeToHms,
  search
} from "~/common/method.js";
const Web3 = require("web3");
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
      votes: "",
      voters: "",
      scores: "",
      rank: 1,
      pVotes: 0,
      lastSealTime: "",
      transactionTable: [],
      total: 0,
      currentPage: 1,
      pageSize: 21,
      loading: true,
      votersTable: [],
      input: "",
      pageNumber: 1
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    async showData() {
      await this.$axios
        .$get(
          "/votes/candidatesStatus?page_size=" +
            this.pageSize +
            "&page_number=1"
        )
        .then(res => {
          let candidates = res.candidates;
          let i = 1;
          for (let c of candidates) {
            if (c.address === this.address) {
              this.rank = i;
              this.pVotes = c.pVotes.toFixed(3) + "%";
            }
            i++;
          }
          this.loading = false;
        })
        .catch(error => {
          console.log("error", error);
          this.loading = false;
        });

      this.$axios
        .$get("/votes/candidatesStatus/" + this.address)
        .then(res => {
          this.votes = +res.votes.toLocaleString("en-US");
          this.scores = this.votes + " (" + this.pVotes + ")";
          this.voters = parseInt(res.voters).toLocaleString("en-US");
          this.lastSealTime = timeToHms(res.lastSealTime);
          this.loading = false;
        })
        .catch(error => {
          console.log("error", error);
          this.loading = false;
        });

      this.getCacheVotes();
    },

    getCacheVotes() {
      this.votersTable = [];
      this.$axios
        .$get(
          "/votes/cacheVotes/" +
            this.address +
            "?page_size=" +
            this.pageSize +
            "&page_number=" +
            this.pageNumber
        )
        .then(res => {
          this.total = res.length;
          for (let r of res) {
            let voters = {};
            voters.name = addressSimplify2(r.address);
            voters.address = r.address;
            voters.votes = r.votes;
            this.votersTable.push(voters);
          }
          this.loading = false;
        });
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },

    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getCacheVotes();
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


<style scoped lang="less">

.body {
  background-color: #f5f7fa;
  position: relative;
}

.method-table {
  width: 930px;
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

// & /deep/ .el-card__body{
//     padding: 0;
//     width: 1050px;
//     height: 226px;
//     flex: 1;
//     border-radius: 5px;
// }

& /deep/ .el-card__header {
  height: 60px;
  width: 1050px;
  background: #fff;
  display: flex;
  align-items: center;
  border: none;
}

.first-card {
  width: 1050px;
  height: 206pt;
  flex: 1;
  border-radius: 5px;
}

.second-card {
  width: 1050px;
  height: 1424px;
  flex: 1;
  border-radius: 5px;
}

.el-card {
  display: flex;
  margin-top: -55px;
  margin-bottom: 85px;
  flex-direction: column;
  .details_tag {
    display: flex;
    justify-content: flex-start;
    font-size: 14pt;
    color: #0d2138;
    font-family: PingFangSC;
    width: 100%;
    margin-bottom: 12px;
    margin-left: 15px;
    .details_value {
      color: #788091;
      font-size: 14pt;
    }
  }
}

.title {
  width: 100px;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  color: rgba(13, 33, 56, 1);
  margin: auto auto 10px auto;
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

.clearfix {
  display: flex;
  // content: "";
  justify-content: flex-start;
  align-items: center;
}

.address_image {
  width: 86px;
  height: 28px;
  margin-left: 30px;
}

.address {
  font-family: PingFangSC;
  font-size: 20px;
  color: #0d2138;
  margin-left: 16px;
  margin-right: 16px;
  .node_address {
    color: #74b8fb;
    margin-left: 15px;
  }
}

.copy_image {
  width: 27px;
  height: 27px;
  margin-top: 5px;
}

.network-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1050px;
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

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
}

.right-nav {
  display: none;
}
@media screen and (max-width: 991px) {
  // & /deep/ .el-card__body {
  //   padding: 0;
  //   width: 675px;
  //   height: 875px;
  //   flex: 1;
  // }

  & /deep/ .el-card__header {
    height: 60px;
    width: 800px;
    background: #fff;
    display: flex;
    align-items: center;
    border: none;
  }

  .first-card {
    width: 800px;
    height: 206pt;
    flex: 1;
    border-radius: 5px;
  }

  .second-card {
    width: 800px;
    height: 1024px;
    flex: 1;
    border-radius: 5px;
  }

  .method-table {
    width: 672px;
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
    margin-top: 1100px;
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
    width: 1090px;
    position: absolute;
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
  // & /deep/ .el-card__body {
  //   padding: 0;
  //   width: 375px;
  //   height: 875px;
  //   flex: 1;
  // }

  & /deep/ .el-card__header {
    height: 93px;
    width: 400px;
    background: #f4f6f9;
    display: flex;
    align-items: center;
  }
  .first-card {
    width: 400px;
    height: 206pt;
    flex: 1;
    border-radius: 5px;
  }

  .second-card {
    width: 400px;
    // height: 2624px;
    flex: 1;
    border-radius: 5px;
  }

  .method-table {
    width: 320px;
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
      background-image: url(~assets/home-search-icon.png);
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
  .try-button {
    background: #74b8fb;
    box-shadow: 0 2px 9px 0 rgba(120, 171, 221, 0.6);
    border-radius: 28px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #ffffff;
    text-align: center;
    width: 300px;
    height: 56px;
  }

  .el-footer {
    // background-color: #00C8FF;
    text-align: center;
    line-height: 60px;
    margin-top: 1100px;
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
    margin-top: 30px;
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
