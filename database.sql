create table history (
    id SERIAL PRIMARY KEY,
    message varchar(255)
);

insert into history (message)
values('go north'),
('take sword'),
('drink potion');