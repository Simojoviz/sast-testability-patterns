@main def main(name : String): Unit = {
    importCpg(name)
    val x63 = (name, "63_substring_replace_function_iall", cpg.call(".*INIT_FCALL.*").argument.order(2).code("substr_replace").astParent.location.toJson);
    println(x63)
    delete;
} 