import { readFileSync } from 'fs';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/${filename}`;

test('hexlet data test', () => {
  const expected = readFileSync(pathTo('hexlet_expected'), 'utf-8');
  expect(getDiff(pathTo('hexlet_before.json'), pathTo('hexlet_after.json'))).toBe(expected);
});

test('add/remove/change/not-change test', () => {
  const expected = readFileSync(pathTo('all_expected'), 'utf-8');
  expect(getDiff(pathTo('all_before.json'), pathTo('all_after.json'))).toBe(expected);
});

test('remove test', () => {
  const expected = readFileSync(pathTo('remove_expected'), 'utf-8');
  expect(getDiff(pathTo('remove_before.json'), pathTo('remove_after.json'))).toBe(expected);
});

test('add test', () => {
  const expected = readFileSync(pathTo('add_expected'), 'utf-8');
  expect(getDiff(pathTo('add_before.json'), pathTo('add_after.json'))).toBe(expected);
});

test('no-diff test', () => {
  const expected = readFileSync(pathTo('no_diff_expected'), 'utf-8');
  expect(getDiff(pathTo('no_diff_before.json'), pathTo('no_diff_after.json'))).toBe(expected);
});

test('empty', () => {
  const expected = readFileSync(pathTo('empty_expected'), 'utf-8');
  expect(getDiff(pathTo('empty_before.json'), pathTo('empty_after.json'))).toBe(expected);
});
