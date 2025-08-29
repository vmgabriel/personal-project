
---
title: Investigacion Arduino en Ambientes Teoricos
description: El uso de archlinux como distribucion kernel linux favorita en entornos de desarrollo genera ciertas ventajas y desventajas, una de las posibles mejoras que puede tener archlinux es el trabajo como el circuito libre arduino para proyecto de IOT, explico como es su funcionamiento y como abordar el problema que tiene archlinux como la compatibilidad con arduino.
content_data: posts
image: /images/post/arduino.png
tags: 
  - arduino
  - archlinux
  - linux
date: 2020-04-19 08:59:10
categories:
  - iot
  - linux
---
Bienvenidos de nuevo a un blog enfocado a ayudar y mejorar a todos aquellos que van a hacer practicas, en este caso arduino, todos sabemos la posibilidad que se tiene cuando se inicia un proyecto, en este caso podremos tener una guia donde explicaremos como lo hice y que cosas pude haber encontrado en cada uno de los proyectos y miniproyectos dados, como es de esperarse no siempre funcionan las cosas como uno quiere ni a la primera ni mucho menos en algunos casos que se hace evidente que estamos haciendo las cosas correctamente.

Con todo ello, mi objetivo es servir de guia y ser estudiante para cada una de los miniproyectos dados en cada uno, el caso es retroalimentar y mejorar constantemente.

Con respecto a este post mi objetivo es explicar que problemas en lo mas basico que puede llegar a resultar tener un arduino,en mi caso arduino Leonardo:

![Arduino Leonardo Imagen](https://gitlab.com/vmgabriel/img-public/-/raw/master/webpage/arduino0/ARDUINO_LEONARDO_01-min.png "Arduino Leonardo")

Documentacion Oficial Aqui [Arduino Leonardo - Oficial](https://www.arduino.cc/en/Main/Arduino_BoardLeonardo "Pagina Oficial Arduino") donde podremos guiarnos facilmente trabajando en conjunto para obtener una ventaja a nivel tecnico de la forma de usoy sus caracteristicas.

Lo facil es comprarlo, se puede hacer en lugares de electronica, cuestan alrededor de $27000 COP este generalmente viene en un empaque tipico de circuitos electronicos de medianos a grandes que esta enfocado en proteger contra estatica, **En lo Personal creeria que no hay que botarlos y al abrirlo tener el maximo cuidado para preservar nuestro componente electronico como tambien nuestra bolsa que servira para proteger el circuito para posteriores armados**, y tambien nos da un cable que podemos conectarlo a nuestro computador desde un puerto USB,estetambien nos brinda energia para hacer los testeos desde muy cerca del computador.

Luego de comprar el componente es hora de programarlo, arduino posee un IDE especialmente hecho para este, sin embargo por ahi podemos buscar otros si no nos gusta este, por sencillez use ese mismo, el IDE se puede descargar desde la [Pagina de Descarga Arduino IDE](https://www.arduino.cc/en/Main/Software "Descargar IDE Arduino") con el cual depende del Sistema Operativo que nosotros tengamos.

### Instalacion con Arch Linux

![Arch Linux Logo](https://gitlab.com/vmgabriel/img-public/-/raw/master/webpage/arduino0/archlinux-icon-crystal-64-svg-min.png "Arch-Linux Logo")

Arch Linux era una distribucion de GNU/LINUX construidos de forma independiente con la filosofia "Rolling Release", pero eso es harina de otro costal, una de las cosas que se complicaron en la instalacion fue haber instalado desde el paquete oficial que tiene archlinux [Wiki Oficial Arduino de ArchLinux](https://wiki.archlinux.org/index.php/Arduino "Wiki Arduino ArchLinux") desde aqui se puede obtener como es debido informacion acerca de la instalacion, sin embargo, con este tenia muchos problemas asi que lo mejor es descargarlo desde la pagina oficial [Instalador Oficial Ardino](https://www.arduino.cc/download_handler.php?f=/arduino-1.8.7-linux64.tar.xz "Instalador ArchLinux Arduino") , este nos deja una serie de archivos que son necesarios para entender al momento de descomprimir:

![Archivos de Arduino](https://gitlab.com/vmgabriel/img-public/-/raw/master/webpage/arduino0/arduino0-archivos-min.png "Archivos de Arduino")

Asi como tambien se puede ver de la siguiente manera:

![Archivos de Arduino](https://gitlab.com/vmgabriel/img-public/-/raw/master/webpage/arduino0/arduino0-archivos1-min.png "Archivos de Arduino")

Como podemos evidenciar tenemos los siguientes archivos:

- arduino
- arduino-linux-setup.sh
- arduino-builder
- install.sh
- uninstall.sh
- revision.txt
- examples/
- hardware/
- java/
- lib/
- libraries/
- reference/
- tools/
- tools-builder/

Si falta alguno cuando descompriman seguro que cuando hagan el proceso de instalacion seguro aparecera, en general lo unico que seguro necesitamos es darle permisos a ciertos procesos que debemos tener cargados y autorizados para enviar al arduino los cuales son **uucp** y **lock** con ambos debemos agregarnos al grupo para ejecutarlo y tambien cargar **cdc_acm** para el correcto funcionamiento.

Con ello podemos hacer lo siguiente para que funcione:

```bash
sudo su
#Escribir aqui la contraseña se superUsuario
gpasswd -a $USER uucp
gpasswd -a $USER lock
```

Esto funciona correctamente, el problema es al usar el editor predeterminado de arduino **Arduino IDE**.

![Arduino IDE](https://onewindows.es/wp-content/uploads/2016/11/arduino-IDE.png "Imagen Arduino IDE")

ya que el repositorio de usuarios de archlinux no oficial **AUR** tiene una version de arduino [Instalador AUR de ARDUINO IDE](https://aur.archlinux.org/packages/arduide-git/ "Arduino IDE AUR"), sin embargo por mas que intente no funciono, por eso decargamos en la pagina oficial.

Con el paquete descargado de forma oficial podemos ejecutar un archivo directamente, *arduino* solo que hay que darle permisos, de paso hay un archivo de configuracion que podemos ejecutar antes que todo que arrancara las ejecuciones asi como tambien podemos tener todo listo para un reinicio ademas, porque no, lo instalamos.

```bash
./arduino-linux-setup.sh $USER
#******* Add User to dialout,tty, uucp, plugdev groups *******
#[sudo] password for $USER:
#usermod: el grupo «dialout» no existe
#groupadd: el grupo «plugdev» ya existe
#******* Removing modem manager *******
#sudo: apt-get: command not found
#Restarting udev
#sudo: service: command not found
#*********** Please Reboot your system ************
./install.sh
#Adding desktop shortcut, menu item and file associations for Arduino IDE... done!
```

Como es evidente quien hizo los scripts no los hizo para archlinux, tenia que ser usuario de Ubuntu y alelos, sin embargo no importa funciona y funciona correctamente, tambien si notamos tambien nos dice que REINICIEMOS, eso es algo que debemos acatar asi que luego de todo esto procedemos a reiniciar y listo, ya esta para su uso.

Como podemos notar no es una instalacion tipica de ArchLinux, por eso es util tener esta informacion.

Por ahora con esto seguiremos con el primer mini-proyecto, prender un LED, con eso probaremos todo.
