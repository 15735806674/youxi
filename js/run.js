window.onload=function(){
    var clientw=document.documentElement.clientWidth;
    var clienth=document.documentElement.clientHeight;
    var canvas=document.querySelector("canvas");
    canvas.width=clientw;
    canvas.height=clienth;
    var cobj=canvas.getContext("2d");
    var runs=document.querySelectorAll(".run");
    var jumps=document.querySelectorAll(".jump");
    var hinderImg=document.querySelectorAll(".hinder");
    var runA=document.querySelector(".runA");
    var zidanImg=document.querySelectorAll(".zidan");
    var zidanA=document.querySelector(".zidanA");
    var jumpA=document.querySelector(".jumpA");
    var dieA=document.querySelector(".dieA");
    var progress=document.querySelector(".progress1");
    var jifen=document.querySelector(".jifen");
    var gameObj=new game(canvas,cobj,runs,jumps,hinderImg,runA,zidanA,jumpA,dieA,progress,jifen,zidanImg);
    // 选项卡
    var start=$(".start");
    // 遮罩
    var mask=$(".mask");
    //开始按钮
    $(".ksyx").one("click",function(){
        gameObj.play(start,mask);

    })

   

}