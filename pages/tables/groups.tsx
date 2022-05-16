import { GetServerSideProps } from 'next'
import { department, groups } from "../../types/db-types";
import { departmentActions } from "../api/departmentActions";
import { useRouter } from "next/router";
import TablePage, { TablePageProps, buildGetServerSideProps } from "../../components/TablePage";
import { Select } from "../../components/input";
import { groupActions } from "../api/groupActions";
import { separateLines } from "../../lib/separateLines";
import utilsStyles from "../../styles/utils.module.css";

export default function Groups({ items, selectors, authData }: TablePageProps<groups, any>) {
  const { departments } = selectors;
  const router = useRouter();
  const hideInTable = true;

  return <TablePage
    authData={authData}
    rows={items}
    query={router.query}
    title={'Научные группы'}
    names={{
      'view': { actionName: '', popupTitle: 'Просмотр научной группы' },
      'search': { actionName: 'Поиск', popupTitle: 'Поиск научных групп' },
      'add': { actionName: 'Добавить', popupTitle: 'Добавление научной группы' },
      'edit': { actionName: 'Сохранить', popupTitle: 'Редактирование научной группы' },
    }}
    schema={{
      id: { title: 'ID' },
      department: {
        key: 'department_id',
        textAlign: 'center',
        title: 'Кафедра',
        renderFormRow: (props) => (
          <Select
            items={departments}
            getOptionLabel={(item: department) => item.short_title + ' - ' + item.long_title}
            {...props}
          />
        )
      },
      supervisor: { title: 'Руководитель' },
      directions: { title: 'Научные направления', render: separateLines(';') },
      keywords: { title: 'Ключевые слова', render: separateLines(';') },
      button: { hideInTable, renderFormRow: (props, action, { id }) => {
        if (action !== 'edit' && action !== 'view') return '';
        return (
          <div className={utilsStyles.groupMenu}>
            <a href={"/tables/ois/?groups_id=" + id } target="_blank">ОИС</a>
            <a href={"/tables/ntp/?groups_id=" + id } target="_blank">НТП</a>
            <a href={"/tables/niokr/?groups_id=" + id } target="_blank">НИОКР</a>
            <a href={"/tables/dissertations/?group_id=" + id } target="_blank">Диссертации</a>
          </div>
        );
      }}
    }}
  />
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = buildGetServerSideProps(groupActions, async () => {
  return {
    departments: await departmentActions.search({}),
  };
});
