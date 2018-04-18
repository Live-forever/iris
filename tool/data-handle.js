// 深拷贝: es5 => 不适用包装类型 
export function deepClone(obj) {
    let newObj = obj instanceof Array ? [] : {}
    for(let i in obj) {
        newObj[i] = typeof obj[i] == 'object' 
           ? deepClone(obj[i])
           : obj[i]
    }
    return newObj
}
// es6  Object.assign
export const deepClone = (obj) => {
    let proto = Object.getPrototypeOf(obj)
    return Object.assign({}, Object.create(proto), obj)
}
// es6  proto
export const deepClone = (obj) => ({
    __proto__: Object.getPrototypeOf(obj),
    ...obj
})