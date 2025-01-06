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
    description VARCHAR(255) DEFAULT null
);
--
-- יצירת טבלת messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    chat_id INT REFERENCES chats(id),
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read BOOLEAN DEFAULT FALSE
    sender INT
);

-- יצירת טבלת chat_users
CREATE TABLE chat_users (
    id SERIAL PRIMARY KEY,
    chat_id INT REFERENCES chats(id),
    user_id INT REFERENCES chats(user_id)
);
--
SELECT
    tc.table_schema,
    tc.table_name,
    kcu.column_name,
    ccu.table_schema AS foreign_table_schema,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM
    information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public';


select *
from users
select *
from chats
select *
from messages
select *
from chat_users

insert into users (
        first_name,
        last_name,
        email,
        password,
        phone,
        question,
        answer
    )
values (
        'binyamin',
        'zaidman',
        'b@gmail.com',
        '123',
        0501234567,
        'whts your age',
        '27'
    );
alter TABLE messages
add column sender INT;

alter TABLE chats
add column name VARCHAR(255) DEFAULT null;
alter TABLE chats
add column description VARCHAR(255) DEFAULT null;
SELECT column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'messages';
SELECT table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name,
    ordinal_position;
insert into chat_users (chat_id, user_id)
values (5, 527171044)
insert into chat_users (chat_id, user_id)
values (5, 527171044) -- ALTER TABLE chat_users
    -- ALTER COLUMN user_id TYPE varchar USING user_id::varchar;
SELECT id
FROM users
WHERE phone = '501234567';
SELECT *
    FROM messages
    JOIN chat_users ON messages.chat_id = chat_users.chat_id
    WHERE messages.chat_id = 2 AND chat_users.user_id = 2


SELECT DISTINCT messages.id, messages.chat_id, messages.message, messages.timestamp, messages.read, messages.sender
FROM messages
JOIN chat_users ON messages.chat_id = chat_users.chat_id
WHERE messages.chat_id = 1 AND chat_users.user_id = 1;

SELECT messages.id, messages.chat_id, messages.message, messages.timestamp, messages.read, messages.sender
FROM messages
JOIN chat_users ON messages.chat_id = chat_users.chat_id
WHERE messages.chat_id = 1 AND chat_users.user_id = 1
GROUP BY messages.id, messages.chat_id, messages.message, messages.timestamp, messages.read, messages.sender;

 SELECT 
          messages.id, 
          messages.chat_id, 
          messages.message, 
          messages.timestamp, 
          messages.read, 
          messages.sender, 
          users.first_name AS sender_name, 
          users.last_name AS sender_last_name
          chats.name AS chat_name

      FROM 
          messages
      JOIN 
          chat_users ON messages.chat_id = chat_users.chat_id
      JOIN 
          users ON messages.sender = users.id
      JOIN 
          chats ON messages.chat_id = chats.id
      WHERE 
          messages.chat_id = 1 
          AND chat_users.user_id = 1
      ORDER BY 
          messages.timestamp ASC

SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM 
    information_schema.columns
WHERE 
    table_schema = 'public'
ORDER BY 
    table_name, ordinal_position;

SELECT 
    messages.id AS message_id,
    messages.chat_id,
    messages.message,
    messages.timestamp AS message_time,
    messages.read AS is_read,
    users.first_name || ' ' || users.last_name AS sender_name,
    chats.name AS chat_name
FROM 
    messages
JOIN 
    chats ON messages.chat_id = chats.id 
JOIN 
    users ON messages.sender = users.id 
WHERE 
    messages.chat_id = 1 
ORDER BY 
    messages.timestamp ASC; 


ALTER TABLE messages
DROP CONSTRAINT messages_chat_id_fkey;

ALTER TABLE messages
ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE;

select first_name || ' ' || last_name as chat_name  from users where phone = '501234567'


ALTER TABLE chat_users
DROP CONSTRAINT chat_users_chat_id_fkey;

ALTER TABLE chat_users
ADD CONSTRAINT chat_users_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE SET NULL;

ALTER TABLE chats ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER TABLE users DROP COLUMN id;

ALTER TABLE users DROP COLUMN id;

SELECT conname, conrelid::regclass AS table_name
FROM pg_constraint
WHERE confrelid = 'users'::regclass;

cannot drop column id of table users because other objects depend on it

ALTER TABLE users ADD COLUMN id UUID DEFAULT uuid_generate_v4() PRIMARY KEY;

ALTER TABLE chat_users DROP CONSTRAINT chat_users_user_id_fkey;

ALTER TABLE chat_users
ADD CONSTRAINT chat_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE chat_users  DROP CONSTRAINT chat_users_user_id_fkey;
ALTER TABLE chats  DROP CONSTRAINT chats_user_id_fkey;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER TABLE users DROP COLUMN id;
ALTER TABLE users ADD COLUMN id UUID DEFAULT uuid_generate_v4() PRIMARY KEY;
UPDATE users SET id = uuid_generate_v4();

ALTER TABLE chat_users
ADD CONSTRAINT chat_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE chat_users
ALTER COLUMN user_id TYPE UUID USING user_id::uuid;

ALTER TABLE chat_users
ADD CONSTRAINT chat_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


drop table chat_users;
drop table chats;
drop table messages;
drop table users;

-- הוספת הרחבה ל-UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- יצירת טבלת users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    question TEXT,
    answer TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- יצירת טבלת chats
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) DEFAULT null,
    description VARCHAR(255) DEFAULT null
);

-- יצירת טבלת messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read BOOLEAN DEFAULT FALSE,
    sender UUID REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת chat_users
CREATE TABLE chat_users (
    id SERIAL PRIMARY KEY,
    chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

SELECT * FROM chat_users JOIN chats ON chats.id = chat_users.chat_id WHERE chat_users.user_id = '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4' AND chats.is_deleted = false;

DELETE FROM chats
WHERE id = '7c5b0a58-3a02-4d89-a9e3-8fa1dcc8c6db';

SELECT id as user_id FROM users WHERE phone = '0534101201' AND password = '1234';

SELECT id as user_id, first_name || ' ' || last_name as user_name, email, phone, question, answer FROM users WHERE phone = '0534101201' AND password ='1234';


select * from chat_users 

SELECT c.* FROM chat_users JOIN chats as c ON c.id = chat_users.chat_id WHERE c.is_deleted = false AND chat_users.user_id =  '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4'

select id, first_name,last_name,email,phone from users where id = '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4'

SELECT * FROM chat_users JOIN chats ON chats.id = chat_users.chat_id WHERE chats.is_deleted = false AND chat_users.user_id = '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4'

SELECT * FROM chat_users JOIN chats ON chats.id = chat_users.chat_id WHERE chats.is_deleted = false AND chat_users.user_id = '1705079e-cb0c-4fc1-b4f1-7e2d055d69f4'

select first_name || ' ' ||last_name  as userName from users where phone = '0583276841'

select phone, password from users where phone = '0586646399' and password = '1234'

DELETE from chats
select id ,password,first_name ,last_name, email,phone,question,answer  from users where phone ='0534101201'

UPDATE users SET password = 1234 WHERE id ='6488f230-e1c3-45b5-9e5c-01c8253e548e'  AND answer = 'father RETURNING *'

alter TABLE messages
add column is_deleted BOOLEAN DEFAULT false;

DELETE from users where id = '78118e76-21cd-4b85-b5dc-01646efb9473'
select * from users