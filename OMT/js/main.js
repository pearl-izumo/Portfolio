'use strict';
window.onload=function(){

  const place = [[],[]];
  for(let i=0; i<2; i++){
    const array = [0,1,2,3,4,5,6,7,8];
    for(let j=0; j<9; j++){
      let k = Math.floor(Math.random()*(9-j));
      place[i].push(array[k]);
      array.splice(k,1);
    }
  };

  const p1=document.getElementById("p1");
  const p2=document.getElementById("p2");
  const n_get=document.getElementById("n_get");
  const n_flip=document.getElementById("n_flip");
  const n_hint=document.getElementById("n_hint");
  const miss=document.getElementById("miss");
  const gb=document.getElementById("gb");
  const great=document.getElementById("great");
  const rea=document.getElementById("rea");
  const card = document.getElementsByClassName("card")
  const h1=document.getElementById("hint1");
  const h2=document.getElementById("hint2");
  const hinttext=document.getElementById("hinttext");
  const SB=document.getElementById("SB");
  const center=document.getElementById("center");
  const score=document.getElementById("score");
  const result=document.getElementById("result");
  const hundred=document.getElementById("hundred");
  const evaluation=document.getElementById("evaluation");
  const A=document.getElementById("A");
  const nswer=document.getElementById("nswer");
  const click_answer=document.getElementById("click_answer");
  const dir=document.getElementById("dir");
  const CP=document.getElementById("clear_page");


  for(let k=0; k<2; k++){
    for(let i=0; i<9; i++){
      const newDiv = document.createElement("div");
      newDiv.className = "card";
      newDiv.classList.add("back");
      newDiv.onclick = fliping;
      if(k==0){
        newDiv.number = place[0][i];
        p1.appendChild(newDiv);
      }
      else{
        newDiv.number = place[1][i]+9;
        p2.appendChild(newDiv);
      }
    }
  }

  h1.addEventListener("click",function(){
    if(!flipNow & !prev & hint>0){hint1();}
  },false);
  h2.addEventListener("click",function(){
    if(!flipNow & !prev & hint>0){hint2();}
  },false);
  document.getElementById("omt").addEventListener("click",function(){
    location.reload();},false);
  // document.getElementsByClassName("n5").addEventListener("click",function(){
  //   console.log("n5");},false);

  var prev,flipNow,answer;
  var get = 0;
  var flip = 0;
  var hint = 6;

  n_get.textContent = get;
  n_flip.textContent = flip;
  n_hint.textContent = hint;

  function fliping(c){
    var ct = c.target;
    if(flipNow||ct.className!="card back"){return;
    }else{
      if(ct.number<9){
        ct.style.backgroundImage = "url(image/picture"+(ct.number+1)+".png)";
      }else{ct.style.backgroundImage = "url(image/number"+(ct.number%9+1)+".png)";}
      ct.className = "card";
      if(prev == null){
        prev = ct;
      }else{
        if(prev.number%9==ct.number%9){
          get_great(ct);
          flipNow = setTimeout(function(){
            ct.classList.add("ok");
            prev.classList.add("ok");
            get+=1;
            n_get.textContent = get;
          },1500)
        }else{
          miss.textContent = "MISS"
          flipNow = setTimeout(function(){
            prev.classList.add("back");
            ct.classList.add("back");
            miss.textContent = "";
          },1500)
        }
        setTimeout(function(){
          flip+=1;
          n_flip.textContent = flip
          prev = null;
          if(get==9){clear();}
          flipNow = null;
        },1510) 
      }
    }
  }

  function get_great(c){
    var cn = (c.number)%9;
    gb.classList.add("n"+(cn+1));
    great.style.visibility = "visible";
    if(cn==6){rea.style.visibility = "visible"};
    if(cn==4){
      var n5 = document.getElementsByClassName("n5");
      n5[0].addEventListener("click", function(){answer = 1;},false);
    }
    setTimeout(function(){
      if(answer==null){
        gb.className = "greatbox";
        great.style.visibility = "hidden";
        rea.style.visibility = "hidden";
      }else{
        SB.classList.add("zoom1");
        erase();
        setTimeout(function(){
          SB.classList.add("zoom2");
          n5[0].classList.add("zoom2");
          great.classList.add("zoom2");
        },1000);
        setTimeout(function(){
          A.style.opacity = 1;
          great.style.opacity = 0;
        },2000)
        setTimeout(function(){
          nswer.style.zIndex = 1;
          n5[0].classList.add("color");
          SB.classList.add("white");
        },3000);
        setTimeout(function(){
          nswer.style.opacity = 0;
          A.style.opacity = 0;
          click_answer.style.opacity = 1;
          dir.style.visibility = "visible";
          CP.style.opacity = 1;
        },4800)
      }
    },1500);
  }

  const hintList1 = [[0,1,0,0,1,1,1,0,1],[1,1,0,1,0,1,0,0,0],[1,1,0,1,0,0,1,0,0]];
  const hintText1 = ["clothes:BLUE","inst:STRINGS","3×3:PINK"];
  const hintText2 = ["2n+FLIP","n^HINT","5n-GET"];
  const numberList = [9,0,64,12,21,37,7,29,25];
  var h1_push = 0;
  var h2_push = 0;

  function hint1(){
    hinttext.textContent = hintText1[h1_push%3];
    for(let i=0; i<9; i++){
      if(hintList1[h1_push%3][place[0][i]]){card[i].classList.add("flash");}
    }
    flipNow = setTimeout(function(){
        for(let i=0; i<9; i++){card[i].classList.remove("flash");}
        h1_push+=1;
        hint-=1;
        n_hint.textContent = hint;
        hinttext.textContent = "";
        flipNow = null;
    },2000);
  }
  function hint2(){
    hinttext.textContent = hintText2[h2_push%3];
    if(h2_push%3==0){
      for(let i=0; i<9; i++){
        if(numberList[place[1][i]]%2==flip%2){
          card[i+9].classList.add("flash");}
      }
    }else if(h2_push%3==1){
      if(hint==1){
        for(let i=0; i<9; i++){card[i+9].classList.add("flash");}
      }else if(hint==2){
        for(let i=0; i<9; i++){
          if(place[1][i]==0 || place[1][i]==1 || place[1][i]==2 || place[1][i]==8){card[i+9].classList.add("flash");}
        }
      }else if(hint==3){
        for(let i=0; i<9; i++){
          if(place[1][i]==1 || place[1][i]==2){card[i+9].classList.add("flash");}
        }
      }else{
        for(let i=0; i<9; i++){
          if(place[1][i]==1){card[i+9].classList.add("flash");}
        }
      }
    }else{
      for(let i=0; i<9; i++){
        if(numberList[place[1][i]]%5==(5-get%5)%5){card[i+9].classList.add("flash");}
      }
    }
    flipNow = setTimeout(function(){
      for(let i=0; i<9; i++){card[i+9].classList.remove("flash");}
      h2_push+=1;
      hint-=1;
      n_hint.textContent = hint;
      hinttext.textContent = "";
      flipNow = null;
    },2000);
  }

  function erase(){
    n_get.style.display = "none";
    n_flip.style.display = "none";
    n_hint.style.display = "none";
    document.getElementById("get").style.display = "none";
    document.getElementById("flip").style.display = "none";
    document.getElementById("hint").style.display = "none";
    center.style.display = "none";
  }

  function clear(){
    var rsl = Math.round(900/flip);
    SB.classList.add("zoom1");
    erase();
    center.style.display = "none";
    setTimeout(function(){
      SB.classList.add("zoom2");
    },1000);
    setTimeout(function(){
      score.textContent = "SCORE:";
      hundred.textContent = "/100";
    },2000);
    setTimeout(function(){
      result.textContent = String(rsl);
    },3000);
    setTimeout(function(){
      if(rsl==100){evaluation.textContent = "Perfect Clear!";
      }else if(rsl>=75){evaluation.textContent = "Excellent!";
      }else if(rsl>=50){evaluation.textContent = "Nice!";
      }else{evaluation.textContent = "Good!";}
    },4000);
    setTimeout(function(){
      if(rsl!=100){document.getElementById("omt").classList.add("flash");}},5000);
    setTimeout(function(){document.getElementById("omt").classList.remove("flash");},6000);
  }


};
