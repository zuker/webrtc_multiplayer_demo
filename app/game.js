define(['phaser', 'lodash'], function (Phaser, _) {
  'use strict';
  var cursors;
  var deathStar;
  var yoda;
  var prevUpdateTime;
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
      preload: function (game) {
        game.load.image('death_star', 'assets/death_star.gif');
        game.load.image('yoda', 'assets/yoda.gif');
      },
      create: function (game) {
        game.stage.disableVisibilityChange = true;
        deathStar = game.add.sprite(0, 0, 'death_star');
        yoda = game.add.sprite(game.world.width - 40, game.world.height - 36, 'yoda');
        deathStar.toJSON = function () {
          return _.pick(this, ['x', 'y']);
        };
        yoda.toJSON = function () {
          return _.pick(this, ['x', 'y']);
        };
        cursors = game.input.keyboard.createCursorKeys();
      },
      update: function (game) {
        if (_.isUndefined(prevUpdateTime)) {
          prevUpdateTime = game.time.now;
        }
        var fromUpdate = game.time.now - prevUpdateTime;
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
          if (fromUpdate >= 45) {
            dataChannel.send(JSON.stringify({
              type: 'step',
              deathStar: deathStar,
              yoda: yoda,
              timestamp: game.time.now
            }));
            prevUpdateTime = game.time.now;
          }
        } else {
          var input = {
            type: 'input'
          };
          if (cursors.left.isDown) {
            input.key = 'left';
          } else if (cursors.right.isDown) {
            input.key = 'right';
          } else if (cursors.up.isDown) {
            input.key = 'up';
          } else if (cursors.down.isDown) {
            input.key = 'down';
          }
          dataChannel.send(JSON.stringify(input));
          if (steps.length >= 2) {
            var lastStep;
            for (var j = steps.length - 1; j >= 0; j--) {
              if (steps[j].timestamp <= game.time.now) {
                lastStep = steps[j];
                break;
              }
            }
            var firstStep = steps[j - 1];
            var offsetTime = game.time.now - firstStep.timestamp;
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