# nestMongoAuthStarter
This project is a NestJs starter. You can use it for your needs
I hope I configured everything that really needed for starter. Probably I will add/change something later... or will not :-)
#
I found official nestjs [Documentation|NestJs](https://docs.nestjs.com/) very helpful, but at the same time I spent plenty of time to configure everything that needed for project.
I am surprized that NestJs did not add it to their CLI.
#
Do not forget to add proper mongoDB connection to your env files ;-)
#
List of added features:
1. Basic nestJs app.
2. MongoDB connection. [nestJs doc](https://docs.nestjs.com/techniques/mongodb).
3. Configuration + env files for configuration. [nestJs doc](https://docs.nestjs.com/techniques/configuration).
4. Auth JWT implementation + globalValidation + Public decorator +Mongo Schemes + Validation [nestJs doc](https://docs.nestjs.com/security/authentication).
5. Bcrypt added to Auth [nestJs doc](https://docs.nestjs.com/security/encryption-and-hashing).
6. RBAC added to Auth with Decorators [nestJs doc](https://docs.nestjs.com/security/authorization).
7. Cookie-parser [nestJs doc](https://docs.nestjs.com/techniques/cookies).
8. Helmet [nestJs doc](https://docs.nestjs.com/security/helmet).
9. CORS [nestJs doc](https://docs.nestjs.com/security/cors).
10. CSRF Validation [nestJs doc](https://docs.nestjs.com/security/csrf), but I used [this](https://www.npmjs.com/package/csrf-validator?activeTab=readme). 
11. Rate Limiting. [nestJs doc](https://docs.nestjs.com/security/rate-limiting).
#
Note: I am not sure that I did everything correctly. You can fix something, or add something and create a PR.

