## Streams

{% include custom/note.html details="This section is about the data sequence concept, not about IO streams, such as reading-from/writing-to files." %}
 
Java 8 introduced streams, which can ve visualised as a pipeline through which data can pass through.

![Pipeline](https://www.ekathimerini.com/resources/2020-06/05s10energ-thumb-large-thumb-large-thumb-large.jpg)
([Reference](https://www.ekathimerini.com/resources/2020-06/05s10energ-thumb-large-thumb-large-thumb-large.jpg))

Streams comprise three parts.

1. Source
1. A number of Intermediate Operations
1. A Terminal Operation 

![Stream Parts.png]({{ '/assets/images/Stream Parts.png' | absolute_url }})





The whole idea with Streams is to represent a pipeline through which data will flow and the pipeline's functions operate on the data. This way, functional-style operations on Streams of elements can be expressed. This article is the first out of five where you will learn firsthand how to become a Master of Streams. We start with basic stream examples and progress with more complex tasks until you know how to connect standard Java Streams to databases in the Cloud.

Streams are conceptually a sequence of data of any kind. They are not a data structure like a list.  You can imagine a Stream like a conveyor belt in a factory.
 
![Streams - Factory Conveyor Belt.png]({{ '/assets/images/Streams - Factory Conveyor Belt.png' | absolute_url }})
([Reference](https://cdn2.vectorstock.com/i/1000x1000/76/21/factory-with-conveyor-belt-and-mass-production-vector-22767621.jpg))

 
 At the beginning of the first belt, the material is raw.  Then it gets modified, combined, unused material is filtered out, and finally you have one or multiple new products created from the material.

Streams were introduced in Java 8 as a wrapper for collections.  Streams are typically used to access all elements of a collection and filter them or use them in functions. Streams are usually a lot shorter than equivalent code not utilizing them, and easier to read.

Most Stream functions expect an implementation of a functional interface as input, which we simplify to either a method reference (e.g. `String::isBlank`) or a lambda (e.g. `someString -> someString.contains("Hello")`).

The output of most Stream functions is another Stream which makes them nice to pipe together and thereby enforce the developer to do one thing after the other and increase the readability of complex operations.

**Motivation:**

Often, we want to take a collection, do something with every or some of its elements, and finally get a collection of these changed elements. If we see a pattern like this one:

1. Create a new List.
1. Take elements from existing List and filter/change them.
1. Add them to the new List.
1. Return the new List.

```java
package demo;

import java.util.ArrayList;
import java.util.List;

public class App {

  public static void main(final String[] args) {
    List<String> listOfStrings = List.of("A", "List", "that", "contains", "some", "Strings");
    List<String> stringsWithExclamationPoint = addExclamationPoint(listOfStrings);
  }

  private static List<String> addExclamationPoint(List<String> listOfStrings) {
    List<String> stringsWithExclamationPoint = new ArrayList<>();
    
    for (String aString : listOfStrings) {
      stringsWithExclamationPoint.add(aString + "!");
    }
    
    return stringsWithExclamationPoint;
  }
}
```

If the code is well-designed, this pattern can always be simplified using Streams to something like this:

```java
package demo;

import java.util.List;
import java.util.stream.Collectors;

public class App {

  public static void main(final String[] args) {
    List<String> listOfStrings = List.of("A", "List", "that", "contains", "some", "Strings");
    List<String> stringsWithExclamationPoint = addExclamationPoint(listOfStrings);
  }

  private static List<String> addExclamationPoint(List<String> listOfStrings) {
    return listOfStrings.stream()
      .map(aString -> aString + "!")
      .collect(Collectors.toList());
  }
}
```

IntelliJ often allows us to do this with one simple command (Option+Enter on the for keyword). However, use this carefully, as it's not always the best option to create a Stream.

In this section, we will use the most common functions of Streams. However, there are too many to cover them all.

### Filter and Predicates

When we want to filter a collection of items, we can do that with a Stream. The filter function works very similar to the one from JavaScript.

The filter function requires a Predicate, which is a functional interface. Its implementation takes an input of the same type as the Stream and gives a boolean as an output. The boolean defines, whether the filter criteria is fulfilled. If the boolean is true, the object stays in the Stream, otherwise it is removed.

Note that a filter only removes the object from the Stream, **not** from the original input.

Here, all Strings that are longer than 5 characters are filtered out:

```java
package demo;

import java.util.List;
import java.util.stream.Collectors;

public class App {

  public static void main(final String[] args) {
    List<String> listOfStrings = List.of("A", "List", "that", "contains", "some", "Strings");
    System.out.println(filterByLength(listOfStrings));
  }

  private static List<String> filterByLength(List<String> listOfStrings) {
    return listOfStrings.stream()
      .filter(aString -> aString.length() <= 5)
      .collect(Collectors.toList());
  }
}
```

To make it better readable, we can move out the lambda function and reference it:

```java
package demo;

import java.util.List;
import java.util.stream.Collectors;

public class App {

  public static void main(final String[] args) {
    List<String> listOfStrings = List.of("A", "List", "that", "contains", "some", "Strings");
    System.out.println(filterByLength(listOfStrings));
  }

  private static List<String> filterByLength(List<String> listOfStrings) {
    return listOfStrings.stream()
      .filter(App::isShortEnough)
      .collect(Collectors.toList());
  }

  private static boolean isShortEnough(String aString) {
    return aString.length() < 5;
  }
}
```

If we read the stream from top to bottom, we understand what it is doing: Take the `listOfStrings`, filter for those that are `shortEnough`, and collect them to a List.

Let's make `filterByLength` more generic such that we can also apply other filters. For that, we pass the predicate which it shall use to it from the method invocation:

```java
package demo;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class App {

  public static void main(final String[] args) {
    List<String> listOfStrings = List.of("A", "List", "that", "contains", "some", "Strings");
    System.out.println(filterBy(listOfStrings, App::isShortEnough));
  }

  private static List<String> filterBy(List<String> listOfStrings, Predicate<String> predicate) {
    return listOfStrings.stream()
      .filter(predicate)
      .collect(Collectors.toList());
  }

  private static boolean isShortEnough(String aString) {
    return aString.length() < 5;
  }
}
```

Now we can also filter for other things like that the string contains the letter "A":

```java
package demo;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class App {

  public static void main(final String[] args) {
    List<String> listOfStrings = List.of("A", "List", "that", "contains", "some", "Strings");
    System.out.println(filterBy(listOfStrings, App::isShortEnough));
    System.out.println(filterBy(listOfStrings, App::containsLetterA));
  }

  private static List<String> filterBy(List<String> listOfStrings, Predicate<String> predicate) {
    return listOfStrings.stream()
      .filter(predicate)
      .collect(Collectors.toList());
  }

  private static boolean isShortEnough(String aString) {
    return aString.length() < 5;
  }

  private static boolean containsLetterA(String aString) {
    return aString.contains("a") || aString.contains("A");
  }
}
```

We can also use predicates to check at the end of a Stream, whether all, some, or no elements in the Stream fulfill it using `allMatch`, `anyMatch`, and `noneMatch`:

```java
package demo;

import java.util.List;

public class App {

  public static void main(final String[] args) {
    List<String> listOfStrings = List.of("A", "List", "that", "contains", "some", "Strings");

    System.out.printf("allMatch: %s%n", allShortEnough(listOfStrings));
    System.out.printf("anyMatch: %s%n", someShortEnough(listOfStrings));
    System.out.printf("noneMatch: %s%n", noneShortEnough(listOfStrings));
  }

  private static boolean allShortEnough(List<String> listOfStrings) {
    return listOfStrings.stream()
      .allMatch(App::isShortEnough);
  }

  private static boolean someShortEnough(List<String> listOfStrings) {
    return listOfStrings.stream()
      .anyMatch(App::isShortEnough);
  }

  private static boolean noneShortEnough(List<String> listOfStrings) {
    return listOfStrings.stream()
      .noneMatch(App::isShortEnough);
  }

  private static boolean isShortEnough(String aString) {
    return aString.length() < 5;
  }
}
```

### ForEach and Consumers

Another type of Lambda is the `Consumer`. It takes an input but provides no output and can be used in Streams in the `forEach` function. For every element that is in the Stream, the `Consumer` lambda will be executed.

```java
package demo;

import java.util.List;

public class App {

  public static void main(final String[] args) {
    List<String> listOfStrings = List.of("A", "List", "that", "contains", "some", "Strings");
    printStrings(listOfStrings);
  }

  private static void printStrings(List<String> listOfStrings) {
    listOfStrings.stream()
      .forEach(System.out::println);
  }
}
```

However, in this example, the `stream()` call is not necessary, as `forEach` can be invoked on the List directly. The function in the Stream is only useful if the `Consumer` should be called on filtered or manipulated objects, like here:

```java
package demo;

import java.util.List;

public class App {

  public static void main(final String[] args) {
    List<String> listOfStrings = List.of("A", "List", "that", "contains", "some", "Strings");
    printShortStrings(listOfStrings);
  }

  private static void printShortStrings(List<String> listOfStrings) {
    listOfStrings.stream()
      .filter(App::isShortEnough)
      .forEach(System.out::println);
  }

  private static boolean isShortEnough(String aString) {
    return aString.length() < 5;
  }
}
```

### Map

{% include custom/pending.html %}

### FlatMap

{% include custom/pending.html %}

### Mapping and Filtering

{% include custom/pending.html %}

## Collectors

{% include custom/pending.html %}

## Optionals

{% include custom/pending.html %}

## Common Uses

{% include custom/pending.html %}

### Sum numbers in List

{% include custom/pending.html %}

### Sum content in List based on property

{% include custom/pending.html %}

### Create Map from List

{% include custom/pending.html %}

## Miscellaneous

1. [FP vs OO: Choose Two by Brian Goetz](https://www.youtube.com/watch?v=8GWZE2Y2O9E)
1. Java Stream are map/reduce
1. Collections in Java predates Streams and were not designed with Streams in mind.  The `stream()` needs to be used.
1. `this` and Lambda
    ```java
    final Runnable lambda = () -> {
      System.out.printf( "My class is %s%n", getClass() );
    };

    System.out.printf( "My class is %s%n", lambda.getClass() );
    lambda.run();
    ```
1. [`Function.andThen()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/function/Function.html#andThen(java.util.function.Function))
1. Higher order functions
1. Phases
    1. Source
    1. Zero or many intermediate operations<br/>
        Operations can be stateless or stateful.  Stateful operations will read all stream.  Some intermediate operations will short-circuit and will ignore any further data.
    1. One Terminal operation
        1. Run to completion
            1. `forEach()` or `foreEachOrdered()`
            1. `collect()`
            1. `reduce()`
        1. Short-circuit
            1. `findFirst()`
1. `map()` produces `1-to-1` while `flatMap()` produces `M-to-1` or `1-to-M` as required
1. `spliterator()`
1. [https://github.com/amaembo/streamex](https://github.com/amaembo/streamex)
