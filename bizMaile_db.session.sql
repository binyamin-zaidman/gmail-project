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

DROP TABLE files;
DROP TABLE mail;
DROP TABLE myContacts;
DROP TABLE users;

CREATE DATABASE mywhatsapp;
