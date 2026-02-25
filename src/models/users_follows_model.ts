import BaseModel from './base_model.ts'
import { QueryResult } from '../deps.ts'

export interface UsersFollowsEntity {
  follower_id: number
  following_id: number
  id?: number
  value: boolean
}

export function createUsersFollowsModelObject (
  inputObj: UsersFollowsEntity
): UsersFollowsModel {
  return new UsersFollowsModel(
    inputObj.follower_id,
    inputObj.following_id,
    inputObj.value,
    inputObj.id
  )
}

export class UsersFollowsModel extends BaseModel {
  public follower_id: number;
  public following_id: number;
  public id: number;
  public value: boolean;
  public query = ''

  constructor (
    followerId: number,
    followingId: number,
    value: boolean,
    id: number = -1
  ) {
    super();
    this.follower_id = followerId;
    this.following_id = followingId;
    this.value = value;
    this.id = id;
  }

  public async delete (): Promise<boolean> {
    let query = 'DELETE FROM users_follows WHERE id = ?'
    query = this.prepareQuery(query, [String(this.id)]);

    try {
      const client = await BaseModel.connect();
      const dbResult: QueryResult = await client.query(query);
      client.release();
      if (dbResult.rowCount! < 1) {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  public async save (): Promise<UsersFollowsModel | null> {
    if (this.id != -1) {
      return await this.update();
    }

    let query = 'INSERT INTO users_follows ' +
      ' (follower_id, following_id, value)' +
      ' VALUES (?, ?, ?);'
    query = this.prepareQuery(query, [
      String(this.follower_id),
      String(this.following_id),
      String(this.value)
    ])

    const client = await BaseModel.connect();
    const dbResult: QueryResult = await client.query(query);
    client.release();
    if (dbResult.rowCount! < 1) {
      return null;
    }

    const savedResult = await UsersFollowsModel.where({
      follower_id: this.follower_id,
      following_id: this.following_id
    })
    if (savedResult.length === 0) {
      return null;
    }
    return savedResult[0];
  }

  public async update (): Promise<UsersFollowsModel | null> {
    let query = 'UPDATE users_follows SET ' +
      'value = ? ' +
      `WHERE id = '${this.id}';`;
    query = this.prepareQuery(query, [String(this.value)]);
    const client = await BaseModel.connect();
    const dbResult: QueryResult = await client.query(query);
    client.release();
    if (dbResult !== undefined) {
      if (dbResult.rowCount! < 1) {
        return null;
      }
    }

    const updatedResult = await UsersFollowsModel.where({
      follower_id: this.follower_id,
      following_id: this.following_id
    })
    if (updatedResult.length >= 1) {
      return updatedResult[0];
    }
    return null;
  }

  static async where (
    fields: Record<string, string | number>
  ): Promise<UsersFollowsModel[] | []> {
    const results = await BaseModel.Where('users_follows', fields);
    if (results.length <= 0) {
      return [];
    }
    const follows: UsersFollowsModel[] = [];
    results.forEach((result) => {
      const entity: UsersFollowsEntity = {
        follower_id: typeof result.follower_id === 'number'
          ? result.follower_id
          : 0,
        following_id: typeof result.following_id === 'number'
          ? result.following_id
          : 0,
        id: typeof result.id === 'number' ? result.id : 0,
        value: typeof result.value === 'boolean' ? result.value : false
      }
      follows.push(createUsersFollowsModelObject(entity));
    })
    return follows;
  }

  static async whereIn (
    column: string,
    values: Array<number | string>
  ): Promise<UsersFollowsModel[] | []> {
    const results = await BaseModel.WhereIn('users_follows', {
      column,
      values
    })
    if (results.length <= 0) {
      return [];
    }
    const follows: UsersFollowsModel[] = [];
    results.forEach((result) => {
      const entity: UsersFollowsEntity = {
        follower_id: typeof result.follower_id === 'number'
          ? result.follower_id
          : 0,
        following_id: typeof result.following_id === 'number'
          ? result.following_id
          : 0,
        id: typeof result.id === 'number' ? result.id : 0,
        value: typeof result.value === 'boolean' ? result.value : false
      }
      follows.push(createUsersFollowsModelObject(entity));
    })
    return follows;
  }

  public toEntity (): UsersFollowsEntity {
    return {
      id: this.id,
      follower_id: this.follower_id,
      following_id: this.following_id,
      value: this.value
    }
  }
}

export default UsersFollowsModel;
