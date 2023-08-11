# 🗺 TravelMap App

TravelMap is an educational app where you can save your routes, pin waypoints in some places and rate it adding own comments.

## Basic Features 📸

This app has the following features, used for practice:

- Login and Register (comming soon)
- Create Waypoints (comming soon)
- Add names and descriptions of this Waypoints (comming soon)
- Create Routes between two Waypoints (comming soon)

## Getting Started 🎈

- **Clone this [repository](https://github.com/alexisg24/travelmap-app)**

```bash
  git clone https://github.com/alexisg24/travelmap-app
```

Create a `.env` file based in `.env.example` and fill the variables with necesarie info (using a PostgreSQL DB)

- **Install necesaries dependencies**

```bash
npm install
```

- **Run in development mode**

```bash
npm run dev
```

- **Run in production build**
  First we need build the project using:

```bash
npm run build
```

Then a `dist` dir will be generated with transpiled project. Now can use:

```bash
npm run start

#or

node ./dist/index.js
```

### **If you want use docker images**

- **Open docker and run the containers**

```bash
docker-composer up -d
```

## **API Documentation and Endpoints**

- **Access to the route:**

```bash
{{base_url}}/api/v1/docs
```

## Author 🙋‍♂️

- [@alexisg24](https://www.github.com/alexisg24)

## License ⚖

[MIT](https://choosealicense.com/licenses/mit/)
