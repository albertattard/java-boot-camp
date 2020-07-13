---
layout: default
title: Miscellaneous
parent: Collections
nav_order: 11
nav_exclude: true
permalink: docs/collections/miscellaneous/
---

## Miscellaneous

1. [Deque](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Deque.html) better than [Stack](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Stack.html)
1. The importance of a good hashing function
1. HashMap make use of Comparable too (since Java 8)
1. [WeakHashMap](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/WeakHashMap.html)
1. [Vector](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Vector.html) + [Enumeration](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Enumeration.html) has some bugs -> [Iterator](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Iterator.html) is better
1. QuickSort, [MergeSort]() and [TimSort](http://svn.python.org/projects/python/trunk/Objects/listsort.txt)
1. Cannot use `parallel()` with all collections times.  [TreeSet](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/TreeSet.html) may block forever.
1. Include the concurrent collections
1. Good collections libraries
    1. https://gist.github.com/kabutz/0fd0efc2c3629e8358d209ba73f0b44e
    1. https://github.com/JCTools/JCTools
    1. https://www.eclipse.org/collections/
    1. https://github.com/OpenHFT/Chronicle-Queue
1. [`Stream.forEach()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/stream/Stream.html#forEach(java.util.function.Consumer)) vs. [`Iterable.forEach()`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/lang/Iterable.html#forEach(java.util.function.Consumer)) - [answer](https://stackoverflow.com/questions/23218874/what-is-difference-between-collection-stream-foreach-and-collection-foreach/23232560#23232560)
