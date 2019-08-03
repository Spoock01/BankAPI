-- Table: public."User"

-- DROP TABLE public."User";

CREATE TABLE public."User"
(
    fullname "char"[] NOT NULL,
    cpf "char"[] NOT NULL,
    password "char"[] NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (cpf)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."User"
    OWNER to postgres;

-- Table: public."Transactions"

-- DROP TABLE public."Transactions";

CREATE TABLE public."Transactions"
(
    id bigint,
    date date,
    type "char"[],
    user_cpf "char"[] NOT NULL,
    CONSTRAINT user_cpf FOREIGN KEY (user_cpf)
        REFERENCES public."User" (cpf) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Transactions"
    OWNER to postgres;

-- Index: fki_user_cpf

-- DROP INDEX public.fki_user_cpf;

CREATE INDEX fki_user_cpf
    ON public."Transactions" USING btree
    (user_cpf)
    TABLESPACE pg_default;



