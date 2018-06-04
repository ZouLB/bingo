module.exports = {
 proxy: {
    '/api': {  
      target: 'http://10.201.76.230:8080', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/api': ''  //需要rewrite的,
      }       
    }
 }
}