function expand(ddd){
    document.getElementById(`mainp${ddd.slice(3,)}`).innerHTML=dd[ddd.slice(3,)-1]+" "+"<a id="+`lse${ddd.slice(3,)} onclick='dexpand(id)'`+">Read Less...</a>"
}
function dexpand(dde){
    document.getElementById(`mainp${dde.slice(3,)}`).innerHTML=dd[dde.slice(3,)-1].slice(0,200)+" "+"<a id="+`mre${dde.slice(3,)} onclick='expand(id)'`+">Read More...</a>"
}
i=1;
dd=[]
for(i=1;i<=my_djng_var;i++){
a=document.getElementById(`mainp${i}`).innerHTML
dd.push(a);
d=a.length
if(d>200){
    document.getElementById(`mainp${i}`).innerHTML=a.slice(0,200)+ " " +"<a id="+`mre${i} onclick='expand(id)'`+">Read More...</a>"
}
}

ccc=document.getElementsByClassName('gtd')[0].id;
console.log(ccc);
if(ccc=='fte'){
    document.getElementById(ccc).innerHTML='Show my notes only';
    document.getElementById(ccc).href='notefilt';
}
else{
    document.getElementById(ccc).innerHTML='Go back';
    document.getElementById(ccc).href='notefitback';
}
