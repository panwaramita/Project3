create database digitaldiary_db;
use digitaldiary_db;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  memID varchar(50) NOT NULL,
  email varchar(50) NOT NULL,    
  username VARCHAR(255) NOT NULL,
  createdAt DATE  NOT NULL,
  updatedAt DATETIME NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
  );
  
CREATE TABLE memories(
    id int NOT NULL AUTO_INCREMENT UNIQUE,    
    description VARCHAR(255),
    title VARCHAR(50),
    imgurl VARCHAR(255),
    PRIMARY KEY (id),
    createdAt DATE, NOT NULL,
    updatedAt DATETIME,
    PRIMARY KEY (id)
);