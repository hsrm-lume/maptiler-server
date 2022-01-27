const fontnik = require(".");
const fs = require("fs");
const path = require("path");

/**
 * converts a single file to pbf
 * @param fileName the filename to be converted
 * @param outputDir the directory where to save the created pbf files
 */
const convert = function (fileName, outputDir) {
  // load the file
  const font = fs.readFileSync(path.resolve(__dirname + "/" + fileName));
  // create the output directory if it does not exist
  fs.mkdir(outputDir, { recursive: true }, () =>
    // process the file
    output2pbf(font, 0, 255, outputDir)
  );
};

/**
 * recursive converter function to iterate over the passed font data
 * to convert it with fontnik
 */
function output2pbf(font, start, end, outputDir) {
  if (start > 65535) {
    console.log("done!");
    return;
  }
  // pass current iteration data to fontnik
  fontnik.range({ font: font, start: start, end: end }, function (_, res) {
    // prepare the output filename (one otf -> multiple pbf)
    const outputFilePath = path.resolve(
      outputDir + "/" + start + "-" + end + ".pbf"
    );
    // write results to file
    fs.writeFile(outputFilePath, res, function (err) {
      if (err) console.error(err);
      else output2pbf(font, end + 1, end + 1 + 255, outputDir); // recurse
    });
  });
}

const process = require("process");
const args = process.argv.slice(2);
/**
 * convert all files in given args[0] directory to pbf files
 */
fs.readdir(args[0], (_, files) =>
  files.forEach((file) => {
    convert(
      args[0].replace(/\/$/, "") + "/" + file,
      "/output/" + file.replace(/\.(otf|ttf)$/, "")
    );
    console.log("converted", file);
  })
);
