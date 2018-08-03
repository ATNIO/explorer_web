<template>
<div class="main">
    <div class="footer">
        <div class="link">
            <a href="https://github.com/ATNIO" target="_blank">
                <img src="~/assets/github.svg" class="image">
            </a>
            <p class="font">
                github
            </p> 
        </div>
        <div class="link">
            <a href="https://t.me/ATN_Blockchain" target="_blank">
                <img src="~/assets/telegram.svg" class="image"> 
            </a>
            <p class="font">
                telegram
            </p> 
        </div>
        <div class="link">
            <a href="https://twitter.com/atn_io" target="_blank">
                <img src="~/assets/twitter.svg" class="image"> 
            </a>
            <p class="font">
                twitter
            </p> 
        </div>
        <div class="link">
            <a href="https://www.reddit.com/r/ATN/" target="_blank">
                <img src="~/assets/reddit.svg" class="image"> 
            </a>
            <p class="font">
                reddit
            </p> 
        </div>
        <div class="link">
            <a href="https://medium.com/@atnio" target="_blank">
                <img src="~/assets/medium.svg" class="image"> 
            </a>
            <p class="font">
                medium
            </p> 
        </div>
    </div>
</div>
</template>

<style scoped lang="less">


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

.font {
  font-family: 'Century Gothic';
  src: url('~/fonts/Century Gothic.ttf') format('truetype'); /* Safari, Android, iOS */
  margin-top: -15px;
}

.footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1100px;
    // margin-right: 15%;
}
p{
    display: none;
}

.link {
    display: flex;
    justify-content: center;
    flex-direction: column;
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