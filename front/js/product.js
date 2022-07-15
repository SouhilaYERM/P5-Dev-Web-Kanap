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

    const button = document.getElementById("addToCart")
    button.setAttribute("onclick", "addCart()")
    
}

async function init(){
    //récuperer l'ID depuis le lien 
    let idrecup = getProductId();

    //importer le produit depuis l'API
    let product = await getOneProduct(idrecup);

    //afficher le produit 
    renderProduct(product)

}

init()

//tableau 

function addCart () {
    const cart = window.localStorage.getItem("productToCart")  //permet de stocker les objets de local storage dans la variable cart
    const parseCart = JSON.parse(cart)?JSON.parse(cart) : []   //permet de transformer le contenu de la variable cart en des objet JSON contenus dans un tableau 
    const productToCart = {                                   
        id : getProductId(),                                     
        color : document.getElementById("colors").value,
        quantity : document.getElementById("quantity").value
    }

    function existAlready(id, color, cart){
        return cart.findIndex ((product)=>
        product.id==id && product.color == color
        )
    }
    
    function ShouldAddToCart(color, quantity) {
      if(color == "" && (quantity<1 || quantity >100)){
            alert("Vous devez choisir une couleur et selectionner une quantité")
            return false
        }
        else if (color== ""){
            alert("vous devez choisir une couleur ")
            return false
        }
        else if (quantity<1 || quantity>100){
            alert("Vous ne pouvez ajouter qu'une quantité comprise entre 1 et 100 articles")
            return false
        }   
        return true 
    }

    if (ShouldAddToCart(productToCart.color, productToCart.quantity)){
        const index = existAlready(productToCart.id, productToCart.color, parseCart)
        if(index!= -1) {
            let productInQty = Number(parseCart[index].quantity)
            let productToCartQty = Number(productToCart.quantity)
            parseCart[index].quantity = productInQty + productToCartQty
        }
        else{
            parseCart.push(productToCart)
        }
        window.localStorage.setItem("productToCart", JSON.stringify(parseCart))
    }
    
}


let clic = document.getElementById("addToCart")
clic.addEventListener('click', addCart)

