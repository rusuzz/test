const plus = document.querySelector(".info__count-inc"),
  minus = document.querySelector(".info__count-dec"),
  result = document.querySelector(".info__count-res"),
  buyBtn = document.querySelector(".info__buy"),
  closeBtn = document.querySelector(".modal__close-btn"),
  modal = document.querySelector(".modal"),
  burgerBtn = document.querySelector(".burger__btn"),
  burgerCloseBtn = document.querySelector(".burger__close-btn"),
  burgerMenu = document.querySelector(".burger__menu");

let num = 1;

plus.addEventListener("click", () => {
  num++;
  result.innerHTML = num;
});

minus.addEventListener("click", () => {
  if (num > 0) {
    num--;
    result.innerHTML = num;
  }
});

buyBtn.addEventListener("click", () => {
  modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("open");
});

burgerBtn.addEventListener("click", () => {
  burgerMenu.classList.add("open");
});

burgerCloseBtn.addEventListener("click", () => {
  burgerMenu.classList.remove("open");
});
