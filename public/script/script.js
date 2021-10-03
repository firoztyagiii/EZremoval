const uploadBtn = document.querySelector(".upload-btn");
const bar = document.querySelector(".bar");
const bg = document.querySelector(".bg");
const loadingBG = document.querySelector(".loading-bg");
const copyBtn = document.querySelector(".fa-copy");
const linkBox = document.querySelector(".link-box");

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

uploadBtn.addEventListener("click", async () => {
  console.log("Click");
  const imgElement = document.getElementById("file-upload");
  const img = imgElement.files[0];
  const form = new FormData();
  form.append("image", img);
  await callAPI(form);
});

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
