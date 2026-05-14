# StopReg Node.js SDK

[![npm version](https://img.shields.io/npm/v/@stopreg/stopreg.svg)](https://www.npmjs.com/package/@stopreg/stopreg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official Node.js SDK for [StopReg](https://stopreg.com), providing advanced email and domain verification to protect your application from fraudulent registrations and disposable email addresses.

## Features

- **Email Verification**: Check if an email is disposable, role-based, or blocked.
- **Domain Verification**: Verify domains for MX records and provider reputation.
- **MX Record Lookup**: Automated mail server verification.
- **Provider Reputation**: Identify high-risk providers and disposable email services.
- **TypeScript Support**: Fully typed for a better developer experience.

## Installation

```bash
npm install @stopreg/stopreg
# or
pnpm add @stopreg/stopreg
# or
yarn add @stopreg/stopreg
```

## Quick Start

Initialize the client with your StopReg API token (get one at [stopreg.com/dashboard](https://stopreg.com/dashboard)).

```typescript
import { StopReg } from '@stopreg/stopreg';

const stopreg = new StopReg({
  apiToken: 'your_api_token_here'
});

async function runCheck() {
  // 1. Verify an email address
  const emailResult = await stopreg.verification.checkEmail('test@disposable.com');
  console.log('Is Disposable:', emailResult.data.classification.is_disposable);

  // 2. Verify a domain
  const domainResult = await stopreg.verification.checkDomain('gmail.com');
  console.log('Provider:', domainResult.data.domain.provider);
}

runCheck();
```

## Usage

### Email Verification

Check detailed metrics for any email address:

```typescript
import { StopReg } from '@stopreg/stopreg';

const stopreg = new StopReg({ apiToken: '...' });

const result = await stopreg.verification.checkEmail('user@gmail.com');

console.log(result.data.input.email);                  // "user@gmail.com"
console.log(result.data.classification.is_disposable);  // false
console.log(result.data.classification.is_role_based);  // false
console.log(result.data.mail_server.mx_found);          // true
```

### Domain Verification

Verify a domain before allowing a user to register:

```typescript
const result = await stopreg.verification.checkDomain('stopreg.com');

console.log(result.data.domain.name);          // "stopreg.com"
console.log(result.data.domain.provider);      // "google"
console.log(result.data.mail_server.mx_found); // true
```

## Error Handling

The SDK throws descriptive errors for invalid inputs or API issues.

```javascript
try {
  await stopreg.verification.checkEmail('invalid-email');
} catch (error) {
  // "A valid email address is required."
  console.log(error.message); 
}
```

## License

MIT © [StopReg](https://stopreg.com)
