import { cleanIds, filterByType, sql } from "../../lib/db";
import { niokr, ois } from "../../types/db-types";
import { NextApiRequest, NextApiResponse } from 'next';

type oisWithGroupsId = ois & { groups_id: number[] };

export const oisActions = {
  cleanParams: (params: Partial<oisWithGroupsId>) => {
    const { id=null, year=null, groups_id=null } = filterByType(Number, params);
    const { number=null, title=null, view=null, authors=null, owner=null } = filterByType(String, params);
    return { id, number, title, view, authors, owner, year, groups_id };
  },
  search: async (rawParams: Partial<oisWithGroupsId>) => {
    const params = oisActions.cleanParams(rawParams);
    return sql`select * from view_ois(${params.id}, ${params.number}, ${params.title}, ${params.view}, ${params.authors}, ${params.owner}, ${params.year}, ${params.groups_id})` as any;
  },
  add: async (rawParams: Partial<oisWithGroupsId>) => {
    const params = oisActions.cleanParams(rawParams);
    const groups_id = cleanIds(rawParams.groups_id as any);
    return sql`call add_ois(${params.number}, ${params.title}, ${params.view}, ${params.authors}, ${params.owner}, ${params.year}, ${groups_id})` as any;
  },
  edit: async (rawParams: Partial<oisWithGroupsId>) => {
    const params = oisActions.cleanParams(rawParams);
    const groups_id = cleanIds(rawParams.groups_id as any);
    return sql`call up_ois(${params.id}, ${params.number}, ${params.title}, ${params.view}, ${params.authors}, ${params.owner}, ${params.year}, ${groups_id})` as any;
  },
  delete: async (rawParams: Partial<niokr>) => {
    const params = oisActions.cleanParams(rawParams);
    return sql`delete from ois where id = ${params.id}` as any;
  },
}


export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    response: await oisActions.search({}),
  })
}
