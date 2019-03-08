1. What is the purpose of using sessions?

Ans. Sessions are used to allow a server to store information about a client. Sessions provide a way to persist data        across requests.

2. What does bcrypt do to help us store passwords in a secure manner.

Ans. BCrypt hashes a password for us.

3. What does bcrypt do to slow down attackers?

Ans. BCrypt hashes the users password multiple times making it difficult for an attacker to gather the correct              information. 

4. What are the three parts of the JSON Web Token?

Ans. The three parts of a json web token are the header, the payload and the signature. 
     The header contains the algorithm with the token type.
     The payload has claims and any other data that we want to store in the token.
     The signature is a string where the header and payload are encoded together and signed with a secret.
