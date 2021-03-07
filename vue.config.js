module.exports = {
    productionSourceMap: false,
    publicPath:'./',
    configureWebpack:{
        output:{
            filename: `[name].[hash:6].js`,
            chunkFilename: `[name].[hash:6].js`
        }
    },
    css:{
        extract:false
    }
};