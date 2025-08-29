---
title: Python Funcional
description: El paradigma funcional explica formas de atacar un problema en la programacion con un enfasis dirigido a la inmutabilidad, el facil testeo, entre otras.
content_data: posts
tags: 
  - python
  - POO
  - funcional
  - contextos
image: /images/post/python-functional.png
altImage: Python Funcional
date: 2021-10-25 07:00:00
categories:
  - python
  - funcional
---

# Programacion Funcional en Python 1
La programacion funcional es un paradigma de desarrollo, una forma de atacar los problemas que enfrentamos dia a dia en el entorno de la tecnologia, y a su vez,  las pautas para que concertemos dentro de un equipo de desarrollo como vamos a atacar el problema que se nos presente viendo las ventajas que ofrece el paradigma funcional frente a otras como estructurada o orientada a objetos.

## Definiciones
A partir de la programacion funcional se ha logrado aportar al desarrollo un monton de ventajas que otros paradigmas ofrecerian pero con mayor complejidad, es por ello que este post se me hace vital no solo porque la forma de pensar con dicho paradigma es totalmente diferente a estructurado(EP) o Orientado a Objetos(OOP) de la que normalmente ya que la tendencias previas del mercado han ofrecido y solicitado para sus soluciones de software.

Es asi que aunque no muy viejo es la solucion mas apegada a las matematicas como forma de atacar el problema que tenemos al frente, y es con ello que encontramos que las funciones cobran una gran importancia, y es que se convierte en una moneda de cambio, a cada funcion le vamos a ofrecer otra funcion y las funciones en si se comportan como una variable, ahi es donde entra en la ecuacion python.

### Programacion Estructurada

```python
# Paradigma Estructurado
if __name__ == "__main__":
    a = int(input("Insert number 1: "))
    b = int(input("Insert number 2: "))
    c: int = 0
    
    if a < b:
        print("{A} is lower to {B}".format(A=a, B=b))
    else:
        print("{A} is greater or equal to {B}".format(A=a, B=b))
        
    c = a + b
    print("The Sum is {C}".format(C=c))
        
    for i in range(c):
        print("The Value {I} is lower than {C}".format(I=i, C=c))
```
En el Paradigma estructurado se observa la asignacion desde el inicio, el proceso en el punto medio asi como tambien un resultado esperado a partir de ciclos y condicionales, normalmente la forma de programar y ver el mundo es asi, sin embargo nosotros tenemos automatizado dicho proceso mental, asi que reducimos ese proceso y analizamos el proceso como una lista de la siguiente manera:

- Tomo Valor 1
- Tomo Valor 2
- Verifico quien es mayor de los dos
- imprimo quien es el mayor
- sumo los dos valores en uno nuevo
- imprimo la suma de los dos numeros
- itero el valor de los dos sumados
- por cada iteracion imprimo el numero y digo que es menor

Como se puede observar en la lista funciona como un pseudocodigo, normalmente las personas analizamos nuestras tareas de rutina diarios y con ello atacamos el problema sin importar que, sin embargo muchas veces cuando el codigo es mas largo(que en programacion estructurada es muy facil llegar allá), empezamos a tener problemas como desarrolladores a leerlo y en ultimas mantenerlo, otro de esos tipicos problemas que posee el desarrollo con este paradigma es lo dificil que es testear y optimizar.


## Programacion Orientada a Objetos

Cuando vemos las dificultades resultantes que posee la programacion estructura que puede tender a la programacion spaghetti se buscaron formas para que programar no sea algo que genere sufrimiento y que pueda conllevar a un codigo mas facil de ser trabajado a futuro, adaptable ante nuevas mejoras y capaz de generar segmentos de codigo con la capacidad de ser usados en otros proyectos.


```python
class Input:
  val: int = None
  def get_int(self, message: str) -> int:
    try:
      self.val = int(input(message))
      return self.val
    except:
      raise Exception("Not Valid Input")

class Sum:
  res: int = None
  def execute(self, *args: list[int]) -> int:
    res = sum(args)
    return res

class Comparator:
  vals: list[int] = []
  def __init__(self, *args):
    self.vals = args
  
  def compare(self, is_minor: bool = True) -> tuple[int, list[int]]:
    result: tuple[int, list[int]] = ...
    compared = sorted(self.vals)
    if is_minor:
      result = (compared[0], compared[1:])
    else:
      result = (compared[-1], compared[:-1])
    return result

```

## Programacion Funcional
Todos los demas paradigmas aunque no parezca cierto son un poco mas modernos y son construidos con el objetivo de solucionar los problemas que aquejaban al presente por el cual fue construido, sin embargo, con el tiempo cada uno de los paradigmas presentaban dificultades a la hora de avanzar(eso no indica que no se usen o se hayan perdido en el tiempo, cada paradigma bien usado es bueno ya que atacara la solucion). La programacion funcional en si misma guarda la esencia de las matematicas y la logica en si que son la base de las construcciones de todos los lenguajes de programacion por si mismo pueden llegar a ser complicados o en parte situacionales.

Cuando se trabaja con la programacion funcional el objetivo en si es el uso de procesos sin necesidad de llegar a la repeticion, es por eso que las matematicas y la logica son cada vez mas participes.


```python
def input(msg: str) -> str:
    return input(msg)


det to_int(val: str) -> int:
    return int(val)

def sum(*args) -> int:
    """Recursive process this use the same function"""
    head, *rest = args
    if not rest:
       return head
    return head + sum(*rest)


def comparator(to_compare: list[int], proc: list[int]) -> list[list[int], list[int]]:
    head, *rest = to_compare
    if hot rest:
       return head, []
    return comparator(sorted(rest), [head])

```

La caracteristica que tiene es que las funciones funcionan por si mismas, el uso de las funciones es la principal caracteristicas y a su vez hay funciones que tienen de otras funciones, eso normalmente se le conoce como curry.


Python es un lenguaje multiparadigma eso quiere decir que la disponibilidad de paradigma la escoge el equipo de desarrollo/desarrollador teniendo la posiblidad de evaluar los alcances y limitaciones de cada uno de estos paradigmas. Esta caracteristica ademas de varias otras permitiran acceder a todo el poder que tiene la tecnologia a nivel funcional.