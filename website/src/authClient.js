import { AUTH_LOGIN} from 'admin-on-rest';
import { AUTH_GET_PERMISSIONS } from 'aor-permissions';
import { decode } from 'jsonwebtoken';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request('https://mydomain.com/authenticate', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token, permissions }) => {
        const decoded = decode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('permissions', decoded.permissions);
      });
  }
  // ... usual authClient code

  if (type === AUTH_GET_PERMISSIONS) {
    return Promise.resolve(localStorage.getItem('permissions'));
  }
};