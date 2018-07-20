<template>
<div>
  <div class="line"></div>
  <div>
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
        <div class="col1">
            <el-menu-item index="2" class="font">Home</el-menu-item>
            <el-menu-item index="3" class="font">Blocks</el-menu-item>
            <el-menu-item index="4" class="font">Transactions</el-menu-item>
            <el-menu-item index="5" class="font">Accounts</el-menu-item>
            <el-menu-item index="6" class="font">Dbots</el-menu-item>
        </div>
        
        <el-input v-model="input" class="input" placeholder="Search Address / Tx / Block / Dbot"></el-input>
        <el-button icon="el-icon-search" class="button">Search</el-button>
       
   
  </el-menu>

</div>
</div>
</template>

<style>

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
        margin-left: -90px;
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
        left: -10px;
    }

    .font {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        font-family: Helvetica, Tahoma, Arial;

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
      }
    }
  }
</script>