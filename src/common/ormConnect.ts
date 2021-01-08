import { getConnectionManager, getRepository, Repository } from 'typeorm';
import { Rune } from '../db/entity/Rune';

export const ormConnect = async <R>(
  entities: typeof Rune[],
  connectionName: string,
  callback: (repository: Repository<Rune>[]) => R
): Promise<R> => {
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

  return callback(repositories);
};
