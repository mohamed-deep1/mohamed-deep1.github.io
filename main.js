// ---------- LOGIN ----------
function login(){
  if (
    (user.value === "attacker" && pass.value === "attacker123") ||
    (user.value === "victim" && pass.value === "victim123")
  ){
    localStorage.setItem("user", user.value);
    if(!localStorage.getItem("mode")){
      localStorage.setItem("mode","insecure");
    }
    init();
  } else {
    alert("Wrong credentials");
  }
}

function logout(){
  localStorage.clear();
  location.reload();
}

// ---------- INIT ----------
function init(){
  if(localStorage.getItem("user")){
    loginSection.style.display = "none";
    dash.classList.remove("hidden");
    cu.innerText = localStorage.getItem("user");
    mode.innerText = localStorage.getItem("mode");
    loadComments();
    loadBio();
  }
}

const loginSection = document.getElementById("login");

// ---------- MODE ----------
function toggleMode(){
  let m = localStorage.getItem("mode");
  localStorage.setItem("mode", m === "secure" ? "insecure" : "secure");
  location.reload();
}

// ---------- SANITIZE ----------
function escapeHTML(str){
  return str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// ---------- REFLECTED XSS ----------
function reflected(){
  let v = search.value;
  if(localStorage.getItem("mode") === "secure"){
    v = escapeHTML(v);
  }
  searchOut.innerHTML = "Result: " + v;
}

// ---------- STORED XSS ----------
function store(){
  let arr = JSON.parse(localStorage.getItem("comments") || "[]");
  let v = comment.value;

  if(localStorage.getItem("mode") === "secure"){
    v = escapeHTML(v);
  }

  arr.push(v);
  localStorage.setItem("comments", JSON.stringify(arr));
  loadComments();
}

function loadComments(){
  let arr = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.innerHTML = "";
  arr.forEach(c => comments.innerHTML += "<p>"+c+"</p>");
}

// ---------- DOM XSS ----------
function dom(){
  domOut.innerHTML = domInput.value;
}

// ---------- PROFILE XSS ----------
function saveBio(){
  let v = bio.value;
  localStorage.setItem("bio", v);
  loadBio();
}

function loadBio(){
  let v = localStorage.getItem("bio") || "";
  if(localStorage.getItem("mode") === "secure"){
    v = escapeHTML(v);
  }
  bioOut.innerHTML = v;
}

init();
