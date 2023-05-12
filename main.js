const CardGame = function (targetId) {
  "use strict";

  const cards = [];

  const listCard = [
    "1B",
    "2B",
    "2C",
    "2D",
    "2H",
    "2S",
    "3C",
    "3D",
    "3H",
    "3S",
    "4C",
    "4D",
    "4S",
    "5C",
    "5D",
    "5H",
    "5S",
    "6C",
    "6D",
    "6H",
    "6S",
    "7C",
    "7D",
    "7H",
    "7S",
    "8D",
    "8H",
    "8S",
    "9C",
    "9D",
    "9H",
    "9S",
    "AD",
    "AC",
    "AH",
    "AS",
    "JC",
    "JD",
    "JH",
    "JS",
    "KC",
    "KD",
    "KH",
    "KS",
    "QC",
    "QD",
    "QH",
    "QS",
    "TC",
    "TD",
    "TH",
    "TS",
  ];


  let gameStarted = false;
  let card1 = false

  const container = document.getElementById(targetId);

  const felt = document.createElement("div");
  felt.id = "felt";
  container.replaceChildren(felt);

  const messageWindow = document.createElement("aside");

  const deckHolder = document.createElement("div");
  deckHolder.className = "deck";

  felt.append(messageWindow, deckHolder);

  /* create cards from template */

  for (let i = 0; i < listCard.length; i++) {
    const holder = document.createElement("div");
    holder.className = "holder";
    holder.style.top = 15 + 120 * Math.floor(i / 13) + "px";
    holder.style.left = 70 + 100 * (i % 13) + "px";

    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.fromTop = 15 + 120 * Math.floor(i / 13);
    newCard.fromLeft = 70 + 100 * (i % 13);
    newCard.matched = false;
  
    newCard.addEventListener("click", (e) => {
      cardClick(i);
    });

    const displayMessage = (text) => {
        if(text) {
          messageWindow.style.display = "flex";
          messageWindow.innerText = text;
        } else {
          messageWindow.style.display = "none";
          messageWindow.innerText = "";
        }
      };
    
      displayMessage("â¬… Click deck to start game");

    felt.append(holder, newCard);

    cards.push(newCard);
  }

  /* define local methods */

  const moveToPlace = (id) => {
    /* deal card */

    Object.assign(cards[id].style, {
      top: cards[id].fromTop + "px",
      left: cards[id].fromLeft + "px",
      transform: "rotate(" + (Math.floor(Math.random() * 5) + 178) + "deg)",
      zIndex: 10,
    });
  };

  const showCard = (id) => {
    /* reveal card, check for match */
    cards[id].style.backgroundImage = "url(/poker-qr/" + listCard [id] + ".svg)"
    cards[id].style.backgroundSize = "80% 80%";

    /* because Firefox doesn't know which way to rotate */

    const matches = cards[id].style.transform.match(/^rotate\((\d+)deg\)$/);

    if (matches && matches[1] <= 180) {
      cards[id].style.transform = "scale(1.2) rotate(175deg)";
    } else {
      cards[id].style.transform = "scale(1.2) rotate(185deg)";
    }
  };

  const dealCards = () => {
    /* shuffle cards */

    listCard.sort(() => Math.round(Math.random()) - 0.5);

    /* deal cards */

    for (let i = 0; i < listCard.length; i++) {
      cards[i].matched = false;
      if (listCard[i].match(/W/)) {
        cards[i].classList.add("black");
      } else {
        cards[i].classList.remove("black");
      }
      window.setTimeout(moveToPlace, i * 100, i);
    }

    gameStarted = true;
  };

  const cardClick = (id) => {
    if (!gameStarted) {
      dealCards();
      messageWindow.style.display = "none";
    } else if (id !== card1 && !cards[id].matched) {
      showCard(id);
    }
  };
};
