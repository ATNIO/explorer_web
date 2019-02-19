<template>
<div class="main">
    <div class="footer">
        <div class="link">
            <a href="https://github.com/ATNIO" target="_blank">
                <img src="~/assets/github.svg" class="image">
            </a> 
        </div>
        <div class="link">
            <a href="https://t.me/ATN_blockchain" target="_blank">
                <img src="~/assets/telegram.svg" class="image"> 
            </a>
        </div>
        <div class="link">
            <a href="https://twitter.com/atn_io" target="_blank">
                <img src="~/assets/twitter.svg" class="image"> 
            </a> 
        </div>
        <div class="link">
            <a href="https://www.reddit.com/r/ATN/" target="_blank">
                <img src="~/assets/reddit.svg" class="image"> 
            </a> 
        </div>
        <div class="link">
            <a href="https://medium.com/@atnio" target="_blank">
                <img src="~/assets/medium.svg" class="image"> 
            </a>
        </div>
    </div>
</div>
</template>

<style scoped lang="less">
// .main {
//     width: 100%;
//     position: relative;

//     .footer {
//         display: flex;
//         width: 1050px;
//         justify-content: center;
//         position: absolute;
//         top: 50px;
//             .image {
//                 text-align: center;
//                 width: 36px;
//                 height: 36px;
//                 margin-right: 38px;
//             }
//     }
// }
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.image {
    text-align: center;
    height: 45px;
}
.footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 335px;
    
    // margin-right: 15%;
}
@media screen and (max-width: 991px) {
     .footer {
        width: 335px;
        p{
            display: none;
        }
    }
 }
</style>



<script>
  export default {
  }
</script>