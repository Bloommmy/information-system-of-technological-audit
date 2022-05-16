import { GetServerSidePropsContext } from "next/types";
import Cookies from 'cookies';
import { appSalt, authData } from "../config";

const md5 = (data: string) => require('crypto').createHash('md5').update(data).digest("hex");
const generateSalt = () => new Array(10).fill(1).map(() => Math.random().toString(32).substring(2)).join('');

export const tryLogin = (context: GetServerSidePropsContext) => {
  const { req, res, query } = context;
  const { login, password, logout } = query;
  const cookies = new Cookies(req, res);

  if (logout) {
    cookies.set('token', '', {
      httpOnly: false,
    });
    return wrapRedirect('/login');
  }

  if (!login && !password) {
    return {
      props: { message: '' },
    };
  }


  const role = authData[login + ':' + password];

  if (role) {
    const salt = generateSalt();
    const token = signData(login, role, salt);

    cookies.set('token', token, {
      httpOnly: false,
    });

    return wrapRedirect('/');
  }

  return {
    props: { message: 'Wrong login or password' },
  };
}

const signData = (login, role, salt) => {
  const signData = [login, role, salt].join(':');
  return signData + ':' + md5(appSalt + signData);
}

export type AuthData = { login: String, role: String };

export const checkAuth = (context: GetServerSidePropsContext): AuthData|null => {
  const { token } = context.req.cookies;
  if (typeof token != 'string') {
    return null;
  }

  const tokenData = token.split(':');
  if (tokenData.length != 4) {
    return null;
  }

  const [login, role, salt, _sign] = tokenData;
  if (token !== signData(login, role, salt)) {
    return null;
  }

  return { login, role };
}



export const wrapRedirect = (destination = '/login') => {
  return {
    redirect: { destination },
  }
}
