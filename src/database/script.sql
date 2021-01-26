CREATE TABLE IF NOT EXISTS 'USERS' (
    userid VARCHAR NOT NULL PRIMARY KEY,
    optionA VARCHAR,
    optionB VARCHAR,
    optionC VARCHAR,
    optionD VARCHAR,
    teachinggroup VARCHAR,
    setup TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS 'MONDAY' (
    teachinggroup VARCHAR NOT NULL,
    periodone VARCHAR NOT NULL,
    periodtwo VARCHAR NOT NULL,
    periodthree VARCHAR NOT NULL,
    periodfour VARCHAR NOT NULL,
    periodfive VARCHAR NOT NULL,
    periodsix VARCHAR NOT NULL,
    special VARCHAR
);

CREATE TABLE IF NOT EXISTS 'TUESDAY' (
    teachinggroup VARCHAR NOT NULL,
    periodone VARCHAR NOT NULL,
    periodtwo VARCHAR NOT NULL,
    periodthree VARCHAR NOT NULL,
    periodfour VARCHAR NOT NULL,
    periodfive VARCHAR NOT NULL,
    periodsix VARCHAR NOT NULL,
    special VARCHAR
);

CREATE TABLE IF NOT EXISTS 'WEDNESDAY' (
    teachinggroup VARCHAR NOT NULL,
    periodone VARCHAR NOT NULL,
    periodtwo VARCHAR NOT NULL,
    periodthree VARCHAR NOT NULL,
    periodfour VARCHAR NOT NULL,
    periodfive VARCHAR NOT NULL,
    periodsix VARCHAR NOT NULL,
    special VARCHAR
);

CREATE TABLE IF NOT EXISTS 'THURSDAY' (
    teachinggroup VARCHAR NOT NULL,
    periodone VARCHAR NOT NULL,
    periodtwo VARCHAR NOT NULL,
    periodthree VARCHAR NOT NULL,
    periodfour VARCHAR NOT NULL,
    periodfive VARCHAR NOT NULL,
    periodsix VARCHAR NOT NULL,
    special VARCHAR
);

CREATE TABLE IF NOT EXISTS 'FRIDAY' (
    teachinggroup VARCHAR NOT NULL,
    periodone VARCHAR NOT NULL,
    periodtwo VARCHAR NOT NULL,
    periodthree VARCHAR NOT NULL,
    periodfour VARCHAR NOT NULL,
    periodfive VARCHAR NOT NULL,
    periodsix VARCHAR NOT NULL,
    special VARCHAR
);
