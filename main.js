function login(){
  let u = user.value;
  let p = pass.value;

  if (
    (u === "attacker" && p === "attacker123") ||
    (u === "victim" && p === "victim123")
  ){
    localStorage.setItem("user", u);
    if(!localStorage.getItem("mode")){
      localStorage.setItem("mode","insecure");
    }
    location.href = "dashboard.html";
  } else {
    alert("wrong credentials");
  }
}
