require(['peer', 'jquery', 'game'], function (peer, $, game) {
  'use strict';
  $('#create').click(function () {
    peer.create(function (err, peer) {
      if (err) {
        console.error(err);
      } else {
        console.log('Ready');
        $('#connectForm').hide();
        $('#createForm').hide();
        $('#yourPeerId > span:last').text(peer.id);
        $('#yourPeerId').show();
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
          $('#createForm').hide();
          $('#connectForm input').each(function (i, input) {
            $(input).prop('disabled', true);
          });
          game.create(false, dataConnection);
        }
      });
    } else {
      console.error(new Error('Invalid PeerID'));
    }
  });
});