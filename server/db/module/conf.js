/**
 * Created by chenjianjun on 15/12/15.
 */
var env=require("../../config");
var type=env.Thinky.type;

// 配置信息模型
const Conf = env.Thinky.createModel('conf', {
    // 广告名称
    name: type.string(),
    // 图片列表
    images: type.array(),
    // 菜单列表
    nav: type.array(),
})

module.exports=Conf;
