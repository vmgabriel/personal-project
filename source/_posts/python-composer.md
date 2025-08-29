---
title: Python Funcional 2 - El Compositor de Funciones
description: La programacion funcional aprovecha varias situaciones que a lo largo del paradigma nos encontramos de manera frecuente, una de ellas es la situacion en la que tenemos varias funciones y usaramos estas para generar una secuencia de funciones para crear una nueva funcion.
content_data: posts
tags: 
  - python
  - patrones
  - funcional
image: /images/post/python-functional.png
altImage: Python Funcional
date: 2022-28-08 14:00:00
categories:
  - python
  - funcional
---

Hola de nuevo, les cuento que ya un rato programando en programacion funcional me he encontrado varios comportamientos frecuentes a la hora de usar este paradigma, uno de ellos es a la hora de construir varias funciones y que con estas generar una nueva que contenga un comportamiento especifico, recordemos que una de las caracteristicas que permite trabajar con programacion funcional es usar [currying](https://en.wikipedia.org/wiki/Currying "currying wikipedia").

```python
from typing import Callable
def currying(x: int) -> Callable:
    def other_function(y: int) -> int:
        return x + y
    return other_function


various_currying = lambda x: lambda y: lambda z: x + y + z

currying(1)(1) # 2
various_currying(1)(1)(1) # 3
```
Ese ejemplo que observamos detalla una situacion tipica de currying ya que este tipo de funciones con parametros claros y generalmente solo uno dan la posibilidad de ser usados en otras funciones y que incluso tambien puedan ser consideradas funciones de alto orden en el caso que sean completamente abstractas, otra de esas ventajas que tiene este tipo de funciones es lo facil de testearse; sin embargo, no todo lo que vemos es ventaja, esto tambien tiene desventajas como la legibilidad vaga.

Cuando tenemos un monton de funciones que ya estan separadas, se entiende funcionamiento y comportamiento sin que tenga finales inesperados, se pueden llegar a encajar como si fueran piezas de lego generando otra clase de funciones, y es ahi donde entra esta funcion de utilidad que convierte un monton de funciones en una sola mas legile.

```python
from typing import Callable
from functools import reduce
def compose(*functions: list[Callable]) -> Callable:
    return reduce(
        lambda f, g: lambda x: g(f(x)),
        functions,
        lambda x: x
    )

def sum(x):
    return lambda y: x + y

def mult(x):
    return lambda y: y * x

def pot(m):
    return lambda y: y ** m

def send_number(n: int) -> int:
    print("sended - ", n)
    return n

compose(
    sum(1),
    mult(2),
    pot(2),
    send_number,
)(3)
```

Aprovechando que las funciones son claras y consisas podemos convertir lo que podria ser una linea inmensamente larga y poco legible en una herramienta poderosa y rapida de entender donde podemos observar todas esas ventajas que trae la programacion funcional, esto sin perder ventajas como lo son lo facil que puede llegar a ser testear.

La funcion compose puede convertirse facilmente en otra funcion con un nombre diferente y capaz de ser usada y testeada de una manera practica.
```python
operate: Callable = compose(
    sum(1),
    mult(2),
    pot(2),
    send_number,
)

operate(3)
```
Las ventajas son varias, sabes en este ejemplo que suma, multiplica, potencia y luego envia el numero, sin que ninguna de estas tengan que interceder una con otra en cuestion a logica.
Este es un pequeño dato que queria dejarles y que me parece una de las herramientas mas poderosas que puede tener la programacion funcional.