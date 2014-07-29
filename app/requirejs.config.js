//noinspection JSHint
require.config({
  shim: {
    peerjs: {
      exports: "Peer"
    },
    phaser: {
      exports: "Phaser"
    }
  },
  paths: {
    jquery: "../bower_components/jquery/dist/jquery",
    peerjs: "../bower_components/peerjs/peer.min",
    phaser: "../bower_components/phaser/phaser",
    lodash: "../bower_components/lodash/dist/lodash.compat"
  },
  packages: [

  ]
});
