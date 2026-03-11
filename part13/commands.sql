CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('logicff', 'https://logicff.github.io', 'Logicff''s Blog', 1000000);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Edsger W. Dijkstra', 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf', 'Go To Statement Considered Harmful', 5);
