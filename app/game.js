define(['phaser', 'lodash'], function (Phaser, _) {
  'use strict';
  var cursors;
  var deathStar;
  var yoda;
  var timestamp;
  var steps = [];
  var inputs = [];
  var game = function (isServer, dataChannel) {
    dataChannel.on('data', function (data) {
      data = JSON.parse(data);
      if (data.type === 'step') {
        steps.push(data);
      } else if (data.type === 'input') {
        inputs.push(data);
      }
    });
    return {
      preload: function () {
        this.load.image('death_star', 'assets/death_star.gif');
        this.load.image('yoda', 'assets/yoda.gif');
      },
      create: function () {
        deathStar = this.add.sprite(0, 0, 'death_star');
        yoda = this.add.sprite(this.world.width - 40, this.world.height - 36, 'yoda');
        deathStar.toJSON = function () {
          return _.pick(this, ['x', 'y']);
        };
        yoda.toJSON = function () {
          return _.pick(this, ['x', 'y']);
        };
        cursors = this.input.keyboard.createCursorKeys();
        timestamp = (new Date()).getTime();
        if (isServer) {
          setTimeout(function send() {
            var currentTimestamp = (new Date()).getTime();
            dataChannel.send(JSON.stringify({
              type: 'step',
              deathStar: deathStar,
              yoda: yoda,
              timestamp: currentTimestamp
            }));
            setTimeout(send, 45);
          }, 45);
        }
      },
      update: function () {
        if (isServer) {
          if (cursors.left.isDown) {
            deathStar.x -= 5;
          } else if (cursors.right.isDown) {
            deathStar.x += 5;
          } else if (cursors.up.isDown) {
            deathStar.y -= 5;
          } else if (cursors.down.isDown) {
            deathStar.y += 5;
          }
          for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].key === 'left') {
              yoda.x -= 5;
            } else if (inputs[i].key === 'right') {
              yoda.x += 5;
            } else if (inputs[i].key === 'up') {
              yoda.y -= 5;
            } else if (inputs[i].key === 'down') {
              yoda.y += 5;
            }
          }
          inputs = [];
        } else {
          if (steps.length >= 2) {
            var currentTimestamp = (new Date()).getTime();
            var lastStep;
            for (var j = steps.length - 1; j >= 0; j--) {
              if (steps[j].timestamp <= currentTimestamp) {
                lastStep = steps[j];
                break;
              }
            }
            var firstStep = steps[j - 1];
            var offsetTime = currentTimestamp - firstStep.timestamp;
            var t = offsetTime / (lastStep.timestamp - firstStep.timestamp);
            if (t > 1) {
              t = 1;
            } else if (t < 0) {
              t = 0;
            }

            deathStar.x = firstStep.deathStar.x + (lastStep.deathStar.x - firstStep.deathStar.x) * t;
            deathStar.y = firstStep.deathStar.y + (lastStep.deathStar.y - firstStep.deathStar.y) * t;
            yoda.x = firstStep.yoda.x + (lastStep.yoda.x - firstStep.yoda.x) * t;
            yoda.y = firstStep.yoda.y + (lastStep.yoda.y - firstStep.yoda.y) * t;
            var input = {
              type: 'input'
            };
            if (cursors.left.isDown) {
              yoda.x -= 5;
              input.key = 'left';
            } else if (cursors.right.isDown) {
              yoda.x += 5;
              input.key = 'right';
            } else if (cursors.up.isDown) {
              yoda.y -= 5;
              input.key = 'up';
            } else if (cursors.down.isDown) {
              yoda.y += 5;
              input.key = 'down';
            }
            dataChannel.send(JSON.stringify(input));
          }
        }
      }
    };
  };
  return {
    create: function (isServer, dataChannel) {
      return new Phaser.Game(
        800,
        600,
        Phaser.AUTO,
        '',
        game(isServer, dataChannel)
      );
    }
  };
});