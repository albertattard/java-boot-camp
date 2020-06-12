---
layout: default
title: Puzzle (huh?)
parent: Strings
grand_parent: Data Types
nav_order: 3
permalink: docs/data-types/strings/puzzle-huh
---

# Puzzle (huh?)

Is the following a valid program?  Easy right?

```java
\u0070\u0075\u0062\u006c\u0069\u0063\u0020\u0020\u0020\u0020
\u0063\u006c\u0061\u0073\u0073\u0020\u0055\u0067\u006c\u0079
\u007b\u0070\u0075\u0062\u006c\u0069\u0063\u0020\u0020\u0020
\u0020\u0020\u0020\u0020\u0073\u0074\u0061\u0074\u0069\u0063
\u0076\u006f\u0069\u0064\u0020\u006d\u0061\u0069\u006e\u0028
\u0053\u0074\u0072\u0069\u006e\u0067\u005b\u005d\u0020\u0020
\u0020\u0020\u0020\u0020\u0061\u0072\u0067\u0073\u0029\u007b
\u0053\u0079\u0073\u0074\u0065\u006d\u002e\u006f\u0075\u0074
\u002e\u0070\u0072\u0069\u006e\u0074\u006c\u006e\u0028\u0020
\u0022\u0048\u0065\u006c\u006c\u006f\u0020\u0077\u0022\u002b
\u0022\u006f\u0072\u006c\u0064\u0022\u0029\u003b\u007d\u007d
```

The above is equivalent to

```java
public
class Ugly
{public
    static
void main(
String[ ]
    args){
System.out
.println(
"Hello w"+
"orld");}}
```

This example was taken from [PUZZLE 17: HUH? in Java™ Puzzlers: Traps, Pitfalls, and Corner Cases](https://learning.oreilly.com/library/view/javatm-puzzlers-traps/032133678X/ch03.html).

"_The lesson of this puzzle is: Just because you can doesn't mean you should.  Alternatively, If it hurts when you do it, don't do it!  More seriously, this puzzle serves to reinforce the lessons of the previous three: Unicode escapes are essential when you need to insert characters that can't be represented in any other way into your program.  **Avoid them in all other cases**.  Unicode escapes reduce program clarity and increase the potential for bugs._"
