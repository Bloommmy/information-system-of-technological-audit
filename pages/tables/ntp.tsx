import { GetServerSideProps } from 'next'
import { ntp, ois, trl } from "../../types/db-types";
import { useRouter } from "next/router";
import TablePage, { TablePageProps, buildGetServerSideProps } from "../../components/TablePage";
import { groupActions } from "../api/groupActions";
import { oisActions } from "../api/oisActions";
import { GroupIdsSchema  } from "../../lib/groupIdsSchema";
import { Select } from "../../components/input";
import { ntpActions } from "../api/ntpActions";
import { trlActions } from "../api/trlAction";
import { separateLines } from "../../lib/separateLines";

export default function Ntp({ items, selectors, authData }: TablePageProps<ntp, any>) {
  const { groups, ois: oisItems, trl } = selectors;
  const oisById = Object.values(oisItems).reduce<{ [ois_id: number]: ois }>((res, oisItem: ois) => ({ ...res, [oisItem.id]: oisItem}), {});
  const router = useRouter();
  const hideInTable = true;

  return <TablePage
    authData={authData}
    rows={items}
    query={router.query}
    title={'НТП'}
    names={{
      'view': { actionName: '', popupTitle: 'Просмотр НТП' },
      'search': { actionName: 'Поиск', popupTitle: 'Поиск НТП' },
      'add': { actionName: 'Добавить', popupTitle: 'Добавление НТП' },
      'edit': { actionName: 'Сохранить', popupTitle: 'Редактирование НТП' },
    }}
    schema={{
      id: { title: 'ID' },
      name: { title: 'Наименование' },
      title: { title: 'Название' },
      advantages: { title: 'Преимущества', hideInTable },
      limitations: { title: 'Недостатки', hideInTable },
      specifications: { title: 'Технологические характеристики', hideInTable },
      trl_id: {
        title: 'TRL',
        render: (item_id) => trl.find((item: trl) => item.id === item_id)?.trl,
        renderFormRow: (props, action) => (
          <Select
            key={props.key}
            items={trl}
            getOptionLabel={(trl: trl) => trl.trl + ' - ' + trl.definition}
            {...props}
          />
        )
      },
      degree_novelty: { title: 'Степень новизны', hideInTable },
      license: { title: 'Лицензионное соглашение', hideInTable },
      market_char: { title: 'Характеристика рынка', hideInTable },
      market_geo: { title: 'Предполагаемая география рынка', hideInTable },
      consumers: { title: 'Потенциальные потребители', hideInTable },
      price: { title: 'Предполагаемая цена', hideInTable },
      keywords: { title: 'Ключевые слова', render: separateLines(';') },
      ois_id: {
        title: 'ОИС',
        render: (group_ids) => (
          <>
            {String(group_ids || '').split('; ').map((ois_id, index, array) => (
              <>
                <a
                  key={ois_id}
                  href={'/tables/ois?id=' + ois_id} target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >{oisById[ois_id]?.title}</a>
                {(index + 1) < array.length ? <br /> : ''}
              </>
            ))}
          </>
        ),
        renderFormRow: (props, action) => (
          <Select
            key={props.key}
            multiple={action !== 'search'}
            items={oisItems}
            getOptionLabel={(item: ois) => item.number + ' - ' + item.title}
            {...props}
          />
        )
      },
      groups_id: GroupIdsSchema(groups, true),
    }}
  />
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = buildGetServerSideProps(ntpActions, async () => {
  return {
    groups: await groupActions.search({}),
    ois: await oisActions.search({}),
    trl: await trlActions.search({}),
  };
});
