const { localStorage } = global.window;

const auth = {
  login(data) {
    console.log('login data: ', data);
    const { user, isSuccess } = data;
    const { username, _id } = user;

    localStorage.username = username;
    localStorage.userId = _id;
    localStorage.isSuccess = isSuccess;
    localStorage.role = user.role;
  },

  setDatalogin(data) {
    localStorage.login = JSON.stringify(data);
  },

  getDataLogin() {
    return localStorage.login ? JSON.parse(localStorage.login) : undefined;
  },

  isSuccess() {
    return localStorage.isSuccess;
  },

  userId() {
    return localStorage.userId;
  },

  username() {
    return localStorage.userName;
  },

  role() {
    return localStorage.role;// || 'MD'; // || 'NURSE';
  },
  isMD() {
    return localStorage.role === 'MD';
  },
  isNurse() {
    return localStorage.role === 'NURSE';
  },

  logout() {
    localStorage.clear();
  },
};

export default auth;
