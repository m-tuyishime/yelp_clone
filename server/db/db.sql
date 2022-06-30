-- DROP TABLE IF EXISTS restaurants CASCADE;
-- DROP TABLE IF EXISTS reviews;

CREATE TABLE restaurants
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location character varying(50) NOT NULL,
    price_range integer NOT NULL CHECK (price_range >= 1 AND price_range <=5)
);

CREATE TABLE reviews 
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >=1 AND rating <=5)
);