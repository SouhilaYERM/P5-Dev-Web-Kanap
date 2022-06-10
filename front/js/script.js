async function getAllProducts() {
    const options = {methode: 'get'}; 
    const result = await fetch('http://localhost:3000/api/products/', options);
    return await result.json()
}

async function init() {
    let products = await getAllProducts();
    console.log(products); 
    products.forEach(product => renderProduct(product))
}

function renderProduct(product) {
    const divrecup = document.getElementById("items");
    const a = document.createElement("a");
        a.setAttribute("href","./product.html?id="+product._id)
    const article = document.createElement("article");
    const img = document.createElement("img")
        img.setAttribute("src", product.imageUrl)
        img.setAttribute("alt", product.altTxt)
    const h3 = document.createElement("h3");
        h3.classList.add("productName");
        h3.textContent = product.name;
    const p = document.createElement("p");
        p.classList.add("productDescription"); 
        p.textContent = product.description;
    article.appendChild(p);
    article.appendChild(h3);
    article.appendChild(img);
    a.appendChild(article);
    divrecup.appendChild(a);
}

function getItemsSection() {
    return document.getElementById('items');
}

init();
