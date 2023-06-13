[//]: # (This file is automatically generated. If you wish to make any changes, please use the JSON files and regenerate this file using the tpframework.)

# Dynamic Include

Tags: sast, php, php_v7.4.9

Version: v1.0

## Description

In PHP the [`include`](https://www.php.net/manual/en/function.include.php) statement  can be used to include and evaluate specific files in the current PHP script.

## Overview

| Instances                 | has discovery rule   | discovery method   | rule successfull   |
|---------------------------|----------------------|--------------------|--------------------|
| [1 Instance](#1-instance) | yes                  | joern              | yes                |
| [2 Instance](#2-instance) | yes                  | joern              | yes                |
| [3 Instance](#3-instance) | yes                  | joern              | yes                |
| [4 Instance](#4-instance) | yes                  | joern              | yes                |
| [5 Instance](#5-instance) | yes                  | joern              | yes                |

<details markdown="1"open>
<summary>

## 1 Instance
</summary>

The instance uses two PHP files. The first one that has the source includes the second one that has the sink using `include`, where the name for the include file is hardcoded as a string.

### Code

#### Source File

```PHP
<?php
$a = $_GET["p1"]; // source
$file = "1_instance_79_dynamic_include_1.php";
include($file);
```

#### Sink File

```PHP
<?php
echo $a; // sink
```

### Instance Properties

| category   | feature_vs_internal_api   | input_sanitizer   | negative_test_case   | source_and_sink   |
|------------|---------------------------|-------------------|----------------------|-------------------|
| D2         | FEATURE                   | no                | no                   | no                |

<details markdown="1">
<summary>
<b>More</b></summary>

<details markdown="1">
<summary>

### Compile
</summary>

```bash
$_main:
     ; (lines=6, args=0, vars=2, tmps=5)
     ; (before optimizer)
     ; /.../PHP/79_dynamic_include/1_instance_79_dynamic_include/1_instance_79_dynamic_include_0.php:1-4
     ; return  [] RANGE[0..0]
0000 T2 = FETCH_R (global) string("_GET")
0001 T3 = FETCH_DIM_R T2 string("p1")
0002 ASSIGN CV0($a) T3
0003 ASSIGN CV1($file) string("1_instance_79_dynamic_include_1.php")
0004 INCLUDE_OR_EVAL (include) CV1($file)
0005 RETURN int(1)
```

</details>

<details markdown="1">
<summary>

### Discovery
</summary>

The rule searches for `include`, that uses a string as an argument on opcode level.

```scala
val x79 = (name, "79_dynamic_include_i1", cpg.call.code(".*INCLUDE_OR_EVAL.*include.*").reachableBy(cpg.call.code(".*ASSIGN.*string.*")).location.toJson);
```

| discovery method   | expected accuracy   |
|--------------------|---------------------|
| joern              | Perfect             |

</details>

<details markdown="1"open>
<summary>

### Measurement
</summary>

| Tool        | Comm_1   | Comm_2   | phpSAFE   | Progpilot   | RIPS   | WAP   | Ground Truth   |
|-------------|----------|----------|-----------|-------------|--------|-------|----------------|
| 08 Jun 2021 | yes      | no       | no        | yes         | yes    | no    | yes            |
| 22 May 2023 | yes      | no       |           |             |        |       | yes            |

</details>

</details>

</details>

<details markdown="1">
<summary>

## 2 Instance
</summary>

This instance uses three PHP files. One file which takes two user inputs. Depending on the second input, it includes either sink file one `2_instance_79_dynamic_include_0.php` or another file (`2_instance_79_dynamic_include_2.php`), which just outputs a string.

### Code

#### Source File

```PHP
<?php
$a = $_GET["p1"]; // source
$b = $_GET["p2"];
if($b) {
    $file = "2_instance_79_dynamic_include_0.php";
} else {
    $file = "2_instance_79_dynamic_include_2.php"; 
}
include($file);
```

#### Sink File

```PHP
<?php
echo $a; // sink
```

### Instance Properties

| category   | feature_vs_internal_api   | input_sanitizer   | negative_test_case   | source_and_sink   |
|------------|---------------------------|-------------------|----------------------|-------------------|
| D3         | FEATURE                   | no                | no                   | no                |

<details markdown="1">
<summary>
<b>More</b></summary>

<details markdown="1">
<summary>

### Compile
</summary>

```bash
$_main:
     ; (lines=12, args=0, vars=3, tmps=9)
     ; (before optimizer)
     ; /.../PHP/79_dynamic_include/2_instance_79_dynamic_include/2_instance_79_dynamic_include_1.php:1-9
     ; return  [] RANGE[0..0]
0000 T3 = FETCH_R (global) string("_GET")
0001 T4 = FETCH_DIM_R T3 string("p1")
0002 ASSIGN CV0($a) T4
0003 T6 = FETCH_R (global) string("_GET")
0004 T7 = FETCH_DIM_R T6 string("p2")
0005 ASSIGN CV1($b) T7
0006 JMPZ CV1($b) 0009
0007 ASSIGN CV2($file) string("2_instance_79_dynamic_include_0.php")
0008 JMP 0010
0009 ASSIGN CV2($file) string("2_instance_79_dynamic_include_2.php")
0010 INCLUDE_OR_EVAL (include) CV2($file)
0011 RETURN int(1)
```

</details>

<details markdown="1">
<summary>

### Discovery
</summary>

The rule searches for `include`, that uses a string as an argument on opcode level. It is the same rule as for instance 1.

```scala
val x79 = (name, "79_dynamic_include_i2", cpg.call.code(".*INCLUDE_OR_EVAL.*include.*").reachableBy(cpg.call.code(".*ASSIGN.*string.*")).location.toJson);
```

| discovery method   | expected accuracy   |
|--------------------|---------------------|
| joern              | Perfect             |

</details>

<details markdown="1"open>
<summary>

### Measurement
</summary>

| Tool        | Comm_1   | Comm_2   | phpSAFE   | Progpilot   | RIPS   | WAP   | Ground Truth   |
|-------------|----------|----------|-----------|-------------|--------|-------|----------------|
| 08 Jun 2021 | no       | no       | no        | no          | no     | no    | yes            |
| 22 May 2023 | yes      | no       |           |             |        |       | yes            |

</details>

</details>

</details>

<details markdown="1">
<summary>

## 3 Instance
</summary>

This instance leaves it up to the user controlled variable, which file to include. In this example, if `$_GET['p2']` is `3_instance_79_dynamic_include_0.php` it will include the sink file.

### Code

#### Source File

```PHP
<?php
$a = $_GET["p1"]; // source
$b = $_GET["p2"]; // 3_instance_79_dynamic_include_0.php
  
include $b;
```

#### Sink File

```PHP
<?php
echo $a; // sink
```

### Instance Properties

| category   | feature_vs_internal_api   | input_sanitizer   | negative_test_case   | source_and_sink   |
|------------|---------------------------|-------------------|----------------------|-------------------|
| D4         | FEATURE                   | no                | no                   | no                |

<details markdown="1">
<summary>
<b>More</b></summary>

<details markdown="1">
<summary>

### Compile
</summary>

```bash
$_main:
     ; (lines=8, args=0, vars=2, tmps=7)
     ; (before optimizer)
     ; /.../PHP/79_dynamic_include/3_instance_79_dynamic_include/3_instance_79_dynamic_include_0.php:1-5
     ; return  [] RANGE[0..0]
0000 T2 = FETCH_R (global) string("_GET")
0001 T3 = FETCH_DIM_R T2 string("p1")
0002 ASSIGN CV0($a) T3
0003 T5 = FETCH_R (global) string("_GET")
0004 T6 = FETCH_DIM_R T5 string("p2")
0005 ASSIGN CV1($b) T6
0006 INCLUDE_OR_EVAL (include) CV1($b)
0007 RETURN int(1)
```

</details>

<details markdown="1">
<summary>

### Discovery
</summary>

Checks for an include statement with a variable on opcode level.

```scala
val x79 = (name, "79_dynamic_include_i3", cpg.call.code(".*INCLUDE_OR_EVAL.*include.*").argument.order(1).code("CV.*|T.*|V.*").location.toJson);
```

| discovery method   | expected accuracy   |
|--------------------|---------------------|
| joern              | Perfect             |

</details>

<details markdown="1"open>
<summary>

### Measurement
</summary>

| Tool        | Comm_1   | Comm_2   | phpSAFE   | Progpilot   | RIPS   | WAP   | Ground Truth   |
|-------------|----------|----------|-----------|-------------|--------|-------|----------------|
| 08 Jun 2021 | no       | no       | no        | no          | no     | no    | yes            |
| 22 May 2023 | no       | no       |           |             |        |       | yes            |

</details>

</details>

</details>

<details markdown="1">
<summary>

## 4 Instance
</summary>

This instance concatenates the value from the user with a prefix before including the file.

### Code

#### Source File

```PHP
<?php
$a = $_Get["p1"]; // source
$b = $_Get["p2"]; // $b is _79_dynamic_include_0.php
include("4_instance" . $b);
```

#### Sink File

```PHP
<?php
echo $a; // sink
```

### Instance Properties

| category   | feature_vs_internal_api   | input_sanitizer   | negative_test_case   | source_and_sink   |
|------------|---------------------------|-------------------|----------------------|-------------------|
| D3         | FEATURE                   | no                | no                   | no                |

<details markdown="1">
<summary>
<b>More</b></summary>

<details markdown="1">
<summary>

### Compile
</summary>

```bash
$_main:
     ; (lines=7, args=0, vars=3, tmps=6)
     ; (before optimizer)
     ; /.../PHP/79_dynamic_include/4_instance_79_dynamic_include/4_instance_79_dynamic_include_1.php:1-4
     ; return  [] RANGE[0..0]
0000 T3 = FETCH_DIM_R CV1($_Get) string("p1")
0001 ASSIGN CV0($a) T3
0002 T5 = FETCH_DIM_R CV1($_Get) string("p2")
0003 ASSIGN CV2($b) T5
0004 T7 = CONCAT string("4_instance") CV2($b)
0005 INCLUDE_OR_EVAL (include) T7
0006 RETURN int(1)
```

</details>

<details markdown="1">
<summary>

### Discovery
</summary>

The rule searches for an `include` reachable by a `CONCAT` statement on opcode level.

```scala
val x79 = (name, "79_dynamic_include_i4", cpg.call.code(".*INCLUDE_OR_EVAL.*include.*").reachableBy(cpg.call.code(".*CONCAT.*string.*")).location.toJson);
```

| discovery method   | expected accuracy   |
|--------------------|---------------------|
| joern              | Perfect             |

</details>

<details markdown="1"open>
<summary>

### Measurement
</summary>

| Tool        | Comm_1   | Comm_2   | phpSAFE   | Progpilot   | RIPS   | WAP   | Ground Truth   |
|-------------|----------|----------|-----------|-------------|--------|-------|----------------|
| 08 Jun 2021 | no       | no       | no        | no          | no     | no    | yes            |
| 22 May 2023 | no       | no       |           |             |        |       | yes            |

</details>

</details>

</details>

<details markdown="1">
<summary>

## 5 Instance
</summary>

This instance gets a user defined input and than includes a file, which outputs the value `a` from the `GLOBALS` array.

### Code

#### Source File

```PHP
<?php
$a = $_GET["p1"]; // source
include("5_instance_79_dynamic_include_0.php");
```

#### Sink File

```PHP
<?php
echo $a; // sink
```

### Instance Properties

| category   | feature_vs_internal_api   | input_sanitizer   | negative_test_case   | source_and_sink   |
|------------|---------------------------|-------------------|----------------------|-------------------|
| D1         | FEATURE                   | no                | no                   | no                |

<details markdown="1">
<summary>
<b>More</b></summary>

<details markdown="1">
<summary>

### Compile
</summary>

```bash
$_main:
     ; (lines=5, args=0, vars=1, tmps=4)
     ; (before optimizer)
     ; /.../PHP/79_dynamic_include/5_instance_79_dynamic_include/5_instance_79_dynamic_include_1.php:1-3
     ; return  [] RANGE[0..0]
0000 T1 = FETCH_R (global) string("_GET")
0001 T2 = FETCH_DIM_R T1 string("p1")
0002 ASSIGN CV0($a) T2
0003 INCLUDE_OR_EVAL (include) string("5_instance_79_dynamic_include_0.php")
0004 RETURN int(1)
```

</details>

<details markdown="1">
<summary>

### Discovery
</summary>

This rule just searches for an `INCLUDE` on opcode level.

```scala
val x79 = (name, "79_dynamic_include_i5", cpg.call.code(".*INCLUDE_OR_EVAL.*.string.*").location.toJson);
```

| discovery method   | expected accuracy   |
|--------------------|---------------------|
| joern              | Perfect             |

</details>

<details markdown="1"open>
<summary>

### Measurement
</summary>

| Tool        | Comm_1   | Comm_2   | phpSAFE   | Progpilot   | RIPS   | WAP   | Ground Truth   |
|-------------|----------|----------|-----------|-------------|--------|-------|----------------|
| 08 Jun 2021 | yes      | no       | no        | yes         | yes    | no    | yes            |
| 22 May 2023 | yes      |          |           |             |        |       | yes            |

</details>

</details>

</details>