console.log("script loaded");
var boardList =[]; 
var clickedList =[];
var sec = 0;
var em;
var c;

function layCards(event) {
    let numberOfelementLeft = 8;
    event.preventDefault();

    let imgList = ['css.jpg','face.png', 'git.png', 
                    'html.png', 'ig.png', 'js.png',
                    'twit.png', 'vue.png']
    for (let i = 0; i < 16; i++){
        let imgEn = '';
        var carden = new Vue({
            template:
            `<div class="cardboard" v-on:click="flip($event)" :name="imgC">
                <div class="outer">
                     <div class="card front" v-bind:style="{ transform: flipped? 'rotateY(180deg)': 'none' }" :name="imgC">
                    <img :src="img">
                    </div>
                    <div class="card back" v-bind:style="{ transform: flipped? 'rotateY(180deg)': 'none' }" :name="imgC"></div>
                </div>
            </div>`,
            data: function() {
                if (i <= 1) {
                    imgCounter = 0;
                    imgEn = imgList[imgCounter];
                }
                else if (i > 1 && i <= 3) {
                    imgCounter = 1;
                    imgEn = imgList[imgCounter];
                }
                else if (i > 3 && i <= 5) {
                    imgCounter = 2;
                    imgEn = imgList[imgCounter];
                }
                else if (i > 5 && i <= 7) {
                    imgCounter = 3;
                    imgEn = imgList[imgCounter]
                }
                else if (i > 7 && i <= 9) {
                    imgCounter= 4;
                    imgEn = imgList[imgCounter]
                }
                else if (i > 9 && i <= 11) {
                    imgCounter= 5;
                    imgEn = imgList[imgCounter]
                }
                else if (i > 11 && i <= 13) {

                    imgCounter= 6;
                    imgEn = imgList[imgCounter]
                }
                else if (i > 13 && i <= 15) {
                    imgCounter= 7;
                    imgEn = imgList[imgCounter]
                }
                return {
                    imgC: "imgNr".concat(imgCounter.toString()),
                    flipped: false,
                    img: imgEn, 
                    count: 0,
                };
            },
            methods: {

                flip: function(e){
                    em = e;
                    if (this.flipped){
                        this.flipped = false;
                    }
                    else {
                        if (clickedList.length > 0 && clickedList[clickedList.length-1] != this.findTop(e.target)) {
                            this.flipped = true;
                        }else if(clickedList.length == 0){
                            this.flipped = true;
                        }
                    }
                    this.onClick(e);
                },
                onClick: function (e) {
                    
                    if (player1.myTurn) {
                        player1.clicked++;
                    } else if(player2.myTurn) {
                        player2.clicked++;
                    }
                    if (clickedList.length == 1) {
                        if (clickedList[clickedList.length - 1] != this.findTop(e.target) && clickedList[clickedList.length - 1].getAttribute("name") == e.target.getAttribute("name")) {
                            this.findTopElementAndPush(e.target);
                            if (player1.myTurn) {
                                player1.directhit = true;
                                player1.count++;
                            } else if(player2.myTurn) {
                                player2.directhit = true;
                                player2.count++;
                            }
                            clickedList[0].__vue__.flipped = true;
                            clickedList[1].__vue__.flipped = true;
                            setTimeout(() => {
                                clickedList[0].classList.remove("cardboard");
                                clickedList[1].classList.remove("cardboard");
                                clickedList[0].classList.add("rigth");
                                clickedList[1].classList.add("rigth");
                            }, 400);
                            
                            setTimeout(() => {
                                clickedList.splice(0,clickedList.length);
                            }, 500);

                            setTimeout(() => {
                                numberOfelementLeft--;
                                if (numberOfelementLeft == 0) { 
                                    if (player1.count > player2.count) {
                                        if (!alert("Player 1 Won!!!")) {window.location.reload();}
                                    }
                                    else if(player1.count < player2.count){
                                        if (!alert("Player 2 Won!!!")) {window.location.reload();}
                                    }
                                    else{
                                        if (!alert("Its a tie")) {window.location.reload();}
                                    }   
                                }
                            }, 600);
                        }else{
                            if (clickedList[clickedList.length - 1] != this.findTop(e.target)){
                                this.findTopElementAndPush(e.target);
                            }else{
                                clickedList.splice(0,clickedList.length)
                            }
                            if (player1.myTurn && player1.clicked >= 2) {
                                player1._vnode.elm.childNodes[0].childNodes[0].style.backgroundColor = "white";
                                player2._vnode.elm.childNodes[2].childNodes[0].style.backgroundColor = "#73c47c";
                                player1.myTurn = false;
                                player2.myTurn = true;
                            } else if(player2.myTurn && player1.clicked >= 2) {
                                player2._vnode.elm.childNodes[2].childNodes[0].style.backgroundColor = "white";
                                player1._vnode.elm.childNodes[0].childNodes[0].style.backgroundColor = "#73c47c";
                                player2.myTurn = false;
                                player1.myTurn = true;
                            }
                        }
                    }
                    else if (clickedList.length < 2) {
                        this.findTopElementAndPush(e.target);
                        if (!player1.directhit && !player2.directhit) {
                            if (player1.myTurn && player1.clicked >= 2) {
                                player1.myTurn = false;
                                player2.myTurn = true;
                            } else if(player2.myTurn && player1.clicked >= 2) {
                                player2.myTurn = false;
                                player1.myTurn = true;
                            }
                        }
                    }else if(clickedList.length >= 2){
                        clickedList[0].__vue__._data.flipped = false;
                        clickedList[1].__vue__._data.flipped = false;
                        if (clickedList[0] != this.findTop(e.target) && clickedList[1] != this.findTop(e.target)){
                            clickedList.splice(0,clickedList.length)
                            this.findTopElementAndPush(e.target);
                        }else{
                            clickedList.splice(0,clickedList.length)
                            if (player1.myTurn) {
                                player1._vnode.elm.childNodes[0].childNodes[0].style.backgroundColor = "white";
                                player2._vnode.elm.childNodes[2].childNodes[0].style.backgroundColor = "#73c47c";
                                player1.myTurn = false;
                                player2.myTurn = true;
                            } else if(player2.myTurn){
                                player2._vnode.elm.childNodes[2].childNodes[0].style.backgroundColor = "white";
                                player1._vnode.elm.childNodes[0].childNodes[0].style.backgroundColor = "#73c47c";
                                player1.myTurn = false;
                                player2.myTurn = true;
                            }
                        }
                    }
                    info.numb++;
                },
                findTopElementAndPush: function(curr_element){
                    if (curr_element.className == "cardboard") {
                        clickedList.push(curr_element);
                    }else{
                        this.findTopElementAndPush(curr_element.parentElement);
                    }
                },
                findTop: function(elemt){
                    if (elemt.className == "cardboard"){
                        return elemt
                    }else{
                        return this.findTop(elemt.parentElement);
                    }
                }
            }
        });
        boardList.push(carden);
    }
    fill();
}
function fill() {
    let board = document.querySelector("#cardboard");
    let head = document.querySelector("header");
    board.style.visibility = "visible";
    head.style.visibility = "visible";
    board.style.height = "100%";
    board.style.padding = "10px";
    board.innerHTML = "";
    shuffle(boardList).forEach(c => {
        let card = document.createElement("div");
        board.appendChild(card);
        c.$mount(card);
        board.style.width = 115 * 4 + 'px';
    });
    startTimer();
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

function hideStart() {
    document.getElementById('startbtn').style.display = 'none';
}

function startTimer() {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime, 1000);
    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
}




