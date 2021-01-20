FROM node:12-alpine

WORKDIR /app

COPY tsconfig.json ./
COPY serverless.yml ./serverless.yml

# Remove the typescript build plugin from the serverless file, we build manually
# in docker so that the output is always the same (and ready at the start) in the
# actual artifact
RUN echo "$(awk '!/serverless-plugin-typescript/' serverless.yml)" > serverless.yml
# Point the serverless handlers to the typescript compiled .build directory
RUN echo "$(sed -E 's|handler: src\/handler\.(.*)|handler: \.build\/handler\.\1|g' serverless.yml)" > serverless.yml

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY src ./

RUN npm run build

EXPOSE 3000
EXPOSE 3002

CMD ["node", "./node_modules/serverless/bin/serverless.js", "offline", "start",  "--host", "0.0.0.0"]
