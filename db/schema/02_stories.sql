DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  cover_image_url VARCHAR(255) DEFAULT 'https://specials-images.forbesimg.com/imageserve/5d4e3c3bec8b3e00086d4298/960x0.jpg?fit=scale',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
)
