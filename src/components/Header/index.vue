<template>
    <header id="header">
        <h1>{{title}}</h1>
        <slot></slot>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String
    }
}
</script>

<style lang="scss" scoped>
    #header{
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        color: #fff;
        background:#e54847;
        border-bottom: solid 1px #e54847;
        position: relative;
        h1{
            font-size: 18px;
            text-align: center;
            line-height: 50px;
            font-weight: normal;
        }
        i{
            position: absolute;
            left: 5px;
            top: 50%;
            margin-top: -13px;
            font-size: 26px;
        }
    }
</style>
