document.addEventListener("DOMContentLoaded", () => {
    const scoreDisplay = document.getElementById("score")
    const width = 28
    let score = 0
    let gamePaused = false;  // Tracks the pause state
    let pacmanTimerId = null; // Timer for Pac-Man's movement (optional, in case of continuous movement)
    const grid = document.querySelector(".grid")

    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

    const squares = []

    //create your board
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement("div")
            square.id = i
            grid.appendChild(square)
            squares.push(square)

            //add layout to the board
            if (layout[i] === 0) {
                squares[i].classList.add("pac-dot")
            }
            if (layout[i] === 1) {
                squares[i].classList.add("wall")
            }
            if (layout[i] === 2) {
                squares[i].classList.add("ghost-lair")
            }
            if (layout[i] === 3) {
                squares[i].classList.add("power-pellet")
            }
        }
    }
    createBoard()

    //create Characters
    // draw pac-man onto the board
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add("pac-man")

    //move pacman
    //move pacman based on joystick input
    function movePacman(direction) {
        squares[pacmanCurrentIndex].classList.remove("pac-man");

        switch (direction) {
            case "left":
                if (
                    pacmanCurrentIndex % width !== 0 &&
                    !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex -= 1;
                }
                break;
            case "up":
                if (
                    pacmanCurrentIndex - width >= 0 &&
                    !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex -= width;
                }
                break;
            case "right":
                if (
                    pacmanCurrentIndex % width < width - 1 &&
                    !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex += 1;
                }
                break;
            case "down":
                if (
                    pacmanCurrentIndex + width < width * width &&
                    !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
                ) {
                    pacmanCurrentIndex += width;
                }
                break;
        }

        squares[pacmanCurrentIndex].classList.add("pac-man");
        pacDotEaten();
        powerPelletEaten();
        checkForGameOver();
        checkForWin();
    }

    // Listen to joystick input for movement
    async function listenToJoystick(port) {
        try {
            await port.open({ baudRate: 9600 });

            const reader = port.readable.getReader();
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    // Exit the loop if reading is done
                    break;
                }
            
                // Convert the serial input to a string and trim whitespace
                const direction = new TextDecoder().decode(value).trim();
                console.log("Received from Arduino:", direction);  // Log received value
            
                // Check if direction is valid and move Pac-Man
                if (["left", "right", "up", "down"].includes(direction)) {
                    movePacman(direction);
                } else if (direction === "pause") {
                    pauseGame();
                } else if (direction === "resume") {
                    pauseGame();
                }
            }

            // Release the reader and close the port when done
            reader.releaseLock();
            await port.close();
            console.log("Port closed successfully.");
        } catch (err) {
            console.error("Error reading from the port:", err);
            // Optionally re-enable the "Connect Joystick" button if the connection fails
            document.getElementById("connect-button").disabled = false;
        }
    }

    // Function to connect to the serial port
    async function connectJoystick() {
        try {
            const port = await navigator.serial.requestPort(); // This will open the port selection dialog
            document.getElementById("connect-button").disabled = true; // Disable the button to prevent re-clicking
            listenToJoystick(port);  // Pass the selected port to listen for joystick inputs
        } catch (err) {
            console.error("Failed to connect to joystick:", err);
            // Re-enable the button if there was an error selecting the port
            document.getElementById("connect-button").disabled = false;
        }
    }

    // Add event listener to button click to trigger serial port request
    document.getElementById("connect-button").addEventListener("click", () => {
        connectJoystick();
    });
    
    // Pause or resume the game
    function pauseGame() {
        gamePaused = !gamePaused; // Toggle the game paused state

        if (gamePaused) {
            // Stop ghost movements by clearing timers
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            // Optional: Stop Pac-Man's movement (if it's running on a timer)
            if (pacmanTimerId) clearInterval(pacmanTimerId);

            console.log("Game paused");
        } else {
            // Resume ghost movements
            ghosts.forEach(ghost => moveGhost(ghost));

            console.log("Game resumed");
        }
    }


    //what happens when you eat a pac-dot
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove("pac-dot")
        }
    }

    //what happens when you eat a power-pellet
    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
            score += 10
            scoreDisplay.innerHTML = score
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000)
            squares[pacmanCurrentIndex].classList.remove("power-pellet")
        }
    }

    //make the ghosts stop flashing
    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
    }

    //create ghosts using Constructor
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.isScared = false
            this.timerId = NaN

        }
    }

    //all my ghosts
    const ghosts = [
        new Ghost("blinky", 348, 250),
        new Ghost("pinky", 376, 400),
        new Ghost("inky", 351, 300),
        new Ghost("clyde", 379, 500),
    ]

    //draw my ghosts onto the grid
    ghosts.forEach(ghost =>
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost"))

    //move ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    function moveGhost(ghost) {
        const directions = [-1, 1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function () {
            //if next square your ghost is going to go to does not have a ghost and does not have a wall
            if (
                !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
                !squares[ghost.currentIndex + direction].classList.contains("wall")
            ) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
                ghost.currentIndex += direction
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
                // else find a new random direction to go in
            } else direction = directions[Math.floor(Math.random() * directions.length)]
            // if the ghost is currently scared
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost")
            }

            //if the ghost is currently scared and pacman is on it
            if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
                ghost.isScared = false
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
                ghost.currentIndex = ghost.startIndex
                score += 100
                scoreDisplay.innerHTML = score
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
            }
            checkForGameOver()
        }, ghost.speed)
    }

    //check for a game over
    function checkForGameOver() {
        if (
            squares[pacmanCurrentIndex].classList.contains("ghost") &&
            !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(function () {
                alert("Game Over")
            }, 500)
        }
    }

    //check for a win - change the winning score to whatever you wish
    function checkForWin() {
        if (score >= 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(function () {
                alert("You have WON!")
            }, 500)
        }
    }
    
})
