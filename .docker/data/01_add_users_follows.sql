-- Migration: add users_follows table for follow/unfollow
CREATE TABLE IF NOT EXISTS public.users_follows (
    id integer NOT NULL,
    follower_id integer NOT NULL,
    following_id integer NOT NULL,
    value boolean NOT NULL
);

CREATE SEQUENCE IF NOT EXISTS public.users_follows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_follows_id_seq
    OWNED BY public.users_follows.id;

ALTER TABLE ONLY public.users_follows
    ALTER COLUMN id SET DEFAULT nextval('public.users_follows_id_seq'::regclass);

ALTER TABLE ONLY public.users_follows
    ADD CONSTRAINT users_follows_pkey PRIMARY KEY (id);
