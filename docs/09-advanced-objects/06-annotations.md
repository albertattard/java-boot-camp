---
layout: default
title: Annotations
parent: Advanced Objects
nav_order: 6
permalink: docs/advanced-objects/annotations/
---

# Annotations
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Annotations

[Effective Java](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/) - [Item 39: Prefer annotations to naming patterns](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch3.xhtml#lev39)

We have already seen many annotations like `@Override`, `@DisplayName`, `@Test`, or `@ParameterizedTest`.

Let's create our own annotation now. We want to convert an object to a map which contains the annotated fields and their values. We start by creating the annotation interface.

```java
@Retention( RetentionPolicy.RUNTIME )
@Target( ElementType.FIELD )
public @interface MapField {
}
```

The `@Retention` specifies whether the annotation is relevant only at compile time (like `@Override`, which is only relevant to check whether the overridden function exists in the super class), or needs to be considered at runtime (in this case we want to collect the annotated fields at runtime).

The `@Target` defines what kind of things we want to annotate with this (e.g. fields, methods, or classes). We can also define multiple targets.

Now we can use it already to annotate the fields which we want to add to the map:

```java
public class Person {

  @MapField
  private final String name;

  @MapField
  private final String surname;

  public Person( final String name, final String surname ) {
    this.name = name;
    this.surname = surname;
  }
}
```

Only annotating the fields has almost no effect. We have only marked the fields so far. What is left, is using the accessing the annotation to utilize it.

As a first step, let's get the first of the annotated fields and create a map from it.

```java
public class App {

    public static void main( final String[] args ) {
        final Map<String, Object> personMap = toMap( new Person( "Aden", "Attard" ) );

        System.out.printf( "Person: %s%n", personMap );
    }

    private static Map<String, Object> toMap( final Object object ) {
        List<Field> fields = FieldUtils.getFieldsListWithAnnotation(object.getClass(), MapField.class);
        Field someField = fields.get(0);
        String name = someField.getName();
        Object value = someField;
        return Map.of(name, value);
    }
}
```

The above will print.

```bash
Person: {name=private final java.lang.String demo.Person.name}
```

This is however not the result we had in mind. Instead of using `field`, we need to access the fields value. That is only possible if we make it accessible first, as the field is private and its value invisible from other classes.

```java
public class App {

    public static void main( final String[] args ) {
        final Map<String, Object> personMap = toMap( new Person( "Aden", "Attard" ) );

        System.out.printf( "Person: %s%n", personMap );
    }

    private static Map<String, Object> toMap( final Object object ) {
        List<Field> fieldsListWithAnnotation = FieldUtils.getFieldsListWithAnnotation(object.getClass(), MapField.class);
        Field field = fieldsListWithAnnotation.get(0);
        String name = someField.getName();
        Object value = readValue(someField, object);
        return Map.of(name, value);
    }

    private static Object readValue( final Field property, final Object object ) {
        try {
            /* Access private properties */
            property.setAccessible( true );

            /* Get the property value */
            return property.get( object );
        } catch ( final Exception e ) {
            /* Ignore error for this example */
            return "shouldntHappen";
        }
    }

}
```

The above will print.

```bash
Person: {name=Aden}
```

Now that we can read one field, we want to read all the annotated fields next. For that, we refactor what we did a bit:

```java
public class App {

    public static void main( final String[] args ) {
        final Map<String, Object> personMap = toMap( new Person( "Aden", "Attard" ) );

        System.out.printf( "Person: %s%n", personMap );
    }

    private static Map<String, Object> toMap( final Object object ) {
        return FieldUtils
                .getFieldsListWithAnnotation( object.getClass(), MapField.class )
                .stream()
                .collect( Collectors.toMap(
                        field -> readName( field ),
                        field -> readValue( field, object )
                ) );
    }

    private static String readName( final Field property ) {
        return property.getName();
    }

    private static Object readValue( final Field property, final Object object ) { /* ... */ }
}
```

The above will print.

```bash
Person: {surname=Attard, name=Aden}
```

Let's create a second class `Pet`, where not every field is annotated.

```java
public class Pet {

    private final String name;

    @MapField
    private final String favouriteFood;

    public Pet( final String name, final String favouriteFood ) {
        this.name = name;
        this.favouriteFood = favouriteFood;
    }
}
```

```java
public class App {

    public static void main( final String[] args ) {
        final Map<String, Object> personMap = toMap( new Person( "Aden", "Attard" ) );
        final Map<String, Object> petMap = toMap( new Pet( "Fido", "Sausage Pizza" ) );

        System.out.printf( "Person: %s%n", personMap );
        System.out.printf( "Pet: %s%n", petMap );
    }

    private static Map<String, Object> toMap( final Object object ) { /* ... */ }

    private static String readName( final Field property ) { /* ... */ }

    private static Object readValue( final Field property, final Object object ) { /* ... */ }
}
```

The above will print.

```bash
Person: {surname=Attard, name=Aden}
Pet:    {favouriteFood=Sausage Pizza}
```

As expected, only the value of the annotated field is being printed. However, we do not like the camel case formatting for the map key and want to have it represented by another string. To achieve that, we can add the `value()` method to the annotation interface:

```java
@Retention( RetentionPolicy.RUNTIME )
@Target( ElementType.FIELD )
public @interface MapFieldTo {

    String value();
}
```

(Note: We also rename the `@MapField` to `@MapFieldTo` as it's a better fitting name for what we are about to do)

To use this method, we add the preferred map key to our `Person` and `Pet` class:

```java
public class Person {

    @MapFieldTo( "name" )
    private final String name;

    @MapFieldTo( "surname" )
    private final String surname;

    public Person( final String name, final String surname ) { /* ... */ }
}
```

```java
public class Pet {

    private final String name;

    @MapFieldTo( "favourite-food" )
    private final String favouriteFood;

    public Pet( final String name, final String favouriteFood ) {
        this.name = name;
        this.favouriteFood = favouriteFood;
    }
}
```

As when we added the annotation, this alone has no effect. We need to adjust our implementation on how we get the name for the map keys:

```java
public class App {

    public static void main( final String[] args ) { /* ... */ }

    private static Map<String, Object> toMap( final Object object ) { /* ... */ }

    private static String readName( final Field property ) {
        /* Get the MapFieldTo annotation to retrieve the value that was set */
        final MapFieldTo mapFieldTo = property.getAnnotation( MapFieldTo.class );
        return mapFieldTo.value();
    }

    private static Object readValue( final Field property, final Object object ) { /* ... */ }
}
```

The above will print.

```bash
Person: {surname=Attard, name=Aden}
Pet:    {favourite-food=Sausage Pizza}
```

Finally, we can try to see if the `toMap(...)` function is stable even with objects that do not have any annotated fields:

```java
public class App {

    public static void main( final String[] args ) {
        final Map<String, Object> personMap = toMap( new Person( "Aden", "Attard" ) );
        final Map<String, Object> petMap = toMap( new Pet( "Fido", "Sausage Pizza" ) );
        final Map<String, Object> pointMap = toMap( new Point( 1, 2 ) );

        System.out.printf( "Person: %s%n", personMap );
        System.out.printf( "Pet:    %s%n", petMap );
        System.out.printf( "Point:  %s%n", pointMap );
    }

    private static Map<String, Object> toMap( final Object object ) { /* ... */ }

    private static String readName( final Field property ) { /* ... */ }

    private static Object readValue( final Field property, final Object object ) { /* ... */ }
}
```

The above will print.

```bash
Person: {surname=Attard, name=Aden}
Pet:    {favourite-food=Sausage Pizza}
Point:  {}
```

With annotations, we can build ourselves comfortable ways to work with objects. We could also achieve these through other means (e.g. by implementing an interface).

The next section will show annotations introduced by Lombok that serve a similar purpose as the annotation we created here.

## Project Lombok

[Project Lombok](https://projectlombok.org)

The idea of Lombok is to make Java less verbose. Often, when we create a new Class, we expect it to have a simple constructor and override `equals` and `hashCode`. This can make up many lines of code and decrease the readability. Lombok aims to make these base features more readable, and easier to understand and change.

We revisit now our example of the `Person` class. It has the private final fields `name` and `surname`, and an `age` which can be changed through a setter. The fields can be accessed through getters. Two `Person`s are considered equal, if their `name` and `surname` are the same (`equals` and `hashCode` method). Finally, the `Person` can be converted to a String using `toString`.

```java
import java.util.Objects;

public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return Objects.equals(name, person.name) &&
                Objects.equals(surname, person.surname);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, surname);
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", age=" + age +
                '}';
    }
}
```

Within this section, we learn how to shorten this class utilizing Lombok to this:

```java
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {
    private final String name;
    private final String surname;
    private int age;
}
```

In order to use Lombok, we need to add the library to our gradle dependencies.

```groovy
dependencies {
  compileOnly 'org.projectlombok:lombok:1.18.12'
  annotationProcessor 'org.projectlombok:lombok:1.18.12'

  testCompileOnly 'org.projectlombok:lombok:1.18.12'
  testAnnotationProcessor 'org.projectlombok:lombok:1.18.12'
}
```

You can find a list of all stable features with examples here: [Project Lombok Documentation](https://projectlombok.org/features/all)

It also shows how an equivalent implementation would look like in Vanilla Java to compare it with.

Work through the next few subsections and then try it for yourself without looking it up.

### @ToString

Lombok's `@ToString` annotation takes all the fields of an entity and converts them to a readable String.

```java
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", age=" + age +
                '}';
    }
}
```

becomes

```java
@ToString
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

This sample application prints the `String` representation of a `Person`:

```java
public class App {
    public static void main( final String[] args ) {
        Person a = new Person("Paul", "Börding", 29);
        System.out.println(a.toString());
    }
}
```

The above will print.

```bash
Person(name=Paul, surname=Börding, age=29)
```

We can explicitly exclude fields using the `@ToString.Exclude`:

```java
@ToString
public class Person {

    private final String name;
    @ToString.Exclude private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

The above will print.

```bash
Person(name=Paul, age=29)
```

or by defining the excluded fields at the `@ToString` annotation directly:

```java
@ToString(exclude = "surname")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

If we only want to use a few of the fields, we can either set them in the annotation using `of` or set `onlyExplicitlyIncluded = true` and use the `@ToString.Include` annotation:

```java
@ToString(of = "name")
public class Person {
    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

and

```java
@ToString(onlyExplicitlyIncluded = true)
public class Person {
    @ToString.Include private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

both print:

```bash
Person(name=Paul)
```

If we have a static value which we also want to include, we can use the `@ToString.Include` annotation on it:

```java
@ToString
public class Person {
    @ToString.Include private final static String SPECIES = "Human";

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}
```

The above will print.

```bash
Person(SPECIES=Human, name=Paul, surname=Börding, age=29)
```

It also works, if other entities are involved:

```java
@ToString
public class Person {
    private final String name;
    private final String surname;
    private int age;
    private Person neighbor;

    public Person( final String name, final String surname, final int age, final Person neighbor ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {/* ... */}

    @Override
    public int hashCode() {/* ... */}
}

public class App {
    public static void main( final String[] args ) {
        Person a = new Person("Paul", "Börding", 29, null);
        Person b = new Person("Someone", "Else", 35, a);
        System.out.println(b.toString());
    }
}
```

The above will print.

```bash
Person(name=Someone, surname=Else, age=35, neighbor=Person(name=Paul, surname=Börding, age=29, neighbor=null))
```

Be careful with this, as it can cause an endless loop (if `a`'s neighbor is `b` and `b`'s neighbor is `a` in this example)!

### @EqualsAndHashCode

Lombok's `@EqualsAndHashCode` annotation takes all the fields of an entity and checks them for equality when calling the `equals` method. Furthermore, it generates a hash code using all the fields.

```java
@ToString
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age &&
                Objects.equals(name, person.name) &&
                Objects.equals(surname, person.surname);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, surname, age);
    }
}
```

becomes

```java
@ToString
@EqualsAndHashCode
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}
}
```

Like for `@ToString`, we can explicitly include or exclude fields using the same parameters as for the `@ToString` annotation.

```java
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {/* ... */}

    public String getSurname() {/* ... */}

    public int getAge() {/* ... */}

    public void setAge(int age) {/* ... */}
}
```

### @Getter and @Setter

When we access fields or want to manipulate them, it is highly recommended to use getters and setters for this operation. Getters and setters might compute or validate certain properties before performing the action.

With `@Getter`, all fields of a class will receive a getter:

```java
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

becomes

```java
@Getter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}

    public void setAge(int age) {
        this.age = age;
    }
}
```

With `@Setter`, all non-final fields of a class receive a setter method.

```java
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}
}
```

If getters or setters are only required for certain fields, the can be explicitly defined where they are needed. In the following scenario, `age` has only a setter, but no getter:

```java
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {
    @Getter private final String name;
    @Getter private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}
}
```

By default, all getters and setters can be publicly accessed. If you want to reduce the access, you can set the `value` parameter:

```java
@Setter(value = AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {
    @Getter(value = AccessLevel.PROTECTED) private final String name;
    @Getter private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {/* ... */}
}
```

Now, only the surname can be publicly accessed; the name can be accessed by subclasses; the age can only be set within the same class.

Another feature of the `@Getter` annotation is the caching of values to improve performance and memory usage. This is done by setting the `lazy` parameter to true. As we have not yet covered caching, we will come back to this once we learned more about this topic.

### Constructors

Instead of writing out all the constructors, we can use the Lombok constructor annotations. The `@AllArgsConstructor` creates a constructor which has all fields as input:

```java
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname, final int age ) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
}
```

becomes

```java
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;
}
```

Often, we want to only create an object with the final fields and set the non-final fields later on (e.g. when we have more information). For this, we can use the `@RequiredArgsConstructor`:

```java
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;

    public Person( final String name, final String surname ) {
        this.name = name;
        this.surname = surname;
    }
}
```

becomes

```java
@RequiredArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;
}
```

When we have defined a constructor of a class, the empty default constructor is no longer available. If we still want to have it, we can create it using the annotation `@NoArgsConstructor`. Be aware, this is only possible if we have no unset final fields, as final fields need to be defined when creating an object.


```java
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private String name;
    private String surname;
    private int age;

    public Person( ) {
    }

    public Person( final String name, final String surname, final int age ) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
}
```

becomes

```java
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = "age")
public class Person {

    private final String name;
    private final String surname;
    private int age;
}
```

Note: If all fields are final, `@RequiredArgsConstructor` is the same as `@AllArgsConstructor`. Don't use both at the same time.

Note: If the class has no fields at all, `@NoArgsConstructor`, `@RequiredArgsConstructor`, and `@AllArgsConstructor` are all equivalent. Don't use more than one of them at the same time.

```java
// Don't do this! Runtime error!
@AllArgsConstructor
@RequiredArgsConstructor
public class Person {
    private final String name;
    private final String surname;
}
```

```java
// Don't do this! Runtime error!
@NoArgsConstructor
@RequiredArgsConstructor
public class Person {
}
```

### `@Data`

A common combination of the aforementioned annotations is:

```java
@ToString
@EqualsAndHashCode
@Getter
@Setter //on all non-final fields
@RequiredArgsConstructor
public class Person {
    private final String name;
    private final String surname;
    private int age;
}
```

This can be shortened using the `@Data` annotation:

```java
@Data
public class Person {
    private final String name;
    private final String surname;
    private int age;
}
```

Excluding certain fields from `@ToString` or `@EqualsAndHashCode` can still be done by excluding them explicitly on the field:

```java
@Data
public class Person {
  private final String name;
  @ToString.Exclude private final String surname;
  @EqualsAndHashCode.Exclude private int age;
}
```

### `@Builder`

Sometimes in Java, we see a class growing and getting more fields over time. If we use constructor calls in our production or test code, this can mean a lot of annoying rework, since we either need to add a field to every single call or we need to maintain all of our old constructors with less parameters.

To avoid that, the builder-pattern can be introduced. We will cover the concrete implementation of this pattern in the [Common Design Patterns] section. For now, all you need to know is that it solves our problem, and it is very verbose. In the following, we will show you how to use classes that utilize the builder-pattern.

The `@Builder` annotation from Lombok improves this situation:

```java
@Builder
@Data
public class Person {
  private final String name;
  private final String surname;
  private int age;
}
```

When we have annotated a class with `@Builder`, we can construct it through a static `builder()`-method instead of a constructor:

```java
public class App {
    public static void main( final String[] args ) {
        Person paulBuilder = Person.builder()
                .name("Paul")
                .surname("Börding")
                .age(29)
                .build();

        Person paulConstructor = new Person("Paul", "Börding", 29);

        System.out.println(paulBuilder.toString());
        System.out.println(paulConstructor.toString());
    }
}
```

In this example, we first call the builder, then we assign (in any order) all the fields, and finally we call `build()` to construct the `Person`. You might notice, that this is more readable than the constructor, since the field names are right there in the code.

Now let's extend our example from above with the field `country`:

```java
@Builder
@Data
public class Person {
  private final String name;
  private final String surname;
  private int age;
  private String country;
}
```
```java
public class App {
    public static void main( final String[] args ) {
        Person paulBuilder = Person.builder()
                .name("Paul")
                .surname("Börding")
                .age(29)
                .build();

        Person paulConstructor = new Person("Paul", "Börding", 29, null);

        System.out.println(paulBuilder.toString());
        System.out.println(paulConstructor.toString());
    }
}
```

Notice how we need to extend the constructor call but no change needs to be done to the builder call. Any unassigned field is automatically considered `null`. This is especially useful for tests, as only the fields under test need to be assigned, making the test more understandable.

Let's add another field `hobbies` which shall be a list of activities:

```java
@Builder
@Data
public class Person {
  private final String name;
  private final String surname;
  private int age;
  private String country;
  private List<String> hobbies;
}
```

```java
public class App {
    public static void main( final String[] args ) {
        Person paulBuilder = Person.builder()
                .surname("Börding")
                .age(29)
                .hobbies(List.of("Board Games", "Movies", "Coding"))
                .build();

        System.out.println(paulBuilder.toString());
    }
}
```

Notice how we create a `List` of `String`s within our builder. Depending on the context or personal preference, it can be better to add them one by one instead of instantiating the `List`. For that, we need to add the `@Singular` annotation to the `hobbies` field:


```java
@Builder
@Data
public class Person {
  private final String name;
  private final String surname;
  private int age;
  private String country;
  @Singular private List<String> hobbies;
}
```

```java
public class App {
    public static void main( final String[] args ) {
        Person paulBuilder = Person.builder()
                .surname("Börding")
                .age(29)
                .hobby("Board Games")
                .hobby("Movies")
                .hobby("Coding")
                .build();

        System.out.println(paulBuilder.toString());
    }
}
```

Notice here how Lombok automatically uses the singular of the word `hobbies`, which is `hobby`, to name the method. This can be irritating in practice, be aware. You can still use the `hobbies(...)` method to add the hobbies as a `List`.

Again, this functionality is very useful in testing for creating test objects in the code.

We can set the property `toBuilder` to `true` to get another method which allows us to convert entities back into a builder. That way we can add field values later on, change them, or create copies easily.

```java
@Builder(toBuilder = true)
@Data
public class Person {
  private final String name;
  private final String surname;
  private int age;
  private String country;
}
```

```java
public class App {
    public static void main( final String[] args ) {
        Person paul = Person.builder()
                .name("Paul")
                .surname("Börding")
                .age(29)
                .build();
        //Birthday happens
        Person agedPaul = paul.toBuilder()
                .age(paul.getAge() + 1)
                .build();
        Person germanPaul = paul.toBuilder()
                .country("Germany")
                .build();
        System.out.println(paul.toString());
        System.out.println(agedPaul.toString());
    }
}
```

### `@NonNull`

Lombok has it's own implementation of the `@NonNull` annotation. If you are in a context of using Lombok, you should prefer to use this one. With this annotation, you can make sure that certain fields cannot be `null`.

The following example throws a `NullPointerException` (but with a relatively useful error message):

```java
@Builder
@Data
public class Person {
    @NonNull private final String name;
    private final String surname;
    private int age;
}
```
```java
public class App {
    public static void main( final String[] args ) {
        Person paulBuilder = Person.builder()
                .surname("Börding")
                .age(29)
                .build();

        System.out.println(paulBuilder.toString());
    }
}
```

```bash
Exception in thread "main" java.lang.NullPointerException: name is marked non-null but is null
	at demo.Person.<init>(Person.java:7)
	at demo.Person$PersonBuilder.build(Person.java:7)
	at demo.App.main(App.java:11)
```

### `@Value` and `@With`

Similarly to `@Data`, `@Value` gives basic functionality to a class. Value classes are immutable, meaning they are created once and never changed. Hence, we can omid the `private final`, as these are set for every field anyway.

`@Value` combines `@RequiredArgsConstructor`, `@Getter`, `@ToString`, and `@EqualsAndHashCode`.

```java
@Value
public class Person {
    String name;
    String surname;
    int age;
}
```

In case we want to change one of the fields, we need to copy the entity with the new field set.

```java
public class App {
    public static void main( final String[] args ) {
        Person paul = new Person("Paul", "Börding", 29);
        // Birthday happens
        paul = new Person(paul.getName(), paul.getSurname(), paul.getAge() + 1);
        System.out.println(paul.toString());
    }
}
```

Luckily, Lombok provides the `@With` annotation, which grants methods to create a copy with a changed field value, such that we do not need to call the constructor and getters each time:

```java
@With
@Value
public class Person {
    String name;
    String surname;
    int age;
}
```

```java
public class App {
    public static void main( final String[] args ) {
        Person paul = new Person("Paul", "Börding", 29);
        // Birthday happens
        paul = paul.withAge(paul.getAge() + 1);
        System.out.println(paul.toString());
    }
}
```

Like the builder, the with-calls can be piped in case we want to change multiple properties:

```java
public class App {
    public static void main( final String[] args ) {
        Person paul = new Person("Paul", "Börding", 29);
        // Birthday happens and Paul gets a new surname
        paul = paul
                .withAge(paul.getAge() + 1)
                .withSurname("Attard");
        System.out.println(paul.toString());
    }
}
```

### `@SneakyThrows`

`@SneakyThrows` can be used to shorten try-catch-blocks. Especially, when you expect problems to occur rarely and you think, you do not need proper exception handling.

Consider the following code and the result it prints:

```java
@AllArgsConstructor
public class Person {
    private final String name;
    private final String surname;
    private int age;

    public void superRiskyOperation() {
        try {
            int divideByZero = age / 0;
        } catch(ArithmeticException arithmeticException) {
            arithmeticException.printStackTrace();
        }
    }
}
```

```java
public class App {
    public static void main( final String[] args ) {
        Person paul = new Person("Paul", "Börding", 29);
        paul.superRiskyOperation();
    }
}
```

```bash
java.lang.ArithmeticException: / by zero
	at demo.Person.superRiskyOperation(Person.java:13)
	at demo.App.main(App.java:11)
```

With `@SneakyThrows`, the code is more lightweight with the same result:

```java
@AllArgsConstructor
public class Person {
    private final String name;
    private final String surname;
    private int age;

    @SneakyThrows
    public void superRiskyOperation() {
        int divideByZero = age / 0;
    }
}
```
