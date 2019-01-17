<template>
<div>
    <div class="head">
       <div class="whole-wrapper">
        <div class="wrapper">
            <img src="~/assets/atn.png" class="image" >
            <div class="right" v-bind:class="searchShow ? 'space-between' : 'center'">
                <el-menu
                    :default-active="$route.path"
                    class="el-menu-demo menu"
                    mode="horizontal"
                    @select="handleSelect"
                    text-color="#fff"
                    active-text-color="#fff"
                    background-color="transparent"
                    :router="true"
                >
                    <el-menu-item index="/" class="home">{{ $t('header.home') }}</el-menu-item>
                    <el-menu-item index="/blocks" class="blocks">{{ $t('header.blocks') }}</el-menu-item>
                    <el-menu-item index="/transactions" class="transactions">{{ $t('header.transactions') }}</el-menu-item>
                    <el-menu-item index="/accounts" class="accounts">{{ $t('header.accounts') }}</el-menu-item>
                    <el-menu-item index="/dbots" class="dbots">{{ $t('header.dbots') }}</el-menu-item>
                    <el-menu-item index="/votes" class="votes">{{ $t('header.votes') }}</el-menu-item>
                    <el-menu-item index="/ans" class="ans">{{ $t('header.ans') }}</el-menu-item>
                </el-menu>
                <div class="search" v-show="searchShow">
                    <el-input v-model="input" class="input" :placeholder="this.$t('header.search')" @keyup.enter.native="search"></el-input>
                    <i class="search-icon" v-on:click="this.search"></i>
                </div>
            </div>
        </div>
        <div class="i18n">
            <el-dropdown @command="handleCommand">
                <span class="link">
                    {{ $t('header.lang') }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="en">English</el-dropdown-item>
                    <el-dropdown-item command="cn">简体中文</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
       </div>
        <div class="mobile-menu">
            <img src="~/assets/atn.png" class="image" >
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <i class="el-icon-menu"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <nuxt-link to="/"><el-dropdown-item>Home</el-dropdown-item></nuxt-link>
                    <nuxt-link to="/blocks"><el-dropdown-item>Blocks</el-dropdown-item></nuxt-link>
                    <nuxt-link to="/transactions"><el-dropdown-item>Transactions</el-dropdown-item></nuxt-link>
                    <nuxt-link to="/accounts"><el-dropdown-item>Accounts</el-dropdown-item></nuxt-link>
                    <nuxt-link to="/dbots"><el-dropdown-item>Dbots</el-dropdown-item></nuxt-link>
                    <nuxt-link to="/votes"><el-dropdown-item>Votes</el-dropdown-item></nuxt-link>

                </el-dropdown-menu>
            </el-dropdown>
            <!-- <i class="el-icon-menu"></i> -->
        </div>
        <div class="wrapper-search" v-show="!searchShow">
             <div class="search">
                <el-input v-model="input" class="input" :placeholder="this.$t('header.search')" @keyup.enter.native="search"></el-input>
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
    .mobile-menu {
        display: none;
    }
    .whole-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .wrapper{
        margin: 0 auto;
        width: 1050px;
        display: flex;
        align-items: center;
        .image{
            // margin-right: 256px;
            width: 44px;
            height: 41px;
            margin-top: 15px;
        }
        .nav{
            background: transparent;
            border: 0;
        }

        // & /deep/ .el-menu-item:not(.is-disabled):hover {
        //     background: transparent;
        // }

        & /deep/ .el-menu--horizontal {
            border-bottom: none;
        }

        & /deep/ .el-menu-item:hover {
            background-color: transparent !important;
        }

        .right {
            margin-top: 15px;
            flex: 1;
            display: flex;
            align-items: center;
            margin-left: 60px;
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

     .i18n {
            margin: 15px 50px 0 0;
            width: 100px;
            float: right;
            // width: 100px;
            .link {
                color: white;
            }
    }

    .menu {
        .home{
            width: 40px;
            display: flex;
            justify-content: center;
        }

        .blocks {
            margin-left: 20px;
            width: 50px;
            display: flex;
            justify-content: center;
        }

        .transactions {
            margin-left: 20px;
            width: 80px;
            display: flex;
            justify-content: center;
        }

        .accounts {
            margin-left: 20px;
            width: 60px;
            display: flex;
            justify-content: center;
        }

        .dbots {
            margin-left: 20px;
            width: 40px;
            display: flex;
            justify-content: center;
        }

        .votes {
            margin-left: 20px;
            width: 50px;
            display: flex;
            justify-content: center;
        }

        .ans {
            margin-left: 20px;
            width: 30px;
            display: flex;
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
@media screen and (max-width: 991px) {
        .head {
            height: 56px;
            background-image: linear-gradient(90deg, #9976EB 0%, #0EC7F7 100%);
            .wrapper {
                display: none;
            }
            .image{
                // margin-right: 256px;
                width: 44px;
                height: 41px;
            }
            .mobile-menu {
                width: 100%;
                height: 56px;
                padding: 3px 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                // background: #00c8ff;
                .el-icon-menu {
                    font-size: 32px;
                    color: #ffffff;
                }
            }
            .wrapper-search {
                display: none;
            }
        }
        
    }
</style>

<script>
import { search } from '~/common/method.js'

  export default {
    data() {
        return {
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
        activeIndex () {
            //导航高亮显示的另一种方式
            if(this.$route.matched[0].path.split('/')[1] == undefined)return '/'
            return '/'+ this.$route.matched[0].path.split('/')[1]
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            // this.activeIndex2 = key
        },
        handleCommand(lang) {
            console.log("lang", lang);
            //mutate 'locale' in store
            this.$store.commit('SET_LANG', lang)
            //re-route to the current page but with the selected language in a query string
            this.$router.push({ path: `${this.$router.currentRoute.path}?lang=${lang}` })
        },
        search() {
            search(this);
        }
    }
  }
</script>