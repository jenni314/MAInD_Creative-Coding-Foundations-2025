
// START MODAL
const nextBtn = document.getElementById("next-button");
const startPage1 = document.getElementById("start-content-1");
const startPage2 = document.getElementById("start-content-2");

nextBtn.addEventListener("click", () => {
    startPage1.style.display = "none";
    startPage2.style.display = "flex";
});


const startBtn = document.getElementById("start-button");
const gameStartModal = document.getElementById("gamestart-modal");
const modalOverlay = document.getElementById("modal-overlay");

startBtn.addEventListener("click", () => {
    
    gameStartModal.style.display = "none";

    modalOverlay.style.display = "none";
    startSpawningObjects();
});

// BACKGROUND MUSIC

game_music = "https://cdn.pixabay.com/audio/2024/08/28/audio_f7b02c8be7.mp3"
const gameMusic = new Audio (game_music)

function playMusic() {
    gameMusic.loop = true;
    gameMusic.play();
}

function pauseMusic() {
    gameMusic.pause();
}

// AVATAR

// CHOOSE AVATAR

const avatar = document.getElementById("avatar");
const avatarBtn = document.querySelectorAll ("#avatar-option button")

avatarBtn.forEach(btn => {
    btn.addEventListener ('click', ()=> {

        const newAvatar = btn.querySelector("img").src;
        
        avatar.innerHTML = `<img src="${newAvatar}">`;

        avatarBtn.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");



    })
}
)




// AVATAR MOVEMENT

let avatarX = 50;
const speed = 2;

function moveLeft() {
    avatarX -= speed;
    avatar.style.transform = "scaleX(1)";
    updateAvatarPosition();
}

function moveRight() {
    avatarX += speed;
    avatar.style.transform = "scaleX(-1)";
    updateAvatarPosition();
}

function updateAvatarPosition() {
    avatarX = Math.max(0, Math.min(95, avatarX));
    avatar.style.left = avatarX + "%";
}


document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        moveLeft();
    } else if (e.key === "ArrowRight") {
        moveRight();
    }
});

// BEAM

const gameArea = document.getElementById("game_area");

beam_sound = "https://cdn.pixabay.com/audio/2024/11/19/audio_45efec0253.mp3";

function shootBeam () {
    const beam = createBeam ();
    gameArea.appendChild(beam);

    let beamSound = new Audio (beam_sound);
    beamSound.play();

    moveBeam (beam);
}

function createBeam () {
    let xPosition = avatarX + 4;
    let yPosition = 80;

    const beam = document.createElement ("div");
    
    beam.className = "beam";

    beam.style.left = xPosition + "%";
    beam.style.top = yPosition + "%";

    return beam;
}

function moveBeam (beam) {
    let beamInterval = setInterval (() => {
        let yPosition = parseFloat (beam.style.top);

        if (yPosition >= 800) {
            beam.remove();
            clearInterval(beamInterval);
        } else {
            yPosition -= 2;
            beam.style.top = yPosition + "%";
        }

        destroyObject(beam);

    }, 20);
}

document.addEventListener ("keydown", (e) => {
    if (e.code === "Space") {
        shootBeam ();
    }
});


// FALLING OBJECTS

const fallingObject = [];

for (let i = 1; i <= 34; i++) {
  fallingObject.push(`img/object/object${i}.png`);
}
console.log(fallingObject);

function createObject () {
    let newObject = document.createElement("img");
    let randomSprite = fallingObject[Math.floor(Math.random() * fallingObject.length)];

    newObject.src = randomSprite;
    newObject.className = "falling-object";

    newObject.style.position = "absolute";
    newObject.style.left = Math.random() * 90 + "%";

    newObject.style.width = Math.random() * 5 + 5 + "%" ;

    newObject.isDestroyed = false;

    gameArea.appendChild(newObject);

    moveObject(newObject);
}   

function moveObject (newObject) {
    let yPosition = -10;
    newObject.style.top = yPosition + "%";

    let objectInterval = setInterval(() => {

        if (newObject.isDestroyed) {
            clearInterval(objectInterval);
            return;
        }

        if (yPosition >= 90) {
            yPosition = 90; 
            newObject.style.top = yPosition + "%";

            loseBudget(); 

            clearInterval(objectInterval);
        return;

        } else {
            yPosition += 1;
            newObject.style.top = yPosition + "%";
        }
    }, 20);
}

let objectSpawnInterval;


function startSpawningObjects() {
    objectSpawnInterval = setInterval(() => {
        if (!gameOver) {
            createObject();
        }
    }, 3000);

    playMusic();

}

// COLLISION DETECTION

function checkCollision(beam, object) {
    const beamRect = beam.getBoundingClientRect();
    const objRect = object.getBoundingClientRect();
    
    const isColliding = !(
        beamRect.right < objRect.left ||
        beamRect.left > objRect.right ||
        beamRect.bottom < objRect.top ||
        beamRect.top > objRect.bottom
    );
    
    return isColliding;
    
}



object_destroy_sound = "https://cdn.pixabay.com/audio/2024/08/03/audio_169049f4a1.mp3";

function destroyObject(beam) {
    const objects = document.querySelectorAll(".falling-object");
        
       objects.forEach((object) => {
        if (checkCollision(beam, object)) {
            const destroySound = new Audio(object_destroy_sound);
            destroySound.play();

            object.isDestroyed = true;

            gainBudget();

            object.remove();
            beam.remove();
        }
    });
}

// COUNT POINT & ADD LIST

const budget = document.getElementById("budget-amount");
const listContainer = document.getElementById("item-list");

let budgetAmount = 1000;
let gameOver = false; 

function getItem() {
    const i = Math.floor(Math.random() * itemList.length);
    return itemList[i];
}


function addItem () {
    const li = document.createElement("li");
    li.textContent = getItem();
    listContainer.appendChild(li);
}

cashier_sound = "https://cdn.pixabay.com/audio/2025/07/18/audio_f1c1d0ad73.mp3"

function loseBudget () {
    if (gameOver) return;

    budgetAmount -= 200;
    budget.textContent = budgetAmount;

    addItem();

    const cashierSound = new Audio(cashier_sound);
            cashierSound.play();

    if (budgetAmount <= 0 ) {   
        budgetAmount = 0;
        
        gameOver = true;


        endGame();
    }

    budget.textContent = budgetAmount;
}

function gainBudget () {
    budgetAmount += 50;
    budget.textContent = budgetAmount;
}


// END GAME

const restartBtn = document.getElementById("restart-button");
const endPage = document.getElementById("end-content");

function endGame() {
    gameOver = true;

    clearInterval(objectSpawnInterval);


    gameStartModal.style.display = "flex";
    startPage2.style.display = "none";


    endPage.style.display = "flex";

    const floorObject = document.querySelectorAll(".falling-object")
    floorObject.forEach(obj=>obj.remove())

    modalOverlay.style.display = "flex";


    pauseMusic();
    

}

restartBtn.addEventListener("click", () => {
    
    gameOver = false;

    budgetAmount = 1000;
    budget.textContent = budgetAmount;

    gameStartModal.style.display = "none";

    let gameMusic = new Audio (game_music);
    gameMusic.pause();

    modalOverlay.style.display = "none";



    startSpawningObjects();

});