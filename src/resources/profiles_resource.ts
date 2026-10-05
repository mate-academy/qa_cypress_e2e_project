import { Drash } from "../deps.ts";
import BaseResource from "./base_resource.ts";
import UserService from "../services/user_service.ts";
import BaseModel from "../models/base_model.ts";
import UserModel from "../models/user_model.ts";

class ProfilesResource extends BaseResource {
  static paths = [
    "/profiles/:username",
    "/profiles/:username/follow",
  ];

  public async GET() {
    console.log("Handling ProfilesResource GET.");
    const username = this.request.getPathParam("username") || "";
    console.log(`Handling the following user's profile: ${username}.`);

    if (!username) {
      this.response.status_code = 422;
      this.response.body = {
        errors: {
          username: ["Username path param is required."],
        },
      };
      // TODO(ebebbington) Return response
    }

    this.response.body = {
      profile: null,
    };

    const result = await UserModel.where({ username: username });
    if (result.length <= 0) {
      return this.errorResponse(404, "Profile not found.");
    }

    const user = result[0];
    const viewer = await UserService.getLoggedInUser(
      this.request.getCookie("drash_sess") || "",
    );
    const client = await BaseModel.connect();
    let following = false;
    try {
      if (typeof viewer !== "boolean") {
        const followed = await client.query(
          "SELECT 1 FROM user_followings " +
            "WHERE follower_id = $1 AND followed_id = $2",
          viewer.id,
          user.id,
        );
        following = followed.rowCount! > 0;
      }
    } finally {
      client.release();
    }
    const entity = { ...user.toEntity(), following };
    this.response.body = {
      profile: entity,
    };

    return this.response;
  }

  public async POST() {
    const viewer = await UserService.getLoggedInUser(
      this.request.getCookie("drash_sess") || "",
    );
    if (typeof viewer === "boolean") {
      return this.errorResponse(401, "Sign in to follow a user.");
    }
    const username = this.request.getPathParam("username") || "";
    const users = await UserModel.where({ username });
    if (!users.length) {
      return this.errorResponse(404, "Profile not found.");
    }
    const user = users[0];
    if (viewer.id === user.id) {
      return this.errorResponse(422, "You cannot follow yourself.");
    }
    const following = this.request.getBodyParam("following");
    if (typeof following !== "boolean") {
      return this.errorResponse(422, "Following must be a boolean.");
    }
    const client = await BaseModel.connect();
    try {
      if (following) {
        await client.query(
          "INSERT INTO user_followings (follower_id, followed_id) " +
            "VALUES ($1, $2) ON CONFLICT DO NOTHING",
          viewer.id,
          user.id,
        );
      } else {
        await client.query(
          "DELETE FROM user_followings " +
            "WHERE follower_id = $1 AND followed_id = $2",
          viewer.id,
          user.id,
        );
      }
    } finally {
      client.release();
    }
    this.response.body = {
      profile: { ...user.toEntity(), following },
    };
    return this.response;
  }
}

export default ProfilesResource;
