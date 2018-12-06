<template>
<div>
    <!-- <hr  style="border:1 dashed #987cb9"  color=#00C7FB SIZE=1/> -->
<div class="main">
    Atmatrix ® 联盟链浏览器 Copyright © 2017
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
    font-weight: normal;
    // color: #00C7FB;
    font-family: PingFangSC-Semibold;;
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