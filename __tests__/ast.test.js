import { readFileSync } from 'fs';
import parse from '../src/parser';
import ast from '../src/AST';

const pathTo = filename => `${__dirname}/__fixtures__/ast_tests/${filename}`;
const expected = [
  {
    key: 'common',
    type: 'nested',
    children: [
      { key: 'setting1', type: 'common', value: 'Value 1' },
      { key: 'setting2', type: 'remove', value: '200' },
      { key: 'setting3', type: 'remove', value: true },
      { key: 'setting3', type: 'add', value: { key: 'value' } },
      {
        key: 'setting6',
        type: 'nested',
        children: [
          { key: 'key', type: 'common', value: 'value' },
          { key: 'ops', type: 'add', value: 'vops' },
        ],
      },
      { key: 'setting4', type: 'add', value: 'blah blah' },
      { key: 'setting5', type: 'add', value: { key5: 'value5' } },
    ],
  },
  {
    key: 'group1',
    type: 'nested',
    children: [
      { key: 'baz', type: 'change', value: { before: 'bas', after: 'bars' } },
      { key: 'foo', type: 'common', value: 'bar' },
      { key: 'nest', type: 'remove', value: { key: 'value' } },
      { key: 'nest', type: 'add', value: 'str' },
    ],
  },
  { key: 'group2', type: 'remove', value: { abc: '12345' } },
  { key: 'group3', type: 'add', value: { fee: '100500' } },
];


test('json', () => {
  const before = parse(readFileSync(pathTo('before.json'), 'utf-8'), '.json');
  const after = parse(readFileSync(pathTo('after.json'), 'utf-8'), '.json');

  expect(ast(before, after)).toEqual(expected);
});
