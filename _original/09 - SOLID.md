# SOLID

## TOC

1. [Setup](#setup)
1. [Single-responsibility Principle](#single-responsibility-principle)
1. [Open–closed principle](#open-closed-principle)
1. [Liskov substitution principle](#liskov-substitution-principle)
1. [Interface segregation principle](#interface-segregation-principle)
1. [Dependency inversion principle](#dependency-inversion-principle)
1. [Miscellaneous](#miscellaneous)

## Setup

{% include custom/pending.html %}

## Single-responsibility Principle

A student can enrol in several classes and a grade is calculated at the end of the semester based on the student grades.  The school also provides recommendations.  All student logic is captured by one class.

```java
package demo;

import java.util.List;

public class Student {

  private List<Enrollment> enrollments;
  private List<Course> studentBrowsingHistory;
  private List<Course> schoolBrowsingHistory;

  public Recommendations findRecommendations() { }

  public Grade calculateGrade() { }
}
```

The `calculateGrade()` is used by the *Enrollment Management* department while the `findRecommendations()` is used by the *Academic Advising* department.

Say that a change requested by *Academic Advising* department introduces a bug


{% include custom/pending.html %}

## Open–closed principle

{% include custom/pending.html %}

## Liskov substitution principle

{% include custom/pending.html %}

## Interface segregation principle

{% include custom/pending.html %}

## Dependency inversion principle

{% include custom/pending.html %}

## Miscellaneous

1. https://speakerdeck.com/tastapod/why-every-element-of-solid-is-wrong
