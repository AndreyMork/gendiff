import { readFileSync } from 'fs';
import { trimEnd } from 'lodash';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/yaml_tests/${filename}`;

test('hexlet', () => {
  const expected = trimEnd(readFileSync(pathTo('hexlet_expected'), 'utf-8'));
  expect(getDiff(pathTo('hexlet_before.yaml'), pathTo('hexlet_after.yaml'))).toBe(expected);
});

test('all', () => {
  const expected = trimEnd(readFileSync(pathTo('all_expected'), 'utf-8'));
  expect(getDiff(pathTo('all_before.yaml'), pathTo('all_after.yaml'))).toBe(expected);
});
