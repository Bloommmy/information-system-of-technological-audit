import { GetServerSideProps } from 'next'
import { dissertations } from "../../types/db-types";
import { useRouter } from "next/router";
import TablePage, { TablePageProps, buildGetServerSideProps } from "../../components/TablePage";
import { dissertationActions } from "../api/dissertationActions";
import { groupActions } from "../api/groupActions";
import { GroupIdsSchema } from "../../lib/groupIdsSchema";

export default function Dissertations({ items, selectors, authData }: TablePageProps<dissertations, any>) {
  const { groups } = selectors;
  const router = useRouter();

  return <TablePage
    authData={authData}
    rows={items}
    query={router.query}
    title={'Диссертаций'}
    names={{
      'view': { actionName: '', popupTitle: 'Просмотр диссертации' },
      'search': { actionName: 'Поиск', popupTitle: 'Поиск диссертаций' },
      'add': { actionName: 'Добавить', popupTitle: 'Добавление диссертации' },
      'edit': { actionName: 'Сохранить', popupTitle: 'Редактирование диссертации' },
    }}
    schema={{
      id: { title: 'ID' },
      year: { title: 'Год защиты' },
      subject: { title: 'Тема' },
      author: { title: 'Автор' },
      academic_degree: { title: 'Ученая степень' },
      group_id: GroupIdsSchema(groups, false),
    }}
  />
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = buildGetServerSideProps(dissertationActions, async () => {
  return {
    groups: await groupActions.search({}),
  };
});
