const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function injectConsoleCapture() {
  try {
    console.log('🔧 Injecting console capture script into HTML files...');
    
    // Find all HTML files in the build output
    const htmlFiles = await glob('**/*.html', {
      cwd: './out',
      absolute: true,
    });
    
    if (htmlFiles.length === 0) {
      console.log('⚠️  No HTML files found in ./out directory');
      return;
    }
    
    const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
    let injectedCount = 0;
    
    for (const filePath of htmlFiles) {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if script is already injected
        if (content.includes(scriptTag)) {
          continue;
        }
        
        // Inject script before closing head tag or at the beginning of body
        if (content.includes('</head>')) {
          content = content.replace('</head>', `  ${scriptTag}\n</head>`);
        } else if (content.includes('<body')) {
          content = content.replace(/(<body[^>]*>)/, `$1\n  ${scriptTag}`);
        } else {
          // Fallback: inject at the beginning of the HTML
          content = scriptTag + '\n' + content;
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        injectedCount++;
        
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
      }
    }
    
    console.log(`✅ Console capture script injected into ${injectedCount} HTML files`);
    
  } catch (error) {
    console.error('❌ Error during console capture injection:', error);
    process.exit(1);
  }
}

// Run the injection
injectConsoleCapture();