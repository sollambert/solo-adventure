create table history (
    id SERIAL PRIMARY KEY,
    username varchar(255),
    pass varchar(255),
    room varchar(255),
    inventory varchar(255)[]
);

insert into history (message)
values('go north'),
('take sword'),
('drink potion');