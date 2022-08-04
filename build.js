const shell = require('shelljs');

if (!shell.which('wasm-pack')) {
    console.error("Run npm install to install all dependencies first");
}

// Clean up any existing built content:
shell.rm('-rf', 'dist');
shell.rm('-rf', 'pkg.*');
shell.mkdir('dist');

const TARGETS = {
    web: 'web',
    bundler: 'bundler',
    nodejs: 'node'
}

for(const [target, targetOutput] of Object.entries(TARGETS)) {
    shell.rm('-rf', 'pkg');
    shell.exec(`wasm-pack build --target ${target}`);
    shell.mv('pkg', `pkg.${targetOutput}`);
    shell.rm(`pkg.${targetOutput}/{LICENSE,package.json,README.md,.gitignore}`);
}