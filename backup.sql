--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chat_users; Type: TABLE; Schema: public; Owner: mywhatsapp1234
--

CREATE TABLE public.chat_users (
    id integer NOT NULL,
    chat_id uuid,
    user_id uuid
);


ALTER TABLE public.chat_users OWNER TO mywhatsapp1234;

--
-- Name: chat_users_id_seq; Type: SEQUENCE; Schema: public; Owner: mywhatsapp1234
--

CREATE SEQUENCE public.chat_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chat_users_id_seq OWNER TO mywhatsapp1234;

--
-- Name: chat_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mywhatsapp1234
--

ALTER SEQUENCE public.chat_users_id_seq OWNED BY public.chat_users.id;


--
-- Name: chats; Type: TABLE; Schema: public; Owner: mywhatsapp1234
--

CREATE TABLE public.chats (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    name character varying(255) DEFAULT NULL::character varying,
    description character varying(255) DEFAULT NULL::character varying,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.chats OWNER TO mywhatsapp1234;

--
-- Name: files; Type: TABLE; Schema: public; Owner: mywhatsapp1234
--

CREATE TABLE public.files (
    id integer NOT NULL,
    message_id integer,
    file_data bytea NOT NULL,
    file_type character varying(50),
    file_name character varying(255),
    file_size bigint,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.files OWNER TO mywhatsapp1234;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: mywhatsapp1234
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.files_id_seq OWNER TO mywhatsapp1234;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mywhatsapp1234
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: mywhatsapp1234
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    chat_id uuid,
    message text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    read boolean DEFAULT false,
    sender uuid,
    is_deleted boolean DEFAULT false
);


ALTER TABLE public.messages OWNER TO mywhatsapp1234;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: mywhatsapp1234
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO mywhatsapp1234;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mywhatsapp1234
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: mywhatsapp1234
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    phone character varying(15),
    question text,
    answer text,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO mywhatsapp1234;

--
-- Name: chat_users id; Type: DEFAULT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.chat_users ALTER COLUMN id SET DEFAULT nextval('public.chat_users_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Data for Name: chat_users; Type: TABLE DATA; Schema: public; Owner: mywhatsapp1234
--

INSERT INTO public.chat_users VALUES (119, '9d846701-cf28-4262-9811-3e0332fdc689', '6488f230-e1c3-45b5-9e5c-01c8253e548e');
INSERT INTO public.chat_users VALUES (120, '9d846701-cf28-4262-9811-3e0332fdc689', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (121, '8f709408-f5d1-4b00-be7f-8522eda839d4', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (123, '2ce4e120-7c65-45f4-8698-1303b4f70bba', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (124, '2ce4e120-7c65-45f4-8698-1303b4f70bba', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (125, 'fee21089-37df-448f-9326-ecca83c6dfa0', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (126, 'fee21089-37df-448f-9326-ecca83c6dfa0', '6488f230-e1c3-45b5-9e5c-01c8253e548e');
INSERT INTO public.chat_users VALUES (127, 'd14b5725-a645-4785-bda1-9a9a84e0842e', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (128, 'd14b5725-a645-4785-bda1-9a9a84e0842e', '6488f230-e1c3-45b5-9e5c-01c8253e548e');
INSERT INTO public.chat_users VALUES (129, 'a285d8a4-8b78-4724-b182-cc87fedf5778', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (130, 'a285d8a4-8b78-4724-b182-cc87fedf5778', '6488f230-e1c3-45b5-9e5c-01c8253e548e');
INSERT INTO public.chat_users VALUES (131, 'e2bcdcf0-8d3e-4fd3-b2db-c0df60e1c2d3', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (132, 'e2bcdcf0-8d3e-4fd3-b2db-c0df60e1c2d3', '6488f230-e1c3-45b5-9e5c-01c8253e548e');
INSERT INTO public.chat_users VALUES (133, '47cca0e2-32b5-44bd-9ac6-2ffc2544dfc2', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (134, '47cca0e2-32b5-44bd-9ac6-2ffc2544dfc2', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (135, 'a337a6f1-4c36-43da-a2b8-0192bd847a43', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (136, 'a337a6f1-4c36-43da-a2b8-0192bd847a43', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (137, 'd7cf5cc8-445d-41b4-945b-323ab8e1a85c', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (138, 'd7cf5cc8-445d-41b4-945b-323ab8e1a85c', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (139, 'bf812a53-01b1-4af0-8fae-e887eefce10b', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (140, 'bf812a53-01b1-4af0-8fae-e887eefce10b', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (141, 'd76b66de-9f15-440f-8793-0d24b8903f95', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (142, 'd76b66de-9f15-440f-8793-0d24b8903f95', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (143, '7b3c6513-13ae-4b13-86f8-96e140cec211', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (144, '7b3c6513-13ae-4b13-86f8-96e140cec211', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (145, 'c0f6b3ce-6b1b-4f05-8e47-09da4a2a9ff4', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (146, 'c0f6b3ce-6b1b-4f05-8e47-09da4a2a9ff4', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (147, '799f5913-1606-4912-ba67-95bd518e755f', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (148, '799f5913-1606-4912-ba67-95bd518e755f', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (149, '89739346-f17e-4b16-802e-5aa6e49a04c5', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (150, '89739346-f17e-4b16-802e-5aa6e49a04c5', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (151, '840a7927-9f79-43ae-88d7-bad7a89f0e76', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (152, '840a7927-9f79-43ae-88d7-bad7a89f0e76', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (153, '78560345-4781-4ae4-ba79-35b4afaed904', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (154, '78560345-4781-4ae4-ba79-35b4afaed904', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (155, 'f75f1375-a39f-45b0-98a8-50f10e4ff690', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (156, 'f75f1375-a39f-45b0-98a8-50f10e4ff690', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (157, '45eca78a-54d7-4ee4-ab85-40b4b15afb8e', '5768ce8c-3143-4e38-9601-6e862c3f60ec');
INSERT INTO public.chat_users VALUES (158, '45eca78a-54d7-4ee4-ab85-40b4b15afb8e', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (159, 'db5fbae7-e1e9-4644-8d5c-c413b016042a', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (161, 'eb495c91-3bbf-4c6b-9ace-b1d401d73003', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (163, '1838ccc2-0b4a-4832-80f5-da714013517d', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (165, 'c0350f4b-caf3-4d2f-a37d-189bb9a3f3c2', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (167, 'f4d4b417-1c46-466c-9092-038584ecd408', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (169, 'edd4f82f-0d34-4a22-885b-fad159dd2327', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (171, 'ad8da3c8-06a2-431d-9e02-d476a4469d77', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (173, 'e77ff41d-6470-4291-b447-0c5340639eef', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (175, '3a4c39b0-be24-4402-91e6-4ac132c5e4f2', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (177, '9401a909-b346-44f3-a091-5162917c3cc4', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (179, 'df386d4d-3205-45d0-b304-8db5afebef80', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (181, '89c200c0-39b6-42f8-bf7d-cde58909d2dc', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (183, 'e8d72bde-461d-4fc7-9600-ccdf79e31eac', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (185, '12f455ea-4129-4ad5-b0d9-f508a4c097ad', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (187, '6dd7f15a-a810-4e6b-b212-45c890ac8285', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (189, '159a4c3a-6b42-4cd5-83a0-456b7a896a23', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (191, '487eb5d1-223a-498f-8dcd-e38e8b81eb63', '6488f230-e1c3-45b5-9e5c-01c8253e548e');
INSERT INTO public.chat_users VALUES (193, '24316452-f747-4c9a-9310-4291c1064ff6', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (194, '24316452-f747-4c9a-9310-4291c1064ff6', '6488f230-e1c3-45b5-9e5c-01c8253e548e');
INSERT INTO public.chat_users VALUES (195, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (198, '525bbf0d-1cb4-4ca1-aafb-c1e4efe89003', 'b2028dbb-e731-4a60-b4f6-b07efcfa863e');
INSERT INTO public.chat_users VALUES (199, '525bbf0d-1cb4-4ca1-aafb-c1e4efe89003', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (200, 'f14789e6-4a44-46a9-89ea-fe3c82b871b6', 'b2028dbb-e731-4a60-b4f6-b07efcfa863e');
INSERT INTO public.chat_users VALUES (201, 'f14789e6-4a44-46a9-89ea-fe3c82b871b6', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4');
INSERT INTO public.chat_users VALUES (202, '36c1a4f1-5fe6-4598-b9cc-a8d691e6efb3', 'b2028dbb-e731-4a60-b4f6-b07efcfa863e');
INSERT INTO public.chat_users VALUES (204, '46696e31-438f-40a5-a5f6-137629903485', 'b2028dbb-e731-4a60-b4f6-b07efcfa863e');
INSERT INTO public.chat_users VALUES (205, '46696e31-438f-40a5-a5f6-137629903485', '6488f230-e1c3-45b5-9e5c-01c8253e548e');
INSERT INTO public.chat_users VALUES (207, '01ddc546-d186-46dc-a2ae-fe7f73b0b666', '6488f230-e1c3-45b5-9e5c-01c8253e548e');


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: mywhatsapp1234
--

INSERT INTO public.chats VALUES ('bf812a53-01b1-4af0-8fae-e887eefce10b', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:20:10.976947', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('78560345-4781-4ae4-ba79-35b4afaed904', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:37:05.626214', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('f4d4b417-1c46-466c-9092-038584ecd408', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:10:29.82337', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('e2bcdcf0-8d3e-4fd3-b2db-c0df60e1c2d3', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 13:29:55.070827', '0543351321', NULL, true);
INSERT INTO public.chats VALUES ('89c200c0-39b6-42f8-bf7d-cde58909d2dc', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:18:26.368915', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('46696e31-438f-40a5-a5f6-137629903485', 'b2028dbb-e731-4a60-b4f6-b07efcfa863e', '2025-01-06 08:43:29.728142', '0543351321', NULL, false);
INSERT INTO public.chats VALUES ('d76b66de-9f15-440f-8793-0d24b8903f95', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:20:39.395263', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('f75f1375-a39f-45b0-98a8-50f10e4ff690', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 18:16:21.215192', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('47cca0e2-32b5-44bd-9ac6-2ffc2544dfc2', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:00:52.761395', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('edd4f82f-0d34-4a22-885b-fad159dd2327', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:13:48.359334', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('e8d72bde-461d-4fc7-9600-ccdf79e31eac', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:18:50.321873', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('9d846701-cf28-4262-9811-3e0332fdc689', '6488f230-e1c3-45b5-9e5c-01c8253e548e', '2024-12-29 12:48:07.21213', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('01ddc546-d186-46dc-a2ae-fe7f73b0b666', '15ddd9f5-5a3a-436a-9625-b1bc0b31d296', '2025-01-06 08:49:55.701148', '0543351321', NULL, false);
INSERT INTO public.chats VALUES ('7b3c6513-13ae-4b13-86f8-96e140cec211', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:21:55.068186', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('45eca78a-54d7-4ee4-ab85-40b4b15afb8e', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 18:18:37.745486', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('8f709408-f5d1-4b00-be7f-8522eda839d4', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 13:10:12.864335', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('a337a6f1-4c36-43da-a2b8-0192bd847a43', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:02:28.884264', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('ad8da3c8-06a2-431d-9e02-d476a4469d77', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:14:33.85681', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('12f455ea-4129-4ad5-b0d9-f508a4c097ad', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:19:04.429753', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('d7cf5cc8-445d-41b4-945b-323ab8e1a85c', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:18:36.083357', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('c0f6b3ce-6b1b-4f05-8e47-09da4a2a9ff4', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:23:25.760464', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('db5fbae7-e1e9-4644-8d5c-c413b016042a', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 19:59:57.596391', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('e77ff41d-6470-4291-b447-0c5340639eef', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:15:08.641999', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('2ce4e120-7c65-45f4-8698-1303b4f70bba', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 13:10:57.983862', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('6dd7f15a-a810-4e6b-b212-45c890ac8285', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-30 07:10:42.189226', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('b8192508-bcb0-4436-b0f3-c466ff454e2e', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2025-01-03 08:42:45.039656', '0583276841', NULL, false);
INSERT INTO public.chats VALUES ('799f5913-1606-4912-ba67-95bd518e755f', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:34:00.398995', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('eb495c91-3bbf-4c6b-9ace-b1d401d73003', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:05:03.926003', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('3a4c39b0-be24-4402-91e6-4ac132c5e4f2', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:15:50.497976', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('fee21089-37df-448f-9326-ecca83c6dfa0', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 13:25:22.173925', '0543351321', NULL, true);
INSERT INTO public.chats VALUES ('159a4c3a-6b42-4cd5-83a0-456b7a896a23', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-30 07:11:44.451916', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('525bbf0d-1cb4-4ca1-aafb-c1e4efe89003', 'b2028dbb-e731-4a60-b4f6-b07efcfa863e', '2025-01-06 08:15:17.88047', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('89739346-f17e-4b16-802e-5aa6e49a04c5', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:34:34.908592', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('1838ccc2-0b4a-4832-80f5-da714013517d', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:09:18.684747', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('9401a909-b346-44f3-a091-5162917c3cc4', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:16:31.384333', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('d14b5725-a645-4785-bda1-9a9a84e0842e', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 13:26:53.713603', '0543351321', NULL, true);
INSERT INTO public.chats VALUES ('487eb5d1-223a-498f-8dcd-e38e8b81eb63', '6488f230-e1c3-45b5-9e5c-01c8253e548e', '2024-12-30 07:26:21.160144', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('f14789e6-4a44-46a9-89ea-fe3c82b871b6', 'b2028dbb-e731-4a60-b4f6-b07efcfa863e', '2025-01-06 08:30:43.019642', '0534101201', NULL, false);
INSERT INTO public.chats VALUES ('840a7927-9f79-43ae-88d7-bad7a89f0e76', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 15:35:42.702857', '0534101201', NULL, true);
INSERT INTO public.chats VALUES ('c0350f4b-caf3-4d2f-a37d-189bb9a3f3c2', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:09:37.461181', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('df386d4d-3205-45d0-b304-8db5afebef80', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-29 20:17:24.960323', '0583276841', NULL, true);
INSERT INTO public.chats VALUES ('24316452-f747-4c9a-9310-4291c1064ff6', '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', '2024-12-30 07:27:15.294111', '0543351321', NULL, false);
INSERT INTO public.chats VALUES ('a285d8a4-8b78-4724-b182-cc87fedf5778', '5768ce8c-3143-4e38-9601-6e862c3f60ec', '2024-12-29 13:27:33.469499', '0543351321', NULL, true);
INSERT INTO public.chats VALUES ('36c1a4f1-5fe6-4598-b9cc-a8d691e6efb3', 'b2028dbb-e731-4a60-b4f6-b07efcfa863e', '2025-01-06 08:38:29.929516', '0583276841', NULL, false);


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: mywhatsapp1234
--



--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: mywhatsapp1234
--

INSERT INTO public.messages VALUES (57, '9d846701-cf28-4262-9811-3e0332fdc689', '╫₧╫פ ╫á╫⌐╫₧╫ó?', '2024-12-29 12:48:37.403739', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (58, '9d846701-cf28-4262-9811-3e0332fdc689', '╫פ╫ש╫ש', '2024-12-29 12:59:09.342898', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (59, '9d846701-cf28-4262-9811-3e0332fdc689', '╫פ╫ש╫ש', '2024-12-29 12:59:17.695517', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (60, '9d846701-cf28-4262-9811-3e0332fdc689', 'vhh', '2024-12-29 13:03:23.520256', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (61, '8f709408-f5d1-4b00-be7f-8522eda839d4', '╫פ╫ש╫ש', '2024-12-29 13:10:22.484147', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (62, '2ce4e120-7c65-45f4-8698-1303b4f70bba', '╫פ╫ש╫ש', '2024-12-29 13:11:03.372676', false, '5768ce8c-3143-4e38-9601-6e862c3f60ec', false);
INSERT INTO public.messages VALUES (63, '2ce4e120-7c65-45f4-8698-1303b4f70bba', 'hello', '2024-12-29 13:11:24.390811', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (64, 'fee21089-37df-448f-9326-ecca83c6dfa0', '╫פ╫ש╫ש', '2024-12-29 13:25:36.356822', false, '5768ce8c-3143-4e38-9601-6e862c3f60ec', false);
INSERT INTO public.messages VALUES (65, 'a285d8a4-8b78-4724-b182-cc87fedf5778', '╫פ╫ש╫ש', '2024-12-29 13:27:42.89942', false, '5768ce8c-3143-4e38-9601-6e862c3f60ec', false);
INSERT INTO public.messages VALUES (66, 'a285d8a4-8b78-4724-b182-cc87fedf5778', '╫פ╫ש╫ש', '2024-12-29 13:29:58.790913', false, '5768ce8c-3143-4e38-9601-6e862c3f60ec', false);
INSERT INTO public.messages VALUES (67, 'e2bcdcf0-8d3e-4fd3-b2db-c0df60e1c2d3', '╫פ╫ש╫ש', '2024-12-29 14:56:06.558073', false, '5768ce8c-3143-4e38-9601-6e862c3f60ec', false);
INSERT INTO public.messages VALUES (68, '9d846701-cf28-4262-9811-3e0332fdc689', 'hii', '2024-12-29 15:02:42.19249', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (69, 'a337a6f1-4c36-43da-a2b8-0192bd847a43', 'hii', '2024-12-29 15:03:25.888311', false, '5768ce8c-3143-4e38-9601-6e862c3f60ec', false);
INSERT INTO public.messages VALUES (70, 'd7cf5cc8-445d-41b4-945b-323ab8e1a85c', '╫פ╫ש╫ש', '2024-12-29 15:19:46.299156', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (71, 'd7cf5cc8-445d-41b4-945b-323ab8e1a85c', '╫₧╫פ ╫⌐╫£╫ץ╫₧╫ת?', '2024-12-29 15:19:52.168826', false, '5768ce8c-3143-4e38-9601-6e862c3f60ec', false);
INSERT INTO public.messages VALUES (72, 'd76b66de-9f15-440f-8793-0d24b8903f95', '╫פ╫ש╫ש', '2024-12-29 15:35:51.439869', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (73, '840a7927-9f79-43ae-88d7-bad7a89f0e76', '╫פ╫ש╫ש', '2024-12-29 15:36:06.251728', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (74, '840a7927-9f79-43ae-88d7-bad7a89f0e76', '╫₧╫פ ╫á╫⌐╫₧╫ó?', '2024-12-29 15:36:15.018905', false, '5768ce8c-3143-4e38-9601-6e862c3f60ec', false);
INSERT INTO public.messages VALUES (75, '840a7927-9f79-43ae-88d7-bad7a89f0e76', '╫נ╫ק╫£╫פ!:≡ƒעצ', '2024-12-29 15:36:28.508286', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (76, '78560345-4781-4ae4-ba79-35b4afaed904', 'vhh', '2024-12-29 15:37:58.333372', false, '5768ce8c-3143-4e38-9601-6e862c3f60ec', false);
INSERT INTO public.messages VALUES (77, '78560345-4781-4ae4-ba79-35b4afaed904', '╫פ╫ש╫ש', '2024-12-29 15:38:05.413308', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (78, 'f75f1375-a39f-45b0-98a8-50f10e4ff690', '╫פ╫ש╫ש', '2024-12-29 18:16:31.715451', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (79, '9d846701-cf28-4262-9811-3e0332fdc689', '╫פ╫ש╫ש', '2024-12-29 18:33:57.06847', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (80, 'db5fbae7-e1e9-4644-8d5c-c413b016042a', '╫פ╫ש╫ש', '2024-12-29 20:00:01.694897', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (81, 'eb495c91-3bbf-4c6b-9ace-b1d401d73003', '╫פ╫ש╫ש', '2024-12-29 20:05:07.276902', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (82, 'eb495c91-3bbf-4c6b-9ace-b1d401d73003', '╫₧╫פ ╫⌐╫ץ╫º╫¿╫פ?', '2024-12-29 20:05:09.277209', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (83, 'eb495c91-3bbf-4c6b-9ace-b1d401d73003', '╫נ╫¬╫פ ╫ס╫ף╫¿?', '2024-12-29 20:05:12.167422', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (84, '1838ccc2-0b4a-4832-80f5-da714013517d', '╫פ╫ש╫ש', '2024-12-29 20:09:22.595418', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (85, 'c0350f4b-caf3-4d2f-a37d-189bb9a3f3c2', '╫פ╫ש╫ש', '2024-12-29 20:09:43.572918', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (86, 'f4d4b417-1c46-466c-9092-038584ecd408', 'hii', '2024-12-29 20:10:35.106044', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (87, 'f4d4b417-1c46-466c-9092-038584ecd408', 'how are you', '2024-12-29 20:10:40.388503', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (88, 'f4d4b417-1c46-466c-9092-038584ecd408', '?', '2024-12-29 20:10:40.977137', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (89, 'edd4f82f-0d34-4a22-885b-fad159dd2327', '╫₧╫á╫ק╫ש╫פ', '2024-12-29 20:13:51.430137', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (90, 'edd4f82f-0d34-4a22-885b-fad159dd2327', '╫פ╫ש,', '2024-12-29 20:13:55.070126', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (91, 'ad8da3c8-06a2-431d-9e02-d476a4469d77', '╫פ╫ש╫ש', '2024-12-29 20:14:36.745768', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (92, 'e77ff41d-6470-4291-b447-0c5340639eef', '╫₧╫á╫ש╫ק', '2024-12-29 20:15:11.234', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (93, '3a4c39b0-be24-4402-91e6-4ac132c5e4f2', '╫פ╫ש╫ש', '2024-12-29 20:15:53.078896', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (94, '9401a909-b346-44f3-a091-5162917c3cc4', '╫₧╫á╫פ╫ש╫ó╫פ╫ס╫ק', '2024-12-29 20:16:34.233657', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (95, 'df386d4d-3205-45d0-b304-8db5afebef80', '╫á╫פ╫פ╫פ╫ש', '2024-12-29 20:17:28.022905', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (96, '89c200c0-39b6-42f8-bf7d-cde58909d2dc', 'mnbmnbnv,', '2024-12-29 20:18:29.776494', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (97, '12f455ea-4129-4ad5-b0d9-f508a4c097ad', 'nbjhvhjcg', '2024-12-29 20:19:07.582266', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (98, '6dd7f15a-a810-4e6b-b212-45c890ac8285', 'vhh', '2024-12-30 07:10:45.912118', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (99, '24316452-f747-4c9a-9310-4291c1064ff6', '╫פ╫ש╫ש', '2024-12-30 07:27:24.664394', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (100, '24316452-f747-4c9a-9310-4291c1064ff6', '╫פ╫ש╫ש', '2024-12-30 07:34:16.142202', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (101, '24316452-f747-4c9a-9310-4291c1064ff6', '╫פ╫ש╫ש', '2024-12-30 07:35:46.046278', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (102, '24316452-f747-4c9a-9310-4291c1064ff6', '╫פ╫ש╫ש', '2024-12-30 07:35:49.124564', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (103, '24316452-f747-4c9a-9310-4291c1064ff6', '╫פ╫ש', '2024-12-30 07:37:07.436448', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (104, '24316452-f747-4c9a-9310-4291c1064ff6', 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', '2024-12-30 10:26:45.907323', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (105, '24316452-f747-4c9a-9310-4291c1064ff6', 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', '2024-12-30 10:26:46.943657', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (106, '24316452-f747-4c9a-9310-4291c1064ff6', '╫פ╫ש╫ש', '2024-12-30 10:54:39.741222', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (107, '24316452-f747-4c9a-9310-4291c1064ff6', '╫₧╫פ ╫⌐╫£╫ץ╫₧╫ת?', '2024-12-30 10:55:02.115656', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (108, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ס╫í╫ף╫¿', '2024-12-30 10:56:27.546615', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (109, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ó╫ץ╫ס╫ף ╫£╫ת ╫פ╫¢╫£?', '2024-12-30 10:57:09.044334', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (111, '24316452-f747-4c9a-9310-4291c1064ff6', '╫¢╫ƒ', '2024-12-30 10:57:43.434711', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (56, '9d846701-cf28-4262-9811-3e0332fdc689', '╫פ╫ש╫ש', '2024-12-29 12:48:27.384692', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (112, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ש╫⌐ ╫ס╫ó╫ש╫פ ╫ס╫ר╫ó╫ש╫á╫פ ╫⌐╫£ ╫פ╫ª╫נ╫ר╫ש╫¥', '2024-12-30 10:58:11.040011', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (113, '24316452-f747-4c9a-9310-4291c1064ff6', '╫£╫₧╫פ?', '2024-12-30 10:59:00.716249', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (114, '24316452-f747-4c9a-9310-4291c1064ff6', '╫¢╫ש ╫פ╫ץ╫ף╫ó╫ץ╫¬ ╫⌐╫⌐╫£╫ק╫¬ ╫£╫נ ╫¿╫נ╫ש╫¬╫ש', '2024-12-30 11:00:10.343658', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (115, '24316452-f747-4c9a-9310-4291c1064ff6', '╫₧╫¬╫ש?', '2024-12-30 11:02:30.784083', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (116, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ó╫¢╫⌐╫ש╫ץ', '2024-12-30 11:07:51.836961', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (117, '24316452-f747-4c9a-9310-4291c1064ff6', '╫¬╫ס╫ף╫ץ╫º ╫£╫₧╫פ', '2024-12-30 11:10:54.156301', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (118, '24316452-f747-4c9a-9310-4291c1064ff6', '╫£╫נ ╫ש╫ץ╫ף╫ó', '2024-12-30 11:14:07.951298', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (119, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ק╫ש╫ש╫ס ╫ס╫ף╫ש╫º╫פ', '2024-12-30 11:15:58.351302', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (120, '24316452-f747-4c9a-9310-4291c1064ff6', '╫פ╫ש╫ש', '2024-12-30 11:24:34.441323', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (121, '24316452-f747-4c9a-9310-4291c1064ff6', 'hello', '2024-12-30 11:26:38.381986', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (122, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ó╫ץ╫ס╫ף', '2024-12-30 11:28:02.232362', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (123, '24316452-f747-4c9a-9310-4291c1064ff6', '╫⌐╫ץ╫ס', '2024-12-30 11:28:15.142605', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (127, '24316452-f747-4c9a-9310-4291c1064ff6', '╫פ╫ש╫ש', '2025-01-02 16:01:23.748483', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (128, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ש╫ש╫ó╫ש╫ó╫ש╫ó╫ש╫ק╫ó', '2025-01-02 16:01:27.84554', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', false);
INSERT INTO public.messages VALUES (125, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ק╫ש╫ש╫ó╫¢╫ó╫ק╫¢╫ó╫ק', '2024-12-30 11:29:07.577675', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (124, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ª╫ש╫ת╫ק╫¢╫ק╫ת╫ש╫¢╫ó╫ק╫£╫⌐╫ó', '2024-12-30 11:29:01.559454', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', true);
INSERT INTO public.messages VALUES (126, '24316452-f747-4c9a-9310-4291c1064ff6', '╫נ╫á╫ש ╫á╫ץ╫í╫ó ╫פ╫ש╫ץ╫¥', '2024-12-30 11:34:47.608574', false, '6488f230-e1c3-45b5-9e5c-01c8253e548e', true);
INSERT INTO public.messages VALUES (129, '24316452-f747-4c9a-9310-4291c1064ff6', '╫פ╫ש╫ש', '2025-01-02 21:43:54.427755', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (130, '24316452-f747-4c9a-9310-4291c1064ff6', '╫ס╫ף╫ש╫º╫פ', '2025-01-02 22:48:30.054741', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (131, '24316452-f747-4c9a-9310-4291c1064ff6', '╫₧╫פ ╫נ╫ש╫¬╫ת?', '2025-01-02 22:49:41.184477', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (110, '24316452-f747-4c9a-9310-4291c1064ff6', 'di', '2024-12-30 10:57:37.034848', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (132, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒעצ', '2025-01-02 23:27:45.598773', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (133, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒרא', '2025-01-02 23:45:32.628465', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (134, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒלƒ', '2025-01-02 23:45:38.757444', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (135, '24316452-f747-4c9a-9310-4291c1064ff6', 'undefined', '2025-01-02 23:51:52.055176', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (170, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒªº', '2025-01-03 08:24:00.196611', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (136, '24316452-f747-4c9a-9310-4291c1064ff6', '[[object Object][object Object][object Object]', '2025-01-03 00:02:30.558926', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (169, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒשד', '2025-01-03 08:22:54.194884', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (171, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒםי', '2025-01-03 08:25:04.471831', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (172, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒÑ¥', '2025-01-03 08:25:09.762085', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (173, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒל╜', '2025-01-03 08:25:13.020488', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (174, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒºה', '2025-01-03 08:27:08.008525', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (175, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒºו', '2025-01-03 08:27:14.926872', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (176, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒºו', '2025-01-03 08:27:15.107288', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (177, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒ½á', '2025-01-03 08:29:00.386065', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (178, '24316452-f747-4c9a-9310-4291c1064ff6', '≡ƒלן', '2025-01-03 08:36:58.490338', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (179, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '╫פ╫ש╫ש', '2025-01-03 08:43:00.888813', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (180, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '≡ƒÑ░', '2025-01-04 18:50:37.222246', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (181, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '╫פ╫ש╫ש', '2025-01-04 18:51:08.108553', false, '15ddd9f5-5a3a-436a-9625-b1bc0b31d296', false);
INSERT INTO public.messages VALUES (182, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '╫נ╫ש╫צ╫פ ╫¢╫ש╫ú ╫£╫⌐╫₧╫ץ╫ó ╫₧╫₧╫ת', '2025-01-04 18:51:15.305711', false, '15ddd9f5-5a3a-436a-9625-b1bc0b31d296', false);
INSERT INTO public.messages VALUES (183, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '╫נ╫ש╫ת ╫נ╫¬╫פ ╫₧╫¿╫ע╫ש╫⌐?', '2025-01-04 18:56:55.307078', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (184, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '╫ס╫í╫ף╫¿', '2025-01-04 18:56:59.306821', false, '15ddd9f5-5a3a-436a-9625-b1bc0b31d296', false);
INSERT INTO public.messages VALUES (185, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '╫נ╫¬╫פ ╫ס╫נ ╫₧╫ק╫¿?', '2025-01-04 19:24:51.469993', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (186, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '╫¢╫ƒ', '2025-01-04 19:24:55.346801', false, '15ddd9f5-5a3a-436a-9625-b1bc0b31d296', false);
INSERT INTO public.messages VALUES (187, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '≡ƒÑ░', '2025-01-04 19:26:01.582929', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (189, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '≡ƒלן', '2025-01-05 09:24:00.017247', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (188, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '╫פ╫ש╫ש╫ש', '2025-01-05 09:23:51.48616', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', true);
INSERT INTO public.messages VALUES (190, 'f14789e6-4a44-46a9-89ea-fe3c82b871b6', '╫פ╫ש╫ש', '2025-01-06 08:30:48.48984', false, 'b2028dbb-e731-4a60-b4f6-b07efcfa863e', false);
INSERT INTO public.messages VALUES (191, 'f14789e6-4a44-46a9-89ea-fe3c82b871b6', '≡ƒÑ░', '2025-01-06 08:36:06.448053', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (192, 'b8192508-bcb0-4436-b0f3-c466ff454e2e', '≡ƒשג', '2025-01-06 08:36:31.784971', false, '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', false);
INSERT INTO public.messages VALUES (193, '36c1a4f1-5fe6-4598-b9cc-a8d691e6efb3', '╫פ╫ש╫ש', '2025-01-06 08:38:40.979343', false, 'b2028dbb-e731-4a60-b4f6-b07efcfa863e', false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mywhatsapp1234
--

INSERT INTO public.users VALUES ('1705079e-cb0c-4fc1-b4f1-7e2d055d69f4', 'binyamin', 'zaidman', 'binyamin@gmail.com', '1234', '0534101201', '╫₧╫ש ╫צ╫פ ╫נ╫ס╫נ?', '╫נ╫ס╫נ ╫⌐╫£╫ש ╫פ╫ק╫⌐╫ץ╫ס', '2024-12-24 08:11:28.56032');
INSERT INTO public.users VALUES ('15ddd9f5-5a3a-436a-9625-b1bc0b31d296', 'yzthak', 'maizner', 'ytzhak@gmail.com', '1234', '0583276841', '╫נ╫ש╫ת ╫נ╫ץ╫₧╫¿╫ש╫¥ ╫נ╫ס╫נ ╫ס╫נ╫á╫ע╫£╫ש╫¬?', 'father', '2024-12-24 09:14:43.753616');
INSERT INTO public.users VALUES ('8009729e-d197-4abd-a60b-5785c61a30ae', 'yakov', 'thaler', 'yakov@gmail.com', '1234', '0533104223', '2+2=', '4', '2024-12-25 06:28:31.287237');
INSERT INTO public.users VALUES ('5768ce8c-3143-4e38-9601-6e862c3f60ec', 'haim', 'krishevsky', 'h@gmail.com', '1234', '0586646399', '9-5', '4', '2024-12-29 11:04:16.832214');
INSERT INTO public.users VALUES ('6488f230-e1c3-45b5-9e5c-01c8253e548e', 'ori', 'hlevi', 'ori@gmail.com', '1111', '0543351321', '╫₧╫ש ╫צ╫פ ╫נ╫ס╫נ?', 'father', '2024-12-24 08:16:27.805423');
INSERT INTO public.users VALUES ('b2028dbb-e731-4a60-b4f6-b07efcfa863e', 'avrahm', 'ben david', 'a@gmail.com', '1234', '0504111111', 'What city am I in?', 'bney-brak', '2025-01-06 08:10:10.287324');


--
-- Name: chat_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mywhatsapp1234
--

SELECT pg_catalog.setval('public.chat_users_id_seq', 207, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mywhatsapp1234
--

SELECT pg_catalog.setval('public.files_id_seq', 1, false);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mywhatsapp1234
--

SELECT pg_catalog.setval('public.messages_id_seq', 193, true);


--
-- Name: chat_users chat_users_pkey; Type: CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.chat_users
    ADD CONSTRAINT chat_users_pkey PRIMARY KEY (id);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: chat_users chat_users_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.chat_users
    ADD CONSTRAINT chat_users_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON DELETE CASCADE;


--
-- Name: chat_users chat_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.chat_users
    ADD CONSTRAINT chat_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: chats chats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: files files_message_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.messages(id) ON DELETE CASCADE;


--
-- Name: messages messages_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON DELETE CASCADE;


--
-- Name: messages messages_sender_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mywhatsapp1234
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_fkey FOREIGN KEY (sender) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

