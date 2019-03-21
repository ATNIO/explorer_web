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
            <p>{{ this.$t('vote.supernodes') }}</p>
          </div>

          <el-tabs
            v-model="activeTab"
            type="border-card"
            @tab-click="handleClick"
          >
            <el-tab-pane
              :label="this.$t('vote.supernodes')"
              name="first"
              class="tab-pane"
            >
              <p class="title">{{ this.$t('vote.supernodes') }}</p>
              <el-table
                ref="delegaters"
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
                            height:'100px',                                                               
                            color:'#788091'
                        }"
                :empty-text="this.$t('utils.empty_text')"
                v-loading="loading"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-customClass="loading"
                highlight-current-row
              >
                <el-table-column
                  prop="number"
                  :label="this.$t('vote.name')"
                  width="300"
                >
                  <template slot-scope="scope">
                    <div class="name-template">
                      <AccountIcon
                        class="name-icon"
                        :value="scope.row.address"
                        size="15"
                      />
                      <div class="name-content">
                        <nuxt-link :to="'/votes/' + scope.row.address">{{ scope.row.name }}</nuxt-link>
                        <p class="content-style">{{ scope.row.content }}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="votes"
                  :label="this.$t('vote.votes')"
                ></el-table-column>

                <el-table-column
                  prop="lastSeal"
                  :label="this.$t('vote.confirmed')"
                ></el-table-column>

                <el-table-column
                  prop="sealInEpoch"
                  :label="this.$t('vote.blocks')"
                ></el-table-column>

                <el-table-column
                  prop="lastSealTime"
                  :label="this.$t('vote.time')"
                ></el-table-column>
              </el-table>
              <br>
              <div class="page">
                <el-pagination
                  small
                  @current-change="handleCurrentChange1"
                  :current-page.sync="currentPage"
                  :page-size="this.pageSize"
                  layout="total, prev, pager, next"
                  :total="this.totalDelegaters"
                ></el-pagination>
              </div>
            </el-tab-pane>

            <el-tab-pane
              :label="this.$t('vote.candidates')"
              name="second"
              class="tab-pane"
            >
              <p class="title">{{ this.$t('vote.candidates') }}</p>
              <span class="title-small green-circle">Top {{this.top}}</span>
              <span class="title-small orange-circle">Standby</span>
              <span class="title-small total">Total:</span>
              <span class="title-small">{{this.totalCandidates}} 个</span>
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
                :empty-text="this.$t('utils.empty_text')"
                v-loading="loading"
                element-loading-text="Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-customClass="loading"
                highlight-current-row
              >
                <el-table-column
                  prop="rank"
                  :label="this.$t('vote.rank')"
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
                  label
                  width="50"
                >
                  <template slot-scope="scope">
                    <template v-if="scope.row.rankIncrease == true">
                      <i class="green-icon up"></i>
                      <span class="green-rank-change">{{ scope.row.rankChange }}</span>
                    </template>
                    <template v-if="scope.row.rankDecrease == true">
                      <i class="red-icon down"></i>
                      <span class="red-rank-change">{{ scope.row.rankChange }}</span>
                    </template>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="name"
                  :label="this.$t('vote.name')"
                  width="280"
                >
                  <template slot-scope="scope">
                    <div class="name-template">
                      <AccountIcon
                        class="name-icon"
                        :value="scope.row.address"
                        size="15"
                      />
                      <div class="name-content">
                        <nuxt-link :to="'/votes/' + scope.row.address">{{ scope.row.name }}</nuxt-link>
                        <p class="content-style">{{ scope.row.content }}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="pVotes"
                  :label="this.$t('vote.pVote')"
                ></el-table-column>

                <el-table-column
                  prop="voters"
                  :label="this.$t('vote.voters')"
                ></el-table-column>

                <el-table-column
                  prop="seal"
                  :label="this.$t('vote.allBlocks')"
                ></el-table-column>

                <el-table-column
                  prop="score"
                  :label="this.$t('vote.score')"
                ></el-table-column>
              </el-table>
              <br>
              <div class="page">
                <el-pagination
                  small
                  @current-change="handleCurrentChange2"
                  :current-page.sync="currentPage"
                  :page-size="this.pageSize"
                  layout="total, prev, pager, next"
                  :total="this.totalCandidates"
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
      <Footer />
    </el-footer>
  </div>
</template>


<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import axios from "axios";
import {
  toDecimals,
  toTime,
  getANSInfo,
  hexToNumber,
  hexToUtf8,
  addressSimplify,
  addressSimplify2,
  timeToHms,
  search
} from "~/common/method.js";

export default {
  components: {
    Header,
    Footer
  },
  head: {
    script: [],
    link: [{ rel: "sylesheet", href: "~assets/icon/iconfont.css" }]
  },
  created() {},
  mounted() {
    this.showData();
    this.refresh();
  },
  data() {
    return {
      candidatesTable: [],
      delegatersTable: [],
      top: 0,
      totalDelegaters: 0,
      totalCandidates: 0,
      currentPage: 1,
      pageSize: 10,
      loading: true,
      input: "",
      lastCandidatesTable: [],
      lastDelegatersTable: [],
      candidatesPage: 1,
      delegatersPage: 1,
      currentRow: 0,
      activeTab: "first",
      ansName: new Map(),
      pageChange: false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {},

    async showData() {
      let self = this;
      await this.getCandidateStatus(self);
      this.getDelegaterStatus(self);
    },

    handleClick() {},

    refresh() {
      let self = this;
      console.log("start interval...");
      let interval = setInterval(async function() {
        self.refreshCandidatesStatus(self);

        self.refreshDelegatersStatus(self);

        // count++;
        // if(count === 2)clearInterval(interval);
        // console.log("this.pageName", self.$route.name)
        // console.log("self.pageChange", self.pageChange)
        if (self.$route.name !== "votes" || self.pageChange) {
          console.log("clear interval...");
          clearInterval(interval);
        }
      }, 5000);
    },

    async getCandidateStatus(self) {
      self.lastCandidatesTable = [];
      self.candidatesTable = [];
      await self.$axios
        .$get(
          "/votes/candidatesStatus?page_size=" +
            self.pageSize +
            "&page_number=" +
            self.candidatesPage
        )
        .then(async function(res) {
          self.top = res.count;
          self.totalCandidates = res.count;
          let i = self.pageSize * (self.candidatesPage - 1) + 1;
          let candidates = res.candidates;
          for (let j = 0; j < candidates.length && j < self.pageSize; j++) {
            let candidate = {};
            candidate.rank = i;
            candidate.address = candidates[j].address;
            candidate.name = candidates[j].nss;
            if (candidate.name.length !== 0) {
              candidate.content = candidates[j].nssdetail;
              let name = candidate.name;
              let address = " (" + addressSimplify(candidate.address) + ")";
              let content = candidate.content;
              let ans = {};
              ans.name = name;
              ans.content = content;
              //获取到短地址名称和内容时存起来以便delegaters使用
              self.ansName.set(candidate.address, ans);
              candidate.content = content;
              candidate.name = name + address;
            } else candidate.name = addressSimplify2(candidate.address);
            candidate.pledge = 10000;
            candidate.pVotes = candidates[j].pVotes.toFixed(3) + "%";
            candidate.voters = (+candidates[j].voters).toLocaleString("en-US");
            candidate.seal = (+candidates[j].seal).toLocaleString("en-US");
            candidate.score = candidates[j].score;
            self.candidatesTable.push(candidate);
            self.lastCandidatesTable.push(candidate);
            i++;
          }
          self.loading = false;
          // self.pageChange = false;
        })
        .catch(error => {
          console.log("error", error);
          self.loading = false;
        });
    },

    async getDelegaterStatus(self) {
      self.delegatersTable = [];
      self.lastDelegatersTable = [];
      self.$axios
        .$get(
          "/votes/delegatersStatus?page_size=" +
            self.pageSize +
            "&page_number=" +
            self.delegatersPage
        )
        .then(async function(res) {
          console.log(res)
          self.totalDelegaters = res.count;
          let delegaters = res.delegaters;
          for (let r of delegaters) {
            let delegater = {};
            delegater.address = r.address;
            let info = self.ansName.get(delegater.address);
            if (info !== undefined) {
              let name = info.name;
              let address = " (" + addressSimplify(delegater.address) + ")";
              let content = info.content;
              delegater.content = content;
              delegater.name = name + address;
            } else delegater.name = addressSimplify2(delegater.address);
            delegater.lastSeal = hexToNumber(r.lastSeal);
            delegater.sealInEpoch = r.sealInEpoch;
            delegater.votes = (+r.votes).toLocaleString("en-US");

            delegater.lastSealTime = timeToHms(r.lastSealTime);
            self.delegatersTable.push(delegater);
          }
          self.loading = false;
          // self.pageChange = false;
        })
        .catch(error => {
          console.log("error", error);
          self.loading = false;
        });
    },

    async refreshCandidatesStatus(self) {
      self.$axios
        .$get(
          "/votes/candidatesStatus?page_size=" +
            self.pageSize +
            "&page_number=" +
            self.candidatesPage
        )
        .then(async function(res) {
          self.top = res.count;
          self.totalCandidates = res.count;
          let i = self.pageSize * (self.candidatesPage - 1) + 1;
          let tempCandidatesTable = [];
          let candidates = res.candidates;
          let currentRow, test;
          for (let j = 0; j < candidates.length && j < self.pageSize; j++) {
            let candidate = {};
            candidate.rank = i;
            candidate.address = candidates[j].address;
            candidate.name = candidates[j].nss;
            if (candidate.name.length !== 0) {
              candidate.content = candidates[j].nssdetail;
              let name = candidate.name;
              let address = " (" + addressSimplify(candidate.address) + ")";
              let content = candidate.content;
              let ans = {};
              ans.name = name;
              ans.content = content;
              //获取到短地址名称和内容时存起来以便getDelegaters使用
              self.ansName.set(candidate.address, ans);
              candidate.content = content;
              candidate.name = name + address;
            } else candidate.name = addressSimplify2(candidate.address);
            candidate.pledge = 10000;
            candidate.pVotes = candidates[j].pVotes.toFixed(3) + "%";
            candidate.voters = (+candidates[j].voters).toLocaleString("en-US");
            candidate.seal = (+candidates[j].seal).toLocaleString("en-US");
            candidate.score = candidates[j].score;
            for (let k = 0; k < self.lastCandidatesTable.length; k++) {
              if (
                candidates[j].address === self.lastCandidatesTable[k].address
              ) {
                //计算排名变化
                if (j < k) {
                  candidate.rankIncrease = true;
                  candidate.rankChange = k - j;
                } else if (j > k) {
                  candidate.rankDecrease = true;
                  candidate.rankChange = j - k;
                }
                //计算出块变化
                if (
                  +candidates[j].seal >
                  +self.lastCandidatesTable[k].seal.toString().replace(/,/g, "")
                ) {
                  currentRow = j;
                  test = k;
                }
                break;
              }
            }
            tempCandidatesTable.push(candidate);
            i++;
          }
          self.setCurrentCandidates(self.candidatesTable[test]);
          await self.sleep(1000);
          self.candidatesTable = tempCandidatesTable;
          self.setCurrentCandidates(self.candidatesTable[currentRow]);
          self.lastCandidatesTable = self.candidatesTable;
        })
        .catch(error => {
          console.log("error", error);
          self.loading = false;
        });
    },

    async refreshDelegatersStatus(self) {
      self.$axios
        .$get(
          "/votes/delegatersStatus?page_size=" +
            self.pageSize +
            "&page_number=" +
            self.delegatersPage
        )
        .then(async function(res) {
          let tempDelegatersTable = [];
          self.totalDelegaters = res.count;
          let delegaters = res.delegaters;
          let currentRow, test;
          for (let j = 0; j < delegaters.length && j < self.pageSize; j++) {
            let delegater = {};
            delegater.address = delegaters[j].address;
            let info = self.ansName.get(delegater.address);
            if (info !== undefined) {
              let name = info.name;
              let content = info.content;
              let address = " (" + addressSimplify(delegater.address) + ")";
              delegater.content = content;
              delegater.name = name + address;
            } else delegater.name = addressSimplify2(delegater.address);

            delegater.lastSeal = hexToNumber(delegaters[j].lastSeal);
            delegater.sealInEpoch = delegaters[j].sealInEpoch;
            delegater.votes = (+delegaters[j].votes).toLocaleString("en-US");

            delegater.lastSealTime = timeToHms(delegaters[j].lastSealTime);
            // console.log("delegater.address", delegater.address);
            // console.log("self.lastDelegatersTable", self.lastDelegatersTable)
            for (let k = 0; k < self.lastDelegatersTable.length; k++) {
              if (
                delegaters[j].address === self.lastDelegatersTable[k].address
              ) {
                if (
                  +delegaters[j].lastSeal >
                  +self.lastDelegatersTable[k].lastSeal
                    .toString()
                    .replace(/,/g, "")
                ) {
                  currentRow = j;
                  test = k;
                }
                break;
              }
            }
            tempDelegatersTable.push(delegater);
          }
        //   console.log("test", test)
          self.setCurrentDelegaters(self.delegatersTable[test]);
          await self.sleep(1000);
          self.delegatersTable = tempDelegatersTable;
          self.setCurrentDelegaters(self.delegatersTable[currentRow]);
          self.lastDelegatersTable = self.delegatersTable;
        })
        .catch(error => {
          console.log("error", error);
          self.loading = false;
        });
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    setCurrentCandidates(row) {
      this.$refs.candidates.setCurrentRow(row);
    },

    setCurrentDelegaters(row) {
    //   console.log("row", row);
      this.$refs.delegaters.setCurrentRow(row);
    },

    handleCurrentChange2(val) {
      // console.log("candidate val", val)
      this.candidatesPage = val;
      this.pageChange = true;
      this.getCandidateStatus(this);
    },

    handleCurrentChange1(val) {
      // console.log("delegater val", val)
      this.delegatersPage = val;
      this.pageChange = true;
      this.getDelegaterStatus(this);
    },

    search() {
      search(this);
    }
  }
};
</script>


<style scoped lang="less">
.body {
  background-color: #f5f7fa;
  height: 1375px;
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

& /deep/ .el-card__body {
  padding: 0;
  width: 900px;
  height: 1300px;
  flex: 1;
  margin: 50px 50px;
}

.tab-pane {
  padding: 0;
  width: 900px;
  height: 1350px;
  flex: 1;
  margin: 20px 50px;
}

& /deep/ .el-table--fit {
  margin-top: 20px;
}

.table-card {
  margin-top: 20px;
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
  height: 95px;
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
  text-align: center;
  line-height: 60px;
  margin-top: 880px;
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
    height: 1400px;
    position: relative;
  }
  & /deep/ .el-card__body {
    padding: 0;
    width: 750px;
    height: 1400px;
    flex: 1;
  }

  & /deep/ .el-tabs {
    border-radius: 20px;
  }

  & /deep/ .el-tabs__content {
    width: 800px;
    border-radius: 20px;
  }

  .tab-pane {
    padding: 0;
    width: 700px;
    height: 1400px;
    flex: 1;
    margin: 20px 50px;
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
    margin-top: 1200px;
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

  & /deep/ .el-card__body {
    padding: 0;
    width: 400px;
    height: 1450px;
    flex: 1;
  }

  & /deep/ .el-tabs__content {
    width: 400px;
    border-radius: 20px;
  }

  .tab-pane {
    padding: 0;
    width: 300px;
    height: 1450px;
    flex: 1;
    margin: 20px 50px;
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

  .el-footer {
    // background-color: #00C8FF;
    text-align: center;
    line-height: 60px;
    margin-top: 1220px;
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

