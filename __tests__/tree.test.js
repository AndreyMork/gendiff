import getDiff from '../src';

const pathTo = filename => `${__dirname}/__fixtures__/json_tests/${filename}`;

test('hexlet', () => {
  getDiff(pathTo('hexlet_before.json'), pathTo('hexlet_after.json'));
});

test('all', () => {
  getDiff(pathTo('all_before.json'), pathTo('all_after.json'));
});
