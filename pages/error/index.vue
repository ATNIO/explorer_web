<template>
<div>
    <Header/>
        <video autoplay muted loop id="myVideo">
            <source src="~/assets/error.mp4" type="video/mp4">
        </video>

        <div class="content">
            <h1>We are looking for your page...but we can't find it</h1>
        </div>
    <br><br><br>
    <el-footer>
        <Footer/>
    </el-footer>
</div>
</template>

<style scoped lang="less">

    #myVideo {
        // position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%; 
    }

    .content {
        position: fixed;
        top: 55px;
        background: rgba(0, 0, 0, 0.5);
        color: #f1f1f1;
        width: 100%;
        padding: 20px;
        text-align: center;
    }


    .header{
        //  background-color: #F7F7F9;
        //  background-color: rgb(3, 3, 255); 
        display: flex;
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
import Footer from '~/components/Footer.vue'

    export default {

        components: {
            Header,
            Footer
        },
        created() {
            // this.showData();
            // this.timer = setInterval(this.showBlocks, 5000)
        },
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>