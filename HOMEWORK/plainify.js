function plainify(obj) {
  const result = {};

  function recurse(cur, prefix = '') {
    for (const key of Object.keys(cur)) {
      const value = cur[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        recurse(value, newKey);
      } else {
        result[newKey] = value;
      }
    }
  }

  recurse(obj);
  return result;
}

const nested = {
  user: {
    name: 'Alice',
    address: {
      city: 'Wonderland',
      zip: 12345
    }
  },
  items: [1, 2, 3],
  active: true
};

console.log(plainify(nested));












/*
{
  'user.name': 'Alice',
  'user.address.city': 'Wonderland',
  'user.address.zip': 12345,
  'items': [1,2,3],
  'active': true
}
*/
