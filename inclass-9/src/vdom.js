//
// Inclass Virtual DOM Exercise
// ============================
//
// You need to implement createElement() and updateElement()
//
;(function(exports) {

'use strict'

function h(tag, props, ...children) {
    return { tag, props: props ? props : { }, 
        children: Array.isArray(children[0]) ? children[0] : children }
}

function createElement(node) {
    console.log('Create element called for', node)
    // create the element and return it to the caller
    // the node might have event listeners that need to be registered
    // the node might have children that need to be created as well
    var element = document.createElement(node["tag"])
    var property = node["props"]
    var children = node["children"]
    if (children) {
        Array.prototype.forEach.call(children, function(child) {
            //console.log(child)
            if (typeof child === 'string') {
                element.innerHTML = child
            }
            else {
                element.appendChild(createElement(child))
            }
        })
    }
    if (property) {
        Array.prototype.forEach.call(Object.keys(property), function(key) {
            if (key == "onClick") {
                element.addEventListener("click", function eventHandler(evt) {
                    property[key](evt)
                    update()
                })

            }
            else element[key] = property[key]
        })
    }
    return element
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
            (typeof node1 === 'string' && node1 !== node2) ||
            node1.tag !== node2.tag ||
            (node1.props && node2.props && 
                node1.props.id && node2.props.id && 
                node1.props.id != node2.props.id)
}

function updateElement(parent, newNode, oldNode, index=0) {
    // index will be needed when you traverse children
    // add the new node to the parent DOM element if
    // the new node is different from the old node 
    // at the same location in the DOM.
    // ideally we also handle inserts, but ignore that functionality for now.
    if (!oldNode) {
        parent.appendChild(createElement(newNode))
    } else {
        if (changed(newNode, oldNode)) {
            var element = createElement(newNode)
            Array.prototype.splice(parent.children, index, 0, element)
        } else if (newNode.children){
            if (newNode.children >= oldNode.children) {
                    var i = 0
                    newNode.children.forEach((c) => {
                    updateElement(parent.children[index],c,oldNode.children[i],i)
                    i++
                })
            } else {
                console.log(parent.children[index],newNode, oldNode)
                parent.removeChild(parent.children[index])
                parent.appendChild(createElement(newNode))
            }
        }
    }
}

const deepCopy = (obj) => {
    if (obj === null || typeof(obj) !== 'object')
        return obj;
    const props = {}
    if (obj.props) {
        for (let p in obj.props) {
            props[p] = obj.props[p]
        }
    }
    return h(obj.tag, props,
        Array.isArray(obj.children) ? obj.children.map(deepCopy) : obj.children)
}

const update = () => requestAnimationFrame(() => {
    // compare the current vdom with the original vdom for updates
    updateElement(h.mounted.root, h.mounted.current, h.mounted.original)
    h.mounted.original = deepCopy(h.mounted.current)
})

h.mount = (root, component) => {
    // we keep a copy of the original virtual DOM so we can diff it later for updates
    const originalComponent = deepCopy(component)
    h.mounted = { root: root, current: component, original: originalComponent }
    updateElement(root, originalComponent)
}

exports.h = h

})(window);