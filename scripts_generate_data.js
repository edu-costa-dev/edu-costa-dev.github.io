const fs = require('fs');
const path = require('path');

function readJson(dir) {
    const result = [];
    if (!fs.existsSync(dir)) return result;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.json')) {
            const content = fs.readFileSync(path.join(dir, file), 'utf8');
            try {
                result.push(JSON.parse(content));
            } catch (e) {
                console.error('Error parsing', file);
            }
        }
    }
    return result;
}

const persona = JSON.parse(fs.readFileSync('./user_information/mypersona.json', 'utf8'));
const business = readJson('./user_information/business');
const academic = readJson('./user_information/academic');
const certifications = readJson('./user_information/academic/certification');

const output = {
    persona,
    business,
    academic,
    certifications
};

fs.writeFileSync('data.js', 'const portfolioData = ' + JSON.stringify(output, null, 2) + ';\n');
console.log('data.js generated successfully');
