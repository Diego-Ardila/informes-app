# Class Chat Kuepa Edutech

Proyecto Full Stack Realizado con React, Express, Socket.io y Mongo DB.

Para ejercer buenas practicas en el proyecto decidí usar variables de entorno las cuales especifico a continuacion para que se pueda correr la aplicacion sin problemas:

## Front end : 
Carpeta: .env
Variables: REACT_APP_SERVER_URL="http://localhost:8000"

## Back end :
Carpeta: .env.dev
Variables: SECRET_KEY = "SHHHHHHHH" => para crear el JWT
           PORT = 8000

## Instalacion del proyecto
Primero que todo debes iniciar tu base de datos desde la consola de mongod;

Para inicializar el proyecto, tienes que clonar este repositorio _https://github.com/Diego-Ardila/kuepa-test.git_
una vez lo tengas en local, por medio de la consola de comandos tienes que ubicarte primero que todo en el directorio _backend_, un vez ahi debes escribir el siguiente comando:
```
yarn start
```
despues de unos segundos se iniciara el servidor que correra en el puerto 8000 y se mostrara en la consola si la conexion con la base de datos fue exitosa.

Una vez este corriendo el servidor y este conectado con tu base de datos local de Mongo DB, podemos proceder con la inicializacion del Front end ubicandote nuevamente desde la console de comandos en el directorio _frontend_, una vez ahi debes escribir el comando:
```
yarn start
```

enseguida correra la aplicacion en tu navegador en el puerto _3000_; y podras empezar la interaccion con la aplicacion, que consta de 3 simples pasos: _creacion de usuario_ , _Login de un usuario creado_ y _clase virtual simulada con un video y chat interactivo_. las cuales estan claramente enrutadas en el Header de la aplicacion.

Muchas Gracias, quedo atento a cualquier inquietud.