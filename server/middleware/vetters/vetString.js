function fixCaps(s) {
  // Checks if input starts with a capital letter, and fixes it if not
  if (s.charCodeAt(0) >= 97 && s.charCodeAt(0) <= 122) {
    s = s.charAt(0).toUpperCase() + s.slice(1);
  }
  // Instead of checking every letter of every string for a capital letter, this just makes sure they're all lowercase
  s = s.charAt(0) + s.slice(1).toLowerCase();
  return s;
}

//  Searches for numbers in string to reject bad inputs
function hasNumbers(s) {
  var regex = /\d/g;
  return regex.test(s);
}

module.exports = function vetString(string) {
  string = fixCaps(string);
  numbers = hasNumbers(string);

  if (numbers) {
    return false;
  } else {
    return string;
  }
};
