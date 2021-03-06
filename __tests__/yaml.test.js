import { readFileSync } from 'fs';
import { trimEnd } from 'lodash';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/yaml_tests/${filename}`;

test('raw hexletNested', () => {
  const expected = trimEnd(readFileSync(pathTo('hexletNested_raw_expected'), 'utf-8'));
  expect(getDiff(pathTo('hexletNested_before.yaml'), pathTo('hexletNested_after.yaml'))).toBe(expected);
});

test('raw all', () => {
  const expected = trimEnd(readFileSync(pathTo('all_raw_expected'), 'utf-8'));
  expect(getDiff(pathTo('all_before.yaml'), pathTo('all_after.yaml'))).toBe(expected);
});

test('plain hexletNested', () => {
  const expected = trimEnd(readFileSync(pathTo('hexletNested_plain_expected'), 'utf-8'));
  expect(getDiff(pathTo('hexletNested_before.yaml'), pathTo('hexletNested_after.yaml'), 'plain')).toBe(expected);
});

test('plain all', () => {
  const expected = trimEnd(readFileSync(pathTo('all_plain_expected'), 'utf-8'));
  expect(getDiff(pathTo('all_before.yaml'), pathTo('all_after.yaml'), 'plain')).toBe(expected);
});

test('json hexletNested', () => {
  const expected = trimEnd(readFileSync(pathTo('hexletNested_json_expected.json'), 'utf-8'));
  expect(getDiff(pathTo('hexletNested_before.yaml'), pathTo('hexletNested_after.yaml'), 'json')).toBe(expected);
});

test('json all', () => {
  const expected = trimEnd(readFileSync(pathTo('all_json_expected.json'), 'utf-8'));
  expect(getDiff(pathTo('all_before.yaml'), pathTo('all_after.yaml'), 'json')).toBe(expected);
});
