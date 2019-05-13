const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const { Prisma } = require("prisma-binding");

const resolvers = {
  Query: {
    posts: async (parent, args, context, info) => {
      return context.prisma.query.posts({}, info);
    },
    feed: (parent, args, context, info) => {
      return context.prisma.query.posts({ where: { published: true } }, info);
    },
    drafts: (parent, args, context, info) => {
      return context.prisma.query.posts({ where: { published: false } }, info);
    },
    post: (parent, { id }, context, info) => {
      return context.prisma.query.post({ where: { id } }, info);
    }
  },
  Mutation: {
    createDraft(parent, { title, content }, context, info) {
      return context.prisma.mutation.createPost(
        {
          title,
          content
        },
        info
      );
    },
    deletePost(parent, { id }, context, info) {
      return context.prisma.mutation.deletePost({ id }, info);
    },
    publish(parent, { id }, context, info) {
      return context.prisma.mutation.updatePost(
        {
          where: { id },
          data: { published: true }
        },
        info
      );
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: "./src/generated/prisma.graphql",
      endpoint: process.env.PRISMA_ENDPOINT,
      debug: true
    })
  })
});

server.start({ debug: true}, () =>
  console.log("Server is running on http://localhost:4000")
);
