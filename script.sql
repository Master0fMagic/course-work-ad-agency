CREATE TABLE client(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
fistname TEXT NOT NULL,
lastname TEXT NOT NULL,
email TEXT,
phonenumber TEXT NOT NULL,
password TEXT NOT NULL
);


CREATE TABLE agency(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
address TEXT NOT NULL
);

CREATE TABLE product(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
description TEXT,
price DOUBLE NOT NULL,
agencyid INTEGER NOT NULL,
FOREIGN KEY(agencyid) REFERENCES agency(id)
);

CREATE TABLE "order"(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
createdtime UNSIGNED BIG INT NOT NULL,
isdelivered BOOLEAN DEFAULT FALSE NOT NULL,
clientid INTEGER NOT NULL,
agencyid INTEGER NOT NULL,
FOREIGN KEY(clientid) REFERENCES client(id),
FOREIGN KEY(agencyid) REFERENCES agency(id)
);

CREATE TABLE orderitem(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
orderid INTEGER NOT NULL,
productid INTEGER NOT NULL,
amount INTEGER NOT NULL,
FOREIGN KEY(productid) REFERENCES product(id),
FOREIGN KEY(orderid) REFERENCES "order"(id)
);



INSERT INTO client (fistname, lastname, email, phonenumber, password) VALUES
("test1", "test1", "test1@gmail.com", "+380000001", "123123"),
("test2", "test2", "test2@gmail.com", "+380000002", "123123"),
("test3", "test3", "test3@gmail.com", "+380000003", "123123");


INSERT INTO agency (name, address) VALUES
("GoogleAds","https://ads.google.com/"),
("Besplatka","https://besplatka.ua/"),
("Instagram","https://www.instagram.com/");

INSERT INTO product (name, description, price, agencyid) VALUES
("Search target 1k", "1000 displays", 50.0, 1),
("Search target 10k", "10 000 displays", 450.0, 1),
("Search target 100k", "100 000 displays", 4200.0, 1),
("History target", "1000 displays", 90, 3),
("Feed target", "1000 displays", 100, 3),
("Top banner", "Banner at the top of the page, 1 month", 550, 2),
("Bottom banner", "Banner at the bottom of the page, 1 month", 450, 2),
("Side banner", "Banner at the left of the page, 1 month", 500, 2),
("Top advertisment", "Your advertisment will be on top in search results, 1 week", 75, 2);
