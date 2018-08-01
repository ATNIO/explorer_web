<template>
    <div style="width: 100%">
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo nav"
        mode="horizontal"
        background-color="#00C8FF"
        @select="handleSelect"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <img src="~/assets/atn.png" class="image" >
            <div class="left-nav">
                <el-menu-item index="2" class="font"><nuxt-link to="/">Home</nuxt-link></el-menu-item>
                <el-menu-item index="3" class="font"><nuxt-link to="/blocks">Blocks</nuxt-link></el-menu-item>
                <el-menu-item index="4" class="font"><nuxt-link to="/transactions">Transactions</nuxt-link></el-menu-item>
                <el-menu-item index="5" class="font"><nuxt-link to="/accounts">Accounts</nuxt-link></el-menu-item>
                <el-menu-item index="6" class="font"><nuxt-link to="/dbots">Dbots</nuxt-link></el-menu-item>
            </div>
            <div class="right-nav">
                <el-input v-model="input" class="input" placeholder="Search Address / Tx / Block / Dbot"></el-input>
                <el-button icon="el-icon-search" class="button" v-on:click="this.search">Search</el-button>
            </div>
    
    </el-menu>

</div>
</template>

<style scoped lang="less">

    .left-nav {
        width: 30%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        /* margin-left: -10%; */
    }

    .right-nav {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .button {
        background: #00C8FF;
        color: #FFF;
        height: 75%;
        float: left;
    }

    .input {
        width: 290px;
    }

    .search {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .col1 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .font {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        font-family: Helvetica, Tahoma, Arial;
    }

    a {
        text-decoration: none;
        color: #fff;
    }

    .nav {
        color: #FFFFFF;
        text-align: center;
        font-size: 20px;
    }

    .image {
        text-align: center;
        height: 45px;
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
            console.log(key, keyPath);
        },
        search() {
            console.log("search")
            console.log("input", this.input)
            console.log(this.$route.path);
            // this.$router.push('blocks/248703')
            this.$axios.$get("/search/" + this.input).then(res => {
                console.log(res)
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