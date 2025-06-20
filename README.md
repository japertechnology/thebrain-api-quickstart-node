# TheBrain API Quickstart - Node.js

This is an example project that demonstrates how to make a call to TheBrain's API to create a thought. It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). Follow the instructions below to get set up.

## Setup

1. Ensure you are using **Node.js v18.x**, as specified in the `.nvmrc` file. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/). When using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to switch to this version.

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd thebrain-api-quickstart-node
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file
   ```bash
   $ cp .env.example .env.local
   ```
6. Add your [API key](https://app.thebrain.com/apiKeys) to the newly created `.env.local` file. **This file contains secrets and should never be committed to version control.**

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000).

## Security best practices

- `.env.local` is listed in `.gitignore`; keep it private and out of your repository.
- Rotate your API keys periodically.
- When deploying, use your hosting provider's environment manager to supply keys rather than committing them.

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on workflow, branch naming and commit format. Issue and pull request templates are available in the [`.github`](.github) directory.
