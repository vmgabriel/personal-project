---
title: "Seguridad en Aplicaciones Web Modernas"
description: Cuando nos preocupamos en la seguridad de una pagina web moderna tenemos que tener en cuenta una cuentas como manejaremos las herramientas. Dentro de un micro-servicio describire como se manejaria este problema tipico en cualquier pagina web moderna y una aplicacion en general.
image: /images/post/auth.png
content_data: posts
tags:
  - passport
  - javascript
  - jwt
  - cookie
categories:
  - Diseño Web
  - Arquitectura Hexagonal
  - Micro-Servicios
date: 2020-05-27 19:02:10
---

# Seguridad en Apliaciones Web Moderna
Uno de los mayores problemas que se enfrenta el desarrollador web durante el dia a dia es el uso de aplicaciones modernas y escalables es la seguridad en la web y es que para nadie es un secreto que los problemas que en general este enfrenta es variado.

Debido a ello es necesario explicar claramente como podemos enfrentar con todo lo que nos ofrece las arquitecturas modernas y las librerias para adaptarnos a las herramientas, siendo mas comenzemos.

## JWT - JSON Web Token
Una de las herramientas modernas que nos ofrecen hoy en dia para la autenticacion entre micro-servicios, y es que JWT es una herramienta imprescidible cuando lo que queremos es consumir de un stack de micro-servicios.

### Que es JWT?
Es una herramienta moderna para que podamos insertar algunos datos para que cuando tu te comunicas con um micro-servicios muestres tu JWT, es como un pasaporte de acceso que alguien porque te identificaste correctemante. Te dan este acceso cuando te autenticas, caso cuando por lo general ingresas usuario y contraseña, este en general te devuelve un jwt, los progamadores modernos los programadores lo guardan en cada uno de los navegadores de cada uno de los usuarios que ingresaron nuestra app, es por ello que cuando usamos esta podemos usarlo con nuestro y no el de otra persona, este JWT generalemente tiene lo siguiente dentro

```javascript
const JWTDeencripted = {
  exp: 123456, 
  // Una Fecha de Expiracion donde el usuario
  // debera pedir un nuevo pasaporte para disfrutar el servio
  userId: "xxxxxxxxxxxxxxxxxxxxxxxx", // Id de Usuario que lo identifica en el sistema
  permission: ["perm1-create", "perm2-update", "perm3-delete"],
  // Permisos de acceso del usuario(depende de como se haga la estrategia de autorizacion)
  roleId: "zzzzzzzzzzzzzzzz", // Id del rol, por si algun sevicio lo requiera
  ... // En general son estos datos, pero es posible ingresar mas como por ejemplo IP
};
```

Con este pasaporte el usuario puede crear, editar o eliminar si tiene autorizacion para hacerlo.
Para que sea seguro se encripta con una constraseña privada dejando como resultado algo similar a:
```javascript
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
```
Podemos reconocer facilmente si es un JWT sabiendo que va a tener tres partes separadas por un punto.
Con esto lo unico que debemos hacer es verificar previamente cuando hacemos algun proceso si posee acesso o no, generalmente el acesso moderno se pone en una cookie segura que tenga HTTP-ONLY activado.

### Porque En Una Cookie?
Principalmente porque es horizontal para la aplicacion, sin embargo tambien tiene una ventaja adicional, se puede encriptar por segunda vez, entonces con ello tenemos una doble seguridad.

### Que Diferencias hay entre autorizar y autenticar?
Es simple, esto es debido a que cuando tu unicamente autenticasle das acceso total a todo lo que tiene tu aplicacion, pero, esto no es correcto, no quieres darle acceso de modificar el comportamiento de la aplicacion a un usuario comun, es debido a esto que cuadndo un usuario lanza una peticion HTTP a tus servicios el paso posterior es verificar si tiene permisos para realizar dicha accion. Es por esto que las estrategias de autorizacion varian entre aplicaciones y el de autenticacion es estandar.

<img src="/images/post/auth/search.png" alt="Verificacion de Acceso por Key" style="width:200px;"/>

### Hay Ademas Otras Estrategias para Autenticar?
Para autenticar puedes usar las herramientas que da AuthV2 para conectarte con google, twitter, facebook, gitlab, entre muchas otras opciones.

### Que es AuthV2?
![Acceso Por Usuario y Contraseña](/images/post/auth/authentication.png "Ingreso Por Usuario y Contraseña")

Es una estrategia de la que esperas que una aplicacion de terceros te de el acceso, nosotros normalmente vemos eso en aplicaciones que dice "Ingresa con Google o Amazon o ..." tu ingresas con tu usuario y contraseña de la plataforma web de tu gusto y cuando le das permiso de acceso esta manda un token correspondiente al permiso de acceso a la aplicacion, con esto podemos evitar muchos dolores de cabeza en apliaciones modernas.

![Autenticacion de Gitlab](/images/post/auth/gitlab-auth.png "Ejemplo de Autenticacion")

### Y la Estrategia Local?
Cuando hablo de una estrategia local me refiero al tipo ingrese usuario y contraseña de una pagina culquiera de la que tu conoces poca informacion. Ya creo que se esta entendiendo, no todas las personas confian en dar su informacion o otra pagina mas, es por ello que deben haber posibilidades de hacerlo con una de terceros.

### Conclusion
Para problemas modernos, soluciones modernas, la herramienta de JWT en una Cookie para Autorizar, un AuthV2 para autenticar es una manera muy practica y moderna que nos permite cubrir las dos necesidades referentes al control de permisos de un cliente de manera basica, si deseas leer como implemente estas estrategias en un lenguaje puedes ver [Session Micro-Servicio](https://gitlab.com/vmgabriel/daga-session "Link de implementacion de estrategias en un microservicio").
