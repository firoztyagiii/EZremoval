import Elements from "../view/view.js";

const init = () => {
  const element = new Elements();
  element.bar.addEventListener("click", function () {
    element.sidebar.classList.toggle("toggle-navbar");
  });
};

init();
