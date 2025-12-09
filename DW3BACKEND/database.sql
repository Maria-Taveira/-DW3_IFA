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

