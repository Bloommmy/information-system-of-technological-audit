import Layout  from '../components/Layout'
import loginStyles from '../styles/login.module.css'
import { GetServerSideProps } from 'next'
import { tryLogin } from "../lib/auth";
import { FormField, Input } from "../components/input";

export default function Login({ message }) {
  return (
    <Layout title="Авторизация">
      <form className={loginStyles.wrap} method="GET">
        <h1 className={loginStyles.header}>Авторизация</h1>
        <FormField title="Логин">
          <Input
            name="login"
            className={loginStyles.input + ' ' + loginStyles.rowData}
            placeholder="mail@example.com"
          />
        </FormField>
        <FormField title="Пароль">
          <Input
            name="password"
            className={loginStyles.rowData}
            type="password"
            placeholder="••••••••••"
          />
        </FormField>
        <div>{message}</div>
        <button className={loginStyles.authButton}>Войти</button>
      </form>
    </Layout>
  )
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = tryLogin(context);
  console.log(response);
  return response;
}
