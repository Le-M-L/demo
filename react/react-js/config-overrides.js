/* config-overrides.js */
const path = require('path');
const {
    override,
    fixBabelImports,
    addLessLoader,
    addDecoratorsLegacy,
    addWebpackExternals,
    addWebpackAlias,
    addWebpackPlugin,
    // setWebpackPublicPath
} = require('customize-cra');

const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent'); // 直接这么引入就可以，他在create-app-react包里 这个就是getLocalIdent属性要设置的值

/**主题配置 */
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const options = {
    antDir: path.join(__dirname, './node_modules/antd'), //antd包位置
    stylesDir: path.join(__dirname, './src/assets/styles/theme'), //主题所在文件夹
    varFile: path.join(__dirname, './src/assets/styles/theme/variables.less'), //自己设置默认的主题色
    // mainLessFile: path.join(__dirname, './src/assets/styles/index.less'),//项目中其他自定义的样式 如果不需要动态修改其他样式 该文件为空
    themeVariables: [
        //这里写要改变的主题变量
        '@primary-color',
        '@btn-primary-bg',
    ],
    indexFileName: './public/index.html',
    outputFilePath: path.join(__dirname, './public/theme/color.less'), //输出到什么地方
    // publicPath: "",
    generateOnce: false, //是否只生成一次
};
//基础路径，发布布前修改这里，当前配置打包出来的资源都是相对路径
let publicPath = './';
/**主题配置 */

const getStyleLoaders = (cssOptions, preProcessor, lessOptions) => {
    // 这个是use里要设置的，封装了下
    console.log(preProcessor, lessOptions);
    const loaders = [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                ],
            },
        },
        {
            loader: 'style-resources-loader',
            options: {
                patterns: path.resolve(__dirname, 'src/assets/styles/index.less'), //全局引入公共的scss 文件
            },
        },
    ];
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: lessOptions,
        });
    }
    return loaders;
};

//暴露webpack配置,config,evn
const alter_config = () => (config, env) => {
    // 增加处理less module配置 customize-cra 不提供 less.module 只提供css.module
    const oneOf_loc = config.module.rules.findIndex((n) => n.oneOf); // 这里的config是全局的
    config.module.rules[oneOf_loc].oneOf = [
        {
            test: /\.module\.less$/,
            use: getStyleLoaders(
                {
                    importLoaders: 2,
                    modules: {
                        getLocalIdent: getCSSModuleLocalIdent,
                    },
                },
                'less-loader'
            ),
        },
        ...config.module.rules[oneOf_loc].oneOf,
    ];
    return config;
};

module.exports = override(
    alter_config(), //全局配置
    fixBabelImports('import', {
        //antd按需加载配置
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        //主题样式配置
        lessOptions: {
            // modifyVars: {
            //     // "@primary-color": "#1DA57A",
            //     //   '@font-size-base': '24px'
            // },
            javascriptEnabled: true,
        },
    }),
    addWebpackExternals({
        //不做打包处理配置，如直接以cdn引入的
        echarts: 'window.echarts',
        // highcharts:"window.highcharts"
    }),
    addDecoratorsLegacy(), // 配置装饰器
    addWebpackAlias({
        //增加路径别名的处理
        '@': path.resolve('./src'),
        // "@pages": path.resolve("./src/pages"),
        // "@images": path.resolve("./src/assets/images"),
        // "@styles": path.resolve("./src/assets/styles"),
        // "@reducers": path.resolve("./src/reducers"),
        // "@components": path.resolve("./src/components"),
    }),
    // setWebpackPublicPath(process.env.NODE_ENV === 'production' && '/antd-theme-demo'),
    addWebpackPlugin(new AntDesignThemePlugin(options))
);
