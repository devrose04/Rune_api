import { Sequelize } from 'sequelize';
import { Fn } from '../types/Fn';
import { FindSchema } from '../schemas/FindSchema';
import { AddResponse } from '../types/AddResponse';
import { execute } from '../common/execute';
import { IApiContract } from '../types/IApiContract';
// import { getDbConnectionString } from '../common/getDbConnectionString';
// import { rune } from '../../db/models/rune'

export const find: Fn<typeof FindSchema, IApiContract<AddResponse>> = (input) => {
  return execute([FindSchema, input], async () => {
    // const sequelize = new Sequelize(getDbConnectionString);
    // await sequelize.authenticate();

    //

    //

    const response = {
      id: 'Boom, lambda.',
    };

    return response;
  });
};
