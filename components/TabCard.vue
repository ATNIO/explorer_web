<template>
    <div class="table">
        <div class="network-status">
            <div class="header" >
                <el-card>
                    <div class="grid-content" >
                        <div>  
                            <p class="last-block">
                            BLOCK
                            </p>
                            <transition name="fade">
                                <p v-show="update" class="last-block1">
                                {{latestBlockNumber}}
                                </p>
                            </transition>
                        </div>
                        <div>
                            <img src="~/assets/home-block-icon.png" class="icon">
                        </div>
                    </div>
                </el-card>
                <el-card>
                <div class="grid-content" >
                        <div>  
                            <p class="last-block">
                                LAST BLOCK
                            </p>
                            <transition name="fade">
                                <p v-show="update" class="last-block1">
                                    {{lastBlockTime}}
                                </p>
                            </transition>
                        </div>
                        <div>
                            <img src="~/assets/home-last block-icon.png" class="icon">
                        </div>
                    </div>
                </el-card>
                <el-card>
                    <div class="grid-content" >
                        <div>  
                            <p class="last-block">
                                BLOCK TIME
                            </p>
                            <p  class="last-block1">
                                {{blockTime}}S
                            </p>
                        </div>
                        <div>
                            <img src="~/assets/atn-icon.png" class="icon">
                        </div>
                    </div>
                </el-card>
                <!-- shadow="hover"-->
                <el-card>
                    <div class="grid-content" >
                        <div>  
                            <p class="last-block">
                                USD/ATN
                            </p>
                            <p class="last-block1">
                                {{atnPrice}}
                            </p>
                        </div>
                        <div>
                            <img src="~/assets/home-block time-icon.png" class="icon">
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">

.body {
    background-color: #F5F7FA;
    height: 1275px;
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .table {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 64px;
  }

  .table2 {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 128px;
  }
}

.network-status {
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 230px;

    .header {
        display: flex;
        width: 1050px;
        justify-content: space-between;

         & /deep/ .el-card__body {
            padding: 0;
            width: 244px;
            height: 106px;
            flex: 1;
        }


        .grid-content {
            border-radius: 5px;
            display: flex;
            font-size: 22px;
            width: 244px;
            height: 106px;
            position: relative;
            box-shadow: 0 2px 6px 5px rgba(47,83,151,0.04);
            background: #FFFFFF;
            border-radius: 5px;
        }

        .last-block {
            height: 20px;
            line-height: 1.5;
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            color: #000000;
            float: left;
            position: absolute;
            top: 17px;
            left: 19px;
        }
        .last-block1{
            font-family: PingFangSC-Light;
            font-size: 28px;
            color: #00C7FB;
            float: left;
            position: absolute;
            top: 44px;
            left: 19px; 
        }

        .fade-enter {
            opacity: 0.5;
        }
        .fade-enter-active {
            transition: opacity .1s;
        }
        .fade-enter-to {
            opacity: 0.5;
        }
        .fade-leave {
            opacity: 0.2;
        }
        .fade-leave-active {
            transition: opacity .1s;
        }
        .fade-leave-to {
            opacity: 0.5;
        }

        .icon {
            width: 74px;
            height: 78px;
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
}


.wrapper-blocks{
    width: 1050px;
    display: flex;
    justify-content: space-between;

    //公共的写最上面了
    .typeface{  
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #0D2138;
        text-align: left;
    }
    a{
        color: #74B8FB ;
        font-size: 16px;
        text-decoration: none;
        font-family: PingFangSC-Regular;
        // white-space: nowrap; 
        // overflow:hidden;
    }
    & /deep/ .el-card__body{
        padding: 0;
    }

    .left-wrapper{
        .blocks{
            width: 396px;
            height: 518px;
        }
    }
    .right-wrapper{
        .transactions{
            width: 630px;
            height: 518px;

        }
    }  
}

& /deep/ .el-main{
    padding: 0;
}

.loading {
    width: 100%;
    height: 518px;
}

// & /deep/ .el-table__empty-block {
//     height: 518px;
//     background-color: #fff;
//     color: #fff;
// }

.el-footer {
  text-align: center;
  line-height: 60px;
  margin-top: -100px;
}
.right-nav{
    display: none;
}

@media screen and (max-width: 1174px) {
  .header /deep/ .el-card {
    flex: 0 1 48%;
  }
  .table {
    flex-wrap: wrap;

    .recent-blocks {
      flex: 100%;
    }

    & /deep/ .el-table {
      width: 100%;
    }
  }
}

@media screen and (max-width: 991px) {
    .recent-blocks{
        width: 100px;
    }
    // .header /deep/ .el-card {
    //     flex: 1 1 100%;
    //     background-color: #fff;
    // }
    .right-nav {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 50px;
        .search{
            width: 306px;
            height: 36px;
            position: relative;
            
            .search-icon{
                width: 20px;
                height: 20px;
                background-image: url(../assets/home-search-icon.png);
                position: absolute;
                right: 16px;
                bottom: 9px;
            }
            & /deep/ .el-input__inner{
                border-radius: 20px;
            }
        }
    }
    .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 550px;
    }
    .button {
      background: #00c8ff;
      color: #fff;
    }
    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .table {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            // width: 100%;
            margin-bottom: 64px;
            height: 580px;
        }
        .table2 {
            display: flex;
            justify-content: space-around;
            width: 100%;
            margin-bottom: 128px;
        }
    }
    .row {
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
        background-color: #d3dce6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #fff;
        color: #333;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        // height: 100%;
    }

    .wrapper-blocks{
        // width: 1050px;
        // margin-top: 500px;
        // height: 1000px;
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        //公共的写最上面了
        .typeface{  
            font-family: PingFangSC-Medium;
            font-size: 28px;
            color: #0D2138;
            text-align: left;
        }
        a{
            color: #74B8FB ;
            font-size: 16px;
            text-decoration: none;
            font-family: PingFangSC-Regular;
            // white-space: nowrap; 
            // overflow:hidden;
        }
        & /deep/ .el-card__body{
            padding: 0;
        }
        .left-wrapper{
            .blocks{
                width: 260px;
                height: 518px;
                margin-bottom: 64px;
            }
        }
        .right-wrapper{
            .transactions{
                width: 260px;
                height: 538px;

            }
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


}
</style>


<script>
  export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            input: '',
            latestBlockNumber: 'loading...',
            lastBlockTime: 'loading...',
            blockTime: '5.000',
            atnPrice: 'loading...',
            loading1: true,
            loading2: true,
            update: true,
        };
    },
    // computed: {
    //     latestBlockNumber: function () {
    //     }
    // },
    mounted() {
            this.showData();
            this.refresh();
        },
    methods: {
        refresh() {
            let vm = this;
            let count = 0;
            let interval = setInterval(async function() {
                // vm.update = !vm.update;
                vm.update = false;
                // console.log("vm.update", vm.update);
                await vm.$axios.$get("/blocks/list?limit=" + 1).then(async function(res){
                    // console.log("res", res)
                    // console.log(new Date())
                    let date = new Date(res[0].Timestamp*1000);
                    let hours = date.getHours();
                    let minutes = "0" + date.getMinutes();
                    let seconds = "0" + date.getSeconds();
                    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                    vm.latestBlockNumber = res[0].Number;
                    vm.lastBlockTime = formattedTime;
                })

                vm.update = true;
                // count++;
                // if(count === 2)clearInterval(interval);
                // console.log("this.pageName", vm.$route.name)
                if(vm.$route.name !== 'index') {
                    console.log("clear interval...")
                    clearInterval(interval);
                }
            }, 5000)
        },

        async showData() {

            this.blockTable = [];

            this.$axios.$get("/blocks/list?limit=1").then(res => {
                let date = new Date(res[0].Timestamp*1000);
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                let seconds = "0" + date.getSeconds();
                let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                this.latestBlockNumber = res[0].Number;
                this.lastBlockTime = formattedTime;
            })

            this.$axios.$get("https://api.coinmarketcap.com/v1/ticker/atn/").then(res => {
                this.atnPrice = parseFloat(res[0].price_usd).toFixed(5);
            })
        }
    }
  }
</script>