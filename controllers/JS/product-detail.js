async function getDataApi() {
  try {
    var res = await axios({
      url: "https://shop.cyberlearn.vn/api/Product/getbyid?id=1", // Đường dẫn api backend cung cấp
      method: "GET", // Phương thức backend cung cấp với đường dẫn api
      responseType: "json", // Kiểu dữ liệu backend trả về
    });

    console.log(res.data);
    productDetail(res.data);
    console.log("Thành công rồi");
  } catch (err) {
    console.log(err);
  }
}

function productDetail(product) {
  var htmlString = `
  <div class="container px-4 px-lg-5 my-5">
  <div class="row gx-4 gx-lg-5 align-items-center">
    <div class="col-md-6">
      <img class="card-img-top mb-5 mb-md-0" src="${product.content.image}" alt="${product.content.name}" />
    </div>
    <div class="col-md-6">
      <h1 class="display-5 fw-bolder name">${product.content.name}</h1>
      <p class="description">${product.content.description}</p>
      <div class="fs-5 price">
        <span>$${product.content.price}</span>
      </div>
      <div class="d-flex align-items-center mb-3" id="sizeContainer">
       
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
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">Buy Now</button>
              </div>
              <p class="text-muted">$${relatedProduct.price}</p>
            </div>
          </div>
        </div>
      </div>

  `;
  }

  document.querySelector("#productDetails").innerHTML = htmlString;
  document.querySelector("#relatedProducts").innerHTML = relatedProductsHTML;
}

window.onload = function () {
  getDataApi();
};
