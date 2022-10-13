//const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      //nodeIntegration: true,
      //contextIsolation: true,
      preload: 'src/preload.js',
      builderOptions: {
        publish: [
          { provider: 'github',owner:'Christianzer',repo:'autoupdate'},
        ],
        productName: "G-CAISSE CIAT",
        appId: 'test.com',
        win: {
          icon: 'build/logo_obf.ico',
        },
      }
    }
  }
}
