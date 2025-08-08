const BASE_URL="https://v6.exchangerate-api.com/v6/7f222d4883cb4f9bf5457c5a/pair/";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");

const msg=document.querySelector(".msg");


const icon=document.querySelector(".dropdown i");


// for(x in countryList){
//     console.log(x,countryList[x]);
// }

for(let x of dropdowns){
    for(y in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=y;
        newoption.value=y;

        if(x.name==="from"  && y==="USD"){
            newoption.selected="selected";
        } 
        else if(x.name==="to"  && y==="INR"){
            newoption.selected="selected";
        }

        x.append(newoption);  
    }

    x.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}


const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let zz=element.parentElement.querySelector("img");
    zz.src=newsrc;
}



const updateexchangerate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    const url=`${BASE_URL}/${fromcurr.value}/${tocurr.value}`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data.conversion_rate;
    let finalamount=rate*amtval;

    msg.innerText=`${amtval}${fromcurr.value} = ${finalamount}${tocurr.value}`;
}


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updateexchangerate();
})


window.addEventListener("load", ()=>{
    updateexchangerate();
})


