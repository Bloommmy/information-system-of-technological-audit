
export const appSalt = '';

export const appName = 'Центр трансфера технологий СПбГЭТУ “ЛЭТИ”';

export const postgressConfig = {
  host                 : '127.0.0.1', // Postgres ip address[s] or domain name[s]
  port                 : 5432,             // Postgres server port[s]
  database             : 'Audit',          // Name of database to connect to
  username             : 'user',           // Username of database user
  password             : 'password',         // Password of database user
};

export const authData = {
  'admin:': 'admin',
  'user:': 'user',
}
