import { GetServerSideProps } from 'next'
import { ois } from "../../types/db-types";
import { useRouter } from "next/router";
import TablePage, { TablePageProps, buildGetServerSideProps } from "../../components/TablePage";
import { groupActions } from "../api/groupActions";
import { oisActions } from "../api/oisActions";
import { GroupIdsSchema  } from "../../lib/groupIdsSchema";
import { EnumSelect } from "../../components/input";
const oisViews = [
  "Произведения науки, литературы и искусства",
  "Программы для электронных вычислительных машин (программы для ЭВМ)",
  "Базы данных",
  "Исполнения",
  "Фонограммы",
  "Сообщение в эфир или по кабелю радио- или телепередач (вещание организаций эфирного или кабельного вещания)",
  "Изобретения",
  "Полезные модели",
  "Промышленные образцы",
  "Селекционные достижения",
  "Топологии интегральных микросхем",
  "Секреты производства (ноу-хау)",
  "Фирменные наименования",
  "Товарные знаки и знаки обслуживания",
  "Наименования мест происхождения товаров",
  "Коммерческие обозначения",
];

export default function Ois({ items, selectors, authData }: TablePageProps<ois, any>) {
  const { groups } = selectors;
  const router = useRouter();

  return <TablePage
    authData={authData}
    rows={items}
    query={router.query}
    title={'ОИС'}
    names={{
      'view': { actionName: '', popupTitle: 'Просмотр ОИС' },
      'search': { actionName: 'Поиск', popupTitle: 'Поиск ОИС' },
      'add': { actionName: 'Добавить', popupTitle: 'Добавление ОИС' },
      'edit': { actionName: 'Сохранить', popupTitle: 'Редактирование ОИС' },
    }}
    schema={{
      id: { title: 'ID' },
      number: { title: 'Номер' },
      title: { title: 'Название' },
      view: { title: 'Вид', renderFormRow: EnumSelect(...oisViews) },
      authors: { title: 'Авторы' },
      owner: { title: 'Владелец' },
      year: { title: 'Год' },
      groups_id: GroupIdsSchema(groups, true),
    }}
  />
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = buildGetServerSideProps(oisActions, async () => {
  return {
    groups: await groupActions.search({}),
  };
});
