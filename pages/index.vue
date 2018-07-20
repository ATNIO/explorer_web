<template>
<div>
    <Header/>
  <el-main>
    <el-header class="header" height="240px">
      <el-row
        class="row"
        type="flex"
        align="middle"
        justify="center"
      >
        <el-col :span="6">
          <div class="grid-content" >
            <div>
              <img src="~/assets/blocks.png" class="icon">
            </div>
            <div>  
              <p>
                BLOCK
              </p>
              <p >
                #123456
              </p>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content" >
          <div>
            <img src="~/assets/blocks.png" class="icon">
          </div>
          <div>  
            <p>
              BLOCK
            </p>
            <p >
              #123456
            </p>
          </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content" >
          <div>
            <img src="~/assets/blocks.png" class="icon">
          </div>
          <div>  
            <p>
              BLOCK
            </p>
            <p >
              #123456
            </p>
          </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content" >
          <div>
            <img src="~/assets/blocks.png" class="icon">
          </div>
          <div>  
            <p>
              BLOCK
            </p>
            <p >
              #123456
            </p>
          </div>
          </div>
        </el-col>
        
      </el-row>
        
    </el-header>
    <el-header height="360px" background-color="#FFF">

    </el-header>
  </el-main>
  <el-footer>Footer</el-footer>
</div>
</template>

<style>
  .column {
    display: flex;
    flex-direction: column;
  }

  .row {
    width: 100%;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:  "Helvetica Neue",Helvetica;
    color: #757589;
    font-size: 25px;
  }

  .block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .icon {
    width: 100px;
    height: 100px;
  }

  .card {
    padding: 0px;
    width: 280px;
    height: 180px;
  }

 .header{
   background-color: #F7F7F9;
   display: flex;
   align-items: center;
  } 
 .el-footer {
    background-color: #00C8FF;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #FFF;
    color: #333;
    text-align: center;
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

<script>
import Header from '~/components/Header.vue'


  export default {
    components: {
      Header
    },
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