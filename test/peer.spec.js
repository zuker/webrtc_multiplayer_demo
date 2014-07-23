/* globals describe: false, it: false */
define(['../app/peer', 'chai'], function(peer, chai) {
  'use strict';
  chai.should();
  describe('peer', function() {
    it('should have connect method', function() {
      peer.should.have.property('connect');
    });
  });
});