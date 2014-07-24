define(['peerjs', './config'], function (Peer, config) {
  'use strict';
  var key = config.peerjs.key;

  function open(callback) {
    var peer = new Peer({key: key});
    peer
      .once('error', callback)
      .once('open', function() {
        peer.removeListener('error', callback);
        console.log('Connected to server. Received ID: ' + peer.id);
        callback(null, peer);
      })
    ;
  }

  return {
    create: function (callback) {
      open(function (err, peer) {
        if (err) {
          callback(err);
        } else {
          callback(null, peer);
        }
      });
    },
    connect: function (id, callback) {
      open(function (err, peer) {
        if (err) {
          callback(err);
        } else {
          var dataConnection = peer
            .once('error', callback)
            .connect(id)
          ;
          dataConnection.once('open', function () {
            peer.removeListener('error', callback);
            callback(null, peer, dataConnection);
          });
        }
      });
    }
  };
});