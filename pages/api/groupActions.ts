import { NextApiRequest, NextApiResponse } from "next";
import { filterByType, sql } from "../../lib/db";
import { groups } from "../../types/db-types";

export const groupActions = {
  cleanParams: (group: Partial<groups>) => {
    const { id=null, department_id=null } = filterByType(Number, group);
    const { supervisor=null, directions=null, keywords=null } = filterByType(String, group);
    return { id, department_id, supervisor, directions, keywords };
  },
  search: async (rawParams: Partial<groups>) => {
    const params = groupActions.cleanParams(rawParams);
    return  sql`select * from view_groups(${params.id}, ${params.department_id}, ${params.supervisor}, ${params.directions}, ${params.keywords})` as any;
  },
  add: async (rawParams: Partial<groups>) => {
    const params = groupActions.cleanParams(rawParams);
    return sql`insert into groups ${sql(params, 'department_id', 'supervisor', 'directions', 'keywords')}` as any;
  },
  edit: async (rawParams: Partial<groups>) => {
    const params = groupActions.cleanParams(rawParams);
    return sql`update groups set ${sql(params, 'department_id', 'supervisor', 'directions', 'keywords')} where id = ${params.id}` as any;
  },
  delete: async (rawParams: Partial<groups>) => {
    const params = groupActions.cleanParams(rawParams);
    return sql`delete from groups where id = ${params.id}` as any;
  },
}


export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    response: await groupActions.search({}),
  })
}
