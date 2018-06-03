function doGet(request) {
  var template = HtmlService.createTemplateFromFile('index');

  var output = template.evaluate();
  output.setTitle('Angular Template');
  return output;
}
