//noinspection JSHint
require.config({
  baseUrl: '/base',
  shim: {
    peerjs: {
      exports: 'Peer'
    }
  },
  packages: [

  ],
  paths: {
    chai: 'bower_components/chai/chai',
    mocha: 'bower_components/mocha/mocha',
    peerjs: 'bower_components/peerjs/peer.min',
    jquery: 'bower_components/jquery/dist/jquery'
  },
  deps: typeof allTestFiles === 'undefined' ? null : allTestFiles,
  callback: typeof window === 'undefined' ? null : window.__karma__.start
});
