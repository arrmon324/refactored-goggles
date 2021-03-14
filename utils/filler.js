const { degrees, PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
// const existingPdfBytes = require("./assets/template-pdf-whiteout.pdf");

const fields = {
  firstName: "Daniel",
  lastName: "McChicken",
  age: "22",
  sex: "Male",
  dateTestAdmin: "03/13/2021",
  dateOfBirth: "09/15/1930",
};

const modifyPDF = async (l) => {
  lang = {
    spanish: {
      years: "años",
      sex: { Male: "Masculino", Female: "Mujer" },
    },
    english: {
      years: "years",
      sex: { Male: "Male", Female: "Female" },
    },
  };
  //   const path = "../assets/template-pdf-whiteout.pdf";
  const uint8Array = fs.readFileSync(
    "../assets/pdfs/template-pdf-whiteout-updated-1.pdf"
  );
  const pdfDoc = await PDFDocument.load(uint8Array);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  firstPage.drawText(`${fields.firstName} ${fields.lastName}`, {
    x: 120,
    y: 617,
    size: 9,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`${fields.age} ${lang[l].years}`, {
    x: 120,
    y: 606.5,
    size: 9,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`${fields.dateOfBirth}`, {
    x: 120,
    y: 577.95,
    size: 8,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`${lang[l].sex[fields.sex]}`, {
    x: 235,
    y: 606.5,
    size: 9,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${fields.dateTestAdmin}`, {
    x: 440,
    y: 617,
    size: 8,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`${fields.dateTestAdmin}`, {
    x: 440,
    y: 597,
    size: 8,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawText(`${fields.dateTestAdmin}`, {
    x: 82,
    y: 373.5,
    size: 6,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

(async () => {
  //   console.log(await modifyPDF());
  const pdf = await modifyPDF("spanish");
  fs.writeFile("test.pdf", pdf, (err) => {
    if (err) throw err;

    console.log("The file was succesfully saved!");
  });
})();
