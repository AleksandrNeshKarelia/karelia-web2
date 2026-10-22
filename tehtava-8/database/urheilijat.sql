CREATE DATABASE urheilijat;
USE urheilijat;

CREATE TABLE urheilijat (
    id INT(11) NOT NULL AUTO_INCREMENT,
    etunimi VARCHAR(50) NOT NULL,
    sukunimi VARCHAR(50) NOT NULL,
    kutsumanimi VARCHAR(50),
    syntymavuosi DATE,
    paino DECIMAL(5,2),
    kuva VARCHAR(255),
    laji VARCHAR(100),
    saavutukset TEXT,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

INSERT INTO urheilijat
    (etunimi, sukunimi, kutsumanimi, syntymavuosi, paino, kuva, laji, saavutukset)
VALUES
    (
        'Mika',
        'Häkkinen',
        'Mika',
        '1968-09-28',
        75.00,
        'https://img.img-cdn.yle.fi/crop_extract,w_2048,h_1152,x_0,y_45/crop_fill,w_767,h_431,ar_16:9,dpr_2/f_auto/39-4417545a032f26a9b6e/1510158155',
        'Formula 1',
        'Kaksinkertainen Formula 1 -maailmanmestari'
    ),
    (
        'Teemu',
        'Selänne',
        'Teemu',
        '1970-07-03',
        95.00,
        'https://img.ilcdn.fi/7lew-Cl9iIm1TUFS4prfo3SptdQ=/full-fit-in/920x0/img-s3.ilcdn.fi/a3c936891fe57a7c7ee51be114a6229b494e1d8164e353cf8c23347b02bb8766.jpg',
        'Jääkiekko',
        'Olympiahopeaa ja Stanley Cup -voitto'
    ),
    (
        'Lotta',
        'Harala',
        'Lotta',
        '1992-03-26',
        60.00,
        'https://api.mtvuutiset.fi/graphql/caas/v1/media/9379218/data/785868820fd33ce526ab6117313b654e/lotta-harala.jpg',
        'Yleisurheilu',
        'Suomalainen pika-aitajuoksija'
    );

CREATE OR REPLACE USER 'aleks'@'localhost'
IDENTIFIED BY 'aleks';

GRANT SELECT, INSERT, UPDATE, DELETE
ON urheilijat.urheilijat
TO 'aleks'@'localhost';
