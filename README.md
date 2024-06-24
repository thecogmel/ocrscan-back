

![Website Deploy](https://deploy-badge.vercel.app/?url=http://www.nextjs.org/&name=ocrscan)


# OCR SCAN - Backend

The [ocrscan-back](https://github.com/thecogmel/ocrscan-back) project is a backend service built using the Nest.js framework. It processes data from scanned invoices sent by the front-end application. The repository includes environment setup, API routes, data models, and test configurations. It facilitates the extraction, processing, and storage of invoice data. 

For more details, visit the [ocrscan-front GitHub repository](https://github.com/thecogmel/ocrscan-front).


## Features

- **OCR Processing**: Extracts text data from scanned invoices using Optical Character Recognition.
- **Data Management**: Handles the organization, storage, and retrieval of extracted invoice data.
- **API Integration**: Provides endpoints for interaction with the front-end application.
- **Authentication**: Supports user authentication and authorization.
- **Environment Configuration**: Includes setup instructions for different environments.
- **Testing**: Contains tests to ensure functionality and reliability of the service.


## Stacks

**Front-end:** NextJS, TailwindCSS, ReactQuery

**Back-end:** NestJS, PostgreSQL, Tesseract-ocr

**Cloud:** Supabase, Digital Ocean, Vercel
### Running Locally

Clone the project

```bash
git clone https://github.com/thecogmel/ocrscan-front.git
```

Navigate to the project directory

```bash
cd ocrscan-front
```

Install the dependencies

```bash
yarn install
```

Migrate prisma database. Obs.: You must have empty postgresql db running

```bash
npx prisma db push
```

Start the server

```bash
yarn star:dev
```
## Example data

User and password example:
```json
{
    username: admin@user.com,
    password: password
}
```
For the invoice models used, the following model was used:
[Invoice example](https://nvtvaoijcjxlhzspqwdh.supabase.co/storage/v1/object/public/ocr/modelo-invoice.png)
### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

```dotenv
SUPABASE_API="https://nvtvaoijcjxlhzspqwdh.supabase.co"
SUPABASE_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dHZhb2lqY2p4bGh6c3Bxd2RoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODY0MzgyNywiZXhwIjoyMDM0MjE5ODI3fQ.bPIJUgf4KUOEVf3_CJ5OX34S0utu8byBM0ExazqP1Jc"
ORG_SUPABASE="n!mK6rgYWcraMv5"

GITHUB_CLIENT_ID=Ov23liEMF8IFRvl2CvdY
GITHUB_CLIENT_SECRET=ecaf0e0ba0b9a5aa089f735388f09a3bd7d531e8

JWT_SECRET="n!mK6rgYWcraMv5"

DATABASE_NAME=ocrscan-db
DATABASE_USER=ocrscan-user
DATABASE_PASSWORD=password
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public
PORT=2345
```



## Improvements

Here are some potential improvements that could be implemented in the ocrscan-front project:

- **Social Login Implementation**: Add social login functionality using GitHub and other authentication gateways to simplify user access.
- **Testing**: Develop and integrate tests to ensure the reliability and functionality of the application.
- **Code Refactoring**: Optimize the codebase for better performance and maintainability.
- **Accessibility Enhancements**: Improve accessibility features to make the application more usable for people with disabilities.
### Feedback

If you have any feedback, please let us know at erick.medeiros.104@ufrn.edu.br.
## Autor

- [@thecogmel](https://www.github.com/thecogmel)
