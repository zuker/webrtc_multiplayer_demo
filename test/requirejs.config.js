//noinspection JSHint
require.config({
  baseUrl: '/base',
  shim: {
    peerjs: {
      exports: 'Peer'
    },
    sinon: {
      exports: 'sinon'
    },
    'bower_components/peerjs/peer.min': {
      exports: 'Peer'
    },
    'bower_components/peerjs/peer': {
      exports: 'Peer'
    }
  },
  packages: [

  ],
  paths: {
    sinon: 'lib/sinon-1.10.3',
    chai: 'bower_components/chai/chai',
    jquery: 'bower_components/jquery/dist/jquery',
    mocha: 'bower_components/mocha/mocha',
    peerjs: 'test/mock/peer',
    'sinon-chai': 'bower_components/sinon-chai/lib/sinon-chai'
  },
  deps: typeof allTestFiles === 'undefined' ? null : allTestFiles,
  callback: typeof window === 'undefined' ? null : window.__karma__.start
});
