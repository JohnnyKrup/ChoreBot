let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
let currentlyPlaying = true;

let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

const isBot = door => {
    return (door.src === botDoorPath) ? true : false;
}

const isClicked = door => {
    return (door.src === closedDoorPath) ? false : true;      
};

const playDoor = (door) => {    
    numClosedDoors = numClosedDoors-1;
    if(numClosedDoors === 0){
        gameOver('win');
    } else if (isBot(door)){
        gameOver();
    }
};

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  
  if(choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};

door1.onclick = () => {    
    if(isClicked(doorImage1) === false && currentlyPlaying){ 
        doorImage1.src = openDoor1;       
        playDoor(doorImage1);
    }
};

door2.onclick = () => {    
    if(isClicked(doorImage2) === false && currentlyPlaying){
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
};

door3.onclick = () => {    
    if(isClicked(doorImage3) === false && currentlyPlaying){
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
};

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;

    randomChoreDoorGenerator();
}

startButton.onclick = () => {
    if(currentlyPlaying === false){
        startRound();
    }
};

const gameOver = (status) => {
    startButton.innerHTML = (status === 'win') ? 'You win!<br>Play again?' : 'You lost!<br>Play again?';    
    currentlyPlaying = false;
};

startRound();
