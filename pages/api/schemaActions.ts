import { NextApiRequest, NextApiResponse } from "next";
import { sql } from '../../lib/db';

export type Column = { table_name: string, column_name: string, data_type: string };
export type ColumnsByTableName = { [table_name: string]: Column[] };

export const schemaActions = {
  search: async (_) => {
    const columns: Column[] = await sql`select table_name, column_name, data_type from information_schema.columns where table_catalog = 'Audit' and table_schema = 'public'` as any;

    const columnsByTableName: ColumnsByTableName = columns.reduce((res: ColumnsByTableName, column: Column) => {
      return {
        ...res,
        [column.table_name]: [
          ...(res[column.table_name] || []),
          column
        ]
      };
    }, {});

    return columnsByTableName;
  }
}

export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    response: await schemaActions.search({}),
  })
}

