const { SingleEntryPlugin } = require("webpack")

const itemToPlugin = (context, item, name) =>{
    return new SingleEntryPlugin(context, item, name)
}

module.exports = class EntryOptionPlugin{
    apply(compiler) {
        compiler.hooks.entryOption.tap('entryOptionPlugin',(context,entry) =>{
            itemToPlugin(context,entry,'main').apply(compiler)
        })
    }
}