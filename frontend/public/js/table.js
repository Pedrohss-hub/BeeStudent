import ipServer from '../js/config.js'

//Posteriormente ARRCLASSNAME vai ser uma variável Global Local
let ARRCLASSNAME = ['ini','fim','per','cat','tliq'] // Especificar a qual coluna cada célula pertence

//Variáveis Globais Local
const TABLETIME = document.querySelector('.tableTime')
let ROWS = 0
let ARRALLROWS = []
let OBJALLCELLS = {}
let ALLCELLS = TABLETIME.querySelectorAll('.cellGrade')
let HTMLALLROWS = TABLETIME.querySelectorAll('.rowGrade')

//Atualizar BD
console.log(ipServer)
function updateTabela_Horarios (idRow){
    fetch(`http://${ipServer}:3000/api`,{
        method: "POST",
        body: JSON.stringify({
            row: ARRALLROWS[idRow-1] 
        }),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

//Atualizar Site


//Adicionar linha e célula **Quebrar função em outras funções
const appendRow = document.querySelector('.appendRow')
appendRow.addEventListener('click', ()=> {
    ROWS += 1
    let objCells = {}

    let creatingRow = document.createElement("tr")
    creatingRow.className = `rowGrade row${ROWS}`

    for(let i=0;i<ARRCLASSNAME.length;i++){
        OBJALLCELLS[`${ARRCLASSNAME[i]}${ROWS}`] = new Object()
        let objCell = OBJALLCELLS[`${ARRCLASSNAME[i]}${ROWS}`]
        objCells[`${ARRCLASSNAME[i]}`] = null
        objCell['valueInput'] = ''
        let creatingCell = document.createElement("td")
        let creatingInput = document.createElement("input")
        creatingInput.className = `cellGrade ${ARRCLASSNAME[i]} cellF${ROWS}`

        
        if(i==2 || i == 3){
            objCell['valueInput'] = '-'
            objCells[`${ARRCLASSNAME[i]}`] = null
            creatingInput.value = objCell['valueInput']
        }
        if(i==4){
            let zeroDate = new Date()
            zeroDate.setHours(0,0,0,0)
            objCell['valueInput'] = zeroDate
            objCells[`${ARRCLASSNAME[i]}`] = '00:00'
            creatingInput.value = formatTime(objCell['valueInput'])
        }
            

        creatingCell.appendChild(creatingInput)
        creatingRow.appendChild(creatingCell)
        appendListenerCell(creatingCell, i, ROWS)

        //console.log(OBJALLCELLS[`${ARRCLASSNAME[i]}${ROWS}`])

    }

    TABLETIME.appendChild(creatingRow)
    ALLCELLS = document.querySelectorAll('.cellGrade')
    HTMLALLROWS = document.querySelectorAll('.rowGrade')
    appendListenerRow(creatingRow)

    objCells["row"] = ROWS

    ARRALLROWS.push(objCells)
    
    updateTabela_Horarios(ROWS)
})

//Remover linha
const removeRow = document.querySelector('.removeRow')
removeRow.addEventListener('click', ()=> { 
      
    if(ROWS > 1){
        ROWS -= 1
        TABLETIME.removeChild(HTMLALLROWS[HTMLALLROWS.length-1])
        delete OBJALLROWS[`row${HTMLALLROWS.length}`]
    }

    ALLCELLS = TABLETIME.querySelectorAll('.cellGrade')
    HTMLALLROWS = TABLETIME.querySelectorAll('.rowGrade')
})

//Adicionar Listener na Linha Criada **
function appendListenerRow (createdRow){  

    let observer = new MutationObserver((e)=>{
        console.log(e)
    })

    //observer.observe(createdRow)
    /*
    OBJALLROWS[createdRow.classList[1]] = new Object()

    createdRow.addEventListener('click', ()=>{
        returnCellsOfRow(createdRow)          
    })

    OBJALLROWS[createdRow.classList[1]]['hasListener'] = true
    */
}

//Retornar valores da linha clicada **
function returnCellsOfRow(target){

    let allCellsFromTarget = [...target.children]

    let codRow = /\d+/g.exec(target.classList[1])[0]
    let valueOfAllCells = []

    allCellsFromTarget.forEach((cell) => {
        valueOfAllCells.push(cell.children[0].value)
                    
    })

    valueOfAllCells.push(`cellF${codRow}`)

    //console.log(valueOfAllCells)
    return valueOfAllCells
}

//Adicionar Listener nas Células Criadas
function appendListenerCell (createdCell, catCell, actualRow){
    
    //console.log(`actualRow:${actualRow} | catCell:${catCell}`)

    if(catCell < 3){
        let inputOfCell = createdCell.children[0]
        
        inputOfCell.addEventListener('blur', (e) => {
            if (catCell==1){
                console.log(e.target.value)
            } 

            transformingInputInDate(inputOfCell,ARRCLASSNAME[catCell], actualRow)
        })
        
    }

    if(catCell == 4){
        let inputOfCell = createdCell.children[0]
        inputOfCell.addEventListener
    }
}

//Formatar o Horário para o Usuário
function formatTime(objDate){
    let hours = objDate.getHours().toString().padStart(2,"0")
    let minutes = objDate.getMinutes().toString().padStart(2,"0")

    return `${hours}:${minutes}` 
}

//Transformar entrada do Input em objeto Date
function transformingInputInDate (inputOfCell, classOfInput, row){
    let inputValue = inputOfCell.value

    if(inputValue != ''){
        let stringValue = inputValue.toString()

        let hoursInput = stringValue.slice(0,2)
        let minutesInput = stringValue.slice(3,5)

        let objDateInput = new Date()
        objDateInput.setHours(hoursInput,minutesInput,0,0)
        
        OBJALLCELLS[`${classOfInput}${row}`].valueInput = objDateInput
    }
}

//Adicionando a última
function appendLastRow (){
    
}




