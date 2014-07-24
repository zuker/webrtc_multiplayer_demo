/* globals describe: false, it: false, before: false, afterEach: false, beforeEach: false */
/* jshint expr: true */
define(
  ['sinon', 'chai', 'sinon-chai', 'peerjs', 'bower_components/peerjs/peer.min'],
  function (sinon, chai, sinonChai, stubPeer, Peer) {
    'use strict';
    chai.should();
    chai.use(sinonChai);
    describe('peer', function () {
      var peer;
      var peerjs;
      before(function (done) {
        require(['app/peer'], function (_peer) {
          peer = _peer;
          done();
        });
      });
      beforeEach(function () {
        peerjs = sinon.createStubInstance(Peer);
        peerjs.once.returnsThis();
      });
      afterEach(function () {
        stubPeer.reset();
      });
      describe('#create()', function () {
        it('should connect to peerjs', function () {
          stubPeer.returns(peerjs);
          peer.create();
          stubPeer.should.have.been.calledOnce;
        });
        it('should callback with created peer on success connection', function () {
          peerjs.once.withArgs('open').callsArg(1);
          stubPeer.returns(peerjs);
          var spy = sinon.spy();
          peer.create(spy);
          spy.should.have.been.calledOnce.and.calledWith(null, peerjs);
        });
        it('should callback with error on connection error', function () {
          var err = new Error();
          peerjs.once.withArgs('error').callsArgWith(1, err).returnsThis();
          stubPeer.returns(peerjs);
          var spy = sinon.spy();
          peer.create(spy);
          spy.should.have.been.calledOnce.and.calledWith(err);
        });
        it('should remove error listener on success connection', function () {
          peerjs.once.withArgs('open').callsArg(1);
          stubPeer.returns(peerjs);
          peer.create(sinon.stub());
          peerjs.removeListener.should.have.been.calledWith('error');
        });
      });
      describe('#connect()', function () {
        it('should connect to peerjs', function () {
          stubPeer.returns(peerjs);
          peer.connect();
          stubPeer.should.have.been.calledOnce;
        });
        it('should callback with error on connection error', function () {
          var err = new Error();
          peerjs.once.withArgs('error').callsArgWith(1, err).returnsThis();
          stubPeer.returns(peerjs);
          var spy = sinon.spy();
          peer.connect('id', spy);
          spy.should.have.been.calledOnce.and.calledWith(err);
        });
        it('should create data connection for given id', function () {
          var id = 'id';
          var dataConnection = {
            once: sinon.stub().returnsThis()
          };
          peerjs.connect.returns(dataConnection);
          peerjs.once.withArgs('open').callsArg(1);
          stubPeer.returns(peerjs);
          peer.connect(id, sinon.stub());
          peerjs.connect.should.have.been.calledOnce.and.calledWith(id);
        });
        it('should callback peer and data connection on success data connection', function () {
          var dataConnection = {
            once: sinon.stub().withArgs('open').callsArg(1)
          };
          peerjs.connect.returns(dataConnection);
          peerjs.once.withArgs('open').callsArg(1);
          stubPeer.returns(peerjs);
          var spy = sinon.spy();
          peer.connect('id', spy);
          spy.should.have.been.calledOnce.and.calledWith(null, peerjs, dataConnection);
        });
        it('should callback error on data connection error', function () {
          var err = new Error();
          var dataConnection = {
            once: sinon.stub()
          };
          var spy = sinon.spy();
          peerjs.connect.returns(dataConnection);
          peerjs.once.withArgs('open').callsArgWith(1).returnsThis();
          peerjs.once.withArgs('error').onSecondCall().callsArgWith(1, err).returnsThis();
          stubPeer.returns(peerjs);
          peer.connect('id', spy);
          spy.should.have.been.calledOnce.and.calledWith(err);
        });
      });
    });
  }
);
