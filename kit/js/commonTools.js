// Print message in the window console
function log(message) {
  console.log(message);
}


// Remove empty spaces from the begining or endding of a string
String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
}


// Remove new lines from a string
String.prototype.removeNewLines = function() {
  return this.replace(/\r/g, '').replace(/\n/g, '');
}


// Return the page from the window URL
function getHref() {
  href = window.location.href;
  return href.substr(href.lastIndexOf('/')+1);
}


// Return the first chars needed regarding the window protocol
function getFirstURLChars() {
  return window.location.href.indexOf('https:') ? 'http://www.' : 'https://ssl.';
}


// Clamp number in range
function clamp(number, _lowLimit, _highLimit) {
  lowLimit  = Math.min(_lowLimit, _highLimit);
  highLimit = Math.max(_lowLimit, _highLimit);
  
  number = number > highLimit ? highLimit : number;
  number = number < lowLimit  ? lowLimit  : number;
  return number;
}


// Clamp the number to be always positive
function clampPositive(number) {
  return clamp(number, 0, Math.abs(number));
}


// Clamp the number to be always negative
function clampNegative(number) {
  return clamp(number, -Math.abs(number), 0);
}


// Clamp a string in a limit of characters
function clampString(string, maxLength) {
  var endString, finalString, slice;
  string    = string ? string : '';
  maxLength = Math.abs(maxLength);
  
  if (maxLength >= string.length || !maxLength) {
    return string;
  } else {
    finalString = '';
    endString = '...';
    
    slice = maxLength - endString.length;
    if (slice > 0) {
      finalString = string.slice(0, maxLength - endString.length);
      return finalString + endString;
    } else {
      return endString.slice(0, slice + endString.length);
    }
  }
}


// Check if the user is currently logged in
function getUserLoggedInStatus(player) {
  return player.player_id != "NA";
}
