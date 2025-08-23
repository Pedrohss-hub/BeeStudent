const button = document.querySelector(".button-hello")

button.addEventListener('click', ()=>{
    getApi("http://0.0.0.0:3000/api").then(res => {
        console.log(res)
    })

    fetch("http://0.0.0.0:3000/api", {
        method:"POST",
        body: JSON.stringify({
            userID: 1,
            title:"Enviando para o Sevidor",
            completed: false,
        }),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    })
})

async function getApi(url) {
    let dado = await fetch(url)
    let dado2 = await dado.text()
    return dado2
}