export function authenticate({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  if (username === 'test' && password === 'T3st1ng') {
    return {
      userId: 1,
      username: 'test',
    };
  }

  return null;
}
