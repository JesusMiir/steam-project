-- db/seed.sql
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  release_date DATE,
  tags TEXT[] DEFAULT '{}'
);

INSERT INTO games (slug, title, price_cents, release_date, tags) VALUES
('hollow-knight', 'Hollow Knight', 1499, '2017-02-24', ARRAY['metroidvania','indie']),
('hades', 'Hades', 2499, '2020-09-17', ARRAY['roguelike','action']),
('celeste', 'Celeste', 1999, '2018-01-25', ARRAY['platformer','indie'])
ON CONFLICT (slug) DO NOTHING;
