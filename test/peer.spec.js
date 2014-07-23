/* globals describe: false, it: false, before: false */
/* jshint expr: true */
define(
  ['squire', 'sinon', 'chai', 'sinon-chai', 'peerjs'],
  function (Squire, sinon, chai, sinonChai, Peer) {
    'use strict';
    chai.should();
    chai.use(sinonChai);
    describe('peer', function () {
      describe('#connect()', function () {
        var peer;
        var mockPeer = sinon.stub()
            .returns(new Peer())
          ;
        before(function (done) {
          (new Squire())
            .mock(
            'peerjs',
            mockPeer
          )
            .require(['app/peer'], function (_peer) {
              peer = _peer;
              done();
            })
          ;
        });
        it('should connect to peerjs', function () {
          peer.create();
          mockPeer.calledOnce.should.be.ok;
        });
      });
    });
  }
);