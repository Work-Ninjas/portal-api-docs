#!/usr/bin/env node

/**
 * Generate mock OpenAPI spec from production spec
 * Removes security requirements and sets mock server URL
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const SOURCE_SPEC = path.join(__dirname, '..', 'openapi', 'openapi.yaml');
const MOCK_SPEC = path.join(__dirname, '..', 'openapi', 'openapi.mock.yaml');

function generateMockSpec() {
  console.log('🔄 Generating mock OpenAPI spec...');
  
  try {
    // Read source spec
    const sourceContent = fs.readFileSync(SOURCE_SPEC, 'utf8');
    const spec = yaml.load(sourceContent);
    
    console.log(`📖 Read source spec: ${SOURCE_SPEC}`);
    
    // Remove global security requirement
    delete spec.security;
    console.log('🔓 Removed global security requirement');
    
    // Remove security from individual operations
    if (spec.paths) {
      Object.keys(spec.paths).forEach(pathKey => {
        const pathItem = spec.paths[pathKey];
        Object.keys(pathItem).forEach(method => {
          if (typeof pathItem[method] === 'object' && pathItem[method].security) {
            delete pathItem[method].security;
            console.log(`🔓 Removed security from ${method.toUpperCase()} ${pathKey}`);
          }
        });
      });
    }
    
    // Update servers to only include mock server
    spec.servers = [
      {
        url: 'https://mock.api.datahubportal.com',
        description: 'Mock (no auth, example data)'
      }
    ];
    console.log('🌐 Updated servers to mock server only');
    
    // Keep components.securitySchemes for reference but no requirements
    console.log('📚 Keeping security schemes for documentation');
    
    // Update info description to indicate this is mock spec
    if (spec.info) {
      spec.info.description = spec.info.description + `
      
## 🚨 MOCK SERVER SPECIFICATION

This is a derived specification for the mock server only. 
- **No authentication required**
- **Returns example data only**
- **For testing and documentation purposes**

For production/staging APIs, use the main specification with authentication.`;
      
      spec.info.title = spec.info.title + ' (Mock Server)';
    }
    
    // Write mock spec
    const mockContent = yaml.dump(spec, {
      indent: 2,
      lineWidth: 120,
      noRefs: true
    });
    
    fs.writeFileSync(MOCK_SPEC, mockContent, 'utf8');
    console.log(`✅ Generated mock spec: ${MOCK_SPEC}`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error generating mock spec:', error.message);
    process.exit(1);
  }
}

// Check if js-yaml is available
try {
  require('js-yaml');
} catch (error) {
  console.error('❌ js-yaml not found. Please install it first:');
  console.error('npm install js-yaml');
  process.exit(1);
}

// Run the generation
if (require.main === module) {
  generateMockSpec();
}

module.exports = { generateMockSpec };