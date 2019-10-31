CREATE TABLE users
(
  userName varchar (255) NOT NULL,
  userPassword varchar (255) NOT NULL,
  userEmail varchar (255) UNIQUE NOT NULL,
  firstName varchar (255) NOT NULL,
  lastName varchar (255) NOT NULL,
  gender varchar (255) NOT NULL,
  aboutMe varchar (255) DEFAULT NULL,
  city varchar (255) NOT NULL,
  state varchar (255) NOT NULL,
  zipCode varchar (255) NOT NULL,
  userPhone int (10) DEFAULT NULL,
  PRIMARY KEY(userName)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
