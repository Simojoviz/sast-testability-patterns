@main def main(name : String): Unit = {
    importCpg(name)
    val x7 = (name, "7_string_arithmetic_operations_i4", cpg.call(".*PRE_DEC.*").location.toJson);
    println(x7)
    delete;
} 