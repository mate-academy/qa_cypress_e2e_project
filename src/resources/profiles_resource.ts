import { Drash } from '../deps.ts'
import BaseResource from './base_resource.ts'
import UserModel from '../models/user_model.ts'
import UsersFollowsModel from '../models/users_follows_model.ts'

class ProfilesResource extends BaseResource {
  static paths = [
    '/profiles/:username',
    '/profiles/:username/follow'
  ]

  public async GET () {
    console.log('Handling ProfilesResource GET.')
    const username = this.request.getPathParam('username') || ''
    console.log(`Handling the following user's profile: ${username}.`);

    if (!username) {
      this.response.status_code = 422;
      this.response.body = {
        errors: {
          username: ['Username path param is required.']
        }
      }
      // TODO(ebebbington) Return response
    }

    this.response.body = {
      profile: null
    }

    const result = await UserModel.where({ username });
    if (result.length <= 0) {
      return this.errorResponse(404, 'Profile not found.')
    }

    const entity = result[0].toEntity();
    const following = await this.isFollowingUser(result[0].id);
    this.response.body = {
      profile: {
        ...entity,
        following
      }
    }

    return this.response;
  }

  public async POST (): Promise<Drash.Http.Response> {
    console.log('Handling ProfilesResource POST.')

    if (this.request.url_path.includes('/follow')) {
      return await this.toggleFollow();
    }

    return this.errorResponse(404, 'Unknown profile action.')
  }

  protected async toggleFollow (): Promise<Drash.Http.Response> {
    console.log('Handling action: toggleFollow.')
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      return this.errorResponse(400, '`user_id` field is required.')
    }

    const username = this.request.getPathParam('username') || ''
    const result = await UserModel.where({ username });
    if (result.length <= 0) {
      return this.errorResponse(404, `Profile "${username}" not found.`);
    }

    const targetUser = result[0];
    if (targetUser.id === currentUser.id) {
      return this.errorResponse(400, 'You cannot follow yourself.')
    }

    try {
      let follow;
      const action = this.request.getBodyParam('action')
      switch (action) {
        case 'set':
          follow = await UsersFollowsModel.where({
            follower_id: currentUser.id,
            following_id: targetUser.id
          })
          if (follow.length > 0) {
            follow[0].value = true;
            await follow[0].save();
          } else {
            follow = new UsersFollowsModel(
              currentUser.id,
              targetUser.id,
              true
            )
            await follow.save();
          }
          break;
        case 'unset':
          follow = await UsersFollowsModel.where({
            follower_id: currentUser.id,
            following_id: targetUser.id
          })
          if (!follow || follow.length === 0) {
            return this.errorResponse(
              404,
              'Can\'t unfollow a user you are not following.'
            )
          }
          follow[0].value = false;
          await follow[0].save();
          break
        default:
          return this.errorResponse(400, 'Invalid follow action.')
      }
    } catch (error) {
      console.log(error);
      return this.errorResponse(500, 'Follow feature not available.')
    }

    const entity = targetUser.toEntity();
    this.response.body = {
      profile: {
        ...entity,
        following: await this.isFollowingUser(targetUser.id)
      }
    }
    return this.response;
  }

  protected async isFollowingUser (targetUserId: number): Promise<boolean> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      return false;
    }
    try {
      const follow = await UsersFollowsModel.where({
        follower_id: currentUser.id,
        following_id: targetUserId
      })
      return follow.length > 0 && follow[0].value === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default ProfilesResource;
