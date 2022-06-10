function getProductId(){
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id")
}
async function init(){
    //récuperer l'ID depuis le lien 
    let idrecup = getProductId();
    console.log(idrecup);
    
    //importer le produit depuis l'API
    //afficher le produit 
}


init()