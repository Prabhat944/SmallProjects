const display1EL=document.querySelector('.display-1');
const display2EL=document.querySelector('.display-2');
const numbersEL=document.querySelectorAll('.number');
const operationEL=document.querySelectorAll('.operation');
const equalEL=document.querySelector('.equal');
const clearAllEL=document.querySelector('.all-clear');
const clearLastEL=document.querySelector('.last-entity-clear');
const tempResultEL=document.querySelector('.tempResult');


let dis1Num='';
let dis2Num='';
let result=null;
let lastOperation='';
let haveDot=false;


//show input value to display2 and check if input has not more than 1 dot
numbersEL.forEach(number=>{
    number.addEventListener('click',(e)=>{
      if(e.target.innerText==='.' && !haveDot){
        haveDot=true;
      }else if(e.target.innerText==='.' && haveDot){
        return
      }
      dis2Num += e.target.innerText
      display2EL.innerHTML=dis2Num
    })
})

//if all input variable and operation are present then it calll mathOperation otherwise it make space for 2nd input
operationEL.forEach(operation=>{
    operation.addEventListener('click',(e)=>{
        if(!dis2Num)return
        haveDot=false;
        const operationName=e.target.innerText
        if(dis1Num && dis2Num && lastOperation){
            mathOperation();
        }else{
            result=parseFloat(dis2Num);
        }
        clearVar(operationName)
        lastOperation=operationName
    })
});

function clearVar(name=''){
    dis1Num+=dis2Num +' '+ name +' ';
    display1EL.innerText=dis1Num;
    display2EL.innerText='';
    dis2Num='';
    tempResultEL.innerText=result;
}

//operaion with result based on input 
function mathOperation(){
    if(lastOperation==='x'){
        result=parseFloat(result)*parseFloat(dis2Num);
    }else if(lastOperation==='+'){
        result=parseFloat(result)+parseFloat(dis2Num);
    }else if(lastOperation==='-'){
        result=parseFloat(result)-parseFloat(dis2Num);
    }else if(lastOperation==='/'){
        result=parseFloat(result)/parseFloat(dis2Num);
    }else if(lastOperation==='%'){
        result=parseFloat(result)%parseFloat(dis2Num);
    }
}

//if '=' is clicked then it perform operation
equalEL.addEventListener('click',()=>{
    if(!dis2Num || !dis1Num) return
    haveDot=false
    mathOperation()
    clearVar()
    display2EL.innerHTML=result
    tempResultEL.innerHTML=''
    dis2Num=result
    dis1Num=''
})

//to clear all variable and start from new
clearAllEL.addEventListener('click',()=>{
    dis1Num='',
    dis2Num='',
    display1EL.innerText=''
    display2EL.innerText=''
    result=''
    tempResultEL.innerText=''
})

//to clear last input
clearLastEL.addEventListener('click',()=>{
    display2EL.innerText=''
    dis2Num=''
})

//
window.addEventListener('keydown',(e)=>{
    if(e.key==='0'||
       e.key==='1'||
       e.key==='2'||
       e.key==='3'||
       e.key==='4'||
       e.key==='5'||
       e.key==='6'||
       e.key==='7'||
       e.key==='8'||
       e.key==='9'||
       e.key==='.'){
        clickButtonEL(e.key)
       }
       else if(
        e.key==='+'||
        e.key==='-'||
        e.key==='/'||
        e.key==='%'){
            clickOperation(e.key)
                }
        else if(e.key==='*'){
            clickOperation('x')
        }else if(e.key==='Enter' || e.key==='='){
            clickEqual()
        }
})

function clickButtonEL(key){
    numbersEL.forEach(button=>{
        if(button.innerText===key){
            button.click();
        }
    })
}
function clickOperation(key){
    operationEL.forEach(operation=>{
        if(operation.innerText===key){
            operation.click();
        }
    })
}

function clickEqual(){
    equalEL.click()
}
