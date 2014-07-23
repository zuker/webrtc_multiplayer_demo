/* jshint quotmark: double */
require.config({
  shim: {
    peerjs: {
      exports: "Peer"
    }
  },
  paths: {
    jquery: "../bower_components/jquery/dist/jquery",
    peerjs: "../bower_components/peerjs/peer.min",
    chai: "../bower_components/chai/chai",
    mocha: "../bower_components/mocha/mocha"
  },
  packages: [

  ]
});
