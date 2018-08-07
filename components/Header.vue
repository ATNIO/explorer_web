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
                </el-dropdown-menu>
            </el-dropdown>
            <!-- <i class="el-icon-menu"></i> -->
        </div>
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
  background: #00c8ff;
  color: #fff;
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
  color: #ffffff;
  text-align: center;
  font-size: 20px;
}

.image {
  text-align: center;
  height: 45px;
}

.mobile-menu {
  display: none;
}
& /deep/.el-dropdown-menu__item{
    font-size: 20px;
    a {
        text-decoration: none;
        color: rgb(61, 60, 60);
    }
}

@media screen and (max-width: 991px) {
  .nav {
    display: none;
  }

  .mobile-menu {
    width: 100%;
    height: 56px;
    padding: 3px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #00c8ff;

    .el-icon-menu {
      font-size: 32px;
      color: #ffffff;
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