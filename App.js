import { effectWatch,reactive } from './core/reactivity/index.js'
import { h } from './core/h.js';

export default{
    render(context){
        return h("div",{
            id: "app - "+context.state.count,
            class: "showTim"
        },[h("p",null,"你好"),h("p",null,"你好啊")]);
    },
    setup(){
        const state = reactive({
            count:0
        });
        window.state = state;
        return { state }
    }
}