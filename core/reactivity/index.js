// 响应式库(劫持)
// 依赖
let currentEffect;
class Dep { 
    // 1.收集依赖
    constructor(val) {
        this.effects = new Set();
        this._val = val
    }
    depend(){
        if (currentEffect){
            this.effects.add(currentEffect)
        }

    }
    // 2.触发依赖
    notice(){
        this.effects.forEach((effect)=>{
            effect();
        })
    }

    get value(){
        this.depend();
        return this._val
    }

    set value(val){
        this._val = val
        this.notice();
    }
}

export function effectWatch(effect){
    //收集依赖
    currentEffect = effect;
    effect();
    currentEffect = null;
}

const targetMap = new Map();
function getDep(target,key){
    let depsMap = targetMap.get(target);
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap);
    }

    let dep = depsMap.get(key);
    if(!dep){
        dep = new Dep();
        depsMap.set(key,dep);
    }
    return dep;
}
export function reactive(raw){
    return new Proxy(raw,{
        get(target,key){
            getDep(target,key).depend();
            return Reflect.get(target, key);
        },

        set(target,key,value){
            const dep = getDep(target,key);
            const res = Reflect.set(target,key,value);
            dep.notice();
            return res;
        }
    })
}