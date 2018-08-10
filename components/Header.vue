<template>
    <div class="head">
        <div class="wrapper">
            <img src="~/assets/atn.png" class="image" >
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo nav"
                mode="horizontal"
                @select="handleSelect"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-menu-item index="2" class="font"><nuxt-link to="/">Home</nuxt-link></el-menu-item>
                <el-menu-item index="3" class="font"><nuxt-link to="/blocks">Blocks</nuxt-link></el-menu-item>
                <el-menu-item index="4" class="font"><nuxt-link to="/transactions">Transactions</nuxt-link></el-menu-item>
                <el-menu-item index="5" class="font"><nuxt-link to="/accounts">Accounts</nuxt-link></el-menu-item>
                <el-menu-item index="6" class="font"><nuxt-link to="/dbots">Dbots</nuxt-link></el-menu-item>
            </el-menu>
        </div>
        <div class="wrapper-search">
             <div class="search">
                <el-input v-model="input" class="input" placeholder="Search Address / Tx / Block / Dbot"></el-input>
                <!-- <el-button icon="el-icon-search" class="button" v-on:click="this.search">Search</el-button> -->
                <i class="search-icon" v-on:click="this.search"></i>
            </div>
        </div>
       
    </div>
</template>

<style scoped lang="less">
.head{
    height: 280px;
    background-image: linear-gradient(90deg, #9976EB 0%, #0EC7F7 100%);
    .wrapper{
        margin: 0 auto;
        width: 1050px;
        display: flex;
        align-items: center;
        .image{
            margin-right: 256px;
            width: 44px;
            height: 41px;
        }
        .nav{
            flex: 1;
            background: transparent;
            border: 0;
        }

        & /deep/ .el-menu-item:not(.is-disabled):hover {
            background: transparent;
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