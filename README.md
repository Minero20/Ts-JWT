# Ts-APIs
# file .env
DB_HOST='10.80.6.165' <br>
DB_USERNAME='stu64160168' <br>
DB_PASSWORD='CznMMEFR' <br>
DB_DATABASE='stu64160168' <br>

TOKEN_KEY=CznMMEFR <br>

# postman
post : http://localhost:3000/user/login <br>
body -> { <br>
          "username": "...", <br>
          "password": "..." <br>
        } <br>

get : http://localhost:3000/user <br>

post : http://localhost:3000/user/welcome?x-access-token <br>
params -> x-access-token = ... 
