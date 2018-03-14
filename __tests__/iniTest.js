import { readFileSync } from 'fs';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/ini_tests/${filename}`;

test('hexlet', () => {
  const expected = readFileSync(pathTo('hexlet_expected'), 'utf-8');
  expect(getDiff(pathTo('hexlet_before.ini'), pathTo('hexlet_after.ini'))).toBe(expected);
});

test('all', () => {
  const expected = readFileSync(pathTo('all_expected'), 'utf-8');
  expect(getDiff(pathTo('all_before.ini'), pathTo('all_after.ini'))).toBe(expected);
});

test('remove', () => {
  const expected = readFileSync(pathTo('remove_expected'), 'utf-8');
  expect(getDiff(pathTo('remove_before.ini'), pathTo('remove_after.ini'))).toBe(expected);
});

test('add', () => {
  const expected = readFileSync(pathTo('add_expected'), 'utf-8');
  expect(getDiff(pathTo('add_before.ini'), pathTo('add_after.ini'))).toBe(expected);
});

test('no-diff', () => {
  const expected = readFileSync(pathTo('no_diff_expected'), 'utf-8');
  expect(getDiff(pathTo('no_diff_before.ini'), pathTo('no_diff_after.ini'))).toBe(expected);
});

test('empty', () => {
  const expected = readFileSync(pathTo('empty_expected'), 'utf-8');
  expect(getDiff(pathTo('empty_before.ini'), pathTo('empty_after.ini'))).toBe(expected);
});
