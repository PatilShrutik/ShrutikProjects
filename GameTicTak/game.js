let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#resetGame");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let turn0 = true;//playerX,playerO

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],    
];

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turn0){//playerO
            box.innerText="O";
            turn0 = false;
        }else{//playerX
            box.innerText="X";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const resetGame = ()=>{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner)=>{
    msg.innerText=`Congratulations, The winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = ()=>{
    for(let pattern of winPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
   
        if(pos1val !="" && pos2val!="" && pos3val!=""){
            if(pos1val == pos2val && pos2val == pos3val){
                showWinner(pos1val);
            }
        }
    }

};

newGameBtn.addEventListener("click",resetGame);
resetGameBtn.addEventListener("click",resetGame);