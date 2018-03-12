// https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-122.4241,37.78,14.25,0,60/600x600?access_token=your-access-token

var mapImg;

var str1="https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/77.220,28.615,11.4,0,0/";

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



function preload(){
  mapImg = loadImage(url);
}



function setup(){
  createCanvas(windowWidth,windowHeight);
  image(mapImg,offsetLeft,0);
}

function draw(){

}
