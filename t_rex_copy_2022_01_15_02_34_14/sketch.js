//Establecer varaibles globales

//Diseñar estados de juego o GS
//Diseño estado play
 var PLAY = 1;
//Diseño estado end
 var END = 0;
//Diseño del GameState estado de juego
 var GS = PLAY;

//Diseño de objetos
 //Varaibles Trex
 var trex,trex_running, trex_collider;
 //Varaibles limites
 var edges;
 //Varaibles suelo y suelo invisible
 var suelo, sueloimg, sueloinv;
 //Varaiables nubes
 var nube, nubeimg;
 //Varaibles obstaculos
 var ob1,ob2,ob3,ob4,ob5,ob6;
 //Variable de puntacion
var score;
//Diseño de mensajes de Gameover y reset
var gameOver;
var gameOvering;
var restart;
var restarting;
//Establecer variables de efecto de sonido 3
var checkPoint;
var jump;
var die;

//Funcion para pre-cargar imagenes y sonidos
  function preload(){
    //Cargar imagen de Trex
    trex_running = loadAnimation("trex_1.png","trex_2.png","trex_3.png");
    //Caraga imagen de suelo
    sueloimg = loadImage("ground2.png");
    //Cargar imagen de nubes
    nubeimg = loadImage("cloud.png");
    //Cargar imagen de obstaculos
    ob1=loadImage("obstacle1.png");
    ob2=loadImage("obstacle2.png");
    ob3=loadImage("obstacle3.png");
    ob4=loadImage("obstacle4.png");
    ob5=loadImage("obstacle5.png");
    ob6=loadImage("obstacle6.png");
    //Cambio de imagen de trex
    trex_collider=loadAnimation("trex_collided-1.png")
    gameOvering=loadImage("gameOver.png");
    restartimg=loadImage("restart.png");
    
    //Cargar efectos de sonido
    checkPoint=loadSound("checkPoint.mp3");
    die=loadSound("die.mp3");
    jump=loadSound("jump.mp3");
    
  }

//Funcion de configuracion
  function setup(){
    //Diseño del area de juego
    createCanvas(600,200);
    
    //Diseño del trex
    trex = createSprite(50,160,50,50);
    //Agregar animacion de runner
    trex.addAnimation("imagen",trex_running);
    trex.addAnimation("animation",trex_collider);
    //Cambiar escala
    trex.scale = 0.07;
    
    //Diseño del suelo
    suelo = createSprite(200,180,400,20);
    //Agregar imagen al suelo
    suelo.addImage("suelo", sueloimg); 
    //Establecer aparicion del suelo en la pantalla
    suelo.x = suelo.width / 2;
    
    //Diseñar suelo invisible
    sueloinv = createSprite(200,190,400,10);
    //Establecer la propiedad invisible
    sueloinv.visible = false; 
    
    //Diseño gaem Over
    gameOver = createSprite(300,100,50,50);
    gameOver.addImage(gameOvering);
    gameOver.scale=0.5;
    restart = createSprite(300,140,50,50);
    restart.addImage(restartimg);
    restart.scale=0.5;
    //Establecer puntuacion inicial
    score = 0;
    
    
    //Establecer grupos de objetos para nubes y obstaculos
    obsGroup = new Group();
    nubesGroup = new Group();
    
    //IA juego bot
    trex.setCollider("rectangle",0,0,trex.width,trex.heigth);
       
  }

//Funcion de dibujo
  function draw(){
    //Fondo
    background("white");
       
    //Establecer GS estado de juego
if (GS === PLAY) {
    gameOver.visible = false;
    restart.visible= false;
    //Mover aqui la velocidad de suelo
      //Agregar velocidad al suelo
       suelo.velocityX = -(2 + score/100);
    if(score>500){
      background(0);
    }
       if(score>2000){
          background(1000);
          }
  
    //Establecer condicional para efecto de sonido 
  if(score>0&&score%100===0){
    checkPoint.play ();
    
  }
    
    //Establecer al pasar 100 puntos
  
    //Mover aqui conteo de puntos
     score = score + Math.round(frameCount/60);
  
    //Mover aqui puntuacion
    text("Puntuacion: "+ score,500,50);
  
    //Mover aqui ciclo de repeticion de suelo
    if(suelo.x<0){
      //Diseño proyeccion suelo 
      suelo.x = suelo.width / 2
    }
    //Mover aqui salto de trex
    if( touches.length>0||keyDown("space")&& trex.y>= height-100){
      //Establecer velocidad de salto
      trex.velocityY = -10;
      //Incluir efecto de sonido .play();
      jump.play();
      touches=[];
      }
  
    //Mover aqui efecto gravedad
    trex.velocityY = trex.velocityY + 0.9;
  
    //Mover aqui nubes nube_();
     nube_();
    //Mover aqui obstaculos obs();
     obs();
  
 //Establecer cambio de estado de juego GS
    if(obsGroup.isTouching(trex)){
      //trex.velocityY= -12;
      //jump.play();
     GS = END;
      //Agregar efecto de sonido .play();
      die.play();
    }
    
   }
     else if (GS === END){
         gameOver.visible = true;
         restart.visible = true;
    //Establecer aqui movimiento 0 del suelo
    suelo.velocityX = 0;
    trex.velocityY=0;
  trex.changeAnimation("animation",trex_collider);
    obsGroup.setLifetimeEach(-1);
    nubesGroup.setLifetimeEach(-1);
    //Establecer aqui velocidad 0 de las nubes y obstaculo
    obsGroup.setVelocityXEach(0);
    nubesGroup.setVelocityXEach(0);
   }
    if(mousePressedOver(restart)) {
      reset();
    }
    
    //Mensaje a la consola de la posicion Y
    console.log(trex.y);
    
    //Establecer posicion del trex sobre suelo invisible
    trex.collide(sueloinv);
    
    //Proyectar objetos y jugabilidad
    drawSprites();
  }

//Funcion que diseña las nubles
function nube_ () {
  //frameCount permite que aparesca obstaculos en determinados fotogrmas o movimieto de objetos
  if (frameCount % 60 === 0){
    //Se diseña las nubes
    nube = createSprite(600,100,30,30);
    //Animar nubes
    nube.addImage(nubeimg)
    //Determinar en que posicion aparice
    nube.y = Math.round (random(10,60))
    //Velocidad del desplazamiento nubes
    nube.velocityX=-7;
    //Cambiar escala de imagen
    nube.scale=0.5
    //Tiempo antes de destruir el objeto
    nube.lifetime = 200;
    //Capa en la que aparece el objeto
    nube.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //Agregar grupo de nubes
    nubesGroup.add(nube);
    
  }
}


//Funcion de diseño de obstaculos 
function obs () {
  //Con el if se establece donde aparece los obstaculos
  if(frameCount % 60 === 0){
    //Diseño de los obstaculos
    var obstaculo = createSprite(500,170,10,40);
    //Velocidad de los obstaculos
    //Modificar velocidad de los obstaculo (10 + score/100)
    
    obstaculo.velocityX = -(10 + score/100);
      
  //Switch codigo para presentar variadades de obstaculos
  var rand = Math.round(random(1,6));
  switch (rand) {
      case 1: obstaculo.addImage(ob1);
      break;
      case 2: obstaculo.addImage(ob2);
      break;
      case 3: obstaculo.addImage(ob3);
      break;
      case 4: obstaculo.addImage(ob4);
      break;
      case 5: obstaculo.addImage(ob5);
      break;
      case 6: obstaculo.addImage(ob6);
      break;
      //Fin de las opciones de imagen 
      default: break;      
  }
    //Cambiar escala 
    obstaculo.scale=0.5;
    //Cambiar profundidad de imagen
    obstaculo.depth = - 1;
    
    //Agregar grupo de objetos
    obsGroup.add(obstaculo);
    
}
}
  //Función de reinicio
  function reset(){
  GS=PLAY;
  gameOver.visible = false;
  trex.changeAnimation("imagen",trex_running);
  restart.visible = false
    obsGroup.destroyEach();
    nubesGroup.destroyEach();
    score=0;
  
}