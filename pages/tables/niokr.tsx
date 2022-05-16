import { GetServerSideProps } from 'next'
import { niokr } from "../../types/db-types";
import { useRouter } from "next/router";
import TablePage, { TablePageProps, buildGetServerSideProps } from "../../components/TablePage";
import { niokrActions } from "../api/niokrActions";
import { groupActions } from "../api/groupActions";
import { EnumSelect } from "../../components/input";
import { GroupIdsSchema } from "../../lib/groupIdsSchema";

export default function Niokr({ items, selectors, authData }: TablePageProps<niokr, any>) {
  const { groups } = selectors;
  const router = useRouter();

  return <TablePage
    authData={authData}
    rows={items}
    query={router.query}
    title={'Научно-исследовательские и опытно-конструкторские работы'}
    names={{
      'view': { actionName: '', popupTitle: 'Просмотр НИОКР' },
      'search': { actionName: 'Поиск', popupTitle: 'Поиск НИОКР' },
      'add': { actionName: 'Добавить', popupTitle: 'Добавление НИОКР' },
      'edit': { actionName: 'Сохранить', popupTitle: 'Редактирование НИОКР' },
    }}
    schema={{
      id: { title: 'ID' },
      name: { title: 'Название' },
      year: { title: 'Год защиты' },
      type: {
        title: 'Тип',
        renderFormRow: EnumSelect('бюджетная', 'внебюджетная', 'международная')
      },
      financing: { title: 'Источник финансирования', checkDisabled: (item) => item.type !== 'внебюджетная' },
      customer: { title: 'Заказчик', checkDisabled: (item) => item.type === 'внебюджетная' },
      groups_id:  GroupIdsSchema(groups, true),
    }}
  />
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = buildGetServerSideProps(niokrActions, async () => {
  return {
    groups: await groupActions.search({}),
  };
});
