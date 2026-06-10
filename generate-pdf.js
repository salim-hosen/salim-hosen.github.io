const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
    const browser = await puppeteer.launch({
        headless: "new"
    });

    const page = await browser.newPage();

    const filePath = "file://" + path.resolve(__dirname, "resume.html");

    await page.goto(filePath, {
        waitUntil: "networkidle0"
    });

    await page.pdf({
        path: "file/Mohammad-Salim-Hosen-Resume.pdf",
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
            top: "0mm",
            right: "0mm",
            bottom: "0mm",
            left: "0mm"
        }
    });

    await browser.close();

    console.log("PDF generated successfully!");
})();