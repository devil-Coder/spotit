//Map Variables
var mapImg;
var str1="https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/79.141,12.929,12.1,0,0/";
var str2="?access_token=pk.eyJ1Ijoic2FoaWwzdmVkaSIsImEiOiJjamVuNnRjdGE0eWs5MnFxZWI3N2xoYWNjIn0.PY9MmJ3PuaUJvnWVK_NaDA";
var h=screen.height;
if(h>1280){
  h=1280;
  h=h-50;
}
var w=screen.width;
if(w>1280){
  w=1280;
}
var x="x";
var url=str1.concat(w,x,h,str2);
var offsetLeft;
if(screen.width>1280){
  offsetLeft=(screen.width-1280)/2;
}

//Mapping Variables
var lat=12.9718;
var long=79.1589;


function preload(){
  mapImg = loadImage(url);
}



function setup(){
  createCanvas(windowWidth,windowHeight);
  image(mapImg,offsetLeft,0);
}

function draw(){

}
