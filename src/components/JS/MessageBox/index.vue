<template>
    <div class="messagebox" ref="msg">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div>
            <div v-if="cancel" @click="handleCancel">{{cancel}}</div>
            <div v-if="ok" @click="handleOk">{{ok}}</div>
        </div>
    </div>    
</template>

<script>
export default {
    mounted(){
        this.$refs.msg.style.width = document.documentElement.clientWidth / 1.5 + 'px'
        // if(this.ok == ""){
        //     this.$refs.msg.lastChild.lastChild.style.flex = 0
        // }
    }
}
</script>

<style lang="scss" scoped>
    .messagebox{min-width: 100px;min-height: 160px;border: solid 1px #ccc;border-radius: 5px;background-color: white;box-shadow: 3px 3px 3px lightgray;position: fixed;left: 50%;top: 50%;
    transform: translateX(-50%) translateY(-50%); transition: all .5s;opacity:1;
        h2{text-align: center;line-height: 40px;font-size: 18px;}
        p{text-align: center;}
    }
    .messagebox>div{display: flex;position:absolute;height:40px;bottom: 0;width:100%;border-top: 1px solid #ccc;
        div{flex: 1;text-align: center;line-height: 40px;border-right: solid 1px #ccc;}
        div:last-child{border: none;}
    }
    .down{
        opacity: 1;
    }
</style>
