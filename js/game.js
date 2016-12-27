window.onload=function(){
    var clientw=document.documentElement.clientWidth;
    var clienth=document.documentElement.clientHeight;
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    canvas.width=clientw;
    canvas.height=clienth;
    var runs=document.querySelectorAll(".run");
    var jumps=document.querySelectorAll(".jump");
    var btn=document.querySelector(".btn");
    var start=document.querySelector(".start") ;
    var mask=document.querySelector(".mask");
    var hider=document.querySelectorAll(".hider");
    var zi=document.querySelector(".zi")
    var gameObj=new game(canvas,cobj,runs,jumps,hider,mask,zi);
    btn.onclick=function(){
       gameObj.play(start,mask);
        btn.onclick=null;
    }

}