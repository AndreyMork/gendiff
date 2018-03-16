import { readFileSync } from 'fs';
import { trimEnd } from 'lodash';
import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/json_tests/${filename}`;

test('hexletNested', () => {
  const expected = trimEnd(readFileSync(pathTo('hexletNested_expected'), 'utf-8'));
  expect(getDiff(pathTo('hexletNested_before.json'), pathTo('hexletNested_after.json'))).toBe(expected);
});

test('all', () => {
  const expected = trimEnd(readFileSync(pathTo('all_expected'), 'utf-8'));
  expect(getDiff(pathTo('all_before.json'), pathTo('all_after.json'))).toBe(expected);
});
