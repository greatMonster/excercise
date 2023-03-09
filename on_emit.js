// 简易版
// let corp = {}
// corp.list = []
// corp.on = function(fn) {
//     this.list.push(fn)
//     console.log(this.list)
// }
// corp.emit = function() {
//     this.list.forEach(cb => {
//         cb.apply(this, arguments)
//     })
// }
// corp.on(function(position, salary) {
//     console.log('position：' + position)
//     console.log('salary：' + salary)
// })
// corp.on(function(skill, hobby) {
//     console.log('skill：' + skill)
//     console.log('hobby：' + hobby)
// })
// corp.emit('front-end development engineer', 100000)

let corp = {}
corp.list = {}
corp.on = function(key, fn) {
    if (!this.list[key]) { // 对象里没有key属性的话，push的时候会报错，所以先初始化key
        this.list[key] = []
    }
    this.list[key].push(fn)
}
corp.emit = function() {
    let key = [].shift.call(arguments) // 将类数组转为数组并取出第一个参数‘key’
    let fns = this.list[key]
    if (!fns || fns.length === 0) { // 如果corp.emit('haha', 'play', 'swimming')一个没有监听过的key，遍历更新函数的时候会报错，需要拦截处理
        console.log(`you do not register "${key}",please register it first`)
        return false
    }
    fns.forEach((fn) => {
        fn.apply(this, arguments)
    })
}
corp.on('join', function(position, salary) {
    console.log('position：' + position + ' and ' + 'salary：' + salary)
})
corp.on('personal', function(skill, hobby) {
    console.log('skill：' + skill + ' and ' + 'hobby：' + hobby)
})
corp.emit('join', 'front-end development engineer', '100000')
corp.emit('personal', 'play', 'swimming')
corp.emit('haha', 'play', 'swimming')

