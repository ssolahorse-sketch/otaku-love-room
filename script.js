const screens = {
  splash: document.querySelector("#splashScreen"),
  setup: document.querySelector("#setupScreen"),
  appearance: document.querySelector("#appearanceScreen"),
  matching: document.querySelector("#matchingScreen"),
  room: document.querySelector("#roomScreen"),
};
const clientPassword = "lala";
const clientLock = document.querySelector("#clientLock");
const clientLockForm = document.querySelector("#clientLockForm");
const clientLockInput = document.querySelector("#clientLockInput");
const clientLockError = document.querySelector("#clientLockError");

const relationLabels = {
  oppositeFriend: "이성 친구",
  sameFriend: "동성 친구",
  oppositeLover: "이성 애인",
  sameLover: "동성 애인",
};

const genderLabels = {
  female: "여자",
  male: "남자",
};

const myFrontImages = {
  female: "assets/girl1.png",
  male: "assets/boy1.png",
};

const myBackImages = {
  female: "assets/girl1-back.png",
  male: "assets/boy1-back.png",
};

const playerCharacterByPartner = {
  boy1: {
    id: "girl1",
    front: "assets/girl1.png",
    back: "assets/girl1-back.png",
  },
  boy2: {
    id: "girl2",
    front: "assets/girl2.png",
    back: "assets/girl2-back.png",
  },
  girl1: {
    id: "boy1",
    front: "assets/boy1.png",
    back: "assets/boy1-back.png",
  },
  girl2: {
    id: "boy2",
    front: "assets/boy2.png",
    back: "assets/boy2-back.png",
  },
};

const characters = {
  female: [
    {
      id: "girl1",
      name: "하린",
      image: "assets/girl1.png",
      backImage: "assets/girl1-back.png",
      desc: "검은 머리 고양이상",
    },
    {
      id: "girl2",
      name: "세라",
      image: "assets/girl2.png",
      backImage: "assets/girl2-back.png",
      desc: "은빛 머리 고양이상",
    },
  ],
  male: [
    {
      id: "boy1",
      name: "유현",
      image: "assets/boy1.png",
      backImage: "assets/boy1-back.png",
      desc: "검은 머리 미소년",
    },
    {
      id: "boy2",
      name: "시온",
      image: "assets/boy2.png",
      backImage: "assets/boy2-back.png",
      desc: "은빛 머리 미소년",
    },
  ],
};

const partnerImageOffsets = {
  girl1: { front: 20.35, back: 18.13 },
  girl2: { front: 20.35, back: 18.13 },
  boy1: { front: 10, back: 11.43 },
  boy2: { front: 10, back: 11.43 },
};

const characterVisibleBounds = {
  girl1: {
    front: { height: 67.22, bottom: 0 },
    back: { height: 68.78, bottom: 0 },
  },
  girl2: {
    front: { height: 67.22, bottom: 0 },
    back: { height: 68.78, bottom: 0 },
  },
  boy1: {
    front: { height: 83.70, bottom: 0 },
    back: { height: 80.92, bottom: 0 },
  },
  boy2: {
    front: { height: 83.70, bottom: 0 },
    back: { height: 80.86, bottom: 0 },
  },
};

const partnerScaleBoosts = {
  girl1: 0,
  girl2: 0,
  boy1: 0,
  boy2: 0,
};

const partnerCloseImageBoosts = {
  girl1: 0,
  girl2: 0,
  boy1: 0,
  boy2: 0,
};

const floorStages = [
  {
    badge: "B1",
    name: "지하방",
    feature: "노동형 방어 · 꿈틀이 자주 등장",
    nextXp: 24,
    rewardScale: 1,
    threatDelay: [26000, 42000],
  },
  {
    badge: "1F",
    name: "원룸",
    feature: "작은 가구 배치 · 방해 감소",
    nextXp: 42,
    rewardScale: 1.25,
    threatDelay: [34000, 56000],
  },
  {
    badge: "5F",
    name: "아파트",
    feature: "창문/조명 커스텀 · 보상 증가",
    nextXp: 64,
    rewardScale: 1.55,
    threatDelay: [46000, 74000],
  },
  {
    badge: "20F",
    name: "스위트",
    feature: "자동 방어 준비 · 희귀 보상",
    nextXp: 92,
    rewardScale: 1.95,
    threatDelay: [58000, 92000],
  },
  {
    badge: "PH",
    name: "펜트하우스",
    feature: "소셜/랭킹 중심 · 큰 이벤트",
    nextXp: 120,
    rewardScale: 2.5,
    threatDelay: [76000, 120000],
  },
];

const state = {
  relation: "oppositeFriend",
  myGender: "female",
  partnerGender: "male",
  selectedCharacter: characters.male[0],
  playerCharacterId: "girl1",
  score: 3,
  coins: 0,
  roomXp: 0,
  roomClean: 100,
  floorIndex: 0,
  threatKind: "normal",
  threatVX: 0,
  threatVY: 0,
  workerTrust: 72,
  ownerTrust: 80,
  guestTrust: 74,
  hostTrust: 82,
  roomFollowers: 18,
  pendingGuests: 2,
  jobCatchCount: 0,
  jobSplit: 70,
  playerX: 50,
  playerY: 70,
};

const moveSpeed = 21;
const roomCharacterDropPercent = 30;
const roomMetrics = {
  backY: 41,
  frontY: 146,
  frontEdgeY: 142,
  wallBottom: 35,
  roomHeight: 620,
};
const partnerDemoPath = [
  { x: 26, y: "back", label: "왼쪽 위" },
  { x: 74, y: "back", label: "오른쪽 위" },
  { x: 74, y: "front", label: "오른쪽 아래" },
  { x: 26, y: "front", label: "왼쪽 아래" },
];

const relationOptions = document.querySelectorAll("#relationOptions .segment");
const myGenderOptions = document.querySelectorAll("#myGenderOptions .segment");
const characterOptions = document.querySelector("#characterOptions");
const nextAppearanceButton = document.querySelector("#nextAppearanceButton");
const matchButton = document.querySelector("#matchButton");
const matchingText = document.querySelector("#matchingText");
const matchingPortrait = document.querySelector("#matchingPortrait");
const appearanceHint = document.querySelector("#appearanceHint");
const gameRoom = document.querySelector(".game-room");
const partnerCharacter = document.querySelector("#partnerCharacter");
const partnerPortrait = document.querySelector("#partnerPortrait");
const partnerBubble = document.querySelector("#partnerBubble");
const playerBubble = document.querySelector("#playerBubble");
const playerCharacter = document.querySelector("#playerCharacter");
const playerFrontPortrait = document.querySelector("#playerFrontPortrait");
const playerBackPortrait = document.querySelector("#playerBackPortrait");
const heartScore = document.querySelector("#heartScore");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const gameKeyboard = document.querySelector("#gameKeyboard");
const floorBadge = document.querySelector("#floorBadge");
const floorName = document.querySelector("#floorName");
const floorFeature = document.querySelector("#floorFeature");
const roomCoins = document.querySelector("#roomCoins");
const roomXpBar = document.querySelector("#roomXpBar");
const roomXpText = document.querySelector("#roomXpText");
const roomCleanBar = document.querySelector("#roomCleanBar");
const roomCleanText = document.querySelector("#roomCleanText");
const roomThreat = document.querySelector("#roomThreat");
const rewardToast = document.querySelector("#rewardToast");
const miniGameButton = document.querySelector("#miniGameButton");
const miniGamePanel = document.querySelector("#miniGamePanel");
const miniGameClose = document.querySelector("#miniGameClose");
const cityButton = document.querySelector("#cityButton");
const cityPanel = document.querySelector("#cityPanel");
const cityClose = document.querySelector("#cityClose");
const cityTabs = document.querySelectorAll("[data-city-tab]");
const cityViews = {
  jobs: document.querySelector("#jobsView"),
  visits: document.querySelector("#visitsView"),
  market: document.querySelector("#marketView"),
};
const cityBoards = {
  jobs: document.querySelector("#jobsBoard"),
  visits: document.querySelector("#visitsBoard"),
  market: document.querySelector("#marketBoard"),
};
const boardLabels = {
  jobs: "알바방",
  visits: "집들이",
  market: "매매방",
};
const workerTrust = document.querySelector("#workerTrust");
const ownerTrust = document.querySelector("#ownerTrust");
const guestTrust = document.querySelector("#guestTrust");
const hostTrust = document.querySelector("#hostTrust");
const roomFollowers = document.querySelector("#roomFollowers");
const jobCatchCount = document.querySelector("#jobCatchCount");
const jobSplitText = document.querySelector("#jobSplitText");
const startJobButton = document.querySelector("#startJobButton");
const splitButtons = document.querySelectorAll("[data-split]");
const writeButtons = document.querySelectorAll("[data-write-board]");
const bombArena = document.querySelector("#bombArena");
const bombToken = document.querySelector("#bombToken");
const bombTimer = document.querySelector("#bombTimer");
const bombStatus = document.querySelector("#bombStatus");
const bombPassButton = document.querySelector("#bombPassButton");
const bombTrickButton = document.querySelector("#bombTrickButton");
const bombStartButton = document.querySelector("#bombStartButton");

let moveFrame;
let lastMoveTime;
let movingDirection;
let partnerMoveFrame;
let lastPartnerMoveTime;
let partnerPathIndex = 0;
let partnerDemoPosition = { x: 50, y: 60 };
let partnerWalkTime = 0;
let playerWalkTime = 0;
let partnerFacing;
let partnerExpressionTimer;
let bombFrame;
let bombPartnerTimer;
let threatTimer;
let threatMoveFrame;
let rewardToastTimer;
let tapMoveTarget;
let roomMetricsFrame;
const bubbleTimers = new WeakMap();
const bombGame = {
  active: false,
  holder: "player",
  startedAt: 0,
  explodeAt: 0,
  freezeUsed: false,
};

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
}

function unlockClientApp() {
  clientLock.classList.add("unlocked");
  sessionStorage.setItem("otakuClientUnlocked", "1");
}

function handleClientLock(event) {
  event.preventDefault();
  if (clientLockInput.value === clientPassword) {
    unlockClientApp();
    return;
  }
  clientLockError.classList.remove("hidden");
  clientLockInput.value = "";
  clientLockInput.focus();
}

function getPartnerGender() {
  const wantsSame = state.relation === "sameFriend" || state.relation === "sameLover";
  if (wantsSame) return state.myGender;
  return state.myGender === "female" ? "male" : "female";
}

function updatePartnerGender() {
  state.partnerGender = getPartnerGender();
  state.selectedCharacter = characters[state.partnerGender][0];
}

function selectRelation(button) {
  relationOptions.forEach((option) => option.classList.remove("active"));
  button.classList.add("active");
  state.relation = button.dataset.relation;
  updatePartnerGender();
}

function selectMyGender(button) {
  myGenderOptions.forEach((option) => option.classList.remove("active"));
  button.classList.add("active");
  state.myGender = button.dataset.gender;
  updatePartnerGender();
}

function openAppearance() {
  updatePartnerGender();
  renderCharacters();
  showScreen("appearance");
}

function renderCharacters() {
  appearanceHint.textContent = `상대 성별: ${genderLabels[state.partnerGender]}`;
  characterOptions.textContent = "";
  characterOptions.className = "appearance-stage";

  characters[state.partnerGender].forEach((character, index) => {
    const button = document.createElement("button");
    button.className = `character-card ${index === 0 ? "active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="portrait-wrap"><img src="${character.image}" alt=""></span>
      <strong>${character.name}</strong>
      <span>${character.desc}</span>
    `;
    button.addEventListener("click", () => selectCharacter(button, character));
    characterOptions.append(button);
  });
}

function selectCharacter(button, character) {
  characterOptions.querySelectorAll(".character-card").forEach((option) => option.classList.remove("active"));
  button.classList.add("active");
  state.selectedCharacter = character;
}

function startMatching() {
  showScreen("matching");
  matchingPortrait.src = state.selectedCharacter.image;
  matchingText.textContent = `${state.selectedCharacter.name} 님과 연결 중...`;

  window.setTimeout(() => {
    matchingText.textContent = "둘만의 방을 꾸미는 중...";
  }, 700);

  window.setTimeout(enterRoom, 1450);
}

function enterRoom() {
  const character = state.selectedCharacter;
  showScreen("room");
  heartScore.textContent = state.score;
  updateRoomProgress();
  updateRoomMetrics();

  partnerPortrait.src = character.image;
  const playerImages = playerCharacterByPartner[character.id] || {
    id: state.myGender === "female" ? "girl1" : "boy1",
    front: myFrontImages[state.myGender],
    back: myBackImages[state.myGender],
  };
  state.playerCharacterId = playerImages.id;
  playerFrontPortrait.src = playerImages.front;
  playerBackPortrait.src = playerImages.back;

  partnerFacing = undefined;
  setPartnerFacing("front");
  updatePartnerPosition(50, 60);
  setPlayerFacing("down");
  updatePlayerPosition();
  hideBubble(playerBubble);
  speakPartner(`${character.name}: 이동 확인 중이야.`);
  startPartnerDemoMovement();
  startThreatLoop();
}

function setPartnerFacing(direction) {
  if (partnerFacing === direction) return;
  partnerFacing = direction;
  partnerPortrait.src = direction === "back"
    ? state.selectedCharacter.backImage
    : state.selectedCharacter.image;
}

function setPartnerExpressionFromText(text) {
  window.clearTimeout(partnerExpressionTimer);
  if (state.selectedCharacter.id !== "boy1" || partnerFacing === "back") {
    return;
  }

  if (/ㅋ{5,}/.test(text)) {
    partnerPortrait.src = "assets/boy1-laugh.png";
    partnerExpressionTimer = window.setTimeout(() => {
      if (state.selectedCharacter.id === "boy1" && partnerFacing !== "back") {
        partnerPortrait.src = "assets/boy1-smile.png";
        partnerExpressionTimer = window.setTimeout(() => {
          if (state.selectedCharacter.id === "boy1" && partnerFacing !== "back") {
            partnerPortrait.src = state.selectedCharacter.image;
          }
        }, 1600);
      }
    }, 1500);
    return;
  }

  if (!/ㅋ{2,}/.test(text)) {
    return;
  }

  partnerPortrait.src = "assets/boy1-smile.png";
  partnerExpressionTimer = window.setTimeout(() => {
    if (state.selectedCharacter.id === "boy1" && partnerFacing !== "back") {
      partnerPortrait.src = state.selectedCharacter.image;
    }
  }, 1800);
}

function floorDepth(y) {
  return clamp((y - roomMetrics.backY) / (roomMetrics.frontY - roomMetrics.backY), 0, 1);
}

function perspectiveDepth(y) {
  return floorDepth(y);
}

function floorBounds(y) {
  const depth = floorDepth(y);
  const spread = Math.pow(depth, 0.78);
  return {
    left: 26 - spread * 11,
    right: 74 + spread * 11,
  };
}

function floorPoint(target) {
  const y = target.y === "back"
    ? roomMetrics.backY
    : target.y === "front"
      ? roomMetrics.frontY
      : target.y;
  const bounds = floorBounds(y);
  const laneX = target.lane === "left" ? bounds.left : bounds.right;
  const point = clampToFloor(target.x ?? laneX, y);
  return { ...point, label: target.label };
}

function clampToFloor(x, y) {
  const clampedY = clamp(y, roomMetrics.backY, roomMetrics.frontY);
  const bounds = floorBounds(clampedY);
  return {
    x: clamp(x, bounds.left, bounds.right),
    y: clampedY,
  };
}

function perspectiveSpeed(y) {
  const depth = perspectiveDepth(y);
  return moveSpeed * (0.36 + depth * 0.82);
}

function movementSpeed(y, axis, useStepPulse = false, walkTime = partnerWalkTime) {
  const lateralBoost = axis === "x" ? 1.28 : 1;
  const footfall = Math.abs(Math.cos(walkTime * 9.2));
  const stepPulse = useStepPulse ? 0.86 + footfall * 0.22 : 1;
  return perspectiveSpeed(y) * lateralBoost * stepPulse;
}

function characterScale(characterId, y) {
  const visualDepth = perspectiveDepth(y);
  const scaleBoost = partnerScaleBoosts[characterId] || 0;
  return (0.86 + visualDepth * 2.16) * (1 + visualDepth * scaleBoost);
}

function characterImageY(characterId, facing, y) {
  const visualDepth = perspectiveDepth(y);
  const offsets = partnerImageOffsets[characterId] || { front: 10, back: 10 };
  const closeBoost = partnerCloseImageBoosts[characterId] || 0;
  return offsets[facing] + visualDepth * closeBoost;
}

function characterVisibleBound(characterId, facing) {
  const bounds = characterVisibleBounds[characterId] || characterVisibleBounds.girl1;
  return bounds[facing] || bounds.front;
}

function updatePartnerPosition(x, y) {
  const point = clampToFloor(x, y);
  const visualDepth = perspectiveDepth(point.y);
  const scale = characterScale(state.selectedCharacter.id, point.y);
  const facing = partnerFacing || "front";
  const imageY = characterImageY(state.selectedCharacter.id, facing, point.y);
  const walkPhase = Math.sin(partnerWalkTime * 9.2);
  const footfall = Math.abs(Math.cos(partnerWalkTime * 9.2));
  const walkPower = 1.1 - visualDepth * 0.35;
  const sway = walkPhase * walkPower * 0.75;
  const bob = 0;
  const stepX = 1 + footfall * 0.006;
  const stepY = 1 - footfall * 0.004;
  const shadow = 0.94 + footfall * 0.1;
  partnerDemoPosition = point;
  partnerCharacter.style.setProperty("--partner-x", point.x.toFixed(2));
  partnerCharacter.style.setProperty("--partner-y", point.y.toFixed(2));
  partnerCharacter.style.setProperty("--partner-scale", scale.toFixed(3));
  partnerCharacter.style.setProperty("--partner-image-y", `${imageY.toFixed(2)}%`);
  partnerCharacter.style.setProperty("--partner-sway", `${sway.toFixed(2)}px`);
  partnerCharacter.style.setProperty("--partner-bob", `${bob.toFixed(2)}px`);
  partnerCharacter.style.setProperty("--partner-step-x", stepX.toFixed(3));
  partnerCharacter.style.setProperty("--partner-step-y", stepY.toFixed(3));
  partnerCharacter.style.setProperty("--partner-shadow", shadow.toFixed(3));
  updateCharacterLayering();
}

function updateCharacterLayering() {
  const partnerY = partnerDemoPosition.y;
  const playerY = state.playerY;
  const bothAtBackEdge = partnerY <= 52 && playerY <= 52;
  const bothAtFrontEdge = partnerY >= roomMetrics.frontEdgeY && playerY >= roomMetrics.frontEdgeY;
  const partnerShouldCover = bothAtBackEdge || bothAtFrontEdge || partnerY >= playerY - 1;

  partnerCharacter.style.zIndex = partnerShouldCover ? "4" : "3";
  playerCharacter.style.zIndex = partnerShouldCover ? "3" : "4";
}

function updateAppViewport() {
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
}

function updateRoomMetrics() {
  roomMetricsFrame = undefined;
  updateAppViewport();
  const rect = gameRoom.getBoundingClientRect();
  const height = rect.height || 620;
  const compact = clamp((620 - height) / 260, 0, 1);
  const roomy = clamp((height - 620) / 260, 0, 1);

  roomMetrics.roomHeight = height;
  roomMetrics.wallBottom = 35 - compact * 5 + roomy * 2;
  roomMetrics.backY = roomMetrics.wallBottom + 1 - roomCharacterDropPercent;
  roomMetrics.frontY = 146 - compact * 12 + roomy * 4;
  roomMetrics.frontEdgeY = roomMetrics.frontY - 4;
  roomMetrics.objectScale = height / 620;
  gameRoom.style.setProperty("--room-back-bottom", `${roomMetrics.wallBottom.toFixed(1)}%`);
  gameRoom.style.setProperty("--room-object-scale", roomMetrics.objectScale.toFixed(3));
  gameRoom.style.setProperty("--room-character-drop", `${roomCharacterDropPercent}%`);

  const partnerPoint = clampToFloor(partnerDemoPosition.x, partnerDemoPosition.y);
  partnerDemoPosition = partnerPoint;
  const playerPoint = clampToFloor(state.playerX, state.playerY);
  state.playerX = playerPoint.x;
  state.playerY = playerPoint.y;

  if (screens.room.classList.contains("active")) {
    updatePartnerPosition(partnerDemoPosition.x, partnerDemoPosition.y);
    updatePlayerPosition();
  }
}

function scheduleRoomMetricsUpdate() {
  if (roomMetricsFrame) return;
  roomMetricsFrame = window.requestAnimationFrame(updateRoomMetrics);
}

function startPartnerDemoMovement() {
  stopPartnerDemoMovement();
  partnerPathIndex = 0;
  partnerDemoPosition = clampToFloor(50, 60);
  let target = floorPoint(partnerDemoPath[partnerPathIndex]);

  partnerMoveTimer = window.setInterval(() => {
    const dx = target.x - partnerDemoPosition.x;
    const dy = target.y - partnerDemoPosition.y;

    if (Math.abs(dx) <= moveStep && Math.abs(dy) <= moveStep) {
      partnerDemoPosition = { x: target.x, y: target.y };
      updatePartnerPosition(partnerDemoPosition.x, partnerDemoPosition.y);
      partnerPathIndex = (partnerPathIndex + 1) % partnerDemoPath.length;
      target = floorPoint(partnerDemoPath[partnerPathIndex]);
      speakPartner(`${state.selectedCharacter.name}: ${target.label}으로 이동 중이야.`);
      return;
    }

    if (Math.abs(dx) > moveStep) {
      partnerDemoPosition.x += Math.sign(dx) * moveStep;
    } else if (Math.abs(dy) > moveStep) {
      partnerDemoPosition.y += Math.sign(dy) * moveStep;
    }

    const movingAway = target.y < partnerDemoPosition.y;
    setPartnerFacing(movingAway ? "back" : "front");
    updatePartnerPosition(partnerDemoPosition.x, partnerDemoPosition.y);
  }, moveInterval);
}

function stopPartnerDemoMovement() {
  window.clearInterval(partnerMoveTimer);
  partnerMoveTimer = undefined;
}

function startPartnerDemoMovement() {
  stopPartnerDemoMovement();
  partnerPathIndex = 1;
  partnerWalkTime = 0;
  partnerDemoPosition = floorPoint(partnerDemoPath[0]);
  updatePartnerPosition(partnerDemoPosition.x, partnerDemoPosition.y);
  let targetSpec = partnerDemoPath[partnerPathIndex];
  let target = floorPoint(targetSpec);
  let segmentAxis = Math.abs(target.y - partnerDemoPosition.y) > Math.abs(target.x - partnerDemoPosition.x) ? "y" : "x";

  const advanceTarget = () => {
    partnerPathIndex = (partnerPathIndex + 1) % partnerDemoPath.length;
    targetSpec = partnerDemoPath[partnerPathIndex];
    target = floorPoint(targetSpec);
    segmentAxis = Math.abs(target.y - partnerDemoPosition.y) > Math.abs(target.x - partnerDemoPosition.x) ? "y" : "x";
    speakPartner(`${state.selectedCharacter.name}: ${target.label}으로 이동 중이야.`);
  };

  const tick = (time) => {
    if (!lastPartnerMoveTime) lastPartnerMoveTime = time;
    const delta = Math.min((time - lastPartnerMoveTime) / 1000, 0.05);
    lastPartnerMoveTime = time;
    const step = movementSpeed(partnerDemoPosition.y, segmentAxis, true) * delta;
    target = floorPoint(targetSpec);
    const dx = target.x - partnerDemoPosition.x;
    const dy = target.y - partnerDemoPosition.y;

    if (segmentAxis === "y" && Math.abs(dy) <= step) {
      partnerDemoPosition.y = target.y;
      updatePartnerPosition(partnerDemoPosition.x, partnerDemoPosition.y);
      advanceTarget();
      partnerMoveFrame = window.requestAnimationFrame(tick);
      return;
    }

    if (segmentAxis === "x" && Math.abs(dx) <= step) {
      partnerDemoPosition.x = target.x;
      updatePartnerPosition(partnerDemoPosition.x, partnerDemoPosition.y);
      advanceTarget();
      partnerMoveFrame = window.requestAnimationFrame(tick);
      return;
    }

    if (segmentAxis === "y") {
      partnerDemoPosition.y += Math.sign(dy) * step;
    } else {
      partnerDemoPosition.x += Math.sign(dx) * step;
    }
    partnerWalkTime += delta;

    if (Math.abs(dy) > 0.2) {
      setPartnerFacing(target.y < partnerDemoPosition.y ? "back" : "front");
    }
    updatePartnerPosition(partnerDemoPosition.x, partnerDemoPosition.y);
    partnerMoveFrame = window.requestAnimationFrame(tick);
  };

  lastPartnerMoveTime = undefined;
  partnerMoveFrame = window.requestAnimationFrame(tick);
}

function stopPartnerDemoMovement() {
  window.cancelAnimationFrame(partnerMoveFrame);
  partnerMoveFrame = undefined;
  lastPartnerMoveTime = undefined;
}

function setPlayerFacing(direction) {
  playerCharacter.classList.toggle("facing-back", direction === "up");
  playerCharacter.classList.remove("near-close");
}

function speakPartner(text) {
  partnerBubble.textContent = text;
  partnerBubble.classList.remove("hidden");
  setPartnerExpressionFromText(text);
  resetBubbleTimer(partnerBubble, 3600);
}

function speakPlayer(text) {
  playerBubble.textContent = text;
  playerBubble.classList.remove("hidden");
  resetBubbleTimer(playerBubble, 3000);
}

function hideBubble(bubble) {
  bubble.classList.add("hidden");
}

function resetBubbleTimer(bubble, delay) {
  window.clearTimeout(bubbleTimers.get(bubble));
  bubbleTimers.set(bubble, window.setTimeout(() => hideBubble(bubble), delay));
}

function movePlayer(direction) {
  if (direction === "up") state.playerY -= moveStep;
  if (direction === "down") state.playerY += moveStep;
  if (direction === "left") state.playerX -= moveStep;
  if (direction === "right") state.playerX += moveStep;

  setPlayerFacing(direction);
  const point = clampToFloor(state.playerX, state.playerY);
  state.playerX = point.x;
  state.playerY = point.y;
  updatePlayerPosition();
}

function startMoving(direction) {
  if (movingDirection === direction) return;
  stopMoving();
  movingDirection = direction;
  movePlayer(direction);
  moveTimer = window.setInterval(() => movePlayer(direction), moveInterval);
}

function stopMoving() {
  window.clearInterval(moveTimer);
  moveTimer = undefined;
  movingDirection = undefined;
}

function startMoving(direction) {
  if (movingDirection === direction) return;
  stopMoving();
  movingDirection = direction;

  const tick = (time) => {
    if (!lastMoveTime) lastMoveTime = time;
    const delta = Math.min((time - lastMoveTime) / 1000, 0.05);
    lastMoveTime = time;
    const axis = movingDirection === "left" || movingDirection === "right" ? "x" : "y";
    const step = movementSpeed(state.playerY, axis, true, playerWalkTime) * delta;

    if (movingDirection === "up") state.playerY -= step;
    if (movingDirection === "down") state.playerY += step;
    if (movingDirection === "left") state.playerX -= step;
    if (movingDirection === "right") state.playerX += step;

    playerWalkTime += delta;
    setPlayerFacing(movingDirection);
    const point = clampToFloor(state.playerX, state.playerY);
    state.playerX = point.x;
    state.playerY = point.y;
    updatePlayerPosition();
    moveFrame = window.requestAnimationFrame(tick);
  };

  lastMoveTime = undefined;
  moveFrame = window.requestAnimationFrame(tick);
}

function stopMoving() {
  window.cancelAnimationFrame(moveFrame);
  moveFrame = undefined;
  lastMoveTime = undefined;
  movingDirection = undefined;
  tapMoveTarget = undefined;
}

function stopMoveFrame() {
  window.cancelAnimationFrame(moveFrame);
  moveFrame = undefined;
  lastMoveTime = undefined;
  movingDirection = undefined;
}

function roomClientPointToFloor(clientX, clientY) {
  const rect = gameRoom.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const screenY = ((clientY - rect.top) / rect.height) * 100;
  const depth = clamp((screenY - roomMetrics.wallBottom) / (100 - roomMetrics.wallBottom), 0, 1);
  const y = roomMetrics.backY + depth * (roomMetrics.frontY - roomMetrics.backY);
  return clampToFloor(x, y);
}

function threatFloorPoint() {
  const x = parseFloat(roomThreat.style.getPropertyValue("--threat-x")) || 50;
  const screenY = parseFloat(roomThreat.style.getPropertyValue("--threat-y")) || 64;
  const depth = clamp((screenY - roomMetrics.wallBottom) / (100 - roomMetrics.wallBottom), 0, 1);
  return clampToFloor(x, roomMetrics.backY + depth * (roomMetrics.frontY - roomMetrics.backY));
}

function startTapMove(target, onArrive) {
  stopMoveFrame();
  tapMoveTarget = { ...target, onArrive };

  const tick = (time) => {
    if (!tapMoveTarget) return;
    if (!lastMoveTime) lastMoveTime = time;
    const delta = Math.min((time - lastMoveTime) / 1000, 0.05);
    lastMoveTime = time;

    const dx = tapMoveTarget.x - state.playerX;
    const dy = tapMoveTarget.y - state.playerY;
    const distance = Math.hypot(dx, dy);

    if (distance <= 0.75) {
      state.playerX = tapMoveTarget.x;
      state.playerY = tapMoveTarget.y;
      updatePlayerPosition();
      const arrive = tapMoveTarget.onArrive;
      tapMoveTarget = undefined;
      moveFrame = undefined;
      lastMoveTime = undefined;
      if (arrive) arrive();
      return;
    }

    const axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    const step = Math.min(distance, movementSpeed(state.playerY, axis, true, playerWalkTime) * delta);
    state.playerX += (dx / distance) * step;
    state.playerY += (dy / distance) * step;
    playerWalkTime += delta;

    if (Math.abs(dy) > Math.abs(dx) * 0.65) {
      setPlayerFacing(dy < 0 ? "up" : "down");
    } else {
      setPlayerFacing(dx < 0 ? "left" : "right");
    }

    const point = clampToFloor(state.playerX, state.playerY);
    state.playerX = point.x;
    state.playerY = point.y;
    updatePlayerPosition();
    moveFrame = window.requestAnimationFrame(tick);
  };

  lastMoveTime = undefined;
  moveFrame = window.requestAnimationFrame(tick);
}

function handleRoomTap(event) {
  if (!screens.room.classList.contains("active")) return;
  if (!miniGamePanel.classList.contains("hidden")) return;
  if (!cityPanel.classList.contains("hidden")) return;
  if (event.target.closest("button, input, .room-progress, .partner-bubble, .player-bubble, .mini-game-panel, .city-panel")) return;
  event.preventDefault();
  startTapMove(roomClientPointToFloor(event.clientX, event.clientY));
}

function updatePlayerPosition() {
  const point = clampToFloor(state.playerX, state.playerY);
  state.playerX = point.x;
  state.playerY = point.y;
  const visualDepth = perspectiveDepth(state.playerY);
  const facing = playerCharacter.classList.contains("facing-back") ? "back" : "front";
  const scale = characterScale(state.playerCharacterId, state.playerY);
  const imageY = characterImageY(state.playerCharacterId, facing, state.playerY);
  const visibleBound = characterVisibleBound(state.playerCharacterId, facing);
  const walkPhase = Math.sin(playerWalkTime * 9.2);
  const footfall = Math.abs(Math.cos(playerWalkTime * 9.2));
  const walkPower = 1.1 - visualDepth * 0.35;
  const sway = walkPhase * walkPower * 0.75;
  const bob = 0;
  const stepX = 1 + footfall * 0.006;
  const stepY = 1 - footfall * 0.004;
  playerCharacter.style.setProperty("--player-x", state.playerX.toFixed(2));
  playerCharacter.style.setProperty("--player-y", state.playerY.toFixed(2));
  playerCharacter.style.setProperty("--player-scale", scale.toFixed(3));
  playerCharacter.style.setProperty("--player-image-y", `${imageY.toFixed(2)}%`);
  playerCharacter.style.setProperty("--player-image-y-px", `${(370 * imageY / 100).toFixed(2)}px`);
  playerCharacter.style.setProperty("--player-visible-height", `${visibleBound.height}%`);
  playerCharacter.style.setProperty("--player-visible-bottom", `${visibleBound.bottom}%`);
  playerCharacter.style.setProperty("--player-sway", `${sway.toFixed(2)}px`);
  playerCharacter.style.setProperty("--player-bob", `${bob.toFixed(2)}px`);
  playerCharacter.style.setProperty("--player-step-x", stepX.toFixed(3));
  playerCharacter.style.setProperty("--player-step-y", stepY.toFixed(3));
  updateCharacterLayering();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function currentFloor() {
  return floorStages[state.floorIndex] || floorStages[0];
}

function updateRoomProgress() {
  const floor = currentFloor();
  const progress = Math.min(100, Math.round((state.roomXp / floor.nextXp) * 100));
  floorBadge.textContent = floor.badge;
  floorName.textContent = floor.name;
  floorFeature.textContent = floor.feature;
  roomCoins.textContent = `${state.coins} 코인`;
  roomXpBar.style.setProperty("--room-xp", `${progress}%`);
  roomXpText.textContent = state.floorIndex === floorStages.length - 1
    ? `방 경험치 ${state.roomXp} / MAX`
    : `방 경험치 ${state.roomXp} / ${floor.nextXp}`;
  roomCleanBar.style.setProperty("--room-clean", `${state.roomClean}%`);
  roomCleanText.textContent = `청결도 ${state.roomClean}`;
}

function updateCityStats() {
  workerTrust.textContent = state.workerTrust;
  ownerTrust.textContent = state.ownerTrust;
  guestTrust.textContent = state.guestTrust;
  hostTrust.textContent = state.hostTrust;
  roomFollowers.textContent = state.roomFollowers;
  jobCatchCount.textContent = state.jobCatchCount;
  jobSplitText.textContent = `내 몫 ${state.jobSplit}%, 집주인 몫 ${100 - state.jobSplit}%`;
}

function openCityPanel() {
  closeMiniGame();
  cityPanel.classList.remove("hidden");
  stopMoving();
  stopPartnerDemoMovement();
  stopThreatLoop();
  updateCityStats();
}

function closeCityPanel() {
  cityPanel.classList.add("hidden");
  if (screens.room.classList.contains("active")) {
    startPartnerDemoMovement();
    startThreatLoop();
  }
}

function selectCityTab(tabName) {
  cityTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.cityTab === tabName);
  });
  Object.entries(cityViews).forEach(([name, view]) => {
    view.classList.toggle("active", name === tabName);
  });
}

function selectJobSplit(button) {
  state.jobSplit = Number(button.dataset.split);
  splitButtons.forEach((item) => item.classList.toggle("active", item === button));
  updateCityStats();
}

function startJobRoom() {
  const grossCoins = Math.round(10 + Math.random() * 14);
  const myCoins = Math.max(1, Math.round(grossCoins * (state.jobSplit / 100)));
  const ownerCoins = grossCoins - myCoins;
  state.coins += myCoins;
  state.jobCatchCount += 1;
  state.workerTrust = clamp(state.workerTrust + 1, 0, 100);
  state.ownerTrust = clamp(state.ownerTrust + (ownerCoins >= 3 ? 1 : 0), 0, 100);
  updateCityStats();
  updateRoomProgress();
  showReward(`알바 완료 +${myCoins}코인 · 집주인 +${ownerCoins}코인`);
  speakPartner(`${state.selectedCharacter.name}: 알바 한 번 뛰고 왔구나. 신뢰도도 올랐어.`);
}

function makeBoardPost(boardName) {
  const article = document.createElement("article");
  article.className = "city-card compact board-post";

  const titleByBoard = {
    jobs: "내 방 꿈틀이 알바 모집",
    visits: "우리 방 집들이 오픈",
    market: "방 매매 상담 받아요",
  };
  const bodyByBoard = {
    jobs: `분배 ${state.jobSplit}:${100 - state.jobSplit} · 신뢰도 보고 바로 승인`,
    visits: "기본 차 준비 · 선물은 빈손도 가능 · 승인제",
    market: "방 가치는 상담 후 결정 · 관계 기록은 거래 제외",
  };
  const metaByBoard = {
    jobs: ["내 글", "알바 모집", "방금 전"],
    visits: ["내 글", "승인제", "방금 전"],
    market: ["내 글", "상담", "방금 전"],
  };

  article.innerHTML = `
    <strong>${titleByBoard[boardName]}</strong>
    <p>${bodyByBoard[boardName]}</p>
    <div class="post-meta">
      ${metaByBoard[boardName].map((item) => `<span>${item}</span>`).join("")}
    </div>
  `;
  return article;
}

function writeBoardPost(boardName) {
  const board = cityBoards[boardName];
  if (!board) return;
  board.prepend(makeBoardPost(boardName));
  showReward(`${boardLabels[boardName]}에 글을 올렸어`);
}

function followRoom(button) {
  if (button.classList.contains("following")) return;
  button.classList.add("following");
  button.textContent = "팔로잉";
  state.roomFollowers += 1;
  updateCityStats();
  showReward("방을 팔로우했어 · 집들이 알림을 받을 수 있어");
}

function approveGuest(button) {
  const item = button.closest(".waiting-item");
  if (!item) return;
  item.remove();
  state.pendingGuests = Math.max(0, state.pendingGuests - 1);
  state.hostTrust = clamp(state.hostTrust + 1, 0, 100);
  updateCityStats();
  showReward("방문자를 승인했어 · 집주인 신뢰도 +1");
}

function showReward(text) {
  rewardToast.textContent = text;
  rewardToast.classList.remove("hidden");
  window.clearTimeout(rewardToastTimer);
  rewardToastTimer = window.setTimeout(() => {
    rewardToast.classList.add("hidden");
  }, 1800);
}

function grantRoomReward(reason, coins, xp, rareChance = 0.08) {
  const floor = currentFloor();
  const isRare = Math.random() < rareChance;
  const coinGain = Math.max(1, Math.round(coins * floor.rewardScale * (isRare ? 4 : 1)));
  const xpGain = Math.max(1, Math.round(xp * (isRare ? 2.2 : 1)));
  state.coins += coinGain;
  state.roomXp += xpGain;

  let leveledUp = false;
  while (state.floorIndex < floorStages.length - 1 && state.roomXp >= currentFloor().nextXp) {
    state.roomXp -= currentFloor().nextXp;
    state.floorIndex += 1;
    leveledUp = true;
  }

  updateRoomProgress();

  if (leveledUp) {
    const nextFloor = currentFloor();
    showReward(`${nextFloor.badge} ${nextFloor.name} 입주! 새 기능이 열렸어`);
    speakPartner(`${state.selectedCharacter.name}: 우리 방이 더 좋아졌어.`);
    return;
  }

  showReward(`${reason} +${coinGain}코인 +${xpGain}방 경험치${isRare ? " · 반짝 보상!" : ""}`);
}

function changeCleanliness(amount, reason) {
  state.roomClean = clamp(Math.round(state.roomClean + amount), 0, 100);
  updateRoomProgress();
  if (reason) showReward(reason);
}

function startThreatLoop() {
  stopThreatLoop();
  scheduleThreat();
}

function stopThreatLoop() {
  window.clearTimeout(threatTimer);
  stopThreatMotion();
  threatTimer = undefined;
  roomThreat.classList.add("hidden");
}

function stopThreatMotion() {
  window.cancelAnimationFrame(threatMoveFrame);
  threatMoveFrame = undefined;
}

function scheduleThreat() {
  const floor = currentFloor();
  const [minDelay, maxDelay] = floor.threatDelay;
  const dirtyBoost = 1 - (100 - state.roomClean) * 0.004;
  const delay = (minDelay + Math.random() * (maxDelay - minDelay)) * Math.max(0.55, dirtyBoost);
  threatTimer = window.setTimeout(showThreat, delay);
}

function setThreatPosition(x, y) {
  roomThreat.style.setProperty("--threat-x", `${x}%`);
  roomThreat.style.setProperty("--threat-y", `${y}%`);
}

function startThreatMotion() {
  stopThreatMotion();
  let lastTime;

  const tick = (time) => {
    if (roomThreat.classList.contains("hidden") || state.threatKind !== "moving") return;
    if (!lastTime) lastTime = time;
    const delta = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;

    let x = parseFloat(roomThreat.style.getPropertyValue("--threat-x")) || 50;
    let y = parseFloat(roomThreat.style.getPropertyValue("--threat-y")) || 60;
    x += state.threatVX * delta;
    y += state.threatVY * delta;

    if (x < 20 || x > 80) {
      state.threatVX *= -1;
      x = clamp(x, 20, 80);
    }
    if (y < 42 || y > 78) {
      state.threatVY *= -1;
      y = clamp(y, 42, 78);
    }

    setThreatPosition(x, y);
    threatMoveFrame = window.requestAnimationFrame(tick);
  };

  threatMoveFrame = window.requestAnimationFrame(tick);
}

function showThreat() {
  if (!screens.room.classList.contains("active") || !miniGamePanel.classList.contains("hidden") || !cityPanel.classList.contains("hidden")) {
    scheduleThreat();
    return;
  }

  stopThreatMotion();
  roomThreat.classList.remove("moving", "coop", "surprise");
  const roll = Math.random();
  const isSurprise = roll < 0.1;
  const isCoop = !isSurprise && roll < 0.2;
  const isMoving = !isSurprise && !isCoop && roll < 0.38;
  state.threatKind = isSurprise ? "surprise" : isCoop ? "coop" : isMoving ? "moving" : "normal";
  roomThreat.classList.toggle("surprise", isSurprise);
  roomThreat.classList.toggle("coop", isCoop);
  roomThreat.classList.toggle("moving", isMoving);
  roomThreat.querySelector("span").textContent = isSurprise ? "반짝 꿈틀이" : isCoop ? "합동 꼬물이" : isMoving ? "도망 꼬물이" : "꿈틀이";

  if (isSurprise) {
    setThreatPosition(26 + Math.random() * 52, 44 + Math.random() * 34);
  } else if (isCoop) {
    setThreatPosition(38 + Math.random() * 24, 48 + Math.random() * 22);
  } else if (isMoving) {
    setThreatPosition(28 + Math.random() * 44, 48 + Math.random() * 24);
    state.threatVX = (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 6);
    state.threatVY = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3);
  } else {
    setThreatPosition(18 + Math.random() * 18, 28 + Math.random() * 18);
  }

  roomThreat.classList.remove("hidden");
  if (isMoving) startThreatMotion();
  window.clearTimeout(threatTimer);
  threatTimer = window.setTimeout(missThreat, isSurprise ? 3800 : isCoop ? 6800 : isMoving ? 6400 : 5200);
}

function catchThreat() {
  if (roomThreat.classList.contains("hidden")) return;
  const isSurprise = state.threatKind === "surprise";
  const isMoving = state.threatKind === "moving";
  const isCoop = state.threatKind === "coop";
  roomThreat.classList.add("hidden");
  stopThreatMotion();
  window.clearTimeout(threatTimer);
  changeCleanliness(isSurprise ? 4 : isCoop ? 3 : 2);
  grantRoomReward(
    isSurprise ? "반짝 꿈틀이 퇴치" : isCoop ? "합동 꼬물이 퇴치" : isMoving ? "도망 꼬물이 퇴치" : "꿈틀이 퇴치",
    isSurprise ? 18 : isCoop ? 12 : isMoving ? 8 : 5,
    isSurprise ? 10 : isCoop ? 8 : isMoving ? 6 : 4,
    isSurprise ? 0.34 : isCoop ? 0.22 : isMoving ? 0.2 : 0.16
  );
  speakPartner(isCoop
    ? `${state.selectedCharacter.name}: 둘이 잡으니까 더 재밌다.`
    : `${state.selectedCharacter.name}: 잡았다! 방이 조금 깨끗해졌어.`);
  if (isCoop) {
    window.setTimeout(startPartnerDemoMovement, 900);
  }
  scheduleThreat();
}

function chaseThreat(event) {
  event.preventDefault();
  event.stopPropagation();
  if (roomThreat.classList.contains("hidden")) return;
  if (state.threatKind === "coop") {
    stopPartnerDemoMovement();
    const target = threatFloorPoint();
    updatePartnerPosition(clamp(target.x + 8, 20, 80), clamp(target.y, roomMetrics.backY, roomMetrics.frontY));
    speakPartner(`${state.selectedCharacter.name}: 이건 같이 잡아야겠다. 내가 옆에서 막을게!`);
  } else if (state.threatKind === "moving") {
    speakPartner(`${state.selectedCharacter.name}: 도망간다! 천천히 따라가자.`);
  } else {
    speakPartner(`${state.selectedCharacter.name}: 저기! 꿈틀이 잡으러 가자.`);
  }
  startTapMove(threatFloorPoint(), catchThreat);
}

function missThreat() {
  if (roomThreat.classList.contains("hidden")) return;
  const isSurprise = state.threatKind === "surprise";
  const isCoop = state.threatKind === "coop";
  roomThreat.classList.add("hidden");
  stopThreatMotion();
  showReward(isSurprise ? "반짝 꿈틀이를 놓쳤어 · 보상 없음" : "꿈틀이를 놓쳤어 · 보상 없음");
  speakPartner(isCoop
    ? `${state.selectedCharacter.name}: 아쉽다. 다음엔 둘이 더 빨리 가보자.`
    : `${state.selectedCharacter.name}: 놓쳤다... 그래도 방에는 문제 없게 해둘게.`);
  if (isCoop) {
    window.setTimeout(startPartnerDemoMovement, 700);
  }
  scheduleThreat();
}

function maybeSurpriseThreat(chance = 0.04) {
  if (!screens.room.classList.contains("active")) return;
  if (!miniGamePanel.classList.contains("hidden")) return;
  if (!cityPanel.classList.contains("hidden")) return;
  if (!roomThreat.classList.contains("hidden")) return;
  if (Math.random() >= chance) return;
  window.clearTimeout(threatTimer);
  state.threatKind = "surprise";
  roomThreat.classList.remove("moving", "coop");
  roomThreat.classList.add("surprise");
  roomThreat.querySelector("span").textContent = "반짝 꿈틀이";
  setThreatPosition(26 + Math.random() * 52, 44 + Math.random() * 34);
  roomThreat.classList.remove("hidden");
  threatTimer = window.setTimeout(missThreat, 3600);
}

const keyboardRows = [
  ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
  ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  [{ label: "⇧", action: "shift" }, "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", { label: "⌫", action: "delete" }],
  [
    { label: "ㅋㅋ", value: "ㅋㅋ" },
    { label: "ㅎㅎ", value: "ㅎㅎ" },
    { label: "♡", value: "♡" },
    { label: "＿", action: "space" },
    { label: ".", value: "." },
    { label: "특한영", action: "special-lang" },
  ],
];

const choList = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const jungList = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const jongList = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const choIndex = Object.fromEntries(choList.map((letter, index) => [letter, index]));
const jungIndex = Object.fromEntries(jungList.map((letter, index) => [letter, index]));
const jongIndex = Object.fromEntries(jongList.map((letter, index) => [letter, index]));
const vowelCombos = {
  "ㅗㅏ": "ㅘ",
  "ㅗㅐ": "ㅙ",
  "ㅗㅣ": "ㅚ",
  "ㅜㅓ": "ㅝ",
  "ㅜㅔ": "ㅞ",
  "ㅜㅣ": "ㅟ",
  "ㅡㅣ": "ㅢ",
};
let composingHangul = { active: false, cho: "", jung: "", jong: "" };

function buildSyllable(cho, jung, jong = "") {
  return String.fromCharCode(0xac00 + choIndex[cho] * 588 + jungIndex[jung] * 28 + (jongIndex[jong] || 0));
}

function resetComposition() {
  composingHangul = { active: false, cho: "", jung: "", jong: "" };
}

function setChatValue(value) {
  chatInput.value = value.slice(0, Number(chatInput.maxLength) || 40);
}

function appendChatText(text) {
  setChatValue(chatInput.value + text);
}

function replaceLastChatText(text) {
  setChatValue(chatInput.value.slice(0, -1) + text);
}

function insertConsonant(letter) {
  if (!composingHangul.active) {
    appendChatText(letter);
    composingHangul = { active: true, cho: letter, jung: "", jong: "" };
    return;
  }

  if (composingHangul.cho && !composingHangul.jung) {
    appendChatText(letter);
    composingHangul = { active: true, cho: letter, jung: "", jong: "" };
    return;
  }

  if (composingHangul.cho && composingHangul.jung && !composingHangul.jong && jongIndex[letter]) {
    composingHangul.jong = letter;
    replaceLastChatText(buildSyllable(composingHangul.cho, composingHangul.jung, composingHangul.jong));
    return;
  }

  appendChatText(letter);
  composingHangul = { active: true, cho: letter, jung: "", jong: "" };
}

function insertVowel(letter) {
  if (composingHangul.active && composingHangul.cho && !composingHangul.jung) {
    composingHangul.jung = letter;
    replaceLastChatText(buildSyllable(composingHangul.cho, composingHangul.jung));
    return;
  }

  if (composingHangul.active && composingHangul.cho && composingHangul.jung && composingHangul.jong) {
    const nextCho = choIndex[composingHangul.jong] !== undefined ? composingHangul.jong : "";
    replaceLastChatText(buildSyllable(composingHangul.cho, composingHangul.jung));
    if (nextCho) {
      appendChatText(buildSyllable(nextCho, letter));
      composingHangul = { active: true, cho: nextCho, jung: letter, jong: "" };
      return;
    }
  }

  if (composingHangul.active && composingHangul.cho && composingHangul.jung && !composingHangul.jong) {
    const combo = vowelCombos[`${composingHangul.jung}${letter}`];
    if (combo) {
      composingHangul.jung = combo;
      replaceLastChatText(buildSyllable(composingHangul.cho, composingHangul.jung));
      return;
    }
  }

  appendChatText(letter);
  resetComposition();
}

function deleteKeyboardText() {
  if (!chatInput.value) return;

  if (composingHangul.active && composingHangul.jong) {
    composingHangul.jong = "";
    replaceLastChatText(buildSyllable(composingHangul.cho, composingHangul.jung));
    return;
  }

  if (composingHangul.active && composingHangul.jung) {
    composingHangul.jung = "";
    replaceLastChatText(composingHangul.cho);
    return;
  }

  setChatValue(chatInput.value.slice(0, -1));
  resetComposition();
}

function handleKeyboardValue(value) {
  if (choIndex[value] !== undefined) {
    insertConsonant(value);
    return;
  }
  if (jungIndex[value] !== undefined) {
    insertVowel(value);
    return;
  }
  resetComposition();
  appendChatText(value);
}

function renderGameKeyboard() {
  gameKeyboard.textContent = "";
  keyboardRows.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.className = "keyboard-row";
    row.forEach((key) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `game-key ${key.action ? "action" : ""}`;
      button.textContent = key.label || key;
      button.dataset.keyValue = key.value || key;
      if (key.action) button.dataset.keyAction = key.action;
      rowElement.append(button);
    });
    gameKeyboard.append(rowElement);
  });
}

function toggleGameKeyboard(forceOpen) {
  const shouldOpen = forceOpen ?? gameKeyboard.classList.contains("hidden");
  gameKeyboard.classList.toggle("hidden", !shouldOpen);
}

function handleGameKeyboardClick(event) {
  const button = event.target.closest(".game-key");
  if (!button) return;
  event.preventDefault();
  const action = button.dataset.keyAction;
  if (action === "delete") {
    deleteKeyboardText();
    return;
  }
  if (action === "shift") {
    return;
  }
  if (action === "special-lang") {
    return;
  }
  if (action === "space") {
    resetComposition();
    appendChatText(" ");
    return;
  }
  if (action === "close") {
    resetComposition();
    toggleGameKeyboard(false);
    return;
  }
  handleKeyboardValue(button.dataset.keyValue || "");
}

function sendMessage(event) {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  speakPlayer(text);
  chatInput.value = "";
  resetComposition();
  state.score += 1;
  heartScore.textContent = state.score;
  grantRoomReward("대화 보상", 1, 2, 0.04);
  maybeSurpriseThreat(0.035);

  window.setTimeout(() => {
    speakPartner(makeReply(text));
  }, 760);
}

function makeReply(text) {
  const name = state.selectedCharacter.name;
  if (text.includes("ㅋ") || text.includes("웃")) return `${name}: ㅋㅋㅋㅋㅋㅋㅋㅋㅋ`;
  if (text.includes("안녕")) return `${name}: 안녕. 이렇게 가까이서 보니까 더 반갑다.`;
  if (text.includes("좋아") || text.includes("귀여")) return `${name}: 그런 말 들으면 표정 관리가 안 되잖아.`;
  if (text.includes("게임")) return `${name}: 좋아. 다음엔 방 안에서 미니게임도 열자.`;
  return `${name}: 응, 네 말 들었어. 조금 더 이야기해줘.`;
}

function openMiniGame() {
  cityPanel.classList.add("hidden");
  miniGamePanel.classList.remove("hidden");
  stopMoving();
  stopPartnerDemoMovement();
  stopThreatLoop();
  resetBombGame();
  speakPartner(`${state.selectedCharacter.name}: 하트폭탄? 지면 놀리기야.`);
}

function closeMiniGame() {
  endBombLoop();
  miniGamePanel.classList.add("hidden");
  startPartnerDemoMovement();
  startThreatLoop();
}

function resetBombGame() {
  endBombLoop();
  bombGame.active = false;
  bombGame.holder = "player";
  bombGame.freezeUsed = false;
  bombArena.classList.remove("boom");
  updateBombView();
  bombTimer.textContent = "10.0";
  bombStatus.textContent = "버튼을 눌러 시작";
  bombStartButton.textContent = "시작";
  bombStartButton.disabled = false;
}

function startBombGame() {
  endBombLoop();
  bombGame.active = true;
  bombGame.holder = Math.random() > 0.5 ? "player" : "partner";
  bombGame.startedAt = performance.now();
  bombGame.explodeAt = 3200 + Math.random() * 6200;
  bombGame.freezeUsed = false;
  bombArena.classList.remove("boom");
  bombStatus.textContent = "언제 터질지 몰라";
  bombStartButton.textContent = "다시 시작";
  bombStartButton.disabled = false;
  updateBombView();
  if (bombGame.holder === "partner") schedulePartnerBombMove(520);
  bombFrame = window.requestAnimationFrame(updateBombGame);
}

function endBombLoop() {
  window.cancelAnimationFrame(bombFrame);
  window.clearTimeout(bombPartnerTimer);
  bombFrame = undefined;
  bombPartnerTimer = undefined;
}

function updateBombGame(time) {
  if (!bombGame.active) return;
  const elapsed = time - bombGame.startedAt;
  const remaining = Math.max(0, (10000 - elapsed) / 1000);
  bombTimer.textContent = remaining.toFixed(1);

  if (elapsed >= bombGame.explodeAt || remaining <= 0) {
    finishBombGame();
    return;
  }

  bombFrame = window.requestAnimationFrame(updateBombGame);
}

function updateBombView() {
  const bombX = bombGame.holder === "player" ? 26 : 74;
  bombArena.style.setProperty("--bomb-x", `${bombX}%`);
  bombPassButton.disabled = !bombGame.active;
  bombTrickButton.disabled = !bombGame.active || bombGame.holder !== "partner" || bombGame.freezeUsed;
  bombTrickButton.textContent = bombGame.freezeUsed ? "사용 완료" : "시간 멈춤";
}

function passBombTo(holder) {
  if (!bombGame.active || bombGame.holder === holder) return;
  bombGame.holder = holder;
  updateBombView();
  bombStatus.textContent = holder === "player" ? "다시 넘어왔어!" : "상대한테 넘겼어!";
  if (holder === "partner") schedulePartnerBombMove(420 + Math.random() * 680);
}

function schedulePartnerBombMove(delay) {
  window.clearTimeout(bombPartnerTimer);
  bombPartnerTimer = window.setTimeout(() => {
    if (!bombGame.active || bombGame.holder !== "partner") return;
    if (Math.random() < 0.72) {
      passBombTo("player");
      return;
    }
    bombStatus.textContent = `${state.selectedCharacter.name}: 잠깐, 이거 나한테 있는 거 아니지?`;
    schedulePartnerBombMove(520 + Math.random() * 760);
  }, delay);
}

function handleBombPass() {
  if (!bombGame.active) return;
  if (bombGame.holder === "player") {
    passBombTo("partner");
    return;
  }
  bombStatus.textContent = "지금은 상대가 들고 있어";
}

function handleBombFreeze() {
  if (!bombGame.active) return;
  if (bombGame.freezeUsed) {
    bombStatus.textContent = "이번 판에는 이미 썼어";
    return;
  }
  if (bombGame.holder !== "partner") {
    bombStatus.textContent = "상대가 들고 있을 때만 가능해";
    return;
  }

  const freezeTime = 700 + Math.random() * 700;
  bombGame.freezeUsed = true;
  window.clearTimeout(bombPartnerTimer);
  updateBombView();
  bombStatus.textContent = `${state.selectedCharacter.name}: 어? 시간이 멈췄어?`;
  schedulePartnerBombMove(freezeTime + 360 + Math.random() * 360);

  window.setTimeout(() => {
    if (bombGame.active && bombGame.holder === "partner") {
      bombStatus.textContent = "실제 시간은 계속 흐르는 중";
    }
  }, Math.min(freezeTime, 1000));
}

function finishBombGame() {
  const loser = bombGame.holder;
  bombGame.active = false;
  endBombLoop();
  bombArena.classList.add("boom");
  updateBombView();

  if (loser === "partner") {
    state.score += 2;
    heartScore.textContent = state.score;
    grantRoomReward("폭탄 승리", 8, 7, 0.12);
    maybeSurpriseThreat(0.08);
    bombStatus.textContent = "승리! 상대 앞에서 터졌어";
    speakPartner(`${state.selectedCharacter.name}: 아 진짜ㅋㅋㅋ 방금 일부러 그랬지?`);
    return;
  }

  bombStatus.textContent = "패배! 내 앞에서 터졌어";
  speakPartner(`${state.selectedCharacter.name}: 내가 이겼다. 한 판 더 할래?`);
}

screens.splash.addEventListener("click", () => showScreen("setup"));
nextAppearanceButton.addEventListener("click", openAppearance);
matchButton.addEventListener("click", startMatching);
document.querySelector("#backToSetupFromAppearance").addEventListener("click", () => showScreen("setup"));
document.querySelector("#backToAppearance").addEventListener("click", () => {
  endBombLoop();
  miniGamePanel.classList.add("hidden");
  cityPanel.classList.add("hidden");
  stopThreatLoop();
  stopPartnerDemoMovement();
  showScreen("appearance");
});

relationOptions.forEach((button) => {
  button.addEventListener("click", () => selectRelation(button));
});

myGenderOptions.forEach((button) => {
  button.addEventListener("click", () => selectMyGender(button));
});

if (sessionStorage.getItem("otakuClientUnlocked") === "1") {
  unlockClientApp();
}

clientLockForm.addEventListener("submit", handleClientLock);

document.querySelectorAll(".move-btn").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    button.setPointerCapture?.(event.pointerId);
    startMoving(button.dataset.move);
  });
  button.addEventListener("pointerup", stopMoving);
  button.addEventListener("pointercancel", stopMoving);
  button.addEventListener("lostpointercapture", stopMoving);
  button.addEventListener("mouseleave", stopMoving);
});

chatForm.addEventListener("submit", sendMessage);
chatInput.addEventListener("click", () => toggleGameKeyboard(true));
gameKeyboard.addEventListener("click", handleGameKeyboardClick);
gameRoom.addEventListener("pointerdown", handleRoomTap);
roomThreat.addEventListener("pointerdown", chaseThreat);
miniGameButton.addEventListener("click", openMiniGame);
miniGameClose.addEventListener("click", closeMiniGame);
cityButton.addEventListener("click", openCityPanel);
cityClose.addEventListener("click", closeCityPanel);
cityTabs.forEach((button) => {
  button.addEventListener("click", () => selectCityTab(button.dataset.cityTab));
});
splitButtons.forEach((button) => {
  button.addEventListener("click", () => selectJobSplit(button));
});
writeButtons.forEach((button) => {
  button.addEventListener("click", () => writeBoardPost(button.dataset.writeBoard));
});
startJobButton.addEventListener("click", startJobRoom);
document.querySelectorAll("[data-city-note]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent.includes("조인") || button.textContent.includes("신청")) {
      state.guestTrust = clamp(state.guestTrust + 1, 0, 100);
      updateCityStats();
    }
    showReward(button.dataset.cityNote);
  });
});
document.querySelectorAll("[data-follow-room]").forEach((button) => {
  button.addEventListener("click", () => followRoom(button));
});
document.querySelectorAll("[data-approve-guest]").forEach((button) => {
  button.addEventListener("click", () => approveGuest(button));
});
bombStartButton.addEventListener("click", startBombGame);
bombPassButton.addEventListener("click", handleBombPass);
bombTrickButton.addEventListener("click", handleBombFreeze);
window.addEventListener("resize", scheduleRoomMetricsUpdate);
window.visualViewport?.addEventListener("resize", scheduleRoomMetricsUpdate);
window.visualViewport?.addEventListener("scroll", scheduleRoomMetricsUpdate);
if ("ResizeObserver" in window) {
  new ResizeObserver(scheduleRoomMetricsUpdate).observe(gameRoom);
}
updateAppViewport();
renderGameKeyboard();
updateRoomProgress();
updateCityStats();
updatePartnerGender();

window.setTimeout(() => showScreen("setup"), 1700);
