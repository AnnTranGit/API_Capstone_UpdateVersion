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
