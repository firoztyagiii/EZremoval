const uploadBtn = document.querySelector(".upload-btn");
const bar = document.querySelector(".bar");
const bg = document.querySelector(".bg");
const loadingBG = document.querySelector(".loading-bg");
const copyBtn = document.querySelector(".fa-copy");
const linkBox = document.querySelector(".link-box");

const inputRange = document.querySelector(".input-range");
const rangeText = document.querySelector(".range-text");

const compressImageBtn = document.querySelector(".upload-compress-img");
const resizeImageBtn = document.querySelector(".upload-resize-img");

const callAPI = async (form) => {
  try {
    loadingBG.classList.remove("loading-hidden");
    const res = await fetch("http://localhost:3000", {
      method: "POST",
      body: form,
    });
    const response = await res.json();
    console.log(response);
    loadingBG.classList.add("loading-hidden");
    linkBox.classList.remove("hide-link");
    document.querySelector(
      ".link"
    ).value = `http://localhost:3000/v/${response.path}`;
  } catch (err) {
    console.log(err);
  }
};

if (uploadBtn) {
  uploadBtn.addEventListener("click", async () => {
    console.log("Click");
    const imgElement = document.getElementById("file-upload");
    const img = imgElement.files[0];
    const form = new FormData();
    form.append("image", img);
    await callAPI(form);
  });
}

bar.addEventListener("click", () => {
  bg.classList.toggle("hidden");
});

copyBtn.addEventListener("click", () => {
  copyBtn.classList.remove("fa-copy");
  copyBtn.classList.add("fa-check");
  copyBtn.classList.add("checked");
  const linkInput = document.querySelector(".link").value;
  navigator.clipboard.writeText(linkInput);
});

if (inputRange) {
  inputRange.addEventListener("mousemove", function () {
    rangeText.value = this.value;
  });
}

if (compressImageBtn) {
  compressImageBtn.addEventListener("click", async function () {
    const imgElement = document.getElementById("file-upload");
    const img = imgElement.files[0];
    const form = new FormData();
    form.append("image", img);
    form.append("quality", document.querySelector(".range-text").value);
    loadingBG.classList.remove("loading-hidden");
    const res = await fetch("http://localhost:3000/resize", {
      method: "POST",
      body: form,
    });
    const response = await res.json();
    console.log(response);
    loadingBG.classList.add("loading-hidden");
    linkBox.classList.remove("hide-link");
    document.querySelector(
      ".link"
    ).value = `http://localhost:3000/v/${response.path}`;
  });
}

if (resizeImageBtn) {
  resizeImageBtn.addEventListener("click", async function () {
    const imgElement = document.getElementById("file-upload");
    const height = document.querySelector(".height").value * 1;
    const width = document.querySelector(".width").value * 1;
    const img = imgElement.files[0];

    if (
      isNaN(height) ||
      isNaN(width) ||
      height < 0 ||
      width < 0 ||
      img === undefined
    ) {
      return console.log("Invalid input");
    }

    const form = new FormData();
    form.append("image", img);
    form.append("width", width);
    form.append("height", height);
    loadingBG.classList.remove("loading-hidden");
    const res = await fetch("http://localhost:3000/resize", {
      method: "POST",
      body: form,
    });
    const response = await res.json();
    loadingBG.classList.add("loading-hidden");
    linkBox.classList.remove("hide-link");
    document.querySelector(
      ".link"
    ).value = `http://localhost:3000/v/${response.path}`;
  });
}
