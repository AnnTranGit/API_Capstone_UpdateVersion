/*
document.querySelector("#submitForm").onclick = function (e) {
  e.preventDefault();

  var gender = document.querySelector("#male");
  if (gender.checked) {
    gender = true;
  } else {
    gender = false;
  }

  var user = new UserRegister();
  user.email = document.querySelector("#email").value;
  user.name = document.querySelector("#name").value;
  user.password = document.querySelector("#password").value;
  user.phone = document.querySelector("#phone").value;
  user.gender = gender;
  console.log(user);

  //Gửi data về server qua API

  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup", //BE cung cấp
    method: "POST", //BE cung cấp
    data: user, //format backend cung cấp
  });

  promise.then(function (res) {
    console.log(res);
    alert("tạo tk thành công");
  });

  //Thất bại
  promise.catch(function (err) {
    console.log(err);
  });
};

*/

function getDataRes(DataUser, idForm, alertEmail) {
  var promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: DataUser,
  });
  promise.then(function (res) {
    //console.log(res.data);
    alert("tạo tk thành công");
    document.querySelector(idForm).reset();
  });
  promise.catch(function (err) {
    console.log(err.response.status);
    var statusErr = err.response.status;
    if (statusErr === 400) {
      alertEmail.innerHTML =
        "email này đã được sử dụng, vui lòng nhập email khác";
      alertEmail.style.display = "block";
    }
  });
}


document.querySelector("#btnSubmitForm").onclick = function(a) {
  a.preventDefault();
  /*-------------------lấy data user------------------ */

  //set true false khi chọn giới tính
  var gender = document.querySelector("#male");
  if (gender.checked) {
      gender = true;
  } else {
      gender = false;
  }

  //lấy value của ô passcf
  var passwordCF = document.querySelector("#confirmPassword").value;

  //lấy data dựa trên input người dùng nhập
  var user = new User();
  user.email = document.querySelector("#email").value;
  user.password = document.querySelector("#password").value;
  user.name = document.querySelector("#name").value;
  user.gender = gender;
  user.phone = document.querySelector("#phone").value;

  //set sự kiện validation
  var val = true;
  val = valNull(user.email.trim(), "#error-required-email", "email ");
  valNull(user.password.trim(), "#error-required-password", "password ");
  valNull(passwordCF, "#error-required-confirmPassword", "password ");
  valNull(user.name.trim(), "#error-required-name", "tên ");
  valNull(user.phone.trim(), "#error-required-phone", "số điện thoại ");

  val =
      val &
      checkEmail(user.email, "#error-letter-email") &
      checkPass(user.password, "#error-letter-password") &
      passCF(user.password, passwordCF, "#error_value_confirmPassword") &
      checkVal(user.name, "#error-letter-name") &
      checkNum(user.phone, "#error-phone-number", "số điện thoại", 10);
  if (val != true) {
      return;
  } else {
      console.log(user);
      var emailAl = document.querySelector("#error-required-name");
      getDataRes(user, "#frmRegis", emailAl);
  }
};

// document.querySelector(".op-eyes").onclick = function() {
//   changeVal("#password");
//   changeVal("#password-confirm");
// };