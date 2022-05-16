import Layout  from '../../components/Layout'
import { GetServerSideProps } from 'next'
import { schemaActions } from "../api/schemaActions";
import { TablePageProps, buildGetServerSideProps } from "../../components/TablePage";

const PgTsTypeMap = {
  'integer': 'number',
  'money': 'number',
  'character varying': 'string',
};

export default function Schema({ items, authData }: TablePageProps<any, any>) {
  return (
    <Layout title="Схема таблиц" authData={authData}>
      <ul>
      {Object.entries(items).map(([table_name, columns]) => (
        <pre key={table_name}>
          export type {table_name} = {'{'}
          <ul>
            {columns.map((column) => (
              <div key={column.column_name}>{column.column_name}: {PgTsTypeMap[column.data_type] || column.data_type};</div>
            ))}
          </ul>
          {'};'}
        </pre>
      ))}
      </ul>
    </Layout>
  )
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = buildGetServerSideProps(schemaActions, async () => {
  return { };
});
