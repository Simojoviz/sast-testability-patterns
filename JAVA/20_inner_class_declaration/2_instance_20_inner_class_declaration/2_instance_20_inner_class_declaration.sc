@main def main(name : String): Unit = {
  importCpg(name)
  val x2 = (name,"20_inner_class_declaration_iall",cpg.method(".*").dominates.code(".*class.*").toJson);
  println(x2)
  delete;
}
