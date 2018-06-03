function doGet(request) {
  var template = HtmlService.createTemplateFromFile('app/index');

  var output = template.evaluate();
  output.setTitle('Angular Template');
  return output;
}

function call() {
  var name = Array.prototype.shift.call(arguments);
  return this[name].apply(null, arguments);
}
