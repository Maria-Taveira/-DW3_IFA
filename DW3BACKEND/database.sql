CREATE TABLE paciente (
    pacienteid SERIAL PRIMARY KEY,
    nomepaciente VARCHAR(100) UNIQUE NOT NULL,
    datanascimento DATE NOT NULL,
    deleted BOOLEAN DEFAULT FALSE

);

CREATE TABLE medico (
    medicoid SERIAL PRIMARY KEY,
    nomemedico VARCHAR(100) UNIQUE NOT NULL,
    especialidade VARCHAR(200) NOT NULL,
    deleted BOOLEAN DEFAULT FALSE

);

CREATE TABLE atende (
    atendeid SERIAL PRIMARY KEY, 
    pacienteidfk INTEGER NOT NULL, 
    medicoidfk INTEGER NOT NULL, 
    deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_paciente FOREIGN KEY (pacienteidfk) REFERENCES paciente (pacienteid),
    CONSTRAINT fk_medico FOREIGN KEY (medicoidfk) REFERENCES medico (medicoid),
    CONSTRAINT uq_atende UNIQUE (pacienteidfk, medicoidfk) 
);

CREATE TABLE usuarios (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    is_active BOOLEAN DEFAULT TRUE,
    role VARCHAR(50) DEFAULT 'default' 
);

INSERT INTO usuarios (username, password)
VALUES ('admin', '$2a$10$o.R9.mPjYgK4FzD8d3w2IeW.1cZq8D3x.yE8tW0m3GjQ.vN.gZ.9');
