<template>
<div>
    <Header style="height: 80px;"/>
        <div class="content">
            <h1>We are looking for the data...but we can't find it</h1>
        </div>
        <video autoplay muted loop id="myVideo" class="video">
            <source src="~/assets/error.mp4" type="video/mp4">
        </video>

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

    .video {
        width: 100%;
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