require(['peer', 'jquery', 'game'], function (peer, $, game) {
  'use strict';
  function bindLog(dataConnection) {
    function log(me, data) {
      var $log = $('#log');
      $log.val($log.val() + (me ? 'me' : 'remote') + ': ' + data + '\n');
    }
    console.log('Data connection opened');
    $('#send').click(function () {
      var data = $('#data').val();
      dataConnection.send(data);
      log(true, data);
    });
    dataConnection.on('data', function (data) {
      log(false, data);
    });
    $('#communication').show();
  }
  $('#create').click(function () {
    peer.create(function (err, peer) {
      if (err) {
        console.error(err);
      } else {
        console.log('Ready');
        peer.on('connection', function (dataConnection) {
          console.log('Remote peer connected: ' + dataConnection.peer);
          dataConnection.once('open', function () {
            game.create(true, dataConnection);
          });
        });
      }
    });
  });
  $('#connect').click(function () {
    var id = $('#peerId').val();
    if (id) {
      peer.connect(id, function (err, peer, dataConnection) {
        if (err) {
          console.error(err);
        } else {
          console.log('Connected to ID: ' + id);
          game.create(false, dataConnection);
        }
      });
    } else {
      console.error(new Error('Invalid PeerID'));
    }
  });
});