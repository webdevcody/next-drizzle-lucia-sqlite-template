## Overview

This is a Next.js template which includes the following technology

- next.js (app router)
- drizzle orm
- lucia auth
- sqlite (or turso)
- shadcn
- react hook form
- zsa (server action validation)
- tiered architecture example
- resend emails

The point of this template is to allow you to setup a project which has a lot of the necessary authentication functionality out of the box, such as

- google oauth login
- github oauth login
- magic link login
- email / password login
- password reset flow email
- account registration + confirmation emails

## Running locally

1. `cp .env.sample .env` (fill out the necessary information for email support with resend, and your google + github oauth info, more info below)
1. `npm i`
1. `npx drizzle-kit push` (will create your sqlite database)
1. `npm run dev`

### Setting up Google Provider

If you want google login, you'll need to setup a google project and create some keys:

1. https://console.cloud.google.com/apis/credentials
2. create a new project
3. setup oauth consent screen
4. create credentials - oauth client id
5. for authorized javascript origins

- http://localhost:3000
- https://your-domain.com

6. Authorized redirect URIs

- http://localhost:3000/api/login/google/callback
- https://your-domain.com/api/login/google/callback

7. Set your google id and secret inside of .env

- **GOOGLE_CLIENT_ID**
- **GOOGLE_CLIENT_SECRET**

### Setting up Github Provider

TODO

## Contributing

I'm hoping to keep this template as slim as possible and only add auth related features. Some future things that might be nice to add in could be MFA, sign out all devices, etc. I'm open to contributions, but please keep that core vision of "just auth related stuff" in mind.
