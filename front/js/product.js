function getProductId(){
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id")
}
async function getOneProduct(productId){
    const options = {methode: 'get'}; 
    const result = await fetch(`http://localhost:3000/api/products/${productId}`, options);
    return await result.json()
}
function renderProduct(product){
    const itemImg = document.getElementsByClassName("item__img");
    const img = document.createElement("img")
    img.setAttribute("src", product.imageUrl)
    img.setAttribute("alt", product.altTxt)
    itemImg[0].appendChild(img)

    const title = document.getElementById("title")
    title.innerHTML = product.name

    const price = document.getElementById("price")
    price.innerHTML = product.price

    const description = document.getElementById("description")
    description.innerHTML = product.description

    const select = document.getElementById("colors")
    product.colors.forEach(color => {
        const option = document.createElement("option")
        option.setAttribute("value", color)
        option.innerHTML = color
        select.appendChild(option)
    });
    

}

async function init(){
    //récuperer l'ID depuis le lien 
    let idrecup = getProductId();

    //importer le produit depuis l'API
    let product = await getOneProduct(idrecup);
    console.log(product);

    //afficher le produit 
    renderProduct(product)

}

init()
