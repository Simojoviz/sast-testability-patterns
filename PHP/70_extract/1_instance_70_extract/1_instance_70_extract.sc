@main def main(name : String): Unit = {
    importCpg(name)
    val x72 = (name, "70__extract_iall", cpg.call(".*INIT_FCALL.*").argument.order(2).code("extract").astParent.location.toJson);
    println(x72)
    delete;
} 