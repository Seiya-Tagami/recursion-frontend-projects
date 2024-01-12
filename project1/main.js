"use strict";

const IMAGE_LIST = [
  {
    text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. - Antoine de Saint",
    colorCode: "#1B4F72",
    imgUrl: "https://cdn.pixabay.com/photo/2020/06/12/03/06/magnifying-glass-5288877__340.jpg",
    pos1: "top",
    pos2: "end",
  },
  {
    text: "Scientists study the world as it is, engineers create the world that never has been. - Theodore von Karman",
    colorCode: "#ecf0f1",
    imgUrl: "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg",
    pos1: "bottom",
    pos2: "left",
  },
  {
    text: "The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg",
    colorCode: "#007bff",
    imgUrl: "https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg",
    pos1: "top",
    pos2: "start",
  },
];

const wallpaper = document.getElementById("js-wallpaper");
const genButton = document.getElementById("js-gen-button");
genButton.addEventListener("click", () => {
  resetWallpaper();
  generateWallpaper();
});

function generateWallpaper() {
  const wallpaperDiv = document.createElement("div");
  const wallpaperImg = document.createElement("img");
  const wallpaperP = document.createElement("p");

  const randomNum = getRandomNumFromListLength(IMAGE_LIST.length);
  const resource = IMAGE_LIST[randomNum];

  wallpaperP.classList.add("wallpaper__content__text", `${resource.pos1}-50`, `${resource.pos2}-50`);
  wallpaperP.innerText = resource.text;

  wallpaperImg.src = resource.imgUrl;
  wallpaperImg.classList.add("wallpaper__content__img");

  wallpaperDiv.classList.add("wallpaper__content");
  wallpaperDiv.append(wallpaperImg, wallpaperP);
  wallpaper.append(wallpaperDiv);
}

function resetWallpaper() {
  wallpaper.innerHTML = "";
}

function getRandomNumFromListLength(listLength) {
  return Math.floor(Math.random() * listLength);
}
