This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Deployment

It is deployed to Vercel, you may access it through https://rick-n-morty-three.vercel.app/

## E2E test
I believe well maintained E2E tests are the best document to kick start, they will give you an overview about the implemented features.  

```bash
npm run e2e
```
There are four playwrights files in tests folder, including the tests for
- The blocking flow (when username and job title are not filled)
- The username and job title form aka the sign up form
- The information page, tests contain general use cases and A11y use cases
- The username and job update form aka the edit profile page

All the test cases are tested on **chromium**, **firefox** and **webkit**.

## Technical rundown for each page

1. The blocking page (signup form)
  - The username and job title are encrypted and stored in session in the format of JWS JSON Web Tokens
  - The access control is implemented in the level of middleware
  - The form leverages React 18 useActionState hook
  - Both client side and server client validations are enforced even though there is not too much to validate
    
![image](https://github.com/user-attachments/assets/0abb1cbb-89f9-44a7-8600-13a3db43e815)

2. The information page and modal
  - The most complicated page with the most A11y optimizations, e.g. the page viewing heading is focused when page is switched, the focus locks in the modal and the focus will be restored when modal is dismissed
  - The simple modal is handcrafted by myself as there is an existing bug in Next.js 15 with Chakra Modal
  - Server component rendering takes top priority, as a result, both page and modal can be accessed through URLs
  - @apollo/experimental-nextjs-app-support is required with Apollo client to fetch the data on server end
    
![image](https://github.com/user-attachments/assets/7180bbc0-8488-4b0b-973a-356c0ef0ceab)

3. The profle edit page
  - Very similar to the signup form
  - The previously filled username and job title are decrypted and displayed in the form
  - Update them will refresh the session with the new encrypted information, an A11y friendly alert message will pop up when it succeeds
  - Remove either of the username and job title then submit the form will result in the removal of session, which navigates user to the signup form
![image](https://github.com/user-attachments/assets/02cc4f98-0a04-4745-a705-2b3b5fb07556)
  

