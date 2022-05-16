import Layout  from './Layout'
import { Popup } from "./Popup";
import { Button, FormInput } from "./input";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { GetServerSideProps } from "next";
import { AuthData, checkAuth, wrapRedirect } from "../lib/auth";
import { getPostBody } from "../lib/getPostBody";
import tablePageStyle from './TablePage.module.css';

export const ACTIONS = {
  VIEW: 'view',
  EDIT: 'edit',
  ADD: 'add',
  DELETE: 'delete',
  SEARCH: 'search',
}

type BaseFormName = {
  popupTitle: string,
  actionName: string
};

type TablePageData<R> = {
  authData: AuthData,
  rows: R[],
  query: any,
  title: string,
  schema: TableSchema,
  names: {
    [action: string]: BaseFormName,
  }
};

export type TableSchema = { [key: string]: TableColumnSchema };

export type TableColumnSchema = {
  title?: string,
  render?: (cellData: any) => ReactElement,
  [key: string]: any,
};

type TableProps = {
  rows: { [key: string]: any }[],
  schema: TableSchema,
  onRowClick?: (row: any) => void,
};

export const Table = ({ schema, rows, onRowClick }: TableProps) => {
  const cleanSchema = Object.entries(schema).filter(([_key, row]) => !row.hideInTable);

  return (
    <table className={tablePageStyle.table} style={{ minWidth: '100%' }} >
      <thead>
        <tr>
          {cleanSchema.map(([key, { title }]) => (
            <th key={key}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((group) => (
          <tr key={group.id} onClick={() => onRowClick(group)}>
            {cleanSchema.map(([key, { title, textAlign, render }]) => (
              <td key={key} style={{ textAlign }}>{render ? render(group[key]) : group[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function TablePage<T>({ rows, title, schema, names, authData }: TablePageData<T>) {
  const router = useRouter();
  const { popupAction, ...defaultValue } = router.query;
  const [action, setAction] = useState<string|null>(popupAction ? String(popupAction) : null);
  const [value, setValue] = useState(defaultValue);
  const { popupTitle, actionName } = names[action] || {};
  const isSearchAction = action == ACTIONS.SEARCH;
  const isCreateAction = action == ACTIONS.ADD;
  const formMethod = isSearchAction ? "GET" : 'POST';
  const readOnlyUser = authData.role === 'user';

  return (
    <Layout title={title} authData={authData}>
      <div style={{ marginBottom: '32px' }}>
        <Button onClick={() => setAction('search')} title='Поиск'/>
        <Button onClick={() => setAction('add')} style={{ marginLeft: '5px' }} hidden={authData.role === 'user'} title="Добавить"/>
        <Button onClick={() => location.assign('/')} style={{ float: 'right' }} title="На главную"/>
      </div>
      <Popup key={action + ':' + value.id} show={!!action} name={popupTitle} onClose={() => {
        setValue(defaultValue);
        setAction('');
      }}>
        <form method={formMethod}>
          <FormInput
            title="ID"
            name="id"
            defaultValue={value.id}
            readOnly={!isSearchAction}
            style={{ display: isCreateAction ? 'none' : '' }}
          />
          {Object.entries(schema).map(([key, { renderFormRow, checkDisabled, ...data }]) => {
            const name = data.key || key;
            const onChange = (e) => setValue({ ...value, [e.target.name]: e.target.value });
            const disabled = (checkDisabled && !checkDisabled(value, action))
            const readOnly = (!isSearchAction && readOnlyUser);
            const props = { onChange, key: name, name, disabled, readOnly, defaultValue: value[name], ...data };

            if (key === 'id') return '';

            if (renderFormRow) {
              return renderFormRow(props, action, value);
            }

            return (
              <FormInput {...props} />
            )
          })}
          <Button
            type="submit"
            name="action"
            value={action}
            disabled={readOnlyUser && !isSearchAction}
            hidden={readOnlyUser && !isSearchAction}
            title={actionName}
          />
          <Button
            style={{ float: 'right', color: 'red' }}
            hidden={action != ACTIONS.EDIT || readOnlyUser}
            name="action"
            value="delete"
            confirm="Удалить?"
            title="Удалить"
          />
        </form>
      </Popup>
      <Table
        key='table'
        rows={rows}
        schema={schema}
        onRowClick={(row) => {
          setValue(row);
          setAction(readOnlyUser ? ACTIONS.VIEW: ACTIONS.EDIT);
        }}
      />
    </Layout>
  )
}

export type TablePageProps<I, S> = {
  authData: AuthData,
  items: I[],
  selectors: S,
}

// @ts-ignore
export const buildGetServerSideProps: GetServerSideProps = (section, loadSelectors) => async (context) => {
  // Авторизация
  const authData = checkAuth(context);
  if (!authData) {
    return wrapRedirect();
  }


  // Парсим тело запроса
  const body = await getPostBody(context);

  // Проверка доступа
  const allowedActions = [undefined, 'search'];
  if (!allowedActions.includes(body.action) && authData.role === 'user') {
    return { props: { errorCode: 403 } };
  }

  // методы взаимодействия
  switch (body.action) {
    case ACTIONS.EDIT: await section.edit(body); break;
    case ACTIONS.ADD: await section.add(body); break;
    case ACTIONS.DELETE: await section.delete(body); break;
  }

  // Поиск после каждого действия для последующей отрисовки
  const query = context.query;
  const items = await section.search(query);

  // Загрузка вспомогательной информации
  const selectors = await loadSelectors();

  return { props: { items, selectors, authData } }
}
