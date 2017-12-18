中间件  (middlewares)  https://www.npmjs.com/package/koa-middlewares
    1、koa-router

    洋葱 => 
        use,next,promise,compose

    use =>
        compose函数式编程

        思想：
            1、将执行的顺序函数放入middleware中间件数组中
            2、遍历middleware数组，通过Promise实现一个函数执行完后，执行middleware数组中的下一个函数。
            3、直到没有下面没有中间件函数的时候，然后往下面继续执行

        使用到的技术 Promise
        使用到的思想 compose函数式编程

    学习作用:
        见compose.js


    
