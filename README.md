# MinesweepeRRR

This is a monorepo for the classic game ***minesweeper***, made in ***R***uby on ***R***ails and ***R***eact

# Tech Stack
- **Version Control**: [Git](https://git-scm.com/)
- **Containerization:** [Docker](https://www.docker.com/get-started/) and [Docker Compose](https://docs.docker.com/compose/)

### Backend
- **Language:** [Ruby 3.4.3](https://www.ruby-lang.org/en/downloads/)
- **Framework:** [Rails 8.0.2](https://rubyonrails.org/)
- **Tests:** [Rspec](https://rspec.info/)

### Frontend
- **Language:** [Typescript](https://www.typescriptlang.org/)
- **Library:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vite.dev/)
- **Package Manager:** [npm](https://www.npmjs.com/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)

# Build and Instalation
1. Install [git](https://git-scm.com/downloads).
2. Install [Docker](https://docs.docker.com/get-started/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).
    Or as another option install all the backend and frontend dependencies.

3. Configure env variable
    By default, the frontend application will route to `http://localhost:3000`. To use another url, set the variable **VITE_API_URL** on the file `frontend/.env` to the other host.
    - ```bash
      cp frontend/.env.example frontend/.env
      ```

# Run the Project

- Clone the repository with:
```bash
git clone git@github.com:noble-sun/MinesweepeRRR.git
```

- Go inside the directory *MinesweepeRRR*
- Build the container application
```bash
docker compose build
```
- Run the backend and frontend containers
```bash
docker compose up
```

The application should be hosted locally on `http://localhost:5173`

If you want to enter the containers after they are running, you can do so with the command below:
```bash
docker exec -it backend bash
```
```bash
docker exec -it frontend sh
```

# Future improvements
- [ ] Unit tests for frontend
- [ ] Improve style
- [ ] Improve render efficiency
- [ ] First click never has bomb
- [ ] Save scores
- [ ] Different board levels
- [ ] Custom boards
- [ ] Assign keyboard shortcuts for actions
- [ ] Provide help/clue button
