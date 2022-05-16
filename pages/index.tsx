import Layout  from '../components/Layout'
import utilsStyles  from '../styles/utils.module.css'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { checkAuth, wrapRedirect } from "../lib/auth";

export default function Home({ authData }) {
  return (
    <Layout title="Добро пожаловать!" authData={authData}>
      <div style={{ textAlign: 'center' }}>
        <Link href="/tables/groups"><span className={utilsStyles.menuItem}>Научные группы</span></Link>
        <Link href="/tables/niokr"><span className={utilsStyles.menuItem}>НИОКР</span></Link>
        <Link href="/tables/dissertations"><span className={utilsStyles.menuItem}>Диссертации</span></Link>
        <Link href="/tables/ois"><span className={utilsStyles.menuItem}>ОИС</span></Link>
        <Link href="/tables/ntp"><span className={utilsStyles.menuItem}>НТП</span></Link>
      </div>
    </Layout>
  )
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context) => {
  const authData = checkAuth(context);
  if (!authData) return wrapRedirect();

  return {
    props: { authData }
  }
}
