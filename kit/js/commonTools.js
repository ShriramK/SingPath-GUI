function log(message) {
  console.log(message);
}

String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
}

String.prototype.removeNewLines = function() {
  return this.replace(/\n/g, '');
}
