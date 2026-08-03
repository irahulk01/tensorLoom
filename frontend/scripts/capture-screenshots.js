const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const projects = [
  { id: 'icashiq', url: 'https://icashiq.com' },
  { id: 'easydocuments', url: 'https://easydocuments.com' },
  { id: 'studentscorner', url: 'https://studentscorner.com' },
  { id: 'aheeramilk', url: 'https://aheeramilk.netlify.app' },
];

async function capture() {
  const outputDir = path.join(__dirname, '../public/projects');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Launching Playwright browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  for (const project of projects) {
    const outputPath = path.join(outputDir, `${project.id}.png`);
    const page = await context.newPage();
    console.log(`📸 Capturing HD screenshot for ${project.id} (${project.url})...`);
    try {
      await page.goto(project.url, { waitUntil: 'load', timeout: 12000 });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: outputPath, type: 'png', timeout: 10000 });
      console.log(`✅ Saved HD screenshot to ${outputPath}`);
    } catch (err) {
      console.warn(`⚠️ Could not reach ${project.url}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('🎉 Screenshot capture complete!');
}

capture().catch((err) => {
  console.error('❌ Script error:', err);
});
