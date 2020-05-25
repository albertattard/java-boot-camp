Resources:
1. https://spring.io/blog/2020/04/16/spring-tips-the-graalvm-native-image-builder-feature
1. https://github.com/mike-neck/graalvm-native-image-plugin

```bash
$ sdk list java
```

```bash
 GraalVM       |     | 20.1.0.r11   | grl     |            | 20.1.0.r11-grl
               |     | 20.1.0.r8    | grl     |            | 20.1.0.r8-grl
               |     | 20.0.0.r11   | grl     |            | 20.0.0.r11-grl
               |     | 20.0.0.r8    | grl     |            | 20.0.0.r8-grl
               |     | 19.3.1.r11   | grl     |            | 19.3.1.r11-grl
               |     | 19.3.1.r8    | grl     |            | 19.3.1.r8-grl
```

```bash
$ sdk install java 20.1.0.r11-grl
```

```bash
$ vi ~/.oh-my-zsh/custom/dev.zsh
```

```bash
alias graalvm='sdk default java 20.1.0.r11-grl'
```

```bash
alias java8='sdk default java 8.0.252.hs-adpt'
alias java11='sdk default java 11.0.6.hs-adpt'
alias java14='sdk default java 14.0.1.hs-adpt'
alias graalvm='sdk default java 20.1.0.r11-grl'
```

```bash
$ gu --version
GraalVM Updater 20.1.0
```

Install the native image builder

```bash
$ gu install native-image
Downloading: Component catalog from www.graalvm.org
Processing Component: Native Image
Downloading: Component native-image: Native Image  from github.com
Installing new component: Native Image (org.graalvm.native-image, version 20.1.0)
```
