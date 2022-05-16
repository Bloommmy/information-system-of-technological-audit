import { NextApiRequest, NextApiResponse } from "next";
import { filterByType, sql } from "../../lib/db";
import { dissertations } from "../../types/db-types";

export const dissertationActions = {
  cleanParams: (params: Partial<dissertations>) => {
    const { id=null, group_id=null, year=null } = filterByType(Number, params);
    const { subject=null, author=null, academic_degree=null } = filterByType(String, params);
    return { id, group_id, year, subject, author, academic_degree };
  },
  search: async (rawParams: Partial<dissertations>) => {
    const params = dissertationActions.cleanParams(rawParams);
    return sql`select * from view_dissertations(${params.id}, ${params.group_id}, ${params.subject}, ${params.author}, ${params.academic_degree}, ${params.year})` as any;
  },
  add: async (rawParams: Partial<dissertations>) => {
    const params = dissertationActions.cleanParams(rawParams);
    return sql`call add_dissertations(${params.group_id}, ${params.subject}, ${params.author}, ${params.academic_degree}, ${params.year})` as any;
  },
  edit: async (rawParams: Partial<dissertations>) => {
    const params = dissertationActions.cleanParams(rawParams);
    return sql`call up_dissertations(${params.id}, ${params.group_id}, ${params.subject}, ${params.author}, ${params.academic_degree}, ${params.year})` as any;
  },
  delete: async (rawParams: Partial<dissertations>) => {
    const params = dissertationActions.cleanParams(rawParams);
    return sql`delete from dissertations where id = ${params.id}` as any;
  },
}


export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    response: await dissertationActions.search({}),
  })
}
