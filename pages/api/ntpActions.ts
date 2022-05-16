import { NextApiRequest, NextApiResponse } from 'next';
import { cleanIds, filterByType, sql } from "../../lib/db";
import { niokr, ntp } from "../../types/db-types";

type ntpExtended = ntp & { groups_id: number[] } & { ois_id: any };

export const ntpActions = {
  cleanParams: (params: Partial<ntpExtended>) => {
    const { id=null, trl_id=null, price=null, ois_id=null, groups_id=null } = filterByType(Number, params);
    const { specifications=null, market_geo=null, degree_novelty=null, license=null, market_char=null, consumers=null, keywords=null, name=null, title=null, advantages=null, limitations=null } = filterByType(String, params);

    return {
      id, trl_id, price, ois_id, groups_id,
      specifications, market_geo, degree_novelty, license, market_char, consumers, keywords, name, title, advantages, limitations
    };
  },
  search: async (rawParams: Partial<ntpExtended>) => {
    const params = ntpActions.cleanParams(rawParams);
    return sql`select * from view_ntp(
        id := ${params.id},
        name := ${params.name},
        title := ${params.title},
        advantages := ${params.advantages},
        limitations := ${params.limitations},
        specifications := ${params.specifications},
        trl_id := ${params.trl_id},
        degree_novelty := ${params.degree_novelty},
        license := ${params.license},
        market_char := ${params.market_char},
        consumers := ${params.consumers},
        price := ${params.price},
        market_geo := ${params.market_geo},
        keywords := ${params.keywords},
        ois_id := ${params.ois_id},
        group_id := ${params.groups_id}
    )` as any;
  },
  add: async (rawParams: Partial<ntpExtended>) => {
    const params = ntpActions.cleanParams(rawParams);
    const groups_id = cleanIds(rawParams.groups_id as any);
    const ois_id = cleanIds(rawParams.ois_id as any);
    return sql`call add_ntp(
        add_name := ${params.name},
        add_title := ${params.title},
        add_advantages := ${params.advantages},
        add_limitations := ${params.limitations},
        add_specifications := ${params.specifications},
        add_trl_id := ${params.trl_id},
        add_degree_novelty := ${params.degree_novelty},
        add_license := ${params.license},
        add_market_char := ${params.market_char},
        add_consumers := ${params.consumers},
        add_price := ${params.price},
        add_market_geo := ${params.market_geo},
        add_keywords := ${params.keywords},
        add_ois_id := ${ois_id},
        add_groups_id := ${groups_id}
    )` as any;
  },
  edit: async (rawParams: Partial<ntpExtended>) => {
    const params = ntpActions.cleanParams(rawParams);
    const groups_id = cleanIds(rawParams.groups_id as any);
    const ois_id = cleanIds(rawParams.ois_id as any);

    console.log(rawParams, { ...params, groups_id, ois_id });
    return sql`call up_ntp(
      up_id := ${params.id},
      up_name := ${params.name},
      up_title := ${params.title},
      up_advantages := ${params.advantages},
      up_limitations := ${params.limitations},
      up_specifications := ${params.specifications},
      up_trl_id := ${params.trl_id},
      up_degree_novelty := ${params.degree_novelty},
      up_license := ${params.license},
      up_market_char := ${params.market_char},
      up_consumers := ${params.consumers},
      up_price := ${params.price},
      up_market_geo := ${params.market_geo},
      up_keywords := ${params.keywords},
      up_ois_id := ${ois_id},
      up_groups_id := ${groups_id}
    )` as any;
  },
  delete: async (rawParams: Partial<niokr>) => {
    const params = ntpActions.cleanParams(rawParams);
    return sql`delete from ois where id = ${params.id}` as any;
  },
}

export default async (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    response: await ntpActions.search({}),
  })
}
