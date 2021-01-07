import { getConnectionManager, getRepository, Repository } from 'typeorm';
import { Rune } from '../db/entity/Rune';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ormConnect = async <R>(
  entities: typeof Rune[],
  connectionName: string,
  callback: (repository: Repository<Rune>[]) => R
) => {
  await getConnectionManager()
    .create({
      type: 'postgres',
      url: process.env.TYPEORM_URL,
      name: connectionName,
      entities,
    })
    .connect();

  const repositories = entities.map((entity) =>
    getRepository(entity, connectionName)
  );

  try {
    return callback(repositories);
  } finally {
    // for some reason this hangs and prevents anything from ever returning
    // connection.close();
  }
};
