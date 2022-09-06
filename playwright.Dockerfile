FROM mcr.microsoft.com/playwright:v1.24.1-focal

WORKDIR /e2e
# copy project (including tests)
COPY . /e2e

# Install dependencies
RUN npm install
RUN npx playwright install

#RUN chmod +x scripts/wait-for-it.sh 
#scripts/docker-entrypoint.sh

# It _must_ use the JSON-array syntax
#ENTRYPOINT ["scripts/docker-entrypoint.sh"]

# Run playwright test
CMD [ "npx", "playwright", "test", "--reporter=list" ]
