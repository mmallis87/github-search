import { GITHUB_TOKEN } from '../util/consts';

const get = (url) => {
  return fetch(url, {
    headers: {
      // TODO replace this read-only token by OAuth2 authorization grant flow
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  }).then(async (res) => {
    if (res.status >= 400 && res.status < 600) {
      throw await res.json();
    }

    return res.json();
  });
};

const take = (url, count) => {
  return get(`${url}&per_page=${count}`);
};

export default { get, take };
