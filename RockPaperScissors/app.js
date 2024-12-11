const images = document.querySelectorAll("img");
const msg = document.querySelector("#msg");
const choices = document.querySelectorAll(".choice"); 
const userScorePara = document.querySelector("#userScore");
const compScorePara = document.querySelector("#compScore"); 
const reset = document.querySelector("#reset");
let userScore = 0;
let compScore = 0;

reset.addEventListener("click",()=>{
    userScore = 0;
    compScore = 0;
    userScorePara.innerText=0;
    compScorePara.innerText=0;
    msg.innerText="Play your move!"
    msg.style.backgroundColor="black";
    msg.style.color="white";
});

const genCompChoice = ()=>{
    //rock, paper, scissor
    const options = ["rock","paper","scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];

};

const drawGame = ()=>{
    msg.innerHTML="Game was draw, Try again!";
    msg.style.backgroundColor="black";
    msg.style.color="white";
};

const showWinner = (userWin, compChoice, userChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerHTML=`Congratulations, You Win your "${userChoice}" beats "${compChoice}"`;
        msg.style.backgroundColor="green";
        msg.style.color="#e9c46a";
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerHTML=`Sorry, You Lose "${compChoice}" beats your "${userChoice}"`;
        msg.style.backgroundColor="red";
        msg.style.color="white";
    }

};

const playGame = (userChoice)=>{
    const compChoice = genCompChoice();
    if(compChoice === userChoice){
        //draw game 
        drawGame();
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            //paper, scissor
            userWin = compChoice === "paper" ? false : true;
        }else if(userChoice === "paper"){
            //rock, paper
            userWin = compChoice === "scissor" ? false : true;
        }
        else{
            //scissor, paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
});


images.forEach((image,choice) => {
    image.addEventListener("mouseenter", () => {
        image.style.opacity = "0.7";// Add effect on hover
        image.style.cursor = "pointer";
        image.style.backgroundColor = "Black";
    });

    image.addEventListener("mouseleave", () => {
        image.style.opacity = "1"; // Remove effect on mouse leave
        image.style.backgroundColor = "";
    });
});

