/*--------------------------val---------------*/

//check rỗng
function valNull(val, idErr, contentErr) {
    var tb = document.querySelector(idErr);
    tb.innerHTML = contentErr + "không được để trống";
    if (val === "") {
      tb.style.display = "block";
      return false;
    } else {
      tb.style.display = "none";
      return true;
    }
  }
  
  // check ký tự
  function checkVal(val, idErr) {
    var reVal = /^[a-zA-Z\u00C0-\u1EF9\s]+$/g;
    var tb = document.querySelector(idErr);
    tb.innerText = "không chứa số trong họ tên";
    if (reVal.test(val)) {
      tb.style.display = "none";
      return true;
    } else {
      tb.style.display = "block";
      return false;
    }
  }
  
  //check mật khẩu
  function checkPass(val, idErr) {
    var rePas =
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,10}/;
    var tb = document.querySelector(idErr);
    tb.innerText =
      "Bao gồm chữ hoa,   chữ thường, số, ký tự đặc biệt và từ 6 đến 10 ký tự";
    if (rePas.test(val)) {
      tb.style.display = "none";
      return true;
    } else {
      tb.style.display = "block";
      return false;
    }
  }
  
  //
  
  //check số
  function checkNum(val, idErr, content, num) {
    var spTB = document.querySelector(idErr);
    spTB.innerHTML = `${content} bao gồm ${num} số`;
  
    if (val.length === num) {
      spTB.style.display = "none";
      return true;
    } else {
      spTB.style.display = "block";
      return false;
    }
  }
  
  //check email
  function checkEmail(val, idErr) {
    var reEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    var tb = document.querySelector(idErr);
    tb.innerText = "phải bao gồm chữ số và @";
    if (reEmail.test(val)) {
      tb.style.display = "none";
      return true;
    } else {
      tb.style.display = "block";
      return false;
    }
  }
  //check nhập lại mật khẩu
  function passCF(arrPass, val, idErr) {
    var value = val;
    var tb = document.querySelector(idErr);
    tb.innerHTML = "phải khớp với mật khẩu vừa nhập, vui lòng nhập lại";
    for (var i = 0; i < arrPass.length; i++) {
      if (arrPass[i] !== value[i]) {
        tb.style.display = "block";
        return false;
      }
    }
    tb.style.display = "none";
    return true;
  }
  