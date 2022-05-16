import { NextApiRequest, NextApiResponse } from "next";
import { cleanIds, filterByType, sql } from "../../lib/db";
import { niokr } from "../../types/db-types";

type niokrWithGroupsId = niokr & { groups_id: number[] };

export const niokrActions = {
  cleanParams: (params: Partial<niokrWithGroupsId>) => {
    const { id=null, year=null, groups_id=null } = filterByType(Number, params);
    const { type=null, name=null, financing=null, customer=null} = filterByType(String, params);
    return { id, year, type, name, financing, customer, groups_id };
  },
  search: async (rawParams: Partial<niokrWithGroupsId>) => {
    const params = niokrActions.cleanParams(rawParams);
    return sql`select * from view_niokr(${params.id}, ${params.year}, ${params.type}, ${params.name}, ${params.financing}, ${params.customer}, ${params.groups_id})` as any;
  },
  add: async (rawParams: Partial<niokrWithGroupsId>) => {
    const params = niokrActions.cleanParams(rawParams);
    const groups_id = cleanIds(rawParams.groups_id as any);
    return sql`call add_niokr(${params.name}, ${params.year}, ${params.type}, ${params.financing}, ${params.customer}, ${groups_id})` as any;
  },
  edit: async (rawParams: Partial<niokrWithGroupsId>) => {
    const params = niokrActions.cleanParams(rawParams);
    const groups_id = cleanIds(rawParams.groups_id as any);
    return sql`call up_niokr(${params.id}, ${params.name}, ${params.year}, ${params.type}, ${params.financing}, ${params.customer}, ${groups_id})` as any;
  },
  delete: async (rawParams: Partial<niokr>) => {
    const params = niokrActions.cleanParams(rawParams);
    return sql`delete from niokr where id = ${params.id}` as any;
  },
}

export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    response: await niokrActions.search({}),
  })
}
