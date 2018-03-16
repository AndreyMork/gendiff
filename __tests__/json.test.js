import { readFileSync } from 'fs';
import { trimEnd } from 'lodash';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/json_tests/${filename}`;

test('hexlet', () => {
  const expected = trimEnd(readFileSync(pathTo('hexlet_expected'), 'utf-8'));
  expect(getDiff(pathTo('hexlet_before.json'), pathTo('hexlet_after.json'))).toBe(expected);
});

test('all', () => {
  const expected = trimEnd(readFileSync(pathTo('all_expected'), 'utf-8'));
  expect(getDiff(pathTo('all_before.json'), pathTo('all_after.json'))).toBe(expected);
});

test('remove', () => {
  const expected = trimEnd(readFileSync(pathTo('remove_expected'), 'utf-8'));
  expect(getDiff(pathTo('remove_before.json'), pathTo('remove_after.json'))).toBe(expected);
});

test('add', () => {
  const expected = trimEnd(readFileSync(pathTo('add_expected'), 'utf-8'));
  expect(getDiff(pathTo('add_before.json'), pathTo('add_after.json'))).toBe(expected);
});

test('no-diff', () => {
  const expected = trimEnd(readFileSync(pathTo('no_diff_expected'), 'utf-8'));
  expect(getDiff(pathTo('no_diff_before.json'), pathTo('no_diff_after.json'))).toBe(expected);
});
