import { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '../../lib/db';
import { department } from "../../types/db-types";

export const trlActions = {
  search: async (_) => {
    const items: department[] = await sql`select * from trl` as any;

    return items;
  }
}


export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    response: await trlActions.search({}),
  })
}
