--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _ActorToMovie; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_ActorToMovie" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


--
-- Name: _GenreToMovie; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_GenreToMovie" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: actors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.actors (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: actors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.actors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: actors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.actors_id_seq OWNED BY public.actors.id;


--
-- Name: directors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.directors (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: directors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.directors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: directors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.directors_id_seq OWNED BY public.directors.id;


--
-- Name: genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    year integer NOT NULL,
    director text NOT NULL,
    poster text NOT NULL
);


--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: tracker; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tracker (
    id integer NOT NULL,
    user_id integer NOT NULL,
    movie_id integer NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: tracker_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tracker_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tracker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tracker_id_seq OWNED BY public.tracker.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: watched; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.watched (
    id integer NOT NULL,
    user_id integer NOT NULL,
    movie_id integer NOT NULL,
    created_at timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: watched_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.watched_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: watched_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.watched_id_seq OWNED BY public.watched.id;


--
-- Name: actors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actors ALTER COLUMN id SET DEFAULT nextval('public.actors_id_seq'::regclass);


--
-- Name: directors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.directors ALTER COLUMN id SET DEFAULT nextval('public.directors_id_seq'::regclass);


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: tracker id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracker ALTER COLUMN id SET DEFAULT nextval('public.tracker_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: watched id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watched ALTER COLUMN id SET DEFAULT nextval('public.watched_id_seq'::regclass);


--
-- Data for Name: _ActorToMovie; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."_ActorToMovie" VALUES (1, 1);
INSERT INTO public."_ActorToMovie" VALUES (2, 1);
INSERT INTO public."_ActorToMovie" VALUES (3, 1);
INSERT INTO public."_ActorToMovie" VALUES (4, 1);
INSERT INTO public."_ActorToMovie" VALUES (5, 1);
INSERT INTO public."_ActorToMovie" VALUES (6, 2);
INSERT INTO public."_ActorToMovie" VALUES (7, 2);
INSERT INTO public."_ActorToMovie" VALUES (8, 2);
INSERT INTO public."_ActorToMovie" VALUES (9, 2);
INSERT INTO public."_ActorToMovie" VALUES (10, 2);
INSERT INTO public."_ActorToMovie" VALUES (11, 3);
INSERT INTO public."_ActorToMovie" VALUES (12, 3);
INSERT INTO public."_ActorToMovie" VALUES (13, 3);
INSERT INTO public."_ActorToMovie" VALUES (14, 3);
INSERT INTO public."_ActorToMovie" VALUES (15, 3);
INSERT INTO public."_ActorToMovie" VALUES (16, 3);


--
-- Data for Name: _GenreToMovie; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."_GenreToMovie" VALUES (1, 1);
INSERT INTO public."_GenreToMovie" VALUES (2, 1);
INSERT INTO public."_GenreToMovie" VALUES (3, 1);
INSERT INTO public."_GenreToMovie" VALUES (4, 1);
INSERT INTO public."_GenreToMovie" VALUES (1, 2);
INSERT INTO public."_GenreToMovie" VALUES (4, 2);
INSERT INTO public."_GenreToMovie" VALUES (5, 3);
INSERT INTO public."_GenreToMovie" VALUES (6, 3);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations VALUES ('1c6fc705-c5cf-447f-b8f3-9559f401495d', '6230be2c21060003b3cbad183f3f681bf5f507206fdbd8484aafbb0ad305e923', '2023-01-27 03:23:21.362652-03', '20230127062321_init', NULL, NULL, '2023-01-27 03:23:21.326338-03', 1);


--
-- Data for Name: actors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.actors VALUES (1, 'michael b. jordan');
INSERT INTO public.actors VALUES (2, 'tenoch huerta');
INSERT INTO public.actors VALUES (3, 'lupita nyong''o');
INSERT INTO public.actors VALUES (4, 'angela basset');
INSERT INTO public.actors VALUES (5, 'letitia wright');
INSERT INTO public.actors VALUES (6, 'sam worthington');
INSERT INTO public.actors VALUES (7, 'zoe saldaña');
INSERT INTO public.actors VALUES (8, 'sigourney weaver');
INSERT INTO public.actors VALUES (9, 'kate winslet');
INSERT INTO public.actors VALUES (10, 'stephen lang');
INSERT INTO public.actors VALUES (11, 'laura dern');
INSERT INTO public.actors VALUES (12, 'jeff goldblum');
INSERT INTO public.actors VALUES (13, 'sam neill');
INSERT INTO public.actors VALUES (14, 'richard attenborough');
INSERT INTO public.actors VALUES (15, 'samuel l. jackson');
INSERT INTO public.actors VALUES (16, 'bd wong');


--
-- Data for Name: directors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.directors VALUES (1, 'ryan coogler');
INSERT INTO public.directors VALUES (2, 'steven spielberg');
INSERT INTO public.directors VALUES (3, 'james cameron');


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.genres VALUES (1, 'action');
INSERT INTO public.genres VALUES (2, 'heroes');
INSERT INTO public.genres VALUES (3, 'marvel');
INSERT INTO public.genres VALUES (4, 'drama');
INSERT INTO public.genres VALUES (5, 'adventure');
INSERT INTO public.genres VALUES (6, 'classic');


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.movies VALUES (1, 'black panter wakanda forever', 'Second movie of black panther', 2022, 'ryan coogler', 'https://lumiere-a.akamaihd.net/v1/images/pp_disney_blackpanther_wakandaforever_1289_d3419b8f.jpeg');
INSERT INTO public.movies VALUES (2, 'avatar the way of the water', 'Second movie of james cameron avatar', 2022, 'james cameron', 'https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/148856/CORAL_1SHT_DIGITAL_PAYOFF_sRGB_V4.jpg');
INSERT INTO public.movies VALUES (3, 'jurassic park', 'classic first jurassic park', 1993, 'steven spielberg', 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f00bf346385235.58520f9022451.jpg');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: tracker; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: watched; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: actors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.actors_id_seq', 32, true);


--
-- Name: directors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.directors_id_seq', 6, true);


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genres_id_seq', 12, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movies_id_seq', 3, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- Name: tracker_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tracker_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: watched_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.watched_id_seq', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: actors actors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actors
    ADD CONSTRAINT actors_pkey PRIMARY KEY (id);


--
-- Name: directors directors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.directors
    ADD CONSTRAINT directors_pkey PRIMARY KEY (id);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: tracker tracker_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracker
    ADD CONSTRAINT tracker_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: watched watched_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watched
    ADD CONSTRAINT watched_pkey PRIMARY KEY (id);


--
-- Name: _ActorToMovie_AB_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "_ActorToMovie_AB_unique" ON public."_ActorToMovie" USING btree ("A", "B");


--
-- Name: _ActorToMovie_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_ActorToMovie_B_index" ON public."_ActorToMovie" USING btree ("B");


--
-- Name: _GenreToMovie_AB_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "_GenreToMovie_AB_unique" ON public."_GenreToMovie" USING btree ("A", "B");


--
-- Name: _GenreToMovie_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_GenreToMovie_B_index" ON public."_GenreToMovie" USING btree ("B");


--
-- Name: actors_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX actors_name_key ON public.actors USING btree (name);


--
-- Name: directors_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX directors_name_key ON public.directors USING btree (name);


--
-- Name: genres_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX genres_name_key ON public.genres USING btree (name);


--
-- Name: movies_title_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX movies_title_key ON public.movies USING btree (title);


--
-- Name: sessions_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX sessions_token_key ON public.sessions USING btree (token);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: _ActorToMovie _ActorToMovie_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ActorToMovie"
    ADD CONSTRAINT "_ActorToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES public.actors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ActorToMovie _ActorToMovie_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_ActorToMovie"
    ADD CONSTRAINT "_ActorToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GenreToMovie _GenreToMovie_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_GenreToMovie"
    ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GenreToMovie _GenreToMovie_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_GenreToMovie"
    ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movies movies_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_fk0 FOREIGN KEY (director) REFERENCES public.directors(name) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tracker tracker_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracker
    ADD CONSTRAINT tracker_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tracker tracker_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tracker
    ADD CONSTRAINT tracker_fk1 FOREIGN KEY (movie_id) REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: watched watched_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watched
    ADD CONSTRAINT watched_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: watched watched_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watched
    ADD CONSTRAINT watched_fk1 FOREIGN KEY (movie_id) REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

