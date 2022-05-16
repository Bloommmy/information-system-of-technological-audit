export type ois_ntp = {
  id: number;
  ois_id: number;
  ntp_id: number;
};
export type department = {
  id: number;
  short_title: string;
  long_title: string;
  faculty: string;
};
export type groups = {
  id: number;
  department_id: number;
  supervisor: string;
  directions: string;
  keywords: string;
};
export type dissertations = {
  id: number;
  group_id: number;
  year: number;
  subject: string;
  author: string;
  academic_degree: string;
};
export type groups_niokr = {
  id: number;
  group_id: number;
  niokr_id: number;
};
export type niokr = {
  id: number;
  year: number;
  type: string;
  name: string;
  financing: string;
  customer: string;
};
export type groups_ois = {
  id: number;
  group_id: number;
  ois_id: number;
};
export type ois = {
  id: number;
  year: number;
  number: string;
  title: string;
  view: string;
  authors: string;
  owner: string;
};
export type trl = {
  id: number;
  trl: string;
  definition: string;
};
export type ntp = {
  id: number;
  trl_id: number;
  price: number;
  specifications: string;
  market_geo: string;
  degree_novelty: string;
  license: string;
  market_char: string;
  consumers: string;
  keywords: string;
  name: string;
  title: string;
  advantages: string;
  limitations: string;
};
export type groups_ntp = {
  id: number;
  group_id: number;
  ntp_id: number;
};
