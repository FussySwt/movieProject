<template>
    <div>
        <headbar title="个人中心"></headbar>
        <div id="content">
            <router-view></router-view>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import headbar from '@/components/Header'
import tabbar from '@/components/Tabbar'
export default {
    components: {
        headbar,
        tabbar
    }
}
</script>

<style lang="scss" scoped>
    #footer{
        transition: all .3s;
    }
    @media screen and (min-width:980px) {
        #footer{
            width: 900px;
            position: absolute;
            left: calc(50% - 450px);
            background-color: #F3F3F3;
            border-radius: 20px 20px 0 0;
        }
    }
</style>
