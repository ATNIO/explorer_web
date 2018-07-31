<template>
<div class="main">
    <div class="footer">
        <div class="link">
            <a href="https://github.com/ATNIO">
                <img src="~/assets/github.svg" class="image">
            </a>
            <p class="font">
                github.com/atnio
            </p> 
        </div>
        <div class="link">
            <a href="https://t.me/ATN_Blockchain">
                <img src="~/assets/telegram.svg" class="image"> 
            </a>
            <p class="font">
                @ATN_Blockchain
            </p> 
        </div>
        <div class="link">
            <a href="https://twitter.com/atn_io">
                <img src="~/assets/twitter.svg" class="image"> 
            </a>
            <p class="font">
                twitter/atn_io
            </p> 
        </div>
        <div class="link">
            <a href="https://www.reddit.com/r/ATN/">
                <img src="~/assets/reddit.svg" class="image"> 
            </a>
            <p class="font">
                reddit.com/u/ATN_io
            </p> 
        </div>
        <div class="link">
            <a href="https://medium.com/@atnio">
                <img src="~/assets/medium.svg" class="image"> 
            </a>
            <p class="font">
                medium.com/@atnio
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

.link {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

</style>



<script>
  export default {
  }
</script>