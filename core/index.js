import { effectWatch } from "./reactivity/index.js";
import { mountElement,diff} from "./renderer/index.js";
export function createApp(rootComponent){
    return {
        mount(rootContainer){
            let isMounted = false;
            const context = rootComponent.setup();
            let prevSubTree;
            effectWatch(()=>{
                console.log(isMounted)
                if(!isMounted){
                    isMounted = true;
                    const subtree = rootComponent.render(context);
                    console.log(subtree)
                    mountElement(subtree, rootContainer);
                    prevSubTree = subtree;
                    console.log(subtree)
                }
                else{
                    const subtree = rootComponent.render(context);
                    console.log(prevSubTree)
                    diff(prevSubTree,subtree);
                    prevSubTree = subtree;
                }
            })
        }
    }
}