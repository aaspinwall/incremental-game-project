let data = {
  coins: 0,
  power: 0,
  minerObj: {
    name: "Miner",
    price: 50,
    image: "imgs/miner.jpeg",
    speed: 1,
    owned: 0,
  },
  computerObj: {
    name: "Computer",
    price: 500,
    image: "imgs/computer.png",
    speed: 10,
    owned: 0,
  },
  datacenterObj: {
    name: "Data center",
    price: 2000,
    image: "imgs/datacenter.png",
    speed: 100,
    owned: 0,
  },
  superObj: {
    name: "Super computer",
    price: 50000,
    image: "imgs/supercomputer.jpg",
    speed: 1000,
    owned: 0,
  },
  quantumObj: {
    name: "Quantum computer",
    price: 200000,
    image: "imgs/quantumcomputer.jpg",
    speed: 10000,
    owned: 0,
  },
  ai: {
    name: "AI",
    price: 5000000,
    image: "imgs/AI.png",
    speed: 100000,
    owned: 0,
  },
  matroshkaObj: {
    name: "Matrioshka brain",
    price: 20000000,
    image: "imgs/matrioshka.jpg",
    speed: 1000000,
    owned: 0,
  },
  simulationObj: {
    name: "Simulation",
    price: 1000000000,
    image: "imgs/simulation.jpg",
    speed: 0,
    owned: 0,
  },
  achievements: {
    entrepreneur: false,
    rags: false,
    madness: false,
    rocket: false,
    singularity: false,
    simulation: false,
  },
};

let initData = JSON.parse(JSON.stringify(data));

function reload(n = 1) {
  if (n === 0) {
    data = JSON.parse(JSON.stringify(initData));
    let savedData = JSON.stringify(data);
    localStorage.setItem("data", savedData);
    location.reload();
  }
}
let initialData = reload();
function reset() {
  reload(0);
}

function rebuildSession() {
  const entityArray = [
    data.minerObj,
    data.computerObj,
    data.datacenterObj,
    data.superObj,
    data.quantumObj,
    data.ai,
    data.matroshkaObj,
    data.simulationObj,
  ];
  //Rebuild
  entityArray.forEach(element => {
    //console.log(element);
    //elStore.appendChild(newWorker(element));
    if (element.owned > 0) {
      elStore.appendChild(newWorker(element));
    }
  });
  entityArray.forEach(element => {
    //console.log(element);
    if (element.owned > 0) {
      for (let index = 0; index < element.owned; index++) {
        buyWorker(element, true);
      }
    }
  });
}
function saveSession() {
  if (data.coins > 10) {
    let savedData = JSON.stringify(data);
    localStorage.setItem("data", savedData);
  }
}
function loadSession() {
  let savedData = localStorage.getItem("data");
  savedData = JSON.parse(savedData);
  Object.assign(data, savedData);
  rebuildSession();
}

function soundManager(string) {
  let buy = new Audio("sounds/buy.mp3");
  let coin = new Audio("sounds/coin.mp3");

  return string === "coin" ? coin.play() : buy.play();
}

function storeManager() {
  const entityArray = [
    data.minerObj,
    data.computerObj,
    data.datacenterObj,
    data.superObj,
    data.quantumObj,
    data.ai,
    data.matroshkaObj,
    data.simulationObj,
  ];
  for (let index = 0; index < entityArray.length; index++) {
    const element = entityArray[index];
    if (data.coins > element.price && elStore.children.length === index) {
      addNewWorker(element);
    }
  }
}

function selectElement(str) {
  return document.querySelector(str);
}
function newElement(str, attr, value) {
  let res = document.createElement(str);
  if (attr && value) {
    res.setAttribute(attr, value);
  }
  return res;
}

function showAchievement(achievement = "achievement") {
  elAchieventText.innerHTML = achievement;
  elAchievement.setAttribute("class", "achievementVisible");
  elCloseAchievement.addEventListener("click", () => {
    elAchievement.setAttribute("class", "achievementInvisible");
  });
}

function addNewWorker(worker) {
  elStore.appendChild(newWorker(worker));
}

function newWorker(worker, target) {
  //createFrame
  const frame = newElement("div", "class", "frame");
  //addImage
  const img = newElement(
    "img",
    "class",
    `el${worker.name.toLowerCase().replace(/\s/g, "")}`
  );
  img.setAttribute("src", worker.image);
  //addCost
  const cost = newElement("div", "class", "price");
  cost.innerHTML = `<div>${worker.name}</div><div>${elLittleCoin}${
    worker.price
  }</div>`;
  //addImage to frame
  frame.appendChild(img);
  frame.appendChild(cost);
  //create active worker displays
  const counter = newElement("div", "class", "circled");
  counter.setAttribute(
    "id",
    `${worker.name.toLowerCase().replace(/\s/g, "")}Counter`
  );
  counter.innerHTML = worker.owned;
  frame.appendChild(counter);
  //update the mining logic
  //return to target
  frame.addEventListener("click", element => {
    //addFunctionOnClick
    canBuy(worker);
  });
  return frame;
}
function buyWorker(worker, rebuild = false) {
  let frameId = worker.name.toLowerCase().replace(/\s/g, "") + "Frame";
  let counter = `#${worker.name.toLowerCase().replace(/\s/g, "")}Counter`;

  //if rebuild, don't add to owned, just build frame and append children
  if (!rebuild) {
    worker.owned += 1;
    data.power += worker.speed;
  }

  const img = newElement(
    "img",
    "class",
    `el${worker.name.toLowerCase().replace(/\s/g, "")}`
  );
  img.setAttribute("src", worker.image);
  if (!document.querySelector("#" + frameId)) {
    const frame = newElement("div", "class", "framePanel");
    frame.setAttribute("id", frameId);
    panel.appendChild(frame);
    frame.appendChild(img);
  } else {
    document.querySelector("#" + frameId).appendChild(img);
  }
  selectElement(counter).innerHTML = worker.owned;
}

function canBuy(worker) {
  if (worker.price * (worker.owned + 1) <= data.coins) {
    console.log("You can actually afford that!");
    buyWorker(worker);
    soundManager();
  } else {
    console.log(`You're too broke for that`);
  }
}

const body = selectElement("body");
const elButton = selectElement("#coin");
const elScore = selectElement("#score");
const elPanel = selectElement("#panel");
const elStore = selectElement("#store");
const elAchievement = selectElement("#achievement");
const elCloseAchievement = selectElement("#achievement div");
const elAchieventText = selectElement("#achievement span");
const elLittleCoin =
  '<img src="imgs/coin.png" alt="coin-image" class="littleCoin" />';

function addCoins(n = 1) {
  data.coins += n;
  elScore.innerHTML = `${data.coins}<br>coins`;
}

elButton.addEventListener("click", () => {
  soundManager("coin");
  addCoins();
});

function initGame() {
  loadSession();
  let scoreTimer = setInterval(() => {
    elScore.innerHTML = `${data.coins}<br>coins`;
  }, 10);

  let valueTimer = setInterval(() => {
    data.coins += data.power;
    storeManager();
    saveSession();
  }, 1000);
}

initGame();
