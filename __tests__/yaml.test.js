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

test('remove', () => {
  const expected = trimEnd(readFileSync(pathTo('remove_expected'), 'utf-8'));
  expect(getDiff(pathTo('remove_before.yaml'), pathTo('remove_after.yaml'))).toBe(expected);
});

test('add', () => {
  const expected = trimEnd(readFileSync(pathTo('add_expected'), 'utf-8'));
  expect(getDiff(pathTo('add_before.yaml'), pathTo('add_after.yaml'))).toBe(expected);
});

test('no-diff', () => {
  const expected = trimEnd(readFileSync(pathTo('no_diff_expected'), 'utf-8'));
  expect(getDiff(pathTo('no_diff_before.yaml'), pathTo('no_diff_after.yaml'))).toBe(expected);
});
