const getProductData = async () => {
  try {
    const url = "https://shop.cyberlearn.vn/api/Product";
    const respone = await fetch(url);
    const data = await respone.json();
    // console.log("productdata", data)
    return data;
  } catch (error) {
    // console.log(error)
    return;
  }
};

getProductData().then((data) => console.log("product-data", data));

const renderProductData = async () => {
  try {
    const response = await getProductData();
    const productsResult = document.querySelector("#content-product");
    productsResult.innerHTML = "";

    const products = response.content;

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-4 mt-4";
      productCard.innerHTML = `
        <div class = "card">
        <img src="${product.image}" id="${product.id}" alt="${product.alias}" style ="width:100%">
        <div class = "card-body">
        <h3>${product.name}</h3>
        <p>${product.shortDescription}</p>
        <div class= "d-flex">
        <button class = "btn btn-warning w-50 me-1">Buy Now</button>
        <button class = "btn btn-light w-50 ms-1">$${product.price}</button>
        </div>
        </div>
        </div>
        `;

      productsResult.appendChild(productCard);
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

renderProductData();

// featured products

const updateProductInfo = async () => {
  try {
    const response = await getProductData();
    const products = response.content;

    // Find the product with id 9
    const productWithId9 = products.find((product) => product.id === 9);

    if (productWithId9) {
      const productInfo = document.querySelector("#product-info");
      productInfo.innerHTML = `
          <div>
          <img src="${productWithId9.image}" alt="" />
          </div>
          <div class="product-information">
            <h3>${productWithId9.name}</h3>
            <p>${productWithId9.description}</p>
            <button class="btn btn-warning">Buy now</button>
          </div>
        `;
    }
  } catch (error) {
    console.error(error);
  }
};

updateProductInfo();
