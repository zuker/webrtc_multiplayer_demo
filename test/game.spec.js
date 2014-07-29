/* globals describe: false, it: false, before: false, afterEach: false, beforeEach: false */
/* jshint expr: true */
define(
  ['sinon', 'chai', 'sinon-chai', 'phaser', 'app/game'],
  function (sinon, chai, sinonChai, Phaser, game) {
    'use strict';
    chai.should();
    chai.use(sinonChai);
    describe('game', function () {
      var dataChannel;
      beforeEach(function () {
        dataChannel = {
          on: sinon.stub(),
          send: sinon.stub()
        };
      });
      afterEach(function () {
        if (Phaser.Game.restore) {
          Phaser.Game.restore();
        }
      });
      describe('#create()', function () {
        it('should create Phaser game', function () {
          var stub = sinon.stub(Phaser, 'Game');
          game.create(true, dataChannel);
          stub.should.have.been.calledOnce;
        });
        it('should bind on data from channel if server', function () {
          sinon.stub(Phaser, 'Game');
          game.create(true, dataChannel);
          dataChannel.on.should.have.been.calledOnce.and.calledWith('data');
        });
        it('should bind on data from channel if client', function () {
          sinon.stub(Phaser, 'Game');
          game.create(false, dataChannel);
          dataChannel.on.should.have.been.calledOnce.and.calledWith('data');
        });
        it.skip('should disable Phaser visibility change', function (done) {
          game.create(true, dataChannel);
          var phaserGame = Phaser.GAMES[0];
          setTimeout(function wait() {
            if (phaserGame.isBooted) {
              phaserGame.state.onUpdateCallback = function () {
                phaserGame.stage.disableVisibilityChange.should.be.true;
                done();
              };
            } else {
              setTimeout(wait, 1);
            }
          }, 1);
        });
        it.skip('should create world with two object', function (done) {
          game.create(true, dataChannel);
          var phaserGame = Phaser.GAMES[0];
          setTimeout(function wait() {
            if (phaserGame.isBooted) {
              phaserGame.state.onUpdateCallback = function () {
                phaserGame.world.children.should.have.lengthOf(2);
                done();
              };
            } else {
              setTimeout(wait, 1);
            }
          }, 1);
        });
        it.skip('created world objects should serialize to coordinates objects', function (done) {
          game.create(true, dataChannel);
          var phaserGame = Phaser.GAMES[0];
          setTimeout(function wait() {
            if (phaserGame.isBooted) {
              phaserGame.state.onUpdateCallback = function () {
                phaserGame.world.children[0].toJSON().should.have.property('x');
                phaserGame.world.children[0].toJSON().should.have.property('y');
                phaserGame.world.children[1].toJSON().should.have.property('x');
                phaserGame.world.children[1].toJSON().should.have.property('y');
                done();
              };
            } else {
              setTimeout(wait, 1);
            }
          }, 1);
        });
      });
    });
  }
);

