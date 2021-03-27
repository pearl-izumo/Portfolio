"use strict";
{
  const RS = document.getElementById("r_square")
  const GS = document.getElementById("g_square")
  const BS = document.getElementById("b_square")
  var L = [["R","G","B"],["iddle","ame","log"],["r_square","g_square","b_square"]]
  var L2 = [["click_riddle","click_game","click_blog"],["r_line","g_line","b_line"],["r_line2","g_line2","b_line2"]]
  var L3 = ["r_direction","g_direction","b_direction"]
  var status = 0

  RS.addEventListener("click", ()=>{
    if (RS.style.zIndex==10){RS.style.zIndex = 0;
    }else{RS.style.zIndex = 10;}
    GS.style.zIndex = 1
    BS.style.zIndex = 2
    for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
        if(status!=1){
          if(j!=0){
            document.getElementById(L[i][j]).style.opacity = 0.5;
            document.getElementById(L2[i][j]).style.opacity = 0;
            document.getElementById(L3[j]).style.visibility = "hidden";
          }else if(i==2){
            document.getElementById(L[i][j]).style.opacity = 1;
            document.getElementById(L2[i][j]).style.opacity = 1;
          }else{
            document.getElementById(L[i][j]).style.opacity = 0;
            document.getElementById(L2[i][j]).style.opacity = 1;
            document.getElementById(L3[j]).style.visibility = "visible";}
        }else{
          document.getElementById(L[i][j]).style.opacity = 1;
          document.getElementById(L2[i][j]).style.opacity = 0;
          document.getElementById(L3[j]).style.visibility = "hidden";}}}
    if(status==1){status = 0;
    }else{status = 1;}
  });

  GS.addEventListener("click", ()=>{
    RS.style.zIndex = 0
    if (GS.style.zIndex==10){GS.style.zIndex = 1;
    }else{GS.style.zIndex = 10;}
    BS.style.zIndex = 2
    for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
        if(status!=2){
          if(j!=1){
            document.getElementById(L[i][j]).style.opacity = 0.5;
            document.getElementById(L2[i][j]).style.opacity = 0;
            document.getElementById(L3[j]).style.visibility = "hidden";
          }else if(i==2){
            document.getElementById(L[i][j]).style.opacity = 1;
            document.getElementById(L2[i][j]).style.opacity = 1;
          }else{
            document.getElementById(L[i][j]).style.opacity = 0;
            document.getElementById(L2[i][j]).style.opacity = 1;
            document.getElementById(L3[j]).style.visibility = "visible"}
        }else{
          document.getElementById(L[i][j]).style.opacity = 1;
          document.getElementById(L2[i][j]).style.opacity = 0;
          document.getElementById(L3[j]).style.visibility = "hidden"}}}
    if(status==2){status = 0;
    }else{status = 2;}
  });

  BS.addEventListener("click", ()=>{
    RS.style.zIndex = 0
    GS.style.zIndex = 1
    if (BS.style.zIndex==10){BS.style.zIndex = 2;
    }else{BS.style.zIndex = 10;}
    for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
        if(status!=3){
          if(j!=2){
            document.getElementById(L[i][j]).style.opacity = 0.5;
            document.getElementById(L2[i][j]).style.opacity = 0;
            document.getElementById(L3[j]).style.visibility = "hidden";
          }else if(i==2){
            document.getElementById(L[i][j]).style.opacity = 1;
            document.getElementById(L2[i][j]).style.opacity = 1;
          }else{
            document.getElementById(L[i][j]).style.opacity = 0;
            document.getElementById(L2[i][j]).style.opacity = 1;
            document.getElementById(L3[j]).style.visibility = "visible";}
        }else{
          document.getElementById(L[i][j]).style.opacity = 1;
          document.getElementById(L2[i][j]).style.opacity = 0;
          document.getElementById(L3[j]).style.visibility = "hidden";}}}
    if(status==3){status = 0;
    }else{status = 3;}
  });
  
  document.getElementById("r_direction").addEventListener("click", ()=>{
    document.getElementById("check").textContent = "xxx";
  });
  document.getElementById("g_direction").addEventListener("click", ()=>{
    document.getElementById("check").textContent = "yyy";
  });
  document.getElementById("b_direction").addEventListener("click", ()=>{
    document.getElementById("check").textContent = "zzz";
  });
}
