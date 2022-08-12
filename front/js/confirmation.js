function getconfirmationId(){
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("id")
}
let confirmationId = getconfirmationId()
commandNumber = document.getElementById("orderId")
commandNumber.innerText = confirmationId