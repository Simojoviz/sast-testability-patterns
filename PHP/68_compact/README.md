[//]: # (This file is automatically generated. If you wish to make any changes, please use the JSON files and regenerate this file using the tpframework.)

# Compact

Tags: sast, php, php_v7.4.9

Version: v1.0

## Description

In PHP [`compact()`](https://www.php.net/manual/en/function.compact.php) dynamically creates a new PHP array containing the passed variables. The variables are passed by name, i.e. as string.

## Overview

| Instances                 | has discovery rule   | discovery method   | rule successfull   |
|---------------------------|----------------------|--------------------|--------------------|
| [1 Instance](#1-instance) | yes                  | joern              | yes                |
| [2 Instance](#2-instance) | yes                  | joern              | yes                |

<details markdown="1"open>
<summary>

## 1 Instance
</summary>

This instance demonstrates the usage of `compact` using some predefined variables, one of them contains user controlled input.

### Code

```PHP
<?php
$a = $_GET["p1"]; // source
$city = "San Francisco";
$state = "CA";
$event = $a;

$result = compact(["event", "city", "state"]);
echo $result['event']; // sink
```

### Instance Properties

| category   | feature_vs_internal_api   | input_sanitizer   | negative_test_case   | source_and_sink   |
|------------|---------------------------|-------------------|----------------------|-------------------|
| D1         | INTERNAL_API              | no                | no                   | no                |

<details markdown="1">
<summary>
<b>More</b></summary>

<details markdown="1">
<summary>

### Compile
</summary>

```bash
$_main:
     ; (lines=13, args=0, vars=5, tmps=9)
     ; (before optimizer)
     ; /.../PHP/68_compact/1_instance_68_compact/1_instance_68_compact.php:1-9
     ; return  [] RANGE[0..0]
0000 T5 = FETCH_R (global) string("_GET")
0001 T6 = FETCH_DIM_R T5 string("p1")
0002 ASSIGN CV0($a) T6
0003 ASSIGN CV1($city) string("San Francisco")
0004 ASSIGN CV2($state) string("CA")
0005 ASSIGN CV3($event) CV0($a)
0006 INIT_FCALL 1 96 string("compact")
0007 SEND_VAL array(...) 1
0008 V11 = DO_ICALL
0009 ASSIGN CV4($result) V11
0010 T13 = FETCH_DIM_R CV4($result) string("event")
0011 ECHO T13
0012 RETURN int(1)
```

</details>

<details markdown="1">
<summary>

### Discovery
</summary>

The rule searches for function calls to `compact` on opcode level.

```scala
val x68 = (name, "68_compact_iall", cpg.call(".*INIT_FCALL.*").argument.order(2).code("compact").astParent.location.toJson);
```

| discovery method   | expected accuracy   |
|--------------------|---------------------|
| joern              | Perfect             |

</details>

<details markdown="1"open>
<summary>

### Measurement
</summary>

| Tool        | Comm_1   | Comm_2   | Ground Truth   |
|-------------|----------|----------|----------------|
| 22 May 2023 | no       | no       | yes            |

</details>

</details>

</details>

<details markdown="1">
<summary>

## 2 Instance
</summary>

This instance uses two user inputs. if the second input is set to `event`, the resulting array is the same as in instance 1.

### Code

```PHP
<?php
$a = $_GET["p1"]; // source
$city  = "San Francisco";
$state = "CA";
$event = $a;
$x = $_GET["p2"]; // event
$location_vars = array("city", "state");
$result = compact($x, $location_vars);
echo $result['event']; // sink
```

### Instance Properties

| category   | feature_vs_internal_api   | input_sanitizer   | negative_test_case   | source_and_sink   |
|------------|---------------------------|-------------------|----------------------|-------------------|
| D4         | INTERNAL_API              | no                | no                   | no                |

<details markdown="1">
<summary>
<b>More</b></summary>

<details markdown="1">
<summary>

### Compile
</summary>

```bash
$_main:
     ; (lines=18, args=0, vars=7, tmps=13)
     ; (before optimizer)
     ; /.../PHP/68_compact/2_instance_68_compact/2_instance_68_compact.php:1-9
     ; return  [] RANGE[0..0]
0000 T7 = FETCH_R (global) string("_GET")
0001 T8 = FETCH_DIM_R T7 string("p1")
0002 ASSIGN CV0($a) T8
0003 ASSIGN CV1($city) string("San Francisco")
0004 ASSIGN CV2($state) string("CA")
0005 ASSIGN CV3($event) CV0($a)
0006 T13 = FETCH_R (global) string("_GET")
0007 T14 = FETCH_DIM_R T13 string("p2")
0008 ASSIGN CV4($x) T14
0009 ASSIGN CV5($location_vars) array(...)
0010 INIT_FCALL 2 112 string("compact")
0011 SEND_VAR CV4($x) 1
0012 SEND_VAR CV5($location_vars) 2
0013 V17 = DO_ICALL
0014 ASSIGN CV6($result) V17
0015 T19 = FETCH_DIM_R CV6($result) string("event")
0016 ECHO T19
0017 RETURN int(1)
```

</details>

<details markdown="1">
<summary>

### Discovery
</summary>

The rule searches for function calls to `compact` on opcode level.

```scala
val x68 = (name, "68_compact_iall", cpg.call(".*INIT_FCALL.*").argument.order(2).code("compact").astParent.location.toJson);
```

| discovery method   | expected accuracy   |
|--------------------|---------------------|
| joern              | Perfect             |

</details>

<details markdown="1"open>
<summary>

### Measurement
</summary>

| Tool        | Comm_1   | Comm_2   | Ground Truth   |
|-------------|----------|----------|----------------|
| 22 May 2023 | no       | yes      | yes            |

</details>

</details>

</details>