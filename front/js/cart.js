let orderedProducts = JSON.parse(window.localStorage.getItem("productToCart"));
async function getOneProduct(productId){
    const options = {methode: 'get'}; 
    const result = await fetch(`http://localhost:3000/api/products/${productId}`, options);
    return await result.json()
}

async function init(){
    orderedProducts.forEach(product => {
        let productFromAPI = getOneProduct(product.id);
        productFromAPI.then((value)=>{
            var produit = value 

            img.setAttribute("src", produit.imageUrl )
            h2.innerHTML = produit.name
            pPrice.innerHTML = produit.price*product.quantity + " €"

            product.name = produit.name
            product.price = produit.price
            product.imageUrl = produit.imageUrl
            window.localStorage.setItem("productToCart", JSON.stringify(orderedProducts))
        })

        const cartItems = document.getElementById("cart__items"); 
        const cartItem = document.createElement("article")
        cartItem.classList.add("cart__item")
        cartItem.setAttribute("data-id", product.id)
        cartItem.setAttribute("data-color", product.color)
        
        const divCartItemImg = document.createElement("div")
        divCartItemImg.classList.add("cart__item__img")
    
        const img = document.createElement("img")
        
        img.setAttribute("alt", "photographie d'un canapé")
        

        const itemContent = document.createElement("div")
        itemContent.classList.add("cart__item__content")
    
        const contentDescription = document.createElement("div")
        contentDescription.classList.add("cart__item__content__description")
    
        const h2 = document.createElement("h2")
        
        const pColor = document.createElement("p")
        pColor.innerHTML = product.color 
    
        const pPrice = document.createElement("p")
        
        const contentSettings = document.createElement("div")
        contentSettings.classList.add("cart__item__content__settings")
    
        const settingsQuantity = document.createElement("div")
        settingsQuantity.classList.add("cart__item__content__settings__quantity")
    
        const Qte = document.createElement("p")
        Qte.innerHTML = "Qté : " 
    
        const input = document.createElement("input")
        input.setAttribute("type", "number")
        input.setAttribute("name", "itemQuantity")
        input.classList.add("itemQuantity")
        input.setAttribute("min", 1)
        input.setAttribute("max", 100)
        input.setAttribute("value", product.quantity)
        input.addEventListener("change", (NewQuantity) => {
            product.quantity = NewQuantity.target.value
            pPrice.innerHTML = product.price*product.quantity + " €"
            total(product)
            window.localStorage.setItem("productToCart", JSON.stringify(orderedProducts))
        })
    
        const settingsDelete = document.createElement("div")
        settingsDelete.classList.add("cart__item__content__settings__delete")
    
        const deleteItem = document.createElement("p")
        deleteItem.innerHTML = "Supprimer" 
        deleteItem.addEventListener("click", () => {
            let index = orderedProducts.indexOf(product)
            orderedProducts.splice(index, 1)
            pPrice.innerHTML = product.price*product.quantity + " €"
            total(product)
            cartItems.removeChild(cartItem)
            alert("Ce produit à bien été supprimé !CD")
            window.localStorage.setItem("productToCart", JSON.stringify(orderedProducts))
        })
        
        cartItems.appendChild(cartItem)
        cartItem.appendChild(divCartItemImg)
        divCartItemImg.appendChild(img)
        cartItem.appendChild(itemContent)
        itemContent.appendChild(contentDescription)
        contentDescription.appendChild(h2)
        contentDescription.appendChild(pColor)
        contentDescription.appendChild(pPrice)
        itemContent.appendChild(contentSettings)
        contentSettings.appendChild(settingsQuantity)
        settingsQuantity.appendChild(Qte)
        settingsQuantity.appendChild(input)
        contentSettings.appendChild(settingsDelete)
        settingsDelete.appendChild(deleteItem)

    });
}
async function total(){
    // calcule de la quantity total des produits 
    let quantityArray = orderedProducts.map(product => {return Number(product.quantity)})    
    let sumQuantity = quantityArray.reduce((accumulator, currentValue) =>{
        return accumulator + currentValue
    }, 0)

    let totalQuantity = document.getElementById("totalQuantity")
    totalQuantity.textContent = sumQuantity 

    // calcule du prix total des produits  
    let sumPrice =0;           
    for(let product of orderedProducts){
        let produit = await getOneProduct(product.id);
        sumPrice = sumPrice + product.quantity*produit.price
    }
    let totalPrice = document.getElementById("totalPrice")
    totalPrice.textContent = sumPrice
}
total()
init()