\connect realworld
CREATE TABLE IF NOT EXISTS user_followings (
  follower_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  followed_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (follower_id, followed_id),
  CHECK (follower_id <> followed_id)
);
