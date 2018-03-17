import { readFileSync } from 'fs';
import { trimEnd } from 'lodash';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/json_tests/${filename}`;

test('raw hexletNested', () => {
  const expected = readFileSync(pathTo('hexletNested_raw_expected'), 'utf-8');
  expect(getDiff(pathTo('hexletNested_before.json'), pathTo('hexletNested_after.json'))).toBe(expected);
});

test('raw all', () => {
  const expected = readFileSync(pathTo('all_raw_expected'), 'utf-8');
  expect(getDiff(pathTo('all_before.json'), pathTo('all_after.json'))).toBe(expected);
});

test('plain hexletNested', () => {
  const expected = trimEnd(readFileSync(pathTo('hexletNested_plain_expected'), 'utf-8'));
  expect(getDiff(pathTo('hexletNested_before.json'), pathTo('hexletNested_after.json'), 'plain')).toBe(expected);
});

test('plain all', () => {
  const expected = trimEnd(readFileSync(pathTo('all_plain_expected'), 'utf-8'));
  expect(getDiff(pathTo('all_before.json'), pathTo('all_after.json'), 'plain')).toBe(expected);
});

test('json hexletNested', () => {
  const expected = trimEnd(readFileSync(pathTo('hexletNested_json_expected.json'), 'utf-8'));
  expect(getDiff(pathTo('hexletNested_before.json'), pathTo('hexletNested_after.json'), 'json')).toBe(expected);
});

test('json all', () => {
  const expected = trimEnd(readFileSync(pathTo('all_json_expected.json'), 'utf-8'));
  expect(getDiff(pathTo('all_before.json'), pathTo('all_after.json'), 'json')).toBe(expected);
});
