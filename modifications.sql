failed to get console mode for stdout: The handle is invalid.
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

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
-- Name: category; Type: TABLE; Schema: public; Owner: app
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.category OWNER TO app;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: app
--

CREATE SEQUENCE public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO app;

--
-- Name: doctrine_migration_versions; Type: TABLE; Schema: public; Owner: app
--

CREATE TABLE public.doctrine_migration_versions (
    version character varying(191) NOT NULL,
    executed_at timestamp(0) without time zone DEFAULT NULL::timestamp without time zone,
    execution_time integer
);


ALTER TABLE public.doctrine_migration_versions OWNER TO app;

--
-- Name: product; Type: TABLE; Schema: public; Owner: app
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price double precision NOT NULL,
    image character varying(1000) DEFAULT NULL::character varying
);


ALTER TABLE public.product OWNER TO app;

--
-- Name: product_category; Type: TABLE; Schema: public; Owner: app
--

CREATE TABLE public.product_category (
    product_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.product_category OWNER TO app;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: app
--

CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO app;

--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: app
--

COPY public.category (id, name) FROM stdin;
14	Produits
15	Zip & Hoodie
16	Knits a Crewneck
17	Jackets
\.


--
-- Data for Name: doctrine_migration_versions; Type: TABLE DATA; Schema: public; Owner: app
--

COPY public.doctrine_migration_versions (version, executed_at, execution_time) FROM stdin;
DoctrineMigrations\\Version20240307125735	2024-09-20 16:23:22	57
DoctrineMigrations\\Version20240919140325	2024-09-20 16:23:22	22
DoctrineMigrations\\Version20240919142554	2024-09-20 16:23:22	7
DoctrineMigrations\\Version20240920124727	2024-09-20 16:23:22	0
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: app
--

COPY public.product (id, name, description, price, image) FROM stdin;
12	3ETAGE JACKET 	INK LEATHER JACKET\n\nAxel is 184cm wearing size Medium\nLys is 170cm wearing size Medium\n\nDetails :\nTrue to size / Boxy fit \n	189	https://davrilsupply.com/cdn/shop/files/LEATHER-2.jpg?format=pjpg&v=1726056839&width=1100
13	BLACK DVRL KNIT 	BLACK DVRL KNIT\n\nAxel is 184cm wearing size Medium\nLys is 170cm wearing size Small\n\n    Heavy materials \n    Oversize \n    Boxy fit\n    Embroidery logo\n    100% COTTON\n    Main color : BLACK / PURPLE TONE\n    Ready to ship\n    Worldwide shipping\n\n	94	https://davrilsupply.com/cdn/shop/files/knit-noir.jpg?format=pjpg&v=1726133730&width=550
15	 BIOM CREWNECK 	BIOM CREWNECK\n\n    Heavy french terry material\n    100% Cotton\n    480 g/m┬▓\n    SILICON PATCH FRONT\n	79	https://davrilsupply.com/cdn/shop/files/crewneckblackdavril.png?format=pjpg&v=1705571534&width=550
17	GREY INK ZIP 	GREY INK ZIP\n\n    Heavy Material\n    440 g/m┬▓\n    Embroidery front\n    Color : CREAM/CAMEL\n	94	https://davrilsupply.com/cdn/shop/files/grey-ink-zip.jpg?format=pjpg&v=1724942251&width=550
18	GREY THORNY HOODIE 	GREY THORNY HOODIE\n\n    TRUE TO SIZE ; SIZE-UP FOR OVERSIZED EFFECT\n    100% Cotton\n    Heavy french terry material\n    SCREENPRINT FRONT	94	https://davrilsupply.com/cdn/shop/files/greythornyFRONTY.png?format=pjpg&v=1714570227&width=550
16	BLACK LUNAR ZIP	BLACK LUNAR ZIP - ULTRA HEAVY\n\nAxel is 184cm wearing size Medium\n\n    620GSM\n    Heavy print front\n    Oversized fit	120	https://davrilsupply.com/cdn/shop/files/fatt.jpg?format=pjpg&v=1726133568&width=550
14	DARK GREY D	DARK GREY D CREWNECK\n\n    True to size \n    100% Cotton\n    Heavy fabrics : 380 gr/m \n    FRENCH TERRY material\n	74	https://davrilsupply.com/cdn/shop/files/crewneck-davril-grey.jpg?format=pjpg&v=1694533105&width=550
19	ASHES ROOTS 	ASHES ROOTS\n    Canvas material\n    1.2 million embroidery stitches\n    Metal logo\n\n	199	https://davrilsupply.com/cdn/shop/products/resize-ashes-roots-front.jpg?format=pjpg&v=1677763903&width=550
\.


--
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: app
--

COPY public.product_category (product_id, category_id) FROM stdin;
12	17
13	16
15	16
17	15
18	15
16	15
14	16
19	17
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app
--

SELECT pg_catalog.setval('public.category_id_seq', 23, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app
--

SELECT pg_catalog.setval('public.product_id_seq', 20, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: doctrine_migration_versions doctrine_migration_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.doctrine_migration_versions
    ADD CONSTRAINT doctrine_migration_versions_pkey PRIMARY KEY (version);


--
-- Name: product_category product_category_pkey; Type: CONSTRAINT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY (product_id, category_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: idx_cdfc735612469de2; Type: INDEX; Schema: public; Owner: app
--

CREATE INDEX idx_cdfc735612469de2 ON public.product_category USING btree (category_id);


--
-- Name: idx_cdfc73564584665a; Type: INDEX; Schema: public; Owner: app
--

CREATE INDEX idx_cdfc73564584665a ON public.product_category USING btree (product_id);


--
-- Name: product_category fk_cdfc735612469de2; Type: FK CONSTRAINT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT fk_cdfc735612469de2 FOREIGN KEY (category_id) REFERENCES public.category(id) ON DELETE CASCADE;


--
-- Name: product_category fk_cdfc73564584665a; Type: FK CONSTRAINT; Schema: public; Owner: app
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT fk_cdfc73564584665a FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

