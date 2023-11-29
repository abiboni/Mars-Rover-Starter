const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {

  // 7 tests here!

  //TEST 7
  test('constructor sets position and default values for mode and generatorWatts', function () {
    let positionValue = new Rover(1);
    expect(positionValue.position).toEqual(1);
    expect(positionValue.mode).toEqual('NORMAL');
    expect(positionValue.generatorWatts).toEqual(110);
  });

  // TEST 8
  test('response returned by receiveMessage contains the name of the message', function () {
    let rover = new Rover(2)
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);

    console.log(response);
    expect(response.message).toEqual('Test message with two commands');
  });

  // TEST 9
  test('response returned by receiveMessage includes two results if two commands are sent in the message'
    , function () {
      let rover = new Rover(2)
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let response = rover.receiveMessage(message);

      expect(response.results.length).toEqual(2);
    });

  // TEST 10
  test('responds correctly to the status check command', function() {
    let rover = new Rover(2)
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
// console.log(message.commands[1].commandType);
    expect(response.results[0]).toEqual({completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 2}})
  });

  // TEST 11 
  test('responds correctly to the mode change command', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(4)
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    // expect(response.results[0]).toEqual({completed: true})
    expect(rover.mode).toEqual('LOW_POWER');
  });

  // TEST 12 (check the move command to see if it doesn't move if it is in normal power)
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1)];
    let message = new Message('Cannot move while on LOW_POWER', commands);
    let rover = new Rover(3);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toEqual(false);
    expect(rover.position).toEqual(3);
  
console.log(response);
    
  })
  // TEST 13 (check that it DOES move normal) RESETS POSITION FOR MOVE CMD
  test("responds with the position for the move command", function() {

    let commands = [new Command('MOVE', 9)]
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(4);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    expect(rover.position).toEqual(9);
  });

  // console.log(response.results[0].completed)
  
});
