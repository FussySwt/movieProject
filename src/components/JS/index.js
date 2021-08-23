import Vue from 'vue'
import messageBox from './MessageBox'

export var messagebox = (function(){

    return function(opts){
        var defaults = {
            title: '',
            content: '',
            cancel: '',
            ok: '',
            handleCancel: null,
            handleOk: null
        }

        var myComponent = Vue.extend(messageBox)

        for(var attr in opts){
            defaults[attr] = opts[attr]
        }

        var vm = new myComponent({
            el:document.createElement("div"),
            data: {
                title:defaults.title,
                content:defaults.content,
                cancel:defaults.cancel,
                ok:defaults.ok
            },
            methods: {
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this)
                    new Promise((res,rej)=>{
                        this.$refs.msg.style.opacity = 0;
                        this.$refs.msg.style.top = '150px';
                        setTimeout(() => {
                            res();
                        }, 1000);
                    }).then(()=>{
                        document.body.removeChild(vm.$el)
                    })
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this)
                    document.body.removeChild(vm.$el)
                }
            }
        })

        document.body.appendChild(vm.$el)
    }

})()