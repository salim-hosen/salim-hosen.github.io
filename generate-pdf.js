const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
    console.log("Starting PDF generation...");
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--font-render-hinting=medium"
        ]
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

        const filePath = "file://" + path.resolve(__dirname, "resume.html").replace(/\\/g, "/");
        console.log(`Loading resume from: ${filePath}`);

        await page.goto(filePath, {
            waitUntil: ["load", "domcontentloaded"],
            timeout: 30000
        });

        // Wait for web fonts to load
        await page.evaluateHandle("document.fonts.ready");
        // Give a short pause for any layout calculations
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Emulate print media for accurate print CSS
        await page.emulateMediaType("print");

        const outDir = path.resolve(__dirname, "file");
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }
        const outputPath = path.join(outDir, "Mohammad-Salim-Hosen-Resume.pdf");

        await page.pdf({
            path: outputPath,
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

        console.log(`PDF generated successfully at: ${outputPath}`);
    } catch (err) {
        console.error("Error generating PDF:", err);
        process.exitCode = 1;
    } finally {
        await browser.close();
    }
})();