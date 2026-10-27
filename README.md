Reflection Questions
1. Why is it dangerous to store passwords in plain text, and how does hashing prevent harm if the database is compromised?
- Storing passwords in plain text is dangerous because anyone who accesses the database can read them. Hashing changes passwords into a different form that is difficult to reverse. Even if someone steals the database, they cannot easily see the original passwords. This helps protect users' accounts.
2. The login endpoint returns the same error for “user not found” and “wrong password.” Why is this better than giving specific messages?
- Using the same error message helps protect user information. Hackers cannot easily know if an email is registered or not. This makes it harder for them to find valid accounts. It also improves the security of the login system.
3. In your own words, what does the middleware do on every protected request, and why is it better than putting token-checking code inside every route handler?
- The middleware checks if a request has a valid JWT token. If the token is valid, the user can continue to the protected route. If the token is missing or invalid, the request is rejected. Using middleware avoids repeating the same code in every route and makes the program easier to manage.
4.What is one thing that could still go wrong in this system (e.g., token theft, no HTTPS, weak secrets), and how would you address it in a real application?
- One problem is that a hacker might steal a user's token and use it to access protected data. To prevent this, a real application should use HTTPS to protect information during transmission. It should also keep tokens secure and use strong secret keys. These steps help make the system safer.
