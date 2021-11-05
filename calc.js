
let display = document.querySelector('#resul')
let numeros  = document.querySelectorAll('[id*=tecla]')
let operadores  = document.querySelectorAll('[id*=opera]')

let novoNumero = true
let operador;
let numeroAnterior

const operadorPendente = () => operador != undefined

const calcular = () => {
    if(operadorPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'))
        console.log(numeroAtual)
        novoNumero = true
        if(operador == '+') {
            atualizarDisplay(numeroAnterior + numeroAtual)
        } else if (operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual)
        } else if (operador == 'x'){
            atualizarDisplay(numeroAnterior * numeroAtual)
        }else if (operador == '÷'){
            atualizarDisplay(numeroAnterior / numeroAtual)
        } else if(operador == '%'){
            atualizarDisplay(numeroAnterior % numeroAtual)
        }
    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR')
        console.log(display.textContent)
        novoNumero = false
    }else{
        display.textContent += texto.toLocaleString('BR');
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)



const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular()
        novoNumero = true
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'))
        console.log(numeroAnterior)
    }
}


numeros.forEach(numero => numero.addEventListener('click', inserirNumero)

)

const ativarIgual = () => {
    calcular()
    operador = undefined
}
document.getElementById('operaigua').addEventListener('click',ativarIgual)


const limparDisplay = () => display.textContent='0'
document.getElementById('limpar').addEventListener('click', limparDisplay)

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador))

const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay(display.textContent *-1)
}
document.getElementById('inverter').addEventListener('click', inverterSinal)


const existeDecimal = () => display.textContent.indexOf(',') != -1
const existeValor = () => display.textContent.length > 0


const inseriDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',')
        }else{
            atualizarDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click',inseriDecimal)

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2'
}  
const mapearTeclado = (evento) => {
    const tecla = evento.key
    
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1

    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click()    
}
document.addEventListener('keydown',mapearTeclado)
