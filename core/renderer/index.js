
// n1(old) n2(new)
export function diff(n1,n2){
    console.log(n1,n2)
    if(n1.tag !== n2.tag){
        n1.element.replaceWith(document.createElement(n2.tag));
    }else{
        const {props: oldProps} = n1;
        const {props: newProps} = n2;
        n2.element = n1.element;
        if(newProps && oldProps){
            Object.keys(newProps).forEach((key)=>{
                const newVal = newProps[key];
                const oldVal = oldProps[key];
                console.log(newProps)
                if(newVal !== oldVal){
                    console.log(n1.element)
                    n1.element.setAttribute(key,newVal);
                }
            })

            if(oldProps){
                Object.keys(oldProps).forEach((key)=>{
                    if(!newProps[key]){
                        console.log(n1.element)
                        n1.element.removeAttribute(key)
                    }
                })
            }

            const {children : newChildren = []} = n2;
            const {children : oldChildren = []} = n1

            if(typeof newChildren === "string"){
                if(typeof oldChildren === "string"){
                    if(newChildren !== oldChildren){
                        n2.element.textContent = newChildren;
                    }
                }
                else if(Array.isArray(oldChildren)){
                    n2.element.textContent = newChildren;
                }
            }
            else if(Array.isArray(newChildren)){
                if(typeof oldChildren === "string"){
                    n2.element.innerText = '';
                    mountElement(n2, n2.element);
                }
                else if(Array.isArray(oldChildren)){
                    const length = Math.min(newChildren.length,oldChildren.length);

                    //处理公共内容
                    for (let index = 0; index < length; index++) {
                        const newVnode = newChildren[index];
                        const oldVnode = oldChildren[index];
                        diff(oldVnode,newVnode)
                        
                    }

                    if(newChildren.length > length){
                        for (let index = length; index < newChildren.length; index++) {
                            const newVnode = newChildren[index];
                            mountElement(newVnode);
                        }
                    }
                    if(oldChildren.length >length){
                        for (let index = length; index < oldChildren.length; index++) {
                            const oldVnode = oldChildren[index];
                            oldVnode.element.parent.removeChild(oldVnode.element);
                        }
                    }
                }
            }
        }
    }
}
export function mountElement(vnode, container){
    const {tag,props,children} = vnode;
    const element = (vnode.element = document.createElement(tag));
    if(props){
        for(const key in props){
            const val = props[key];
            element.setAttribute(key,val);
        }
    }

    if(typeof children === "string"){
        const textNode = document.createTextNode(children);
        element.append(textNode);
    }else if(Array.isArray(children)){
        children.forEach(v=>{
            mountElement(v,element);
        });
    }

    container.append(element);
}