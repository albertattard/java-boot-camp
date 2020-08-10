---
layout: default
title: Matchers (JUnit 5, Hamcrest and AssertJ)
parent: Testing
nav_order: 2
permalink: docs/testing/matchers/
---

# Matchers (JUnit 5, Hamcrest and AssertJ)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Hamcrest

[Hamcrest](http://hamcrest.org/JavaHamcrest/) is a framework for writing matcher objects allowing 'match' rules to be defined declaratively.

1. Add the [Hamcrest](https://mvnrepository.com/artifact/org.hamcrest/hamcrest) dependency

    ```groovy
    dependencies {
      testImplementation 'org.hamcrest:hamcrest:2.2'
    }
    ```

1. Example

    ```java
    package demo;

    import org.junit.jupiter.api.Test;

    import java.math.BigDecimal;

    import static org.hamcrest.MatcherAssert.assertThat;
    import static org.hamcrest.core.CombinableMatcher.either;
    import static org.hamcrest.core.Is.is;
    import static org.hamcrest.core.Is.isA;
    import static org.hamcrest.core.IsEqual.equalTo;
    import static org.hamcrest.core.StringStartsWith.startsWith;
    import static org.hamcrest.number.IsCloseTo.closeTo;
    import static org.hamcrest.number.OrderingComparison.comparesEqualTo;
    import static org.hamcrest.number.OrderingComparison.greaterThan;
    import static org.hamcrest.number.OrderingComparison.lessThan;

    class AppTest {

      @Test
      public void tryingOutHamcrest() {
        assertThat( "my string", equalTo( "my string" ) );
        assertThat( "Hello everyone", startsWith( "Hello" ) );

        assertThat( 10, is( greaterThan( 5 ) ) );
        assertThat( 10, isA( Integer.class ) );
        assertThat( 10, either( greaterThan( 50 ) ).or( lessThan( 20 ) ) );

        assertThat( new BigDecimal( "10" ), comparesEqualTo( new BigDecimal( "10.00" ) ) );
        assertThat( 10.01, closeTo( 10, 0.02 ) );
      }
    }
    ```

## AssertJ

[Assertj](https://assertj.github.io/doc/) is a java library providing a rich set of assertions, truly helpful error messages, improves test code readability and is designed to be super easy to use.

1. Add the [Assertj](https://mvnrepository.com/artifact/org.assertj/assertj-core/) dependency

    ```groovy
    dependencies {
      testImplementation 'org.assertj:assertj-core:3.16.1'
    }
    ```

1. Example

    ```java
    package demo;

    import org.junit.jupiter.api.Test;

    import java.math.BigDecimal;

    import static org.assertj.core.api.Assertions.assertThat;
    import static org.assertj.core.api.Assertions.offset;

    class AppTest {

      @Test
      public void tryingOutAssertJ() {
        assertThat( "my string" ).isEqualTo( "my string" );
        assertThat( "Hello everyone" ).startsWith( "Hello" );

        assertThat( 10 ).isGreaterThan( 5 );
        assertThat( 10 ).isInstanceOfAny( Integer.class );
        /* Using Lambdas here */
        assertThat( 10 ).satisfiesAnyOf(
            i -> assertThat( i ).isGreaterThan( 50 ),
            i -> assertThat( i ).isLessThan( 20 )
        );

        assertThat( new BigDecimal( "10" ) ).isEqualByComparingTo( new BigDecimal( "10.00" ) );
        assertThat( 10.01 ).isCloseTo( 10, offset( 0.02 ) );
      }
    }
    ```

## JUnit 5, Hamcrest and AssertJ

| Library  | Test Runner | Matcher |
|----------|:-----------:|:-------:|
| JUnit 5  |   **YES**   | **YES** |
| Hamcrest |     NO      | **YES** |
| AssertJ  |     NO      | **YES** |

According to [Google Trends](https://trends.google.com/trends/explore?q=hamcrest,assertj), the matchers share similar popularity.

![Harmcrest vs AssertJ]({{ '/assets/images/Harmcrest-vs.-AssertJ.png' | absolute_url }})

The good news is that these are not mutually exclusive and it is not uncommon to find them both.

```groovy
dependencies {
  testImplementation 'org.junit.jupiter:junit-jupiter:5.7.0-M1'
  testImplementation 'org.hamcrest:hamcrest:2.2'
  testImplementation 'org.assertj:assertj-core:3.16.1'
}
```

With that said, using both Hamcrest and AssertJ may be challenging as both use the same method name `assertThat()` and thus cannot just static import this method.

```java
package demo;

import org.assertj.core.api.Assertions;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

class AppTest {

  @Test
  public void tryingOutBothInSameTest() {
    Assertions.assertThat( 10 ).isEqualTo( 10 );
    MatcherAssert.assertThat( 10, Matchers.equalTo( 10 ) );
  }
}
```
