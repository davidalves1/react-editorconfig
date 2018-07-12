#!/usr/bin/env node

const fs = require('fs');
const co = require('co');
const prompt = require('co-prompt');

// Get the current file path
const path = `${process.cwd()}/.editorconfig`;

const main = async () => {
  await co(function* () {
    if (fs.existsSync(path)) {
      const option = yield prompt('The .editorconfig file exists. You want to replace it? (Y/n): ');

      if (option.toLowerCase() === 'n') {
        return console.log('Your .editorconfig has not been modified! :/');
      }
    }

    const template = [
      '# http://editorconfig.org',
      'root = false',
      '\r',
      '[*]',
      'charset = utf-8',
      'end_of_line = lf',
      'indent_size = 2',
      'indent_style = space',
      'insert_final_newline = true',
      'trim_trailing_whitespace = true',
      'max_line_length = 120',
      '\r',
      '[*.md]',
      'max_line_length = 0',
      'trim_trailing_whitespace = false',
      '\r',
      '[COMMIT_EDITMSG]',
      'max_line_length = 0',
    ];

    try {
      fs.writeFileSync(path, template.join('\n'), 'utf8');
      return console.log('Yeah! Thanks. :)');
    } catch (err) {
      return console.log(err);
    }
  })

  console.log('\nBye!');
  process.exit();
}

main();
