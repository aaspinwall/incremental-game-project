let coins = 1000000000;
let power = 0;

let minerObj = {
  name: "Miner",
  price: 50,
  image: "imgs/miner.jpeg",
  speed: 1,
  owned: 0,
};
let computerObj = {
  name: "Computer",
  price: 500,
  image: "imgs/computer.png",
  speed: 10,
  owned: 0,
};
let datacenterObj = {
  name: "Data center",
  price: 2000,
  image: "imgs/datacenter.png",
  speed: 100,
  owned: 0,
};
let superObj = {
  name: "Super computer",
  price: 50000,
  image: "imgs/supercomputer.jpg",
  speed: 1000,
  owned: 0,
};
let quantumObj = {
  name: "Quantum computer",
  price: 200000,
  image: "imgs/quantumcomputer.jpg",
  speed: 10000,
  owned: 0,
};
let matroshkaObj = {
  name: "Matrioshka brain",
  price: 20000000,
  image: "imgs/matrioshka.jpg",
  speed: 1000000,
  owned: 0,
};
let simulationObj = {
  name: "Simulation",
  price: 1000000000,
  image: "imgs/simulation.jpg",
  speed: 0,
  owned: 0,
};

const objGroup = [
  minerObj,
  computerObj,
  datacenterObj,
  superObj,
  quantumObj,
  matroshkaObj,
  simulationObj,
];

function saveSession() {
  let data = JSON.stringify(minerObj);
  localStorage.setItem("data", data);
}
function loadSession() {
  let data = localStorage.getItem("data");
  minerObj = JSON.parse(data);
}

function selectElement(str, attr, value) {
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

function newWorker(worker, target) {
  //createFrame
  const frame = newElement("div", "class", "frame");
  //addImage
  const img = document.createElement("img");
  img.setAttribute(
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
  counter.innerHTML = "0";
  frame.appendChild(counter);
  //update the mining logic
  //return to target
  frame.addEventListener("click", element => {
    //addFunctionOnClick
    canBuy(worker);
  });
  return frame;
}
function buyWorker(worker) {
  let frameId = worker.name.toLowerCase().replace(/\s/g, "") + "Frame";
  let counter = `#${worker.name.toLowerCase().replace(/\s/g, "")}Counter`;
  //add a conditional to check if the frame has been previously created
  //addframewith worker
  worker.owned += 1;
  power += worker.speed;
  const img = document.createElement("img");
  img.setAttribute(
    "class",
    `el${worker.name.toLowerCase().replace(/\s/g, "")}`
  );
  img.setAttribute("src", worker.image);
  if (worker.owned === 1) {
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
  if (worker.price <= coins) {
    console.log("You can actually afford that!");
    buyWorker(worker);
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

//Add worker to store inventory
/* elStore.appendChild(newWorker(minerObj));
elStore.appendChild(newWorker(computerObj));
elStore.appendChild(newWorker(datacenterObj));
elStore.appendChild(newWorker(matroshkaObj));
elStore.appendChild(newWorker(superObj));
elStore.appendChild(newWorker(quantumObj)); */
[
  minerObj,
  computerObj,
  datacenterObj,
  superObj,
  quantumObj,
  matroshkaObj,
  simulationObj,
].map(element => {
  elStore.appendChild(newWorker(element));
});

function addCoins(n = 1) {
  coins += n;
  elScore.innerHTML = `${coins}<br>coins`;
}

elButton.addEventListener("click", () => {
  addCoins();
});

let timer = setInterval(() => {
  coins += power;
  elScore.innerHTML = `${coins}<br>coins`;
}, 1000);
