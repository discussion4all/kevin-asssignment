const fs = require("fs");
const path = process.argv[2];

function getFileContents(path, callback) {
  fs.exists(path, (exists) => {
    if (!exists) {
      return callback(new Error("File does not exist"));
    }

    console.log("exists");
    fs.stat(path, (err, stats) => {
      if (err) {
        return callback(new Error("Error trying to get stats"));
      }
      console.log(stats);
      if (stats.size <= 0) {
        return callback(new Error("File exists but there is no content"));
      }
      fs.readFile(path, (err, buffer) => {
        if (err) {
          return callback(new Error("Error trying to get stats"));
        }
        return callback(null, buffer);
      });
    });
  });
}

getFileContents(path, (err, contents) => {
  if (err) {
    console.error(`There was an error getting contents for ${path}`, err);
    return;
  }
  console.info("File was found and the contents were loaded");
});
