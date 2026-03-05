import { Drash } from "../deps.ts";
import BaseResource from "./base_resource.ts";
import UserModel from "../models/user_model.ts";
import BaseModel from "../models/base_model.ts";

class ProfilesResource extends BaseResource {
  static paths = [
    "/profiles/:username",
  ];

  public async GET() {
    console.log("Handling ProfilesResource GET.");
    const username = this.request.getPathParam("username") || "";
    console.log(`Handling the following user's profile: ${username}.`);

    if (!username) {
      return this.errorResponse(422, "Username path param is required.");
    }

    const result = await UserModel.where({ username: username });
    if (result.length <= 0) {
      return this.errorResponse(404, "Profile not found.");
    }

    const entity = result[0].toEntity();

    const currentUser = await this.getCurrentUser();
    let following = false;
    if (currentUser) {
      const client = await BaseModel.connect();
      const followResult = await client.query(
        `SELECT id FROM user_follows WHERE follower_id = $1 AND followed_id = $2`,
        currentUser.id, result[0].id
      );
      client.release();
      following = followResult.rowCount! > 0;
    }

    this.response.body = {
      profile: {
        ...entity,
        following,
      },
    };

    return this.response;
  }

  public async POST() {
    console.log("Handling ProfilesResource POST.");
    const username = this.request.getPathParam("username") || "";
    const action = this.request.getBodyParam("action") as string;
    const userId = this.request.getBodyParam("user_id") as string;

    if (!username) {
      return this.errorResponse(422, "Username path param is required.");
    }

    if (!userId) {
      return this.errorResponse(422, "user_id is required.");
    }

    const result = await UserModel.where({ username: username });
    if (result.length <= 0) {
      return this.errorResponse(404, "Profile not found.");
    }

    const targetUser = result[0];
    const client = await BaseModel.connect();

    if (action === "unfollow") {
      await client.query(
        `DELETE FROM user_follows WHERE follower_id = $1 AND followed_id = $2`,
        userId, targetUser.id
      );
    } else {
      try {
        await client.query(
          `INSERT INTO user_follows (follower_id, followed_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          userId, targetUser.id
        );
      } catch (error) {
        console.log("Follow insert error:", error);
      }
    }

    const followResult = await client.query(
      `SELECT id FROM user_follows WHERE follower_id = $1 AND followed_id = $2`,
      userId, targetUser.id
    );
    client.release();

    const entity = targetUser.toEntity();
    this.response.body = {
      profile: {
        ...entity,
        following: followResult.rowCount! > 0,
      },
    };

    return this.response;
  }
}

export default ProfilesResource;
