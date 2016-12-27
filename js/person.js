//游戏
    function game(canvas,cobj,runs,jumps,hider,mask,zi){
        this.canvas=canvas;//前面是属性，后面是值
        this.cobj=cobj;
        this.runs=runs;
        this.jumps=jumps;
        this.hider=hider;
        this.mask=mask;
        this.zi=zi;
        this.person=new person(canvas,cobj,runs,jumps);//实例化一个人的对象，后面可以使用人的属性
        this.width=canvas.width;
        this.height=canvas.height;
        this.back=0;
        this.speed=8;
        this.hiderarr=[];
        this.score=0;
        this.isfire=false;
        this.zidan=new zidan(canvas,cobj,zi);
    }
    game.prototype={
        play:function(start,mask){
                mask.style.animation="mask1 2s ease forwards";
                start.style.animation="start1 2s ease forwards";
                // this.person.draw();
                this.run();
                this.key();
                this.mouse();
            },
            run:function(){
                var that=this;
                var num=0;
                // 在4-10s内出现一个阻碍物
                var step=(4+Math.ceil(6*Math.random()))*1000;
                 setInterval(function(){
                     // 监测时间，每次曾50，直到增到4000，就出现阻碍物
                     num+=50;
                   that.cobj.clearRect(0,0,that.width,that.height);
                     that.person.num++;
                     // 如果人的状态是跑，那么图片会一一出来
                     if(that.person.status=="runs"){
                         that.person.state=that.person.num % 5;
                         //num的余数是从0-5，那么就是state=0-5;就是从第一张图片到第六张图片
                     }else{
                         // 不是跑的状态的话，那么所有的状态都是第一张图片
                         that.person.state=0;
                     }
                     // 调出人的图片
                     that.person.draw();
                     // 让人移动的位置加上每0.5s移动的距离
                     that.person.x+=that.person.speedx;

              //调整角色位置

                     // 如果人的位置在画布宽的1/3的位置，就让人的位置在画布1/3的位置
                     if(that.person.x>that.width/3){
                         that.person.x=that.width/3;
                     }

                     // 放障碍物


                     // 判断是否增到4000
                     if(num%step==0) {//如果增到4s的时候，就在4-6s之间随机去一个数
                         step = (4 + Math.ceil(6 * Math.random())) * 1000;
                         //取完一个数之后再让num归0，再重新取
                         num = 0;
                         var hiderobj = new hider(that.canvas, that.cobj, that.hider);//实例化一个hider对象，可以使用hider属性
                         hiderobj.state = Math.floor(that.hider.length * Math.random());//随机从hider里面去一个下标
                         that.hiderarr.push(hiderobj);
                         //把实例化对象放到组里。
                         }
                         for (var i = 0; i < that.hiderarr.length; i++) {//遍历数组
                             that.hiderarr[i].x-=that.hiderarr[i].speedx;//让每一个阻碍物都向左移动，所以应减速。
                             // console.log(that.hiderarr[i].x)
                             // 调用阻碍物的图片
                             that.hiderarr[i].draw();
                             // 监测是否发生碰撞
                             if (hitPix(that.canvas, that.cobj, that.person, that.hiderarr[i])) {//调用碰撞这个对象
                                 //
                                 if (!that.hiderarr[i].flag){
                                     //调用xue(cobj,x,y);
                                     xue(that.cobj, that.person.x + that.person.width / 2, that.person.y + that.person.height / 2);
                                     that.person.life--;
                                     //人的生命力会减小

                                     if (that.person.life == 0) {//如果人的生命值为0的话，游戏结束
                                         // var messages=localStorage.messa9ges?JSON.parse(localStorage.messages):[];
                                         // var temp={name:that.name,score:that.score};
                                         // messages.push(temp);
                                         // messages.sort(function(a,b){
                                         //     return a.sorce<b.sorce;
                                         // });
                                         // if(messages.length>5){
                                         //     if(messages.length<5){
                                         //         messages.push(temp)
                                         //     }if(messages.length==5){
                                         //         messages.length-1=temp;
                                         //     }
                                         // }else if(messages.length==0){
                                         //     messages.push(temp);
                                         // }

                                         //
                                         // alert("game over");
                                         // //游戏重新加载
                                         // location.reload();
                                     }
                                     that.hiderarr[i].flag = true;
                                 }
                             }
                             if (that.hiderarr[i].x + that.hiderarr[i].width < that.person.x) {//如果人的位置大于阻碍物的位置与阻碍物的宽度
                                 if (!that.hiderarr[i].flag && !that.hiderarr[i].flag1) {
                                     that.score++;
                                     document.title = that.score;
                                     that.hiderarr[i].flag1 = true;

                                 }

                             }
                             //检测子弹与障碍物碰撞
                             if(hitPix(that.canvas,that.cobj,that.zidan,that.hiderarr[i])){
                                 if(!that.hiderarr[i].flag){

                                     that.score++;
                                     document.title=that.score;
                                     //障碍物消失
                                     that.hiderarr.splice(i,1);//截取哪一个，截取几个
                                 }
                             }
                         }

                         // 发射子弹
                     if(that.isfire){
                         that.zidan.speedx+=that.zidan.jia;
                         that.zidan.x+=that.zidan.speedx;
                         that.zidan.draw();
                     }
                     // 让背景一直向左运动，背景是一直减的
                     that.back-=that.speed;
                     that.canvas.style.backgroundPositionX=that.back+"px"; //然后就让背景x轴方向的位置为back的值
                 },50)
            },
            key:function(){
                var that=this;
                var flag=true;
                document.onkeydown=function(e){
                    that.person.status="jumps";
                    if(!flag){
                        return;
                    }
                    flag=false;
                    if(e.keyCode=="32"){
                    var inita=0;
                    var speeda=5;
                        var y=that.person.y;
                        var r=100;
                       var t=setInterval(function(){
                             inita+=speeda;
                            if(inita>=180){
                               that.person.y=y;
                               clearInterval(t);
                                flag=true;
                                that.person.status="runs";
                            }
                            var top=Math.sin(inita*Math.PI/180)*r;
                           that.person.y=y-top;
                        },30)
                   }
                }
            },
        mouse:function(){
             var that=this;
               this.mask.onclick=function(){
                   that.zidan.x=that.person.x+that.person.width/2;
                   that.zidan.y=that.person.y+that.person.height/2;
                   that.zidan.speedx=5;
                   that.isfire=true;
               }
        }
    }

//障碍物
function hider (canvas,cobj,hider){
    this.canvas=canvas;
    this.cobj=cobj;
    this.hider=hider;
    this.x=canvas.width-20;
    this.y=250;
    this.width=235;
    this.height=200;
    this.state=0;
    this.speedx=10;
}
hider.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.hider[this.state],0,0,700,700,0,0,this.width,this.height);
        this.cobj.restore();
    }
}

// 血
function lizi(cobj){
    this.cobj=cobj;
    this.x=200;
    this.y=300;
    this.r=1+2*Math.random();
    this.color="red";
    this.speedy=6*Math.random()-3;
    this.speedx=6*Math.random()-3;
    this.zhongli=0.3;
    this.speedr=0.1;
}
lizi.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.beginPath();
        this.cobj.translate(this.x,this.y);
        this.cobj.fillStyle=this.color;
        this.cobj.arc(0,0,this.r,0,2*Math.PI);
        this.cobj.fill();
        this.cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.speedy+=this.zhongli;
        this.r-=this.speedr;
    }
}
function xue(cobj,x,y){
var arr=[];
    for(var i=0;i<30;i++){
        var xu=new lizi(cobj);
        xu.x=x;
        xu.y=y;
        arr.push(xu);
    }
var t=setInterval(function(){
    for(var i=0;i<arr.length;i++){
        arr[i].draw();
        arr[i].update();
        if(arr[i].r<0){
            arr.splice(i,1);
        }
    }
    if(arr.length==0){
        clearInterval(t);
    }
},50)

}

// 发射子弹
function zidan(canvas,cobj,zi){
    this.canvas=canvas;
    this.cobj=cobj;
    this.zi=zi;
    this.x=0;
    this.y=0;
    this.width=30;
    this.height=30;
    this.speedx=5;
    this.jia=1;
}
zidan.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.zi,0,0,90,94,0,0,this.width,this.height);
        this.cobj.restore();
    }
}


//人物
function person(canvas,cobj,runs,jumps){
    this.canvas=canvas;
    this.cobj=cobj;
    this.runs=runs;
    this.jumps=jumps;
    this.x=0;
    this.y=230;
    this.width=65;
    this.height=85;
    this.status="runs";
    this.state=0;
    this.num=0;
    this.speedx=5;
    this.life=3;
}
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,65,85,0,0,this.width,this.height);
        this.cobj.restore();
    }

}






