---
layout: default
title: Packages, imports and static imports
parent: Data Types
nav_order: 11
permalink: docs/data-types/packages-imports-static-imports/
---

# Packages, imports and static imports
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Packages

Classes in Java are organised into packages.  Our `App` class is part of the `demo` package.

```java
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( "a simple app" );
  }
}
```

The packages are defined by the `package` keyword and this is always the first executable code.

```java
package demo;
```

Only comments can precede the package declaration.

```java
/* A simple application */
package demo;

public class App {
  public static void main( String[] args ) {
    System.out.println( "a simple app" );
  }
}
```

The package name is not random.

```bash
$ tree src/main/java
src/main/java
└── demo
    └── App.java
```

The package name maps the folder structure.  Say that we move the `App` class to a new package.

```java
package demo.a.b.c;

public class App {
  public static void main( String[] args ) {
    System.out.println( "a simple app" );
  }
}
```

Now the source file needs to be located in folder `c`, which is in folder `b` and so on and so forth.

```bash
$ tree src/main/java
src/main/java
└── demo
    └── a
        └── b
            └── c
                └── App.java
```

Our examples were small and a very limited number of classes where created.  In most cases we reused the same `App` class.  An application will have tens, hundreds if not thousands of classes.  Having all the classes in one folder will make it hard to find something.  Classes can be organised into packages instead.

Say that we have some classes related to payments and other classes related to orders.  Following is a list of classes used in our fictitious problem.

```bash
$ tree src/main/java
src/main/java
└── demo
    ├── App.java
    ├── BankTransfer.java
    ├── BillingAddress.java
    ├── CreditCard.java
    ├── Item.java
    ├── ItemPrice.java
    ├── Order.java
    ├── OrderController.java
    ├── OrderQuantity.java
    ├── OrderRepository.java
    ├── OrderService.java
    ├── PaymentController.java
    ├── PaymentGateway.java
    ├── PaymentMethod.java
    ├── PaymentRepository.java
    ├── PaymentRequest.java
    ├── PaymentResponse.java
    ├── PaymentService.java
    └── PaypalAccount.java
```

All our classes are saved in one package.  It is clear here that we can organise these better.  There classes can be organised in different ways.  There are different ways how classes can be organised.  We will be discussing two common methods.

### Organise packages by technology

It is very common to see classes organised by technology.  For example, all controllers will be saved under a controller package.

```bash
$ tree src/main/java
src/main/java
└── demo
    ├── App.java
    ├── contoller
    │   ├── OrderController.java
    │   └── PaymentController.java
    ├── gateway
    │   └── PaymentGateway.java
    ├── model
    │   ├── BankTransfer.java
    │   ├── BillingAddress.java
    │   ├── CreditCard.java
    │   ├── Item.java
    │   ├── ItemPrice.java
    │   ├── Order.java
    │   ├── OrderQuantity.java
    │   ├── PaymentMethod.java
    │   ├── PaymentRequest.java
    │   ├── PaymentResponse.java
    │   └── PaypalAccount.java
    ├── repository
    │   ├── OrderRepository.java
    │   └── PaymentRepository.java
    └── service
        ├── OrderService.java
        └── PaymentService.java
```

As the application grows, it is hard to maintain a healthy architecture.  For example, a controller should depend on a service and never vice versa.  This is not easy to maintain as the team grows and team members change.

Fortunately, this type of organisation enables the use of fitness functions that ensure that only controllers depends on service.  Tools, such as [JDepend](https://github.com/clarkware/jdepend), can be used to ensure that services do not depend on controllers, for example.

The following test is an example of how JDepend can be used to make sure that only the controllers depend on the services and not vice versa.

```java
package demo;

import jdepend.framework.DependencyConstraint;
import jdepend.framework.JDepend;
import jdepend.framework.JavaPackage;
import jdepend.framework.PackageFilter;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance( TestInstance.Lifecycle.PER_CLASS )
class DependenciesTest {

  private JDepend jdepend;

  @BeforeAll
  public void setUp() throws IOException {
    final PackageFilter filter = new PackageFilter();
    filter.addPackage( "java.*" );
    filter.addPackage( "javax.*" );

    jdepend = new JDepend( filter );
    jdepend.addDirectory( "build/classes/java/main" );
  }

  @Test
  public void shouldContainProperDependencies() {
    final DependencyConstraint constraint = new DependencyConstraint();
    constraint.addPackage( "demo" );
    final JavaPackage controllers = constraint.addPackage( "demo.controller" );
    final JavaPackage services = constraint.addPackage( "demo.service" );
    controllers.dependsUpon( services );

    jdepend.analyze();

    assertTrue( jdepend.dependencyMatch( constraint ), "Controllers should depend on services and not vice versa" );
  }
}
```

The above test makes use of the JDepend library.

```groovy
dependencies {
  testImplementation 'jdepend:jdepend:2.9.1'
}
```

While this is very common, I do not quite like this kind of organisation.  Normally, we either work on payments or on orders but rarely on both at the same type.  For example, say we want to add a new payment method, bank transfer.  The order related classes are not going to be affected by this change.

### Organise packages by feature

Alternatively, classes can be organised by their feature.  We have two features, *orders* and *payments*.

```bash
$ tree src/main/java
src/main/java
└── demo
    ├── App.java
    ├── order
    │   ├── Item.java
    │   ├── ItemPrice.java
    │   ├── Order.java
    │   ├── OrderController.java
    │   ├── OrderQuantity.java
    │   ├── OrderRepository.java
    │   └── OrderService.java
    └── payment
        ├── BankTransfer.java
        ├── BillingAddress.java
        ├── CreditCard.java
        ├── PaymentController.java
        ├── PaymentGateway.java
        ├── PaymentMethod.java
        ├── PaymentRepository.java
        ├── PaymentRequest.java
        ├── PaymentResponse.java
        ├── PaymentService.java
        └── PaypalAccount.java
```

The classes are organised by the feature they belong to.

JDepend works with packages and the above organisation does help with that as all classes related to the same feature are in the same package.

### Organise packages by both feature and technology (hybrid)

Luckily, we can obtain the best of both worlds.  Consider the following organisation.

```bash
$ tree src/main/java
src/main/java
└── demo
    ├── App.java
    ├── order
    │   ├── controller
    │   │   └── OrderController.java
    │   ├── model
    │   │   ├── Item.java
    │   │   ├── ItemPrice.java
    │   │   ├── Order.java
    │   │   └── OrderQuantity.java
    │   ├── repository
    │   │   └── OrderRepository.java
    │   └── service
    │       └── OrderService.java
    └── payment
        ├── controller
        │   └── PaymentController.java
        ├── gateway
        │   └── PaymentGateway.java
        ├── model
        │   ├── BankTransfer.java
        │   ├── BillingAddress.java
        │   ├── CreditCard.java
        │   ├── PaymentMethod.java
        │   ├── PaymentRequest.java
        │   ├── PaymentResponse.java
        │   └── PaypalAccount.java
        ├── repository
        │   └── PaymentRepository.java
        └── service
            └── PaymentService.java
```

Now we can use JDepend to make sure that the classes' dependencies are kept as these were intended to be.

```java
package demo;

import jdepend.framework.DependencyConstraint;
import jdepend.framework.JDepend;
import jdepend.framework.JavaPackage;
import jdepend.framework.PackageFilter;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance( TestInstance.Lifecycle.PER_CLASS )
class DependenciesTest {

  private JDepend jdepend;

  @BeforeAll
  public void setUp() throws IOException {
    final PackageFilter filter = new PackageFilter();
    filter.addPackage( "java.*" );
    filter.addPackage( "javax.*" );

    jdepend = new JDepend( filter );
    jdepend.addDirectory( "build/classes/java/main" );
  }

  @Test
  public void shouldContainProperDependencies() {
    final DependencyConstraint constraint = new DependencyConstraint();
    constraint.addPackage( "demo" );
    addOrderMappings( constraint );
    addPaymentMappings( constraint );

    jdepend.analyze();

    assertTrue( jdepend.dependencyMatch( constraint ), "Controllers should depend on services and not vice versa" );
  }

  private void addOrderMappings( final DependencyConstraint constraint ) {
    final JavaPackage model = constraint.addPackage( "demo.order.model" );
    final JavaPackage repository = constraint.addPackage( "demo.order.repository" );
    final JavaPackage controllers = constraint.addPackage( "demo.order.controller" );
    final JavaPackage services = constraint.addPackage( "demo.order.service" );
    controllers.dependsUpon( services );
    controllers.dependsUpon( model );
    services.dependsUpon( model );
    services.dependsUpon( repository );
    repository.dependsUpon( model );
  }

  private void addPaymentMappings( final DependencyConstraint constraint ) {
    final JavaPackage model = constraint.addPackage( "demo.payment.model" );
    final JavaPackage repository = constraint.addPackage( "demo.payment.repository" );
    final JavaPackage controllers = constraint.addPackage( "demo.payment.controller" );
    final JavaPackage services = constraint.addPackage( "demo.payment.service" );
    final JavaPackage gateway = constraint.addPackage( "demo.payment.gateway" );
    controllers.dependsUpon( services );
    controllers.dependsUpon( model );
    services.dependsUpon( model );
    services.dependsUpon( repository );
    services.dependsUpon( gateway );
    repository.dependsUpon( model );
  }
}
```

## Imports

Classes that are not part of the same package cannot be used just by their name.  Take for example the `Random` class shown next.

```java
package demo;

public class App {
  public static void main( final String[] args ) {
    final java.util.Random r = new java.util.Random();

    final int a = r.nextInt( 100 );
    System.out.printf( "The number was %d%n", a );
  }
}
```

The `Random` class is found in the `java.util` package and to use it we have to use the full qualifier name (`java.util.Random`).  Alternatively, we can import classes and then use them by their name as shown next.

```java
package demo;

import java.util.Random;

public class App {
  public static void main( String[] args ) {
     final Random r = new Random();

     final int a = r.nextInt( 100 );
     System.out.printf( "The number was %d%n", a );
  }
}
```

Say that we want get two random numbers and then pick the largest of the two.

```java
package demo;

import java.util.Random;

public class App {
  public static void main( String[] args ) {
    final Random r = new Random();

    final int a = r.nextInt( 100 );
    final int b = r.nextInt( 100 );

    /* Find the max */
    int max = Math.max( a, b );

    System.out.printf( "The largest number is %d%n", max );
  }
}
```

Note that the `Math` class in not in our package and yet we did not import it.  All classes found in the `java.lang` package, such as the `Math` class, are available automatically and we do not have to import them.

### How can we work with classes that have the same name but are found in a different package?

Java has two `Date` classes, one found in the `java.util` package and the other one in the `java.sql` package.  We cannot import them both.  Consider the following example.

{% include custom/dose_not_compile.html %}

```java
package demo;

import java.util.Date;
import java.sql.Date;

public class App {
  public static void main( final String[] args ) {
    final Date utilDate = new Date();
    final Date sqlDate = new Date(System.currentTimeMillis());
    System.out.printf( "The util date %s%n", utilDate );
    System.out.printf( "The sql date %s%n", sqlDate );
  }
}
```

The above example cannot compile as it is impossible for Java to determine which data is which.  In such cases we can only import one of the dates and then we have to use the full qualified name with the other class.

```java
package demo;

import java.util.Date;

public class App {
  public static void main( final String[] args ) {
    final Date utilDate = new Date();
    final java.sql.Date sqlDate = new java.sql.Date(System.currentTimeMillis());
    System.out.printf( "The util date %s%n", utilDate );
    System.out.printf( "The sql date %s%n", sqlDate );
  }
}
```

The `var` keyword can be useful here as it will reduce the verbosity.

```java
final var sqlDate = new java.sql.Date(System.currentTimeMillis());
```

Complete example.

```java
package demo;

import java.util.Date;

public class App {
  public static void main( final String[] args ) {
    final Date utilDate = new Date();
    final var sqlDate = new java.sql.Date(System.currentTimeMillis());
    System.out.printf( "The util date %s%n", utilDate );
    System.out.printf( "The sql date %s%n", sqlDate );
  }
}
```

## Static imports

Java 5 also introduced static imports which enabled use to import static methods.  Any static method can be imported as shown next.

```java
package demo;

import java.util.Random;

import static java.lang.Math.max;

public class App {
  public static void main( String[] args ) {
    final Random r = new Random();

    final int a = r.nextInt( 100 );
    final int b = r.nextInt( 100 );

    /* Find the max */
    int max = max( a, b );

    System.out.printf( "The largest number is %d%n", max );
  }
}
```
