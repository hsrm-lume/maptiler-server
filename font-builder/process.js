var fontnik = require(".");
var fs = require("fs");
var path = require("path");

var convert = function (fileName, outputDir) {
  var font = fs.readFileSync(path.resolve(__dirname + "/" + fileName));
  fs.mkdir(outputDir, {recursive:true}, () => 
	output2pbf(font, 0, 255, outputDir)
);
};
function output2pbf(font, start, end, outputDir) {
  if (start > 65535) {
    console.log("done!");
    return;
  }
  fontnik.range({ font: font, start: start, end: end }, function (err, res) {
    var outputFilePath = path.resolve(
      outputDir + "/" + start + "-" + end + ".pbf"
    );
    fs.writeFile(outputFilePath, res, function (err) {
      if (err) {
        console.error(err);
      } else {
        output2pbf(font, end + 1, end + 1 + 255, outputDir);
      }
    });
  });
}

var process = require("process");
var args = process.argv.slice(2);

fs.readdir(args[0], (err, files) => {
  files.forEach((file) => {
    convert(
      args[0].replace(/\/$/, "") + "/" + file,
      "/output/" + file.replace(/\.(otf|ttf)$/, "")
    );
    console.log("converted", file);
  });
});
