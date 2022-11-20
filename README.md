# Movies API

REST API which lets users select their top 100 movies. Uses
[The Movie Database](https://www.themoviedb.org/) as source of movies

## Tech Stack

1. NodeJS (Typescript)
2. Postgres
3. Docker
4. Swagger Docs

## Run Locally

### Environment Variables

Create an env file using the `.example.env` file

```bash
cp .example.env .env
```

### Install dependancies

```bash
cd api
```

```bash
npm i
```

### Run migrations

```bash
cd api
```

```bash
npx prisma migrate dev
```

### Start services

The project uses docker to run its services. Run the following command at the project root directory

```bash
docker-compose up
```

The REST API can be accessed from http://localhost:3000

Documentation can be accessed from http://localhost:7050
