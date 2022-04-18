# WvwRemix370c

## Includes features

- [Remix](https://remix.run)
- [React](https://reactjs.org)
- [Typescript](https://www.typescriptlang.org)
- [Architect](https://arc.codes) (AWS Deployment)
- [Tailwind CSS](https://https://tailwindcss.com/)
- GitHub Actions
- MockServer ([msw](https://mswjs.io))
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org)

## Development

Run `npm run dev` to start the local development server.

## AWS Deployment

The stack has two deployment stages based on branches.

| Branch | Stage      | needed GitHub-Secrets                            |
| ------ | ---------- | ------------------------------------------------ |
| dev    | staging    | AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY         |
| main   | production | AWS_ACCESS_KEY_ID_PRD, AWS_SECRET_ACCESS_KEY_PRD |

Deployment is provided by [Architect](https://arc.codes/).
