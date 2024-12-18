--creats tables
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     phone VARCHAR(20),
--     question VARCHAR(255) NOT NULL,
--     answer VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- CREATE INDEX idx_users_email ON users(email);
-- CREATE TABLE mail (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id),
--     recipient VARCHAR(100) NOT NULL,
--     subject VARCHAR(255),
--     content TEXT NOT NULL,
--     sender VARCHAR(100) NOT NULL,
--     starred BOOLEAN DEFAULT FALSE,
--     read BOOLEAN DEFAULT FALSE,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- CREATE INDEX idx_mail_timestamp ON mail(timestamp);
-- CREATE TABLE files (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id),
--     filename VARCHAR(255) NOT NULL,
--     path VARCHAR(255) NOT NULL,
--     uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- CREATE INDEX idx_files_user_id ON files(user_id);
-- CREATE TABLE myContacts (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id),
--     contact_id INTEGER,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- CREATE INDEX idx_myContacts_user_id ON myContacts(user_id);
-- CREATE INDEX idx_myContacts_contact_id ON myContacts(contact_id);
--show at tables
-- SELECT * from users
-- SELECT * from mycontacts
-- SELECT * from mail
-- SELECT * from files
-- DROP TABLE files;
-- DROP TABLE mail;
-- DROP TABLE myContacts;
-- DROP TABLE users;
--
-- יצירת טבלת users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    question TEXT,
    answer TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--
-- יצירת טבלת chats
CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    -- recipient INT REFERENCES users(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) DEFAULT null,
    description VARCHAR(255) DEFAULT null;

);


--
-- יצירת טבלת messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    chat_id INT REFERENCES chats(id),
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read BOOLEAN DEFAULT FALSE
);
--
select *
from users
select *
from chats
select *
from messages
select *
from chat_users

insert into users (first_name, last_name, email, password, phone, question, answer)
values ('binyamin', 'zaidman', 'b@gmail.com', '123', 0501234567, 'whts your age', '27');


alter TABLE messages
add column sender INT;

alter TABLE chats
add column name VARCHAR(255) DEFAULT null;
alter TABLE chats
add column description VARCHAR(255) DEFAULT null;


CREATE TABLE chat_users (
    id SERIAL PRIMARY KEY,
    chat_id INT REFERENCES chats(id),
    user_id INT REFERENCES chats(user_id)
);

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'messages';


SELECT 
    table_name, 
    column_name, 
    data_type
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public'
ORDER BY 
    table_name, 
    ordinal_position;
