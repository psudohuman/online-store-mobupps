Two ways to setup up the project and get it running:
- Docker
  - No `.env` file needed. 
  - Make sure nothing is running on port `3000` and `3306`.
  - Run `sudo docker-compose up --build`
  - Access the API at `http://localhost:3000/`
- Manually
  - Copy `.env.example` to `.env` and setup the necessary environment variable.
  - Run `yarn start`