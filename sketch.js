// Variables generales
var PLAY=1;
var END=0;
var gameState = PLAY;
var Limon,Limon_Salto,Limon_Chocar,Limon_Caminar;
var Suelo,gSuelo,Sueloinvisible;
var Fondo;
var Obstaculo2,Obstaculo3;
var Sol, Luna, Nubes, Sol1;
var Estrella1,Estrella;
var Obstaculo;
var Choque,Salto,Estrella;
var score=0;
var Grupo_Obstaculo;
var Grupo_Cielo;
var Grupo_Premio;
var Perder1, Perder;
var Reinicio1, Reinicio;


function preload(){
    Limon_Salto = loadImage("Salto.png");
    Limon_Chocar = loadImage("Chocar.png");
    Limon_Caminar = loadImage("perso.png");

    gSuelo = loadImage("Suuelo.png");

    Fondo = loadImage("Fondo.png");

    Obstaculo2 = loadImage("Obstaculo_2.png");
    Obstaculo3 = loadImage("Obstaculo_3.png");

    Sol = loadImage("Sol.png");
    Luna = loadImage("Luna.png");
    Nubes = loadImage("Nubesitas.png");

    Estrella1 = loadImage("Estrella.png");

    Choque = loadSound("Sonido Choque.mp3");
    Salto = loadSound("Sonido Salto.mp3");
    Estrella = loadSound("Sonido Estrella.mp3");
  
    Perder = loadImage("Perder.webp");

    Reinicio = loadImage("Boton_reinicio.png.png");




}

function setup(){

 Suelo = createSprite(304,385,500,10);
 Suelo.addImage(gSuelo);
 Suelo.scale=.1

 Sueloinvisible = createSprite(50,382,50,15);
 Sueloinvisible.visible = false;
  
 Limon= createSprite(30,150,11,21);
 Limon.addImage(Limon_Salto); 
 Limon.addImage(Limon_Chocar);
 Limon.addImage(Limon_Caminar);
 Limon.scale=0.18;

 Perder1 = createSprite(400,200,100,100);
 Perder1.addImage(Perder);
 Perder1.scale=0.6;
 Perder1.visible = false;

 Reinicio1 = createSprite(400,312,100,100);
 Reinicio1.addImage(Reinicio);
 Reinicio1.scale=0.1;
 Reinicio1.visible = false;


  Grupo_Obstaculo=createGroup();
  Grupo_Cielo=createGroup();
  Grupo_Premio=createGroup();



}

function draw(){
createCanvas(800,400);
background(Fondo);
drawSprites();

Suelo.velocityX=-3;

if (Suelo.x < 200){
  Suelo.x = Suelo.x + 290;
}

fill("white"); 
textSize(17);
text("Score: " + score, 725, 15);

if(gameState == PLAY){

if(keyDown("w")&& Limon.y>=350){
  Limon.velocityY= -10;
  Limon.changeImage(Limon_Salto);
}
if(Limon.isTouching(Grupo_Premio,Ganados)){
  score = score+2;
}


if(Limon.isTouching(Grupo_Obstaculo)){
  gameState = END;
}

Premio();
Obstaculos();
Cielo();
}

 else if(gameState == END){
   Suelo.velocityX=0;
   Perder1.visible = true;
   Reinicio1.visible = true;
   //Limon.changeImage(Limon_Chocar);

   Grupo_Obstaculo.setLifetimeEach(-1);
   Grupo_Cielo.setLifetimeEach(-1);
   Grupo_Premio.setLifetimeEach(-1);

   Grupo_Obstaculo.setVelocityXEach(0);
   Grupo_Cielo.setVelocityXEach(0);
   Grupo_Premio.setVelocityXEach(0);

   if (mousePressedOver(Reinicio1)){
    Reiniciar();
   }

 }
  //Gravedad
 Limon.velocityY = Limon.velocityY + 0.4;

 Limon.collide(Sueloinvisible);
 

}

function Obstaculos(){
  if(frameCount % 80 == 0){
    Obstaculo = createSprite(600,350,10,40);
    Obstaculo.velocityX= -3;
    Obstaculo.scale=0.2;

   var uno = Math.round(random(1,2));

    switch(uno){
      case 1: Obstaculo.addImage(Obstaculo2);
      break;
      case 2: Obstaculo.addImage(Obstaculo3);
      break;
      default: break;
    }
    Obstaculo.scale=0.5;
    Obstaculo.lifetime=230;

    Grupo_Obstaculo.add(Obstaculo);
}
}

function Cielo(){
  if(frameCount % 60 == 0 ){
  Sol1 = createSprite(550,30,20,20);
  Sol1.y = Math.round(random(15,70));
  Sol1.velocityX= -3;
  
  
   var uno = Math.round(random(1,3));
   
    switch(uno){
      case 1 : Sol1.addImage(Sol);
      break;
      case 2 : Sol1.addImage(Luna);
      break;
      case 3 : Sol1.addImage(Nubes);
      break;
      default: break;
     }
     Sol1.scale=0.2;
     Sol1.lifetime=230;

     Grupo_Cielo.add(Sol1);

   }
}

function Premio(){
  if(frameCount % 120 == 0){
 Estrella = createSprite(600,285,20,20);
  Estrella.addImage(Estrella1);
   Estrella.velocityX= -3;
   Estrella.scale=0.4;
   Estrella.lifetime=230;
   Estrella.depth = Obstaculo.depth;
   Estrella.depth+=1;

   Grupo_Premio.add(Estrella);
  }
}

function Ganados(sprite,Grupo_Premio){
  Grupo_Premio.remove();
}

function Reiniciar(){
  gameState = PLAY;
  Perder1.visible = false;
  Reinicio1.visible = false;
  Grupo_Premio.destroyEach();
  Grupo_Obstaculo.destroyEach();
  Grupo_Cielo.destroyEach();
}


  