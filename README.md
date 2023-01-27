# MovieTracker

Back end for MovieTracker, a movie tracker/wishlist

## About

MovieTracker is an application where you can add movies you wish to watch and track which ones you've already watched.

## How to run for development

1. Clone this repository
2. Install all dependencies:

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want using the `dump.sql` file
4. Configure the `.env` file using the `.env.example`
5. Run all migrations

```bash
npm run migration:run
```

6. Seed db

```bash
npm run dev:seed
```

7. Run the back-end in a development environment:

```bash
npm run dev
```
