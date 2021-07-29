module.exports = function vetInt(x) {
  // this makes sure only an int is used as a parameter as a basic step to prevent sql-injection attacks
  if (!Number.isInteger(parseInt(x))) {
    return false;
  } else if (parseInt(x) < 0) {
    return false;
  } else {
    return true;
  }
};
