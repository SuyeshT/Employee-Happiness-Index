import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import { AUTH_GET_PERMISSIONS } from 'aor-permissions';
import Cookies from 'js-cookie';
import * as constant from './constant';
export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const dataToSendForRequest = { "identifier": username, "password": password }

    const request = new Request(constant.API + '/auth/local', {
      method: 'POST',
      body: JSON.stringify(dataToSendForRequest),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {

          throw new Error("Wrong username or password", response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.user.role.name === "Administrator") {
          window.location.replace("/users");
        }
        if (data.user.role.name === "Authenticated") {
          window.location.replace("/dashboard");
        }
        if (data.user.role.name === "Public") {
          window.location.replace("/dashboard");
        }
        localStorage.setItem('loggeduserreportid', data.user.reporter_name);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('Full_name', data.user.fullName);
        localStorage.setItem('user_id', JSON.stringify(data.user.id));
        localStorage.setItem('user_id12', data.user.id);
        localStorage.setItem('userdesignationid', data.user.empdesignation);
        localStorage.setItem('user_designation_id', data.user.id);
        localStorage.setItem('jwt', data["jwt"]);
        localStorage.setItem('role', data.user.role.id);
        Cookies.set('jwt', data["jwt"]);
        localStorage.setItem('permissions', data.user.role.name);
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('permissions');
    localStorage.removeItem('user_id');
    localStorage.clear();
    Cookies.remove('jwt');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('jwt');
      Cookies.remove('jwt');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    const check_auth = Cookies.get('jwt') || localStorage.getItem('jwt');
    return check_auth ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = Cookies.get('permissions') || localStorage.getItem('permissions');

    return role ? Promise.resolve(role) : Promise.reject();
  }
  return Promise.resolve();
};