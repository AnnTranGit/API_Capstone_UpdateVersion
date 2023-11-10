function getDataApi(idParam) {
  var promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${idParam} `,
    method: "GET",
    responseType: "json",
  });
  promise.then(function (res) {
    //console.log(res.data.content);
    productDetail(res.data);
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

function productDetail(product) {
  var htmlString = `
  <div class="container px-4 px-lg-5 my-5">
  <div class="row gx-4 gx-lg-5 align-items-center">
    <div class="col-md-6">
      <img class="card-img-top mb-5 mb-md-0" src="${
        product.content.image
      }" alt="${product.content.name}" />
    </div>
    <div class="col-md-6">
      <h1 class="display-5 fw-bold name">${product.content.name}</h1>
      <p class="description">${product.content.description}</p>
      <h4>Available size</h4>
      <div class="d-flex align-items-center mb-2" id="size-item">${sizeItem(
        product.content.size
      )}
      </div>
      <div class="fs-5 m-2 fs-3 fw-bold text-danger price">
        <span>$${product.content.price}</span>
      </div>
      
      <div class="d-flex align-items-center mb-3">
        <button type="button" class="btn btn-outline-dark me-1" id="decrementQuantity">-</button>
        <input
        class="form-control text-center"
        id="inputQuantity"
        type="number"
        value="1"
        min="1"
        style="width: 50px; max-width: 3rem"
      />
        <button type="button" class="btn btn-outline-dark ms-1" id="incrementQuantity">+</button>
      </div>
      <button class="btn btn-outline-dark flex-shrink-0" type="button">
        <i class="bi-cart-fill me-1"></i>
        Add to cart
      </button>
    </div>
  </div>
</div>
`;

  var relatedProductsList = product.content.relatedProducts;

  // Tạo một biến để lưu HTML của danh sách sản phẩm liên quan
  var relatedProductsHTML = "";

  // Duyệt qua danh sách sản phẩm liên quan và tạo thẻ card cho mỗi sản phẩm
  for (var i = 0; i < relatedProductsList.length; i++) {
    var relatedProduct = relatedProductsList[i];
    relatedProductsHTML += `
    <div class="col-md-4 p-5">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" src="${relatedProduct.image}" alt="${relatedProduct.name}">
          <div class="card-body">
            <h5 class="card-title">${relatedProduct.name}</h5>
            <p class="card-text">${relatedProduct.shortDescription}</p>
            <div class= "d-flex">
            <a href="./product-detail.html?productid=${relatedProduct.id}" class="w-50 p-2 text-center  bg-warning text-decoration-none text-black rounded ">BUY NOW</a>
            <button class = "btn btn-light w-50 ms-1">$${relatedProduct.price}</button>
            </div>
          </div>
        </div>
      </div>

  `;
  }

  document.querySelector("#productDetails").innerHTML = htmlString;
  document.querySelector("#relatedProducts").innerHTML = relatedProductsHTML;
}

function sizeItem(arrSize) {
  var size = "";
  for (var i = 0; i < arrSize.length; i++) {
    size += `
    <input type="radio" class="btn-check" name="options-outlined" id="success-outlined${i}" value=${arrSize[i]}  >
    <label class="btn my-2" for="success-outlined${i}">${arrSize[i]}</label>
    `;
  }
  return size;
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productid");
  console.log("params", myParam);
  //tạo item từ data sever
  getDataApi(myParam);
  //tạo item dựa trên id lấy được
  // loadDataAPI(myParam);
};
