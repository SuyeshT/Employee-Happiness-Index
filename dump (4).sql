--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0 (Ubuntu 12.0-2.pgdg18.04+1)
-- Dumped by pg_dump version 12.0 (Ubuntu 12.0-2.pgdg18.04+1)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: core_store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_store (
    id integer NOT NULL,
    key character varying(255),
    value text,
    type character varying(255),
    environment character varying(255),
    tag character varying(255)
);


ALTER TABLE public.core_store OWNER TO postgres;

--
-- Name: core_store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_store_id_seq OWNER TO postgres;

--
-- Name: core_store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_store_id_seq OWNED BY public.core_store.id;


--
-- Name: emp_designation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emp_designation (
    id integer NOT NULL,
    designation character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.emp_designation OWNER TO postgres;

--
-- Name: emp_designation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.emp_designation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.emp_designation_id_seq OWNER TO postgres;

--
-- Name: emp_designation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.emp_designation_id_seq OWNED BY public.emp_designation.id;


--
-- Name: empdesignations_empdesignation_ids__keywords_designation_ids; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empdesignations_empdesignation_ids__keywords_designation_ids (
    id integer NOT NULL,
    empdesignation_id integer,
    keyword_id integer
);


ALTER TABLE public.empdesignations_empdesignation_ids__keywords_designation_ids OWNER TO postgres;

--
-- Name: empdesignations_empdesignation_ids__keywords_designation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empdesignations_empdesignation_ids__keywords_designation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.empdesignations_empdesignation_ids__keywords_designation_id_seq OWNER TO postgres;

--
-- Name: empdesignations_empdesignation_ids__keywords_designation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empdesignations_empdesignation_ids__keywords_designation_id_seq OWNED BY public.empdesignations_empdesignation_ids__keywords_designation_ids.id;


--
-- Name: keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.keywords (
    id integer NOT NULL,
    keyword_name character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.keywords OWNER TO postgres;

--
-- Name: keywords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.keywords_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.keywords_id_seq OWNER TO postgres;

--
-- Name: keywords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.keywords_id_seq OWNED BY public.keywords.id;


--
-- Name: opinions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opinions (
    id integer NOT NULL,
    user_id integer,
    rater_id integer,
    rating jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.opinions OWNER TO postgres;

--
-- Name: opinions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.opinions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.opinions_id_seq OWNER TO postgres;

--
-- Name: opinions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.opinions_id_seq OWNED BY public.opinions.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    reportername character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_id_seq OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: upload_file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.upload_file (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    hash character varying(255) NOT NULL,
    sha256 character varying(255),
    ext character varying(255),
    mime character varying(255) NOT NULL,
    size character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    provider character varying(255) NOT NULL,
    public_id character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.upload_file OWNER TO postgres;

--
-- Name: upload_file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.upload_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.upload_file_id_seq OWNER TO postgres;

--
-- Name: upload_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.upload_file_id_seq OWNED BY public.upload_file.id;


--
-- Name: upload_file_morph; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.upload_file_morph (
    id integer NOT NULL,
    upload_file_id integer,
    related_id integer,
    related_type text,
    field text
);


ALTER TABLE public.upload_file_morph OWNER TO postgres;

--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.upload_file_morph_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.upload_file_morph_id_seq OWNER TO postgres;

--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.upload_file_morph_id_seq OWNED BY public.upload_file_morph.id;


--
-- Name: users-permissions_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."users-permissions_permission" (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    controller character varying(255) NOT NULL,
    action character varying(255) NOT NULL,
    enabled boolean NOT NULL,
    policy character varying(255),
    role integer
);


ALTER TABLE public."users-permissions_permission" OWNER TO postgres;

--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users-permissions_permission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-permissions_permission_id_seq" OWNER TO postgres;

--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users-permissions_permission_id_seq" OWNED BY public."users-permissions_permission".id;


--
-- Name: users-permissions_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."users-permissions_role" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255)
);


ALTER TABLE public."users-permissions_role" OWNER TO postgres;

--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users-permissions_role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-permissions_role_id_seq" OWNER TO postgres;

--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users-permissions_role_id_seq" OWNED BY public."users-permissions_role".id;


--
-- Name: users-permissions_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."users-permissions_user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    provider character varying(255),
    password character varying(255),
    "resetPasswordToken" character varying(255),
    confirmed boolean,
    blocked boolean,
    role integer,
    "dateOfBirth" timestamp with time zone,
    "joiningDate" timestamp with time zone,
    "fullName" character varying(255),
    empdesignation integer,
    report integer
);


ALTER TABLE public."users-permissions_user" OWNER TO postgres;

--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users-permissions_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-permissions_user_id_seq" OWNER TO postgres;

--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users-permissions_user_id_seq" OWNED BY public."users-permissions_user".id;


--
-- Name: core_store id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_store ALTER COLUMN id SET DEFAULT nextval('public.core_store_id_seq'::regclass);


--
-- Name: emp_designation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emp_designation ALTER COLUMN id SET DEFAULT nextval('public.emp_designation_id_seq'::regclass);


--
-- Name: empdesignations_empdesignation_ids__keywords_designation_ids id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empdesignations_empdesignation_ids__keywords_designation_ids ALTER COLUMN id SET DEFAULT nextval('public.empdesignations_empdesignation_ids__keywords_designation_id_seq'::regclass);


--
-- Name: keywords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keywords ALTER COLUMN id SET DEFAULT nextval('public.keywords_id_seq'::regclass);


--
-- Name: opinions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opinions ALTER COLUMN id SET DEFAULT nextval('public.opinions_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: upload_file id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload_file ALTER COLUMN id SET DEFAULT nextval('public.upload_file_id_seq'::regclass);


--
-- Name: upload_file_morph id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload_file_morph ALTER COLUMN id SET DEFAULT nextval('public.upload_file_morph_id_seq'::regclass);


--
-- Name: users-permissions_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_permission" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_permission_id_seq"'::regclass);


--
-- Name: users-permissions_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_role" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_role_id_seq"'::regclass);


--
-- Name: users-permissions_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_user" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_user_id_seq"'::regclass);


--
-- Data for Name: core_store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_store (id, key, value, type, environment, tag) FROM stdin;
9	db_model_empdesignations_empdesignation_ids__keywords_designation_ids	{"empdesignation_id":{"type":"integer"},"keyword_id":{"type":"integer"}}	object	\N	\N
12	plugin_documentation_config	{"restrictedAccess":false}	object		
10	db_model_upload_file_morph	{"upload_file_id":{"type":"integer"},"related_id":{"type":"integer"},"related_type":{"type":"text"},"field":{"type":"text"}}	object	\N	\N
13	core_application	{"name":"Default Application","description":"This API is going to be awesome!"}	object		
14	plugin_users-permissions_grant	{"email":{"enabled":true,"icon":"envelope"},"discord":{"enabled":false,"icon":"comments","key":"","secret":"","callback":"/auth/discord/callback","scope":["identify","email"]},"facebook":{"enabled":false,"icon":"facebook-official","key":"","secret":"","callback":"/auth/facebook/callback","scope":["email"]},"google":{"enabled":false,"icon":"google","key":"","secret":"","callback":"/auth/google/callback","scope":["email"]},"github":{"enabled":false,"icon":"github","key":"","secret":"","redirect_uri":"/auth/github/callback","scope":["user","user:email"]},"microsoft":{"enabled":false,"icon":"windows","key":"","secret":"","callback":"/auth/microsoft/callback","scope":["user.read"]},"twitter":{"enabled":false,"icon":"twitter","key":"","secret":"","callback":"/auth/twitter/callback"}}	object		
15	plugin_email_provider	{"provider":"sendmail","name":"Sendmail","auth":{"sendmail_default_from":{"label":"Sendmail Default From","type":"text"},"sendmail_default_replyto":{"label":"Sendmail Default Reply-To","type":"text"}}}	object	development	
16	plugin_upload_provider	{"provider":"local","name":"Local server","enabled":true,"sizeLimit":1000000}	object	development	
17	plugin_users-permissions_email	{"reset_password":{"display":"Email.template.reset_password","icon":"refresh","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"­Reset password","message":"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>"}},"email_confirmation":{"display":"Email.template.email_confirmation","icon":"check-square-o","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Account confirmation","message":"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>"}}}	object		
18	plugin_users-permissions_advanced	{"unique_email":true,"allow_register":true,"email_confirmation":false,"email_confirmation_redirection":"http://localhost:1337/admin","default_role":"authenticated"}	object		
11	plugin_content-manager_schema	{"generalSettings":{"search":true,"filters":true,"bulkActions":true,"pageEntries":10},"models":{"plugins":{"upload":{"file":{"label":"File","labelPlural":"Files","orm":"bookshelf","search":true,"filters":true,"bulkActions":true,"pageEntries":10,"defaultSort":"id","sort":"ASC","options":{"timestamps":["created_at","updated_at"]},"editDisplay":{"availableFields":{"name":{"label":"Name","type":"string","description":"","name":"name","editable":true,"placeholder":""},"hash":{"label":"Hash","type":"string","description":"","name":"hash","editable":true,"placeholder":""},"sha256":{"label":"Sha256","type":"string","description":"","name":"sha256","editable":true,"placeholder":""},"ext":{"label":"Ext","type":"string","description":"","name":"ext","editable":true,"placeholder":""},"mime":{"label":"Mime","type":"string","description":"","name":"mime","editable":true,"placeholder":""},"size":{"label":"Size","type":"string","description":"","name":"size","editable":true,"placeholder":""},"url":{"label":"Url","type":"string","description":"","name":"url","editable":true,"placeholder":""},"provider":{"label":"Provider","type":"string","description":"","name":"provider","editable":true,"placeholder":""},"public_id":{"label":"Public_id","type":"string","description":"","name":"public_id","editable":true,"placeholder":""}},"displayedField":"id","fields":["name","hash","sha256","ext","mime","size","url","provider","public_id"],"relations":[]},"info":{"name":"file","description":""},"connection":"default","collectionName":"upload_file","attributes":{"name":{"type":"string","configurable":false,"required":true},"hash":{"type":"string","configurable":false,"required":true},"sha256":{"type":"string","configurable":false},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"string","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"provider":{"type":"string","configurable":false,"required":true},"public_id":{"type":"string","configurable":false},"related":{"collection":"*","filter":"field","configurable":false}},"globalId":"UploadFile","globalName":"UploadFile","primaryKey":"id","associations":[{"alias":"related","type":"collection","related":[],"nature":"manyMorphToMany","autoPopulate":true,"filter":"field"}],"fields":{"name":{"label":"Name","description":"","type":"string","disabled":false,"name":"name","sortable":true,"searchable":true},"hash":{"label":"Hash","description":"","type":"string","disabled":false,"name":"hash","sortable":true,"searchable":true},"sha256":{"label":"Sha256","description":"","type":"string","disabled":false,"name":"sha256","sortable":true,"searchable":true},"ext":{"label":"Ext","description":"","type":"string","disabled":false,"name":"ext","sortable":true,"searchable":true},"mime":{"label":"Mime","description":"","type":"string","disabled":false,"name":"mime","sortable":true,"searchable":true},"size":{"label":"Size","description":"","type":"string","disabled":false,"name":"size","sortable":true,"searchable":true},"url":{"label":"Url","description":"","type":"string","disabled":false,"name":"url","sortable":true,"searchable":true},"provider":{"label":"Provider","description":"","type":"string","disabled":false,"name":"provider","sortable":true,"searchable":true},"public_id":{"label":"Public_id","description":"","type":"string","disabled":false,"name":"public_id","sortable":true,"searchable":true}},"listDisplay":[{"name":"id","label":"Id","type":"string","sortable":true,"searchable":true},{"label":"Name","description":"","type":"string","disabled":false,"name":"name","sortable":true,"searchable":true},{"label":"Hash","description":"","type":"string","disabled":false,"name":"hash","sortable":true,"searchable":true},{"label":"Sha256","description":"","type":"string","disabled":false,"name":"sha256","sortable":true,"searchable":true},{"label":"Ext","description":"","type":"string","disabled":false,"name":"ext","sortable":true,"searchable":true}],"relations":{"related":{"alias":"related","type":"collection","related":[],"nature":"manyMorphToMany","autoPopulate":true,"filter":"field","description":"","label":"Related","displayedAttribute":"id"}}}},"users-permissions":{"permission":{"label":"Permission","labelPlural":"Permissions","orm":"bookshelf","search":true,"filters":true,"bulkActions":true,"pageEntries":10,"defaultSort":"id","sort":"ASC","options":{"timestamps":false},"editDisplay":{"availableFields":{"type":{"label":"Type","type":"string","description":"","name":"type","editable":true,"placeholder":""},"controller":{"label":"Controller","type":"string","description":"","name":"controller","editable":true,"placeholder":""},"action":{"label":"Action","type":"string","description":"","name":"action","editable":true,"placeholder":""},"enabled":{"label":"Enabled","type":"boolean","description":"","name":"enabled","editable":true,"placeholder":""},"policy":{"label":"Policy","type":"string","description":"","name":"policy","editable":true,"placeholder":""}},"displayedField":"id","fields":["type","controller","action","enabled","policy"],"relations":["role"]},"info":{"name":"permission","description":""},"connection":"default","collectionName":"users-permissions_permission","attributes":{"type":{"type":"string","required":true,"configurable":false},"controller":{"type":"string","required":true,"configurable":false},"action":{"type":"string","required":true,"configurable":false},"enabled":{"type":"boolean","required":true,"configurable":false},"policy":{"type":"string","configurable":false},"role":{"model":"role","via":"permissions","plugin":"users-permissions","configurable":false}},"globalId":"UsersPermissionsPermission","globalName":"UsersPermissionsPermission","primaryKey":"id","associations":[{"alias":"role","type":"model","model":"role","via":"permissions","nature":"manyToOne","autoPopulate":true,"dominant":true,"plugin":"users-permissions"}],"fields":{"type":{"label":"Type","description":"","type":"string","disabled":false,"name":"type","sortable":true,"searchable":true},"controller":{"label":"Controller","description":"","type":"string","disabled":false,"name":"controller","sortable":true,"searchable":true},"action":{"label":"Action","description":"","type":"string","disabled":false,"name":"action","sortable":true,"searchable":true},"enabled":{"label":"Enabled","description":"","type":"boolean","disabled":false,"name":"enabled","sortable":true,"searchable":true},"policy":{"label":"Policy","description":"","type":"string","disabled":false,"name":"policy","sortable":true,"searchable":true}},"listDisplay":[{"name":"id","label":"Id","type":"string","sortable":true,"searchable":true},{"label":"Type","description":"","type":"string","disabled":false,"name":"type","sortable":true,"searchable":true},{"label":"Controller","description":"","type":"string","disabled":false,"name":"controller","sortable":true,"searchable":true},{"label":"Action","description":"","type":"string","disabled":false,"name":"action","sortable":true,"searchable":true},{"label":"Enabled","description":"","type":"boolean","disabled":false,"name":"enabled","sortable":true,"searchable":true}],"relations":{"role":{"alias":"role","type":"model","model":"role","via":"permissions","nature":"manyToOne","autoPopulate":true,"dominant":true,"plugin":"users-permissions","description":"","label":"Role","displayedAttribute":"name"}}},"role":{"label":"Role","labelPlural":"Roles","orm":"bookshelf","search":true,"filters":true,"bulkActions":true,"pageEntries":10,"defaultSort":"id","sort":"ASC","options":{"timestamps":false},"editDisplay":{"availableFields":{"name":{"label":"Name","type":"string","description":"","name":"name","editable":true,"placeholder":""},"description":{"label":"Description","type":"string","description":"","name":"description","editable":true,"placeholder":""},"type":{"label":"Type","type":"string","description":"","name":"type","editable":true,"placeholder":""}},"displayedField":"id","fields":["name","description","type"],"relations":["permissions","users"]},"info":{"name":"role","description":""},"connection":"default","collectionName":"users-permissions_role","attributes":{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"collection":"permission","via":"role","plugin":"users-permissions","configurable":false,"isVirtual":true},"users":{"collection":"user","via":"role","plugin":"users-permissions","isVirtual":true}},"globalId":"UsersPermissionsRole","globalName":"UsersPermissionsRole","primaryKey":"id","associations":[{"alias":"permissions","type":"collection","collection":"permission","via":"role","nature":"oneToMany","autoPopulate":true,"dominant":true,"plugin":"users-permissions"},{"alias":"users","type":"collection","collection":"user","via":"role","nature":"oneToMany","autoPopulate":true,"dominant":true,"plugin":"users-permissions"}],"fields":{"name":{"label":"Name","description":"","type":"string","disabled":false,"name":"name","sortable":true,"searchable":true},"description":{"label":"Description","description":"","type":"string","disabled":false,"name":"description","sortable":true,"searchable":true},"type":{"label":"Type","description":"","type":"string","disabled":false,"name":"type","sortable":true,"searchable":true}},"listDisplay":[{"name":"id","label":"Id","type":"string","sortable":true,"searchable":true},{"label":"Name","description":"","type":"string","disabled":false,"name":"name","sortable":true,"searchable":true},{"label":"Description","description":"","type":"string","disabled":false,"name":"description","sortable":true,"searchable":true},{"label":"Type","description":"","type":"string","disabled":false,"name":"type","sortable":true,"searchable":true}],"relations":{"permissions":{"alias":"permissions","type":"collection","collection":"permission","via":"role","nature":"oneToMany","autoPopulate":true,"dominant":true,"plugin":"users-permissions","description":"","label":"Permissions","displayedAttribute":"type"},"users":{"alias":"users","type":"collection","collection":"user","via":"role","nature":"oneToMany","autoPopulate":true,"dominant":true,"plugin":"users-permissions","description":"","label":"Users","displayedAttribute":"username"}}},"user":{"label":"User","labelPlural":"Users","orm":"bookshelf","search":true,"filters":true,"bulkActions":true,"pageEntries":10,"defaultSort":"id","sort":"ASC","options":{"timestamps":false},"editDisplay":{"availableFields":{"username":{"label":"Username","type":"string","description":"","name":"username","editable":true,"placeholder":""},"email":{"label":"Email","type":"email","description":"","name":"email","editable":true,"placeholder":""},"provider":{"label":"Provider","type":"string","description":"","name":"provider","editable":true,"placeholder":""},"password":{"label":"Password","type":"password","description":"","name":"password","editable":true,"placeholder":""},"confirmed":{"label":"Confirmed","type":"boolean","description":"","name":"confirmed","editable":true,"placeholder":""},"blocked":{"label":"Blocked","type":"boolean","description":"","name":"blocked","editable":true,"placeholder":""},"dateOfBirth":{"label":"DateOfBirth","type":"date","description":"","name":"dateOfBirth","editable":true,"placeholder":""},"joiningDate":{"label":"JoiningDate","type":"date","description":"","name":"joiningDate","editable":true,"placeholder":""},"fullName":{"label":"FullName","type":"string","description":"","name":"fullName","editable":true,"placeholder":""}},"displayedField":"id","fields":["username","email","provider","password","confirmed","blocked","dateOfBirth","joiningDate","fullName"],"relations":["role","empdesignation","report"]},"info":{"name":"user","description":""},"connection":"default","collectionName":"users-permissions_user","attributes":{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"model":"role","via":"users","plugin":"users-permissions","configurable":false},"dateOfBirth":{"type":"date"},"joiningDate":{"type":"date"},"fullName":{"type":"string"},"empdesignation":{"model":"empdesignation"},"report":{"model":"report"}},"globalId":"UsersPermissionsUser","globalName":"UsersPermissionsUser","primaryKey":"id","associations":[{"alias":"role","type":"model","model":"role","via":"users","nature":"manyToOne","autoPopulate":true,"dominant":true,"plugin":"users-permissions"},{"alias":"empdesignation","type":"model","model":"empdesignation","nature":"oneWay","autoPopulate":true,"dominant":true},{"alias":"report","type":"model","model":"report","nature":"oneWay","autoPopulate":true,"dominant":true}],"fields":{"username":{"label":"Username","description":"","type":"string","disabled":false,"name":"username","sortable":true,"searchable":true},"email":{"label":"Email","description":"","type":"email","disabled":false,"name":"email","sortable":true,"searchable":true},"provider":{"label":"Provider","description":"","type":"string","disabled":false,"name":"provider","sortable":true,"searchable":true},"password":{"label":"Password","description":"","type":"password","disabled":false,"name":"password","sortable":true,"searchable":true},"confirmed":{"label":"Confirmed","description":"","type":"boolean","disabled":false,"name":"confirmed","sortable":true,"searchable":true},"blocked":{"label":"Blocked","description":"","type":"boolean","disabled":false,"name":"blocked","sortable":true,"searchable":true},"dateOfBirth":{"label":"DateOfBirth","description":"","type":"date","disabled":false,"name":"dateOfBirth","sortable":true,"searchable":true},"joiningDate":{"label":"JoiningDate","description":"","type":"date","disabled":false,"name":"joiningDate","sortable":true,"searchable":true},"fullName":{"label":"FullName","description":"","type":"string","disabled":false,"name":"fullName","sortable":true,"searchable":true}},"listDisplay":[{"name":"id","label":"Id","type":"string","sortable":true,"searchable":true},{"label":"Username","description":"","type":"string","disabled":false,"name":"username","sortable":true,"searchable":true},{"label":"Email","description":"","type":"email","disabled":false,"name":"email","sortable":true,"searchable":true},{"label":"Provider","description":"","type":"string","disabled":false,"name":"provider","sortable":true,"searchable":true},{"label":"Password","description":"","type":"password","disabled":false,"name":"password","sortable":true,"searchable":true}],"relations":{"role":{"alias":"role","type":"model","model":"role","via":"users","nature":"manyToOne","autoPopulate":true,"dominant":true,"plugin":"users-permissions","description":"","label":"Role","displayedAttribute":"name"},"empdesignation":{"alias":"empdesignation","type":"model","model":"empdesignation","nature":"oneWay","autoPopulate":true,"dominant":true,"description":"","label":"Empdesignation","displayedAttribute":"designation"},"report":{"alias":"report","type":"model","model":"report","nature":"oneWay","autoPopulate":true,"dominant":true,"description":"","label":"Report","displayedAttribute":"reportername"}}}}},"empdesignation":{"label":"Empdesignation","labelPlural":"Empdesignations","orm":"bookshelf","search":true,"filters":true,"bulkActions":true,"pageEntries":10,"defaultSort":"id","sort":"ASC","options":{"increments":true,"timestamps":["created_at","updated_at"],"comment":""},"editDisplay":{"availableFields":{"designation":{"label":"Designation","type":"string","description":"","name":"designation","editable":true,"placeholder":""}},"displayedField":"id","fields":["designation"],"relations":["empdesignation_id"]},"info":{"name":"empdesignation","description":"employee designation table"},"connection":"default","collectionName":"emp_designation","attributes":{"designation":{"type":"string"},"empdesignation_id":{"collection":"keyword","via":"designation_id","attribute":"keyword","column":"id","isVirtual":true}},"globalId":"Empdesignation","globalName":"Empdesignation","primaryKey":"id","associations":[{"alias":"empdesignation_id","type":"collection","collection":"keyword","via":"designation_id","nature":"manyToMany","autoPopulate":true,"dominant":false,"tableCollectionName":"empdesignations_empdesignation_ids__keywords_designation_ids"}],"fields":{"designation":{"label":"Designation","description":"","type":"string","disabled":false,"name":"designation","sortable":true,"searchable":true}},"listDisplay":[{"name":"id","label":"Id","type":"string","sortable":true,"searchable":true},{"label":"Designation","description":"","type":"string","disabled":false,"name":"designation","sortable":true,"searchable":true}],"relations":{"empdesignation_id":{"alias":"empdesignation_id","type":"collection","collection":"keyword","via":"designation_id","nature":"manyToMany","autoPopulate":true,"dominant":false,"tableCollectionName":"empdesignations_empdesignation_ids__keywords_designation_ids","description":"","label":"Empdesignation_id","displayedAttribute":"keyword_name"}}},"keyword":{"label":"Keyword","labelPlural":"Keywords","orm":"bookshelf","search":true,"filters":true,"bulkActions":true,"pageEntries":10,"defaultSort":"id","sort":"ASC","options":{"increments":true,"timestamps":["created_at","updated_at"],"comment":""},"editDisplay":{"availableFields":{"keyword_name":{"label":"Keyword_name","type":"string","description":"","name":"keyword_name","editable":true,"placeholder":""}},"displayedField":"id","fields":["keyword_name"],"relations":["designation_id"]},"info":{"name":"keyword","description":"keyword details"},"connection":"default","collectionName":"keywords","attributes":{"keyword_name":{"type":"string"},"designation_id":{"collection":"empdesignation","via":"empdesignation_id","dominant":true,"attribute":"empdesignation","column":"id","isVirtual":true}},"globalId":"Keyword","globalName":"Keyword","primaryKey":"id","associations":[{"alias":"designation_id","type":"collection","collection":"empdesignation","via":"empdesignation_id","nature":"manyToMany","autoPopulate":true,"dominant":true,"tableCollectionName":"empdesignations_empdesignation_ids__keywords_designation_ids"}],"fields":{"keyword_name":{"label":"Keyword_name","description":"","type":"string","disabled":false,"name":"keyword_name","sortable":true,"searchable":true}},"listDisplay":[{"name":"id","label":"Id","type":"string","sortable":true,"searchable":true},{"label":"Keyword_name","description":"","type":"string","disabled":false,"name":"keyword_name","sortable":true,"searchable":true}],"relations":{"designation_id":{"alias":"designation_id","type":"collection","collection":"empdesignation","via":"empdesignation_id","nature":"manyToMany","autoPopulate":true,"dominant":true,"tableCollectionName":"empdesignations_empdesignation_ids__keywords_designation_ids","description":"","label":"Designation_id","displayedAttribute":"designation"}}},"report":{"label":"Report","labelPlural":"Reports","orm":"bookshelf","search":true,"filters":true,"bulkActions":true,"pageEntries":10,"defaultSort":"id","sort":"ASC","options":{"increments":true,"timestamps":["created_at","updated_at"],"comment":""},"editDisplay":{"availableFields":{"reportername":{"label":"Reportername","type":"string","description":"","name":"reportername","editable":true,"placeholder":""}},"displayedField":"id","fields":["reportername"],"relations":[]},"info":{"name":"report","description":""},"connection":"default","collectionName":"reports","attributes":{"reportername":{"type":"string"}},"globalId":"Report","globalName":"Report","primaryKey":"id","associations":[],"fields":{"reportername":{"label":"Reportername","description":"","type":"string","disabled":false,"name":"reportername","sortable":true,"searchable":true}},"listDisplay":[{"name":"id","label":"Id","type":"string","sortable":true,"searchable":true},{"label":"Reportername","description":"","type":"string","disabled":false,"name":"reportername","sortable":true,"searchable":true}],"relations":{}},"opinion":{"label":"Opinion","labelPlural":"Opinions","orm":"bookshelf","search":true,"filters":true,"bulkActions":true,"pageEntries":10,"defaultSort":"id","sort":"ASC","options":{"increments":true,"timestamps":["created_at","updated_at"],"comment":""},"editDisplay":{"availableFields":{"rating":{"label":"Rating","type":"json","description":"","name":"rating","editable":true,"placeholder":""}},"displayedField":"id","fields":["rating"],"relations":["user_id","rater_id"]},"info":{"name":"opinion","description":""},"connection":"default","collectionName":"opinions","attributes":{"user_id":{"model":"user","plugin":"users-permissions"},"rater_id":{"model":"user","plugin":"users-permissions"},"rating":{"type":"json"}},"globalId":"Opinion","globalName":"Opinion","primaryKey":"id","associations":[{"alias":"user_id","type":"model","model":"user","nature":"oneWay","autoPopulate":true,"dominant":true,"plugin":"users-permissions"},{"alias":"rater_id","type":"model","model":"user","nature":"oneWay","autoPopulate":true,"dominant":true,"plugin":"users-permissions"}],"fields":{"rating":{"label":"Rating","description":"","type":"json","disabled":false,"name":"rating","sortable":false,"searchable":false}},"listDisplay":[{"name":"id","label":"Id","type":"string","sortable":true,"searchable":true},{"label":"Rating","description":"","type":"json","disabled":false,"name":"rating","sortable":false,"searchable":false}],"relations":{"user_id":{"alias":"user_id","type":"model","model":"user","nature":"oneWay","autoPopulate":true,"dominant":true,"plugin":"users-permissions","description":"","label":"User_id","displayedAttribute":"username"},"rater_id":{"alias":"rater_id","type":"model","model":"user","nature":"oneWay","autoPopulate":true,"dominant":true,"plugin":"users-permissions","description":"","label":"Rater_id","displayedAttribute":"username"}}}},"layout":{"user":{"actions":{"create":"User.create","update":"User.update","destroy":"User.destroy","deleteall":"User.destroyAll"},"attributes":{"username":{"className":"col-md-6"},"email":{"className":"col-md-6"},"resetPasswordToken":{"className":"d-none"},"role":{"className":"d-none"}}},"empdesignation":{"attributes":{}},"keyword":{"attributes":{}},"report":{"attributes":{}}}}	object		
22	db_model_reports	{"reportername":{"type":"string"},"created_at":{"type":"timestamp"},"updated_at":{"type":"timestampUpdate"}}	object	\N	\N
7	db_model_core_store	{"key":{"type":"string"},"value":{"type":"text"},"type":{"type":"string"},"environment":{"type":"string"},"tag":{"type":"string"}}	object	\N	\N
2	db_model_opinions	{"user_id":{"model":"user","plugin":"users-permissions"},"rater_id":{"model":"user","plugin":"users-permissions"},"rating":{"type":"json"},"created_at":{"type":"timestamp"},"updated_at":{"type":"timestampUpdate"}}	object	\N	\N
1	db_model_keywords	{"keyword_name":{"type":"string"},"designation_id":{"collection":"empdesignation","via":"empdesignation_id","dominant":true,"attribute":"empdesignation","column":"id","isVirtual":true},"created_at":{"type":"timestamp"},"updated_at":{"type":"timestampUpdate"}}	object	\N	\N
3	db_model_emp_designation	{"designation":{"type":"string"},"empdesignation_id":{"collection":"keyword","via":"designation_id","attribute":"keyword","column":"id","isVirtual":true},"created_at":{"type":"timestamp"},"updated_at":{"type":"timestampUpdate"}}	object	\N	\N
8	db_model_users-permissions_permission	{"type":{"type":"string","required":true,"configurable":false},"controller":{"type":"string","required":true,"configurable":false},"action":{"type":"string","required":true,"configurable":false},"enabled":{"type":"boolean","required":true,"configurable":false},"policy":{"type":"string","configurable":false},"role":{"model":"role","via":"permissions","plugin":"users-permissions","configurable":false}}	object	\N	\N
5	db_model_users-permissions_user	{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"model":"role","via":"users","plugin":"users-permissions","configurable":false},"dateOfBirth":{"type":"date"},"joiningDate":{"type":"date"},"fullName":{"type":"string"},"empdesignation":{"model":"empdesignation"},"report":{"model":"report"}}	object	\N	\N
4	db_model_users-permissions_role	{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"collection":"permission","via":"role","plugin":"users-permissions","configurable":false,"isVirtual":true},"users":{"collection":"user","via":"role","plugin":"users-permissions","isVirtual":true}}	object	\N	\N
6	db_model_upload_file	{"name":{"type":"string","configurable":false,"required":true},"hash":{"type":"string","configurable":false,"required":true},"sha256":{"type":"string","configurable":false},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"string","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"provider":{"type":"string","configurable":false,"required":true},"public_id":{"type":"string","configurable":false},"related":{"collection":"*","filter":"field","configurable":false},"created_at":{"type":"timestamp"},"updated_at":{"type":"timestampUpdate"}}	object	\N	\N
21	db_model_reportingtables	{"reportername":{"type":"string"},"created_at":{"type":"timestamp"},"updated_at":{"type":"timestampUpdate"}}	object	\N	\N
20	db_model_reportings	{"reporterName":{"type":"string"},"created_at":{"type":"timestamp"},"updated_at":{"type":"timestampUpdate"}}	object	\N	\N
\.


--
-- Data for Name: emp_designation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.emp_designation (id, designation, created_at, updated_at) FROM stdin;
5	Team Lead	2020-01-02 17:20:22.331+05:30	2020-01-07 15:30:03.07+05:30
3	CEO/CTO	2020-01-02 17:19:34.644+05:30	2020-01-07 15:30:18.541+05:30
4	Software engineer	2020-01-02 17:19:46.972+05:30	2020-01-09 18:23:55.831+05:30
2	HR	2020-01-02 17:19:27.194+05:30	2020-01-10 17:27:20.396+05:30
1	Trainee	2020-01-02 17:19:20.617+05:30	2020-01-10 17:27:51.315+05:30
\.


--
-- Data for Name: empdesignations_empdesignation_ids__keywords_designation_ids; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empdesignations_empdesignation_ids__keywords_designation_ids (id, empdesignation_id, keyword_id) FROM stdin;
1	4	12
2	4	10
3	4	9
4	4	15
5	4	16
6	4	1
7	4	11
8	4	4
9	5	5
10	5	7
11	5	11
12	5	4
13	5	14
14	5	10
15	3	7
16	3	6
17	4	2
19	4	8
20	4	3
18	4	13
21	2	2
23	2	13
25	2	4
24	2	3
22	2	8
26	1	8
27	1	2
28	1	4
29	1	3
30	1	11
31	1	13
32	1	15
33	1	16
34	1	1
35	1	5
36	4	5
\.


--
-- Data for Name: keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.keywords (id, keyword_name, created_at, updated_at) FROM stdin;
2	Attitude	2020-01-02 17:03:51.397+05:30	2020-01-02 17:11:35.45+05:30
3	Behaviour	2020-01-02 17:03:58.019+05:30	2020-01-02 17:11:40.816+05:30
4	Communication	2020-01-02 17:04:15.868+05:30	2020-01-02 17:11:48.073+05:30
6	Guidance	2020-01-02 17:07:42.496+05:30	2020-01-02 17:12:03.727+05:30
7	Leadership	2020-01-02 17:08:32.725+05:30	2020-01-02 17:12:11.423+05:30
11	Punctuality	2020-01-02 17:09:25.593+05:30	2020-01-02 17:13:20.359+05:30
1	Performance	2020-01-02 13:37:15.27+05:30	2020-01-03 10:02:05.307+05:30
12	Quality_of_work	2020-01-02 17:09:39.116+05:30	2020-01-07 16:26:13.447+05:30
8	Office _ethics	2020-01-02 17:08:41.003+05:30	2020-01-07 16:27:21.075+05:30
9	Pressure_handling	2020-01-02 17:08:52.278+05:30	2020-01-07 16:27:29.102+05:30
10	Problem_solving	2020-01-02 17:09:09.41+05:30	2020-01-07 16:27:35.804+05:30
13	Relation_with_others	2020-01-02 17:09:58.903+05:30	2020-01-07 16:27:45.19+05:30
14	Serving_clients	2020-01-02 17:10:15.405+05:30	2020-01-07 16:27:52.16+05:30
15	Task_delivery	2020-01-02 17:14:25.85+05:30	2020-01-07 16:27:59.205+05:30
16	Time_management	2020-01-02 17:14:36.377+05:30	2020-01-07 16:28:04.933+05:30
5	Creative	2020-01-02 17:07:35.224+05:30	2020-01-10 17:30:20.007+05:30
\.


--
-- Data for Name: opinions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opinions (id, user_id, rater_id, rating, created_at, updated_at) FROM stdin;
1	6	5	{"attitude": 3, "behaviour": 4, "performance": 5, "communication": 4}	2020-01-06 13:03:22.414+05:30	2020-01-08 11:19:22.849+05:30
4	5	6	{"Performance": "2", "Punctuality": "1", "Communication": "5", "Task_delivery": "2", "Problem_solving": "4", "Quality_of_work": "1", "Time_management": "4", "Pressure_handling": "2"}	2020-01-06 17:57:57.137+05:30	2020-01-08 11:19:55.917+05:30
39	2	3	{"Attitude": 1, "Creative": 4, "Guidance": 5, "Behaviour": 4, "Leadership": 4, "Performance": 4, "Punctuality": 3, "Communication": 3, "Office _ethics": 5, "Quality_of_work": 1, "Pressure_handling": 4}	2020-01-10 12:57:49.527+05:30	2020-01-10 12:57:49.548+05:30
5	\N	\N	\N	2020-01-08 16:19:10.091+05:30	2020-01-08 16:19:10.091+05:30
6	\N	\N	\N	2020-01-08 16:20:03.06+05:30	2020-01-08 16:20:03.06+05:30
7	\N	\N	\N	2020-01-08 18:29:51.134+05:30	2020-01-08 18:29:51.134+05:30
8	\N	\N	\N	2020-01-08 18:31:31.384+05:30	2020-01-08 18:31:31.384+05:30
9	\N	\N	\N	2020-01-08 18:31:58.136+05:30	2020-01-08 18:31:58.136+05:30
10	\N	\N	\N	2020-01-08 18:32:20.632+05:30	2020-01-08 18:32:20.632+05:30
11	\N	\N	\N	2020-01-08 18:34:18.473+05:30	2020-01-08 18:34:18.473+05:30
12	\N	\N	\N	2020-01-08 18:35:39.023+05:30	2020-01-08 18:35:39.023+05:30
13	\N	\N	\N	2020-01-08 18:36:50.897+05:30	2020-01-08 18:36:50.897+05:30
14	\N	\N	\N	2020-01-08 18:37:03.773+05:30	2020-01-08 18:37:03.773+05:30
15	\N	\N	\N	2020-01-08 18:40:51.952+05:30	2020-01-08 18:40:51.952+05:30
16	\N	\N	\N	2020-01-08 18:43:53.254+05:30	2020-01-08 18:43:53.254+05:30
17	\N	\N	\N	2020-01-08 18:45:39.766+05:30	2020-01-08 18:45:39.766+05:30
18	\N	\N	\N	2020-01-08 18:47:52.23+05:30	2020-01-08 18:47:52.23+05:30
19	\N	\N	\N	2020-01-08 18:55:22.025+05:30	2020-01-08 18:55:22.025+05:30
20	\N	\N	\N	2020-01-09 11:08:09.976+05:30	2020-01-09 11:08:09.976+05:30
21	\N	\N	\N	2020-01-09 11:33:44.922+05:30	2020-01-09 11:33:44.922+05:30
22	\N	\N	\N	2020-01-09 11:34:04.098+05:30	2020-01-09 11:34:04.098+05:30
23	\N	\N	\N	2020-01-09 11:34:08.46+05:30	2020-01-09 11:34:08.46+05:30
24	\N	\N	\N	2020-01-09 11:34:11.604+05:30	2020-01-09 11:34:11.604+05:30
25	\N	\N	\N	2020-01-09 11:34:16.995+05:30	2020-01-09 11:34:16.995+05:30
26	\N	\N	{"Performance": "3", "Punctuality": "2", "Communication": "4", "Task_delivery": "3", "Problem_solving": "3", "Quality_of_work": "4", "Time_management": "5", "Pressure_handling": "2"}	2020-01-09 15:28:38.794+05:30	2020-01-09 15:28:38.794+05:30
27	2	3	{"Performance": "3", "Punctuality": "2", "Communication": "4", "Task_delivery": "3", "Problem_solving": "3", "Quality_of_work": "4", "Time_management": "5", "Pressure_handling": "2"}	2020-01-09 15:30:02.404+05:30	2020-01-09 15:30:02.432+05:30
28	\N	\N	\N	2020-01-09 17:46:47.251+05:30	2020-01-09 17:46:47.251+05:30
29	\N	\N	\N	2020-01-09 17:47:12.73+05:30	2020-01-09 17:47:12.73+05:30
3	6	5	{"Performance": 3, "Punctuality": 2, "Communication": 4, "Task_delivery": 3, "Problem_solving": 3, "Quality_of_work": 4, "Time_management": 5, "Pressure_handling": 2}	2020-01-06 16:05:59.333+05:30	2020-01-09 18:04:58.318+05:30
30	\N	\N	\N	2020-01-09 18:08:13.818+05:30	2020-01-09 18:08:13.818+05:30
31	3	2	{"Performance": 3, "Punctuality": 2, "Communication": 4, "Task_delivery": 3, "Problem_solving": 3, "Quality_of_work": 4, "Time_management": 5, "Pressure_handling": 2}	2020-01-09 18:12:54.792+05:30	2020-01-09 18:12:54.804+05:30
32	\N	\N	\N	2020-01-09 18:13:22.511+05:30	2020-01-09 18:13:22.511+05:30
33	3	2	{"Performance": 3, "Punctuality": 2, "Communication": 4, "Task_delivery": 3, "Problem_solving": 3, "Quality_of_work": 4, "Time_management": 5, "Pressure_handling": 2}	2020-01-09 18:14:59.959+05:30	2020-01-09 18:14:59.979+05:30
34	\N	\N	\N	2020-01-09 18:16:02.685+05:30	2020-01-09 18:16:02.685+05:30
35	3	2	{"Performance": 3, "Punctuality": 2, "Communication": 4, "Task_delivery": 3, "Problem_solving": 3, "Quality_of_work": 4, "Time_management": 5, "Pressure_handling": 2}	2020-01-09 18:16:13.79+05:30	2020-01-09 18:16:13.811+05:30
36	2	3	{"Leadership": 4, "Performance": 4, "Communication": 3, "Serving_clients": 4, "Time_management": 3, "Pressure_handling": 2, "Relation_with_others": 3}	2020-01-10 11:25:45.507+05:30	2020-01-10 11:25:45.582+05:30
37	2	3	{"Attitude": 1, "Behaviour": 3}	2020-01-10 12:32:04.854+05:30	2020-01-10 12:32:04.875+05:30
38	2	3	{"Attitude": 1, "Creative": 4, "Guidance": 5, "Behaviour": 4, "Leadership": 4, "Performance": 4, "Punctuality": 3, "Communication": 3, "Office _ethics": 5, "Quality_of_work": 1, "Pressure_handling": 4}	2020-01-10 12:57:26.701+05:30	2020-01-10 12:57:26.725+05:30
40	5	3	{}	2020-01-10 14:55:48.019+05:30	2020-01-10 14:55:48.04+05:30
41	5	3	{"Attitude": 1, "Guidance": 4, "Performance": 4, "Communication": 2, "Pressure_handling": 2}	2020-01-10 14:56:20.686+05:30	2020-01-10 14:56:20.706+05:30
42	5	3	{}	2020-01-10 14:59:28.09+05:30	2020-01-10 14:59:28.138+05:30
43	5	3	{}	2020-01-10 15:00:42.435+05:30	2020-01-10 15:00:42.457+05:30
44	5	3	{}	2020-01-10 15:00:44.499+05:30	2020-01-10 15:00:44.524+05:30
45	5	8	{"Attitude": 2, "Creative": 4, "Guidance": 4, "Behaviour": 3, "Leadership": 4, "Performance": 4, "Communication": 2}	2020-01-10 15:01:16.755+05:30	2020-01-10 15:01:16.779+05:30
46	5	8	{"Leadership": 5, "Task_delivery": 5, "Problem_solving": 4, "Quality_of_work": 3}	2020-01-10 15:14:14.277+05:30	2020-01-10 15:14:14.302+05:30
2	8	1	{"Performance": "2", "Punctuality": "4", "Communication": "5", "Task_delivery": "2", "Problem_solving": "4", "Quality_of_work": "5", "Time_management": "2", "Pressure_handling": "1"}	2020-01-06 15:16:16.75+05:30	2020-01-10 15:57:31.984+05:30
47	5	9	{"Creative": 3, "Guidance": 4, "Behaviour": 1, "Punctuality": 5, "Communication": 2, "Task_delivery": 3}	2020-01-10 17:21:32.964+05:30	2020-01-10 17:21:33.039+05:30
48	5	7	{"Behaviour": 1, "Punctuality": 4, "Communication": 2, "Pressure_handling": 5}	2020-01-10 18:08:26.159+05:30	2020-01-10 18:08:26.182+05:30
49	5	7	{}	2020-01-10 18:19:21.662+05:30	2020-01-10 18:19:21.689+05:30
50	5	7	{}	2020-01-10 18:19:46.698+05:30	2020-01-10 18:19:46.719+05:30
51	5	7	{}	2020-01-10 18:20:08.664+05:30	2020-01-10 18:20:08.683+05:30
52	5	6	{}	2020-01-10 18:20:44.05+05:30	2020-01-10 18:20:44.067+05:30
53	5	6	{"Task_delivery": 5, "Serving_clients": 4, "Pressure_handling": 1, "Relation_with_others": 2}	2020-01-10 18:23:09.021+05:30	2020-01-10 18:23:09.047+05:30
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (id, reportername, created_at, updated_at) FROM stdin;
1	dignesh	2020-01-09 16:09:04.084+05:30	2020-01-09 16:09:04.214+05:30
2	jayant	2020-01-09 16:09:09.873+05:30	2020-01-09 16:09:09.895+05:30
3	kurund	2020-01-09 16:09:14.617+05:30	2020-01-09 16:09:14.663+05:30
4	chetan	2020-01-09 16:09:18.94+05:30	2020-01-09 16:09:18.96+05:30
5	sunil	2020-01-09 16:09:23.245+05:30	2020-01-09 16:09:23.271+05:30
\.


--
-- Data for Name: upload_file; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.upload_file (id, name, hash, sha256, ext, mime, size, url, provider, public_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: upload_file_morph; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.upload_file_morph (id, upload_file_id, related_id, related_type, field) FROM stdin;
\.


--
-- Data for Name: users-permissions_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."users-permissions_permission" (id, type, controller, action, enabled, policy, role) FROM stdin;
1	application	empdesignation	find	t		1
2	application	empdesignation	findone	t		1
3	application	empdesignation	count	t		1
4	application	empdesignation	create	t		1
5	application	empdesignation	update	t		1
6	application	empdesignation	destroy	t		1
7	application	keyword	find	t		1
8	application	keyword	findone	t		1
9	application	keyword	count	t		1
10	application	keyword	create	t		1
11	application	keyword	update	t		1
12	application	keyword	destroy	t		1
19	content-manager	contentmanager	models	t		1
20	content-manager	contentmanager	find	t		1
21	content-manager	contentmanager	count	t		1
22	content-manager	contentmanager	findone	t		1
23	content-manager	contentmanager	create	t		1
24	content-manager	contentmanager	update	t		1
25	content-manager	contentmanager	updatesettings	t		1
26	content-manager	contentmanager	delete	t		1
27	content-manager	contentmanager	deleteall	t		1
28	content-type-builder	contenttypebuilder	getmodels	t		1
29	content-type-builder	contenttypebuilder	getmodel	t		1
30	content-type-builder	contenttypebuilder	getconnections	t		1
31	content-type-builder	contenttypebuilder	createmodel	t		1
32	content-type-builder	contenttypebuilder	updatemodel	t		1
33	content-type-builder	contenttypebuilder	deletemodel	t		1
34	content-type-builder	contenttypebuilder	autoreload	t		1
35	content-type-builder	contenttypebuilder	checktableexists	t		1
36	documentation	documentation	getinfos	t		1
37	documentation	documentation	index	t		1
38	documentation	documentation	loginview	t		1
39	documentation	documentation	login	t		1
40	documentation	documentation	regeneratedoc	t		1
41	documentation	documentation	deletedoc	t		1
42	documentation	documentation	updatesettings	t		1
43	email	email	send	t		1
44	email	email	getenvironments	t		1
45	email	email	getsettings	t		1
46	email	email	updatesettings	t		1
47	settings-manager	settingsmanager	menu	t		1
48	settings-manager	settingsmanager	environments	t		1
49	settings-manager	settingsmanager	languages	t		1
50	settings-manager	settingsmanager	databases	t		1
51	settings-manager	settingsmanager	database	t		1
52	settings-manager	settingsmanager	databasemodel	t		1
53	settings-manager	settingsmanager	get	t		1
54	settings-manager	settingsmanager	update	t		1
55	settings-manager	settingsmanager	createlanguage	t		1
56	settings-manager	settingsmanager	deletelanguage	t		1
57	settings-manager	settingsmanager	createdatabase	t		1
58	settings-manager	settingsmanager	updatedatabase	t		1
59	settings-manager	settingsmanager	deletedatabase	t		1
60	settings-manager	settingsmanager	autoreload	t		1
61	upload	upload	upload	t		1
62	upload	upload	getenvironments	t		1
63	upload	upload	getsettings	t		1
64	upload	upload	updatesettings	t		1
65	upload	upload	find	t		1
66	upload	upload	findone	t		1
67	upload	upload	count	t		1
68	upload	upload	destroy	t		1
69	upload	upload	search	t		1
70	users-permissions	auth	callback	t		1
71	users-permissions	auth	changepassword	t		1
72	users-permissions	auth	connect	t		1
73	users-permissions	auth	forgotpassword	t		1
74	users-permissions	auth	register	t		1
75	users-permissions	auth	emailconfirmation	t		1
76	users-permissions	user	count	t		1
77	users-permissions	user	find	t		1
78	users-permissions	user	me	t		1
79	users-permissions	user	findone	t		1
80	users-permissions	user	create	t		1
81	users-permissions	user	update	t		1
82	users-permissions	user	destroy	t		1
83	users-permissions	user	destroyall	t		1
84	users-permissions	userspermissions	createrole	t		1
85	users-permissions	userspermissions	deleteprovider	t		1
86	users-permissions	userspermissions	deleterole	t		1
87	users-permissions	userspermissions	getpermissions	t		1
88	users-permissions	userspermissions	getpolicies	t		1
89	users-permissions	userspermissions	getrole	t		1
90	users-permissions	userspermissions	getroles	t		1
91	users-permissions	userspermissions	getroutes	t		1
92	users-permissions	userspermissions	index	t		1
93	users-permissions	userspermissions	init	t		1
94	users-permissions	userspermissions	searchusers	t		1
95	users-permissions	userspermissions	updaterole	t		1
96	users-permissions	userspermissions	getemailtemplate	t		1
97	users-permissions	userspermissions	updateemailtemplate	t		1
98	users-permissions	userspermissions	getadvancedsettings	t		1
99	users-permissions	userspermissions	updateadvancedsettings	t		1
100	users-permissions	userspermissions	getproviders	t		1
101	users-permissions	userspermissions	updateproviders	t		1
102	application	empdesignation	find	f		2
103	application	empdesignation	findone	f		2
104	application	empdesignation	count	f		2
124	content-manager	contentmanager	create	f		2
133	content-type-builder	contenttypebuilder	updatemodel	f		2
145	email	email	getenvironments	f		2
153	settings-manager	settingsmanager	databasemodel	f		2
164	upload	upload	getsettings	f		2
177	users-permissions	user	count	f		2
186	users-permissions	userspermissions	deleteprovider	f		2
194	users-permissions	userspermissions	init	t		2
376	application	report	find	t		1
386	application	report	update	f		2
394	application	opinion	find	t		1
405	application	opinion	destroy	f		2
206	application	empdesignation	create	t		3
229	content-manager	contentmanager	deleteall	t		3
233	content-type-builder	contenttypebuilder	createmodel	t		3
244	documentation	documentation	updatesettings	t		3
257	settings-manager	settingsmanager	createlanguage	t		3
268	upload	upload	findone	t		3
273	users-permissions	auth	changepassword	t		3
284	users-permissions	user	destroy	t		3
294	users-permissions	userspermissions	index	t		3
105	application	empdesignation	create	f		2
113	application	keyword	destroy	f		2
123	content-manager	contentmanager	findone	f		2
137	documentation	documentation	getinfos	f		2
143	documentation	documentation	updatesettings	f		2
155	settings-manager	settingsmanager	update	f		2
169	upload	upload	destroy	f		2
174	users-permissions	auth	forgotpassword	f		2
185	users-permissions	userspermissions	createrole	f		2
193	users-permissions	userspermissions	index	f		2
377	application	report	findone	t		1
395	application	opinion	findone	t		1
404	application	opinion	update	f		2
208	application	empdesignation	destroy	t		3
213	application	keyword	update	t		3
223	content-manager	contentmanager	count	t		3
237	content-type-builder	contenttypebuilder	checktableexists	t		3
252	settings-manager	settingsmanager	databases	t		3
267	upload	upload	find	t		3
279	users-permissions	user	find	t		3
282	users-permissions	user	create	t		3
293	users-permissions	userspermissions	getroutes	t		3
248	email	email	updatesettings	t		3
106	application	empdesignation	update	f		2
122	content-manager	contentmanager	count	f		2
136	content-type-builder	contenttypebuilder	checktableexists	f		2
147	email	email	updatesettings	f		2
157	settings-manager	settingsmanager	deletelanguage	f		2
166	upload	upload	find	f		2
172	users-permissions	auth	changepassword	f		2
184	users-permissions	user	destroyall	f		2
199	users-permissions	userspermissions	getadvancedsettings	f		2
378	application	report	count	t		1
387	application	report	destroy	f		2
396	application	opinion	count	t		1
204	application	empdesignation	findone	t		3
410	application	opinion	update	t		3
227	content-manager	contentmanager	updatesettings	t		3
236	content-type-builder	contenttypebuilder	autoreload	t		3
254	settings-manager	settingsmanager	databasemodel	t		3
263	upload	upload	upload	t		3
276	users-permissions	auth	register	t		3
288	users-permissions	userspermissions	deleterole	t		3
301	users-permissions	userspermissions	updateadvancedsettings	t		3
245	email	email	send	t		3
107	application	empdesignation	destroy	f		2
126	content-manager	contentmanager	updatesettings	f		2
138	documentation	documentation	index	f		2
144	email	email	send	f		2
159	settings-manager	settingsmanager	updatedatabase	f		2
162	upload	upload	upload	f		2
175	users-permissions	auth	register	f		2
189	users-permissions	userspermissions	getpolicies	f		2
192	users-permissions	userspermissions	getroutes	f		2
379	application	report	create	t		1
397	application	opinion	create	t		1
209	application	keyword	find	t		3
212	application	keyword	create	t		3
408	application	opinion	count	t		3
393	application	report	destroy	t		3
225	content-manager	contentmanager	create	t		3
238	documentation	documentation	getinfos	t		3
256	settings-manager	settingsmanager	update	t		3
265	upload	upload	getsettings	t		3
278	users-permissions	user	count	t		3
299	users-permissions	userspermissions	updateemailtemplate	t		3
289	users-permissions	userspermissions	getpermissions	t		3
246	email	email	getenvironments	t		3
108	application	keyword	find	f		2
128	content-manager	contentmanager	deleteall	f		2
134	content-type-builder	contenttypebuilder	deletemodel	f		2
146	email	email	getsettings	f		2
156	settings-manager	settingsmanager	createlanguage	f		2
167	upload	upload	findone	f		2
179	users-permissions	user	me	t		2
183	users-permissions	user	destroy	f		2
195	users-permissions	userspermissions	searchusers	f		2
380	application	report	destroy	t		1
398	application	opinion	update	t		1
207	application	empdesignation	update	t		3
406	application	opinion	find	t		3
390	application	report	count	t		3
222	content-manager	contentmanager	find	t		3
239	documentation	documentation	index	t		3
242	documentation	documentation	regeneratedoc	t		3
255	settings-manager	settingsmanager	get	t		3
266	upload	upload	updatesettings	t		3
272	users-permissions	auth	callback	t		3
285	users-permissions	user	destroyall	t		3
297	users-permissions	userspermissions	updaterole	t		3
109	application	keyword	findone	f		2
112	application	keyword	update	f		2
129	content-type-builder	contenttypebuilder	getmodels	f		2
132	content-type-builder	contenttypebuilder	createmodel	f		2
149	settings-manager	settingsmanager	environments	f		2
152	settings-manager	settingsmanager	database	f		2
168	upload	upload	count	f		2
176	users-permissions	auth	emailconfirmation	f		2
187	users-permissions	userspermissions	deleterole	f		2
198	users-permissions	userspermissions	updateemailtemplate	f		2
202	users-permissions	userspermissions	updateproviders	f		2
381	application	report	update	t		1
399	application	opinion	destroy	t		1
224	content-manager	contentmanager	findone	t		3
234	content-type-builder	contenttypebuilder	updatemodel	t		3
253	settings-manager	settingsmanager	database	t		3
249	settings-manager	settingsmanager	menu	t		3
269	upload	upload	count	t		3
277	users-permissions	auth	emailconfirmation	t		3
295	users-permissions	userspermissions	init	t		3
286	users-permissions	userspermissions	createrole	t		3
303	users-permissions	userspermissions	updateproviders	t		3
110	application	keyword	count	f		2
120	content-manager	contentmanager	models	f		2
131	content-type-builder	contenttypebuilder	getconnections	f		2
141	documentation	documentation	regeneratedoc	f		2
151	settings-manager	settingsmanager	databases	f		2
161	settings-manager	settingsmanager	autoreload	t		2
170	upload	upload	search	f		2
181	users-permissions	user	create	f		2
191	users-permissions	userspermissions	getroles	f		2
201	users-permissions	userspermissions	getproviders	f		2
382	application	report	find	f		2
400	application	opinion	find	f		2
210	application	keyword	findone	t		3
389	application	report	findone	t		3
230	content-type-builder	contenttypebuilder	getmodels	t		3
240	documentation	documentation	loginview	t		3
250	settings-manager	settingsmanager	environments	t		3
260	settings-manager	settingsmanager	updatedatabase	t		3
270	upload	upload	destroy	t		3
280	users-permissions	user	me	t		3
298	users-permissions	userspermissions	getemailtemplate	t		3
290	users-permissions	userspermissions	getpolicies	t		3
111	application	keyword	create	f		2
121	content-manager	contentmanager	find	f		2
130	content-type-builder	contenttypebuilder	getmodel	f		2
140	documentation	documentation	login	f		2
150	settings-manager	settingsmanager	languages	f		2
160	settings-manager	settingsmanager	deletedatabase	f		2
171	users-permissions	auth	callback	f		2
180	users-permissions	user	findone	f		2
190	users-permissions	userspermissions	getrole	f		2
200	users-permissions	userspermissions	updateadvancedsettings	f		2
383	application	report	findone	f		2
401	application	opinion	findone	f		2
211	application	keyword	count	t		3
409	application	opinion	create	t		3
388	application	report	find	t		3
221	content-manager	contentmanager	models	t		3
231	content-type-builder	contenttypebuilder	getmodel	t		3
241	documentation	documentation	login	t		3
261	settings-manager	settingsmanager	deletedatabase	t		3
251	settings-manager	settingsmanager	languages	t		3
271	upload	upload	search	t		3
281	users-permissions	user	findone	t		3
291	users-permissions	userspermissions	getrole	t		3
300	users-permissions	userspermissions	getadvancedsettings	t		3
125	content-manager	contentmanager	update	f		2
135	content-type-builder	contenttypebuilder	autoreload	t		2
142	documentation	documentation	deletedoc	f		2
154	settings-manager	settingsmanager	get	f		2
165	upload	upload	updatesettings	f		2
178	users-permissions	user	find	f		2
182	users-permissions	user	update	f		2
197	users-permissions	userspermissions	getemailtemplate	f		2
384	application	report	count	f		2
402	application	opinion	count	f		2
205	application	empdesignation	count	t		3
214	application	keyword	destroy	t		3
411	application	opinion	destroy	t		3
392	application	report	update	t		3
226	content-manager	contentmanager	update	t		3
235	content-type-builder	contenttypebuilder	deletemodel	t		3
262	settings-manager	settingsmanager	autoreload	t		3
259	settings-manager	settingsmanager	createdatabase	t		3
275	users-permissions	auth	forgotpassword	t		3
283	users-permissions	user	update	t		3
296	users-permissions	userspermissions	searchusers	t		3
302	users-permissions	userspermissions	getproviders	t		3
247	email	email	getsettings	t		3
127	content-manager	contentmanager	delete	f		2
139	documentation	documentation	loginview	f		2
148	settings-manager	settingsmanager	menu	f		2
158	settings-manager	settingsmanager	createdatabase	f		2
163	upload	upload	getenvironments	f		2
173	users-permissions	auth	connect	t		2
188	users-permissions	userspermissions	getpermissions	f		2
196	users-permissions	userspermissions	updaterole	f		2
385	application	report	create	f		2
403	application	opinion	create	f		2
203	application	empdesignation	find	t		3
407	application	opinion	findone	t		3
391	application	report	create	t		3
228	content-manager	contentmanager	delete	t		3
232	content-type-builder	contenttypebuilder	getconnections	t		3
243	documentation	documentation	deletedoc	t		3
258	settings-manager	settingsmanager	deletelanguage	t		3
264	upload	upload	getenvironments	t		3
274	users-permissions	auth	connect	t		3
292	users-permissions	userspermissions	getroles	t		3
287	users-permissions	userspermissions	deleteprovider	t		3
\.


--
-- Data for Name: users-permissions_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."users-permissions_role" (id, name, description, type) FROM stdin;
1	Administrator	These users have all access in the project.	root
2	Authenticated	Default role given to authenticated user.	authenticated
3	Public	Default role given to unauthenticated user.	public
\.


--
-- Data for Name: users-permissions_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."users-permissions_user" (id, username, email, provider, password, "resetPasswordToken", confirmed, blocked, role, "dateOfBirth", "joiningDate", "fullName", empdesignation, report) FROM stdin;
7	suyesh	suyesh.tiwari@webaccessglobal.com	local	$2a$10$xuRQXN/J4kHWULWOvfWsiOW54pADsi/vXLFpTChrb4.n3xzD3oRI.	\N	\N	\N	3	1998-07-09 00:00:00+05:30	2019-09-03 00:00:00+05:30	suyesh tiwari	4	2
6	vishal.tambe	vishal.tambe@webaccessglobal.com	local	$2a$10$kBlXusAHUkck5MpHt1ir1OwfXPpggc3DQy.s3nvQPxYbgjXqS4REy	\N	\N	\N	3	1996-06-11 00:00:00+05:30	2019-09-03 00:00:00+05:30	vishal tambe	1	2
9	sanju.bera	sanju.bera@webaccessglobal.com	local	$2a$10$n6zav1TPpd2jfZSJr06JZ.LT5jInVU6J5Af9hkhUJLBF3axOwIL6C	\N	\N	\N	3	1997-06-11 00:00:00+05:30	2019-11-11 00:00:00+05:30	sanju bera	2	2
1	mayank.surti	mayank.surti@webaccessglobal.com	local	$2a$10$ICjp346X7ZCJxY6wp4SCOujSnlhAPun31qBLkmdx1U6StdHmj/Mje	\N	t	\N	1	\N	\N	mayank surti	1	2
2	mayank.surti123123	msurti47@gmail.com	local	$2a$10$4kJnv4DhA2E.G9krWRNT4OwO2dAP/uHDFrN0a2XBVSr80hEQynNf.	\N	t	\N	2	\N	\N	msurti	4	2
5	jayant.singh	jayant.singh@webaccessglobal.com	local	$2a$10$rugs0P4ZSgyE2fppSu0i8O3l0ANyWHh3cWR6RgjonMU2ANJRpWu2u	\N	\N	\N	3	1994-01-23 00:00:00+05:30	2017-01-02 00:00:00+05:30	jayant singh	5	1
8	kurund.jalmi	kurund.jalmi@webaccessglobal.com	local	$2a$10$M0HpWyBgDEuQtWnai6hm1eHuie41k9gkxKqWBq/4QrJxzdVhmxk2S	\N	\N	\N	3	1984-03-01 00:00:00+05:30	2010-06-10 00:00:00+05:30	kurund jalmi	3	4
\.


--
-- Name: core_store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_store_id_seq', 22, true);


--
-- Name: emp_designation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.emp_designation_id_seq', 5, true);


--
-- Name: empdesignations_empdesignation_ids__keywords_designation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empdesignations_empdesignation_ids__keywords_designation_id_seq', 36, true);


--
-- Name: keywords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.keywords_id_seq', 16, true);


--
-- Name: opinions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opinions_id_seq', 53, true);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 5, true);


--
-- Name: upload_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.upload_file_id_seq', 1, false);


--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.upload_file_morph_id_seq', 1, false);


--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users-permissions_permission_id_seq"', 411, true);


--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users-permissions_role_id_seq"', 3, true);


--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users-permissions_user_id_seq"', 9, true);


--
-- Name: core_store core_store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_store
    ADD CONSTRAINT core_store_pkey PRIMARY KEY (id);


--
-- Name: emp_designation emp_designation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emp_designation
    ADD CONSTRAINT emp_designation_pkey PRIMARY KEY (id);


--
-- Name: empdesignations_empdesignation_ids__keywords_designation_ids empdesignations_empdesignation_ids__keywords_designation_i_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empdesignations_empdesignation_ids__keywords_designation_ids
    ADD CONSTRAINT empdesignations_empdesignation_ids__keywords_designation_i_pkey PRIMARY KEY (id);


--
-- Name: keywords keywords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keywords
    ADD CONSTRAINT keywords_pkey PRIMARY KEY (id);


--
-- Name: opinions opinions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opinions
    ADD CONSTRAINT opinions_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: upload_file_morph upload_file_morph_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload_file_morph
    ADD CONSTRAINT upload_file_morph_pkey PRIMARY KEY (id);


--
-- Name: upload_file upload_file_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload_file
    ADD CONSTRAINT upload_file_pkey PRIMARY KEY (id);


--
-- Name: users-permissions_permission users-permissions_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_permission"
    ADD CONSTRAINT "users-permissions_permission_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_role users-permissions_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_role"
    ADD CONSTRAINT "users-permissions_role_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_user users-permissions_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_user"
    ADD CONSTRAINT "users-permissions_user_pkey" PRIMARY KEY (id);


--
-- Name: search_core_store_environment; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_core_store_environment ON public.core_store USING gin (environment public.gin_trgm_ops);


--
-- Name: search_core_store_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_core_store_key ON public.core_store USING gin (key public.gin_trgm_ops);


--
-- Name: search_core_store_tag; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_core_store_tag ON public.core_store USING gin (tag public.gin_trgm_ops);


--
-- Name: search_core_store_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_core_store_type ON public.core_store USING gin (type public.gin_trgm_ops);


--
-- Name: search_core_store_value; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_core_store_value ON public.core_store USING gin (value public.gin_trgm_ops);


--
-- Name: search_emp_designation_designation; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_emp_designation_designation ON public.emp_designation USING gin (designation public.gin_trgm_ops);


--
-- Name: search_keywords_keyword_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_keywords_keyword_name ON public.keywords USING gin (keyword_name public.gin_trgm_ops);


--
-- Name: search_reports_reportername; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_reports_reportername ON public.reports USING gin (reportername public.gin_trgm_ops);


--
-- Name: search_upload_file_ext; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_ext ON public.upload_file USING gin (ext public.gin_trgm_ops);


--
-- Name: search_upload_file_hash; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_hash ON public.upload_file USING gin (hash public.gin_trgm_ops);


--
-- Name: search_upload_file_mime; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_mime ON public.upload_file USING gin (mime public.gin_trgm_ops);


--
-- Name: search_upload_file_morph_field; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_morph_field ON public.upload_file_morph USING gin (field public.gin_trgm_ops);


--
-- Name: search_upload_file_morph_related_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_morph_related_type ON public.upload_file_morph USING gin (related_type public.gin_trgm_ops);


--
-- Name: search_upload_file_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_name ON public.upload_file USING gin (name public.gin_trgm_ops);


--
-- Name: search_upload_file_provider; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_provider ON public.upload_file USING gin (provider public.gin_trgm_ops);


--
-- Name: search_upload_file_public_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_public_id ON public.upload_file USING gin (public_id public.gin_trgm_ops);


--
-- Name: search_upload_file_sha256; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_sha256 ON public.upload_file USING gin (sha256 public.gin_trgm_ops);


--
-- Name: search_upload_file_size; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_size ON public.upload_file USING gin (size public.gin_trgm_ops);


--
-- Name: search_upload_file_url; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_upload_file_url ON public.upload_file USING gin (url public.gin_trgm_ops);


--
-- Name: search_users_permissions_permission_action; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_permission_action ON public."users-permissions_permission" USING gin (action public.gin_trgm_ops);


--
-- Name: search_users_permissions_permission_controller; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_permission_controller ON public."users-permissions_permission" USING gin (controller public.gin_trgm_ops);


--
-- Name: search_users_permissions_permission_policy; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_permission_policy ON public."users-permissions_permission" USING gin (policy public.gin_trgm_ops);


--
-- Name: search_users_permissions_permission_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_permission_type ON public."users-permissions_permission" USING gin (type public.gin_trgm_ops);


--
-- Name: search_users_permissions_role_description; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_role_description ON public."users-permissions_role" USING gin (description public.gin_trgm_ops);


--
-- Name: search_users_permissions_role_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_role_name ON public."users-permissions_role" USING gin (name public.gin_trgm_ops);


--
-- Name: search_users_permissions_role_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_role_type ON public."users-permissions_role" USING gin (type public.gin_trgm_ops);


--
-- Name: search_users_permissions_user_fullname; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_user_fullname ON public."users-permissions_user" USING gin ("fullName" public.gin_trgm_ops);


--
-- Name: search_users_permissions_user_provider; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_user_provider ON public."users-permissions_user" USING gin (provider public.gin_trgm_ops);


--
-- Name: search_users_permissions_user_resetpasswordtoken; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_user_resetpasswordtoken ON public."users-permissions_user" USING gin ("resetPasswordToken" public.gin_trgm_ops);


--
-- Name: search_users_permissions_user_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_users_permissions_user_username ON public."users-permissions_user" USING gin (username public.gin_trgm_ops);


--
-- PostgreSQL database dump complete
--

