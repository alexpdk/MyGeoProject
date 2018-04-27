drop table if exists cities;
drop table if exists countries;

create table countries(
    id int auto_increment primary key,
    name varchar(50),
    capital varchar(50),
    population bigint,
    GDP float(20, 10)
);
insert into countries (name, capital, population, GDP) values 
("The UK", "London",     65468000, 2.79),
("The RSA", "Cape Town", 54957000, 0.742),
("Bangladesh", "Dhaka", 162951000, 0.687),
("Russia", "Moscow",    144463000, 4.0),
("Taiwan", "Taipei",     23550000, 1.177);

create table cities(
    id int auto_increment primary key,
    name varchar(50),
    countryId int, 
    population bigint,
    mayor varchar(50),
    foreign key(countryId) references countries(id) on delete set null
) engine=innodb;
insert into cities (name, countryId, population, mayor) values 
("London", 1, 9787000, "Sadiq Khan"),
("Birmingham", 1, 2441000, "Anne Underwood"),
("Cape Town", 2, 3740000, "Patricia de Lille"),
("Johannesburg", 2, 7860871, "Herman Mashaba"),
("Dhaka", 3, 18898000, "Sayeed Khokon"),
("Chittagong", 3, 4009000, "A J M Nasir Uddin"),
("Moscow", 4, 12229000, "Sergey Sobyanin"),
("Saint Petersburg", 4, 5323000, "Georgy Poltavchenko"),
("New Taipei", 5, 3972000, "Eric Chu"),
("Taichung", 5, 2781000, "Lin Chia-lung");

