const {getDefaultConfig} = require("expo/metro-config")

const config = getDefaultConfig(__dirname);
const ALIASES = {
    'react-native-maps': "@teovilla/react-native-web-maps"
}

config.resolver.resolveRequest = (context, moduleName, platform)=>{
    if(platform === 'web'){
        return context.resolveRequest(context, ALIASES[moduleName]??moduleName, platform);
    }

    return context.resolveRequest(context, moduleName, platform);
}
module.exports = config;