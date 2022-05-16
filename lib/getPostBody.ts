import qs from 'querystring';

export const getPostBody = async (context) => {
  const { req } = context;

  if (req.method == "GET") {
    return context.query;
  }

  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      resolve(body);
    });
  }).then((postBody: string) => {
    return qs.parse(postBody);
  });
}
