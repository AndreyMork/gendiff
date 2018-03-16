import { readFileSync } from 'fs';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/yaml_tests/${filename}`;

test('hexletNested', () => {
  const expected = readFileSync(pathTo('hexletNested_expected'), 'utf-8');
  expect(getDiff(pathTo('hexletNested_before.yaml'), pathTo('hexletNested_after.yaml'))).toBe(expected);
});

test('all', () => {
  const expected = readFileSync(pathTo('all_expected'), 'utf-8');
  expect(getDiff(pathTo('all_before.yaml'), pathTo('all_after.yaml'))).toBe(expected);
});
