
create table USER (
	user_id BIGSERIAL PRIMARY KEY NOT NULL,
	user_password VARCHAR(50) NOT NULL,
);


create table CUSTOMER (
	user_id BIGSERIAL PRIMARY KEY  REFERENCES USER(user_id) NOT NULL,
	customer_fname VARCHAR(50) NOT NULL,
	customer_lname VARCHAR(50) NOT NULL,
	customer_zipcode VARCHAR(5) 
);
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (1, 'Yasmeen', 'Bruggeman', '27122');
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (2, 'Allx', 'Edel', '19738');
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (3, 'Antonius', 'Degenhardt', '54931');
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (4, 'Mirabella', 'Napper', '34080');
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (5, 'Lily', 'Ivetts', '91230');
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (6, 'Nelie', 'Edward', null);
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (7, 'Madison', 'Roskelley', '68640');
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (8, 'Shandra', 'Climson', '24903');
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (9, 'Loralyn', 'Rohlfs', '15899');
insert into CUSTOMER (user_id, customer_fname, customer_lname, customer_zipcode) values (10, 'Gilligan', 'Trimmell', '91552');


create table CARRIER (
	carrier_id BIGSERIAL PRIMARY KEY NOT NULL,
	carrier_name VARCHAR(5) NOT NULL,
	carrier_phone VARCHAR(50) NOT NULL
);
insert into CARRIER (carrier_id, carrier_name, carrier_phone) values (1, 'FedEX', '277-965-5715');
insert into CARRIER (carrier_id, carrier_name, carrier_phone) values (2, 'UPS', '975-922-9081');
insert into CARRIER (carrier_id, carrier_name, carrier_phone) values (3, 'USPS', '281-315-0688');

create table EMPLOYEE (
	user_id BIGSERIAL PRIMARY KEY  REFERENCES USER(user_id) NOT NULL,
	employee_fname VARCHAR(50) NOT NULL,
	employee_lname VARCHAR(50) NOT NULL
);
insert into EMPLOYEE (user_id, employee_fname, employee_lname) values (21, 'Merry', 'Asplin');
insert into EMPLOYEE (user_id, employee_fname, employee_lname) values (22, 'Annmaria', 'Olpin');
insert into EMPLOYEE (user_id, employee_fname, employee_lname) values (23, 'Bryna', 'Cattow');

create table MEMBERSHIP ( -- check uniqueness of customer id
	membership_id BIGSERIAL PRIMARY KEY NOT NULL,
	user_id INT  REFERENCES CUSTOMER(user_id) NOT NULL,
	user_id INT  REFERENCES EMPLOYEE(user_id) NOT NULL,
	membership_status VARCHAR(20)
);
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (1, 10, 21, 'Platinum');
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (2, 10, 22, 'Silver');
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (3, 4, 23, 'Silver');
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (4, 7, 21, 'Gold');
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (5, 1, 21, 'Platinum');
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (6, 6, 23, 'Silver');
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (7, 8, 23, 'Silver');
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (8, 6, 21, 'Platinum');
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (9, 5, 21, 'Silver');
insert into MEMBERSHIP (membership_id, user_id, user_id, membership_status) values (10, 9, 23, 'Silver');

create table COMPLAINT (
	complaint_id BIGSERIAL PRIMARY KEY NOT NULL,
	user_id INT  REFERENCES CUSTOMER(user_id) NOT NULL,
	user_id INT  REFERENCES EMPLOYEE(user_id) NOT NULL,
	complaint_status VARCHAR(9) NOT NULL,
	complaint_text VARCHAR(13) NOT NULL,
	complaint_date DATE NOT NULL
);
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (1, 6, 23, 'received', 'not durable', '2021-04-24');
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (2, 6, 23, 'processed', 'low quality', '2021-04-19');
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (3, 6, 23, 'received', 'low quality', '2021-04-11');
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (4, 3, 23, 'done', 'low quality', '2021-10-01');
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (5, 6, 23, 'received', 'not durable', '2020-12-17');
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (6, 5, 22, 'received', 'low quality', '2021-07-05');
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (7, 8, 22, 'done', 'not durable', '2021-01-28');
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (8, 2, 23, 'processed', 'low quality', '2021-02-02');
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (9, 6, 22, 'processed', 'not durable', '2021-09-30');
insert into COMPLAINT (complaint_id, user_id, user_id, complaint_status, complaint_text, complaint_date) values (10, 8, 21, 'processed', 'not durable', '2021-04-11');

create table MANUFACTURER (
	man_id BIGSERIAL PRIMARY KEY NOT NULL,
	seller_name VARCHAR(50),
	user_id INT REFERENCES EMPLOYEE(user_id) NOT NULL
);
insert into MANUFACTURER (man_id, seller_name, user_id) values (1, 'a', 1);
insert into MANUFACTURER (man_id, seller_name, user_id) values (2, 'b', 2);
insert into MANUFACTURER (man_id, seller_name, user_id) values (3, 'c', 3);

create table PRODUCT (
	product_id BIGSERIAL PRIMARY KEY NOT NULL,
	user_id BIGINT REFERENCES EMPLOYEE(user_id) NOT NULL,
	carrier_id BIGINT REFERENCES CARRIER(carrier_id) NOT NULL,
	man_id BIGINT REFERENCES MANUFACTURER(man_id) NOT NULL,
	product_desc VARCHAR(100) NOT NULL,
	product_price DECIMAL(5,2) NOT NULL
);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (1, 21, 1, 1, 'bag', 99.32);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (2, 22, 3, 1, 'carry-on', 8.35);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (3, 22, 1, 1, 'backpack', 73.28);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (4, 22, 2, 3, 'watch', 76.85);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (5, 22, 2, 1, 'pants', 33.98);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (6, 21, 2, 2, 'tshirt', 83.74);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (7, 22, 1, 2, 'bracelet', 14.27);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (8, 23, 1, 2, 'ring', 12.68);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (9, 23, 3, 2, 'trolley', 16.66);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (10, 21, 1, 2, 'chair', 80.46);
insert into PRODUCT (product_id, user_id, carrier_id, man_id, product_desc, product_price) values (11, 23, 1, 2, 'bag', 3.57);

create table REVIEWS (
	review_id BIGSERIAL PRIMARY KEY NOT NULL,
	user_id INT REFERENCES CUSTOMER(user_id) NOT NULL,
	product_id INT REFERENCES PRODUCT(product_id) NOT NULL,
	review_rating DECIMAL(2,1) NOT NULL,
	review_text VARCHAR(250),
	review_date DATE NOT NULL
);
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (1, 6, 2, 4.5, 'bad', '2021-02-05');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (2, 7, 10, 1.2, 'life saver', '2020-12-30');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (3, 5, 10, 2.2, 'not good', '2021-04-21');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (4, 7, 4, 1.6, 'love it', '2021-01-09');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (5, 7, 8, 2.2, 'bad', '2021-05-09');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (6, 2, 10, 4.4, 'love it', '2021-04-11');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (7, 4, 9, 4.6, 'dont ever buy it', '2021-06-25');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (8, 10, 10, 2.5, 'bad', '2020-11-10');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (9, 1, 1, 4.2, 'bad', '2020-12-23');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (10, 6, 5, 3.2, 'great product', '2020-12-12');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (11, 9, 1, 4.0, 'life saver', '2022-01-07');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (12, 7, 10, 2.9, 'love it', '2021-09-08');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (13, 9, 1, 2.8, 'not good', '2021-08-05');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (14, 10, 9, 1.5, 'bad', '2022-02-16');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (15, 10, 10, 4.3, 'love it', '2021-01-01');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (16, 3, 1, 3.9, 'nice', '2021-10-08');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (17, 10, 9, 3.2, 'love it', '2021-05-23');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (18, 6, 2, 3.9, 'life saver', '2021-11-01');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (19, 10, 9, 2.7, 'not good', '2020-12-26');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (20, 1, 6, 3.8, 'bad', '2021-10-06');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (21, 7, 3, 4.1, 'dont ever buy it', '2021-08-24');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (22, 10, 4, 1.3, 'nice', '2021-09-29');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (23, 5, 10, 2.3, 'great product', '2021-10-16');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (24, 8, 8, 2.5, 'great product', '2020-12-03');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (25, 4, 8, 1.8, 'love it', '2021-01-23');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (26, 3, 2, 2.3, 'not good', '2021-06-09');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (27, 6, 10, 2.4, 'dont ever buy it', '2022-03-27');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (28, 8, 7, 4.5, 'great product', '2020-11-13');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (29, 5, 6, 3.6, 'not good', '2020-11-05');
insert into REVIEWS (review_id, user_id, product_id, review_rating, review_text, review_date) values (30, 2, 2, 2.8, 'nice', '2021-06-16');


create table WISHLIST (
	user_id INT PRIMARY KEY REFERENCES CUSTOMER(user_id) NOT NULL
	product_id BIGINT PRIMARY KEY REFERENCES PRODUCT(product_id) NOT NULL
);

insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (1, 3, 5);
insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (2, 8, 1);
insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (3, 4, 2);
insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (4, 4, 2);
insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (5, 5, 3);
insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (6, 9, 2);
insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (7, 2, 5);
insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (8, 1, 10);
insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (9, 3, 7);
insert into WISHLIST (product_wish_id, wishlist_id, product_id) values (10, 1, 9);

