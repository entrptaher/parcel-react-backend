Make sure you have following installed,
- docker
- docker-compose
- dotenv-cli

First create a .env file, which should be similar to this,

```
FRONTEND_URL="http://localhost:7777"
PRISMA_ENDPOINT="http://localhost:4466"
PRISMA_MANAGEMENT_API_SECRET="abc123"
PRISMA_SECRET="abc123"
APP_SECRET="abc123"
STRIPE_SECRET=""
PORT=4000
```

Then run the prisma daemon along with a mongodb server,

```
docket-compose up --build
```

Install all important tools,

```
npm i -g dotenv-cli prisma graphql-cli graphql-cli-generate-fragments
```

Generate fragments and Deploy the schema,

```
graphql generate-fragments
dotenv -e prisma deploy
```

