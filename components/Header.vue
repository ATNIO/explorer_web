<template>
<div>
    <div class="head">
        <div class="wrapper">
            <img src="~/assets/atn.png" class="image" >
            <div class="right" v-bind:class="searchShow ? 'space-between' : 'center'">
                <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo nav"
                    mode="horizontal"
                    @select="handleSelect"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    router
                >
                    <el-menu-item index="/" class="font" >Home</el-menu-item>
                    <el-menu-item index="/blocks" class="font">Blocks</el-menu-item>
                    <el-menu-item index="/transactions" class="font">Transactions</el-menu-item>
                    <el-menu-item index="/accounts" class="font">Accounts</el-menu-item>
                    <el-menu-item index="/dbots" class="font">Dbots</el-menu-item>
                </el-menu>
                <div class="search" v-show="searchShow">
                    <el-input v-model="input" class="input" placeholder="Search Address / Tx / Block / Dbot"></el-input>
                    <i class="search-icon" v-on:click="this.search"></i>
                </div>
            </div>
        </div>
        <div class="wrapper-search" v-show="!searchShow">
             <div class="search">
                <el-input v-model="input" class="input" placeholder="Search Address / Tx / Block / Dbot"></el-input>
                <!-- <el-button icon="el-icon-search" class="button" v-on:click="this.search">Search</el-button> -->
                <i class="search-icon" v-on:click="this.search"></i>
            </div>
        </div>
    </div>
</div>

</template>

<style scoped lang="less">
.head{
    // display: none;
    height: 280px;
    background-image: linear-gradient(90deg, #9976EB 0%, #0EC7F7 100%);
    .wrapper{
        margin: 0 auto;
        width: 1050px;
        display: flex;
        align-items: center;
        .image{
            // margin-right: 256px;
            width: 44px;
            height: 41px;
        }
        .nav{
            background: transparent;
            border: 0;
        }

        & /deep/ .el-menu-item:not(.is-disabled):hover {
            background: transparent;
        }

        .right {
            flex: 1;
            display: flex;
            align-items: center;
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

        .space-between {
            justify-content: space-between;
        }

        .center {
            justify-content: center;
        }
    }
    .wrapper-search{
       margin-top: 60px;
        .search{
            width: 644px;
            height: 40px;
            margin: 0 auto;
            position: relative;

            .search-icon{
                width: 24px;
                height: 24px;
                background-image: url(../assets/home-search-icon.png);
                position: absolute;
                right: 34px;
                top: 8px;
            }
            & /deep/ .el-input__inner{
                border-radius: 20px;
            }
        }
    }
}
</style>

<script>
  export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            input: ''
        };
    },
    computed: {
        pageName () {
            return this.$route.name;
        },
        searchShow () {
            return this.pageName !== 'index';
        },
    },
    methods: {
        handleSelect(key, keyPath) {
        },
        search() {
            console.log(this.input)
            this.$axios.$get("/search/" + this.input).then(res => {
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
        }
    }
  }
</script>