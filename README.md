# Caretag

## Getting Started

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Login using the following account

```
admin@materialize.com
admin
```

## Deployment 

You’ll need to access the EC2 instance on AWS, start the Nginx reverse proxy, and configure it to point to port 3000. Then, clone the current codebase onto the instance. By default, Next.js will launch the service on port 3000.

Setup Nginx Proxy 
```
https://blog.logrocket.com/how-to-run-node-js-server-nginx/
```

Setup NextJS
```
git clone https://github.com/hughiephan/caretag.git
cd caretag
npm install
sudo npm install pm2 -g
npm run build
pm2 start npm -- start
```

## Development

Refer to the official Materialize guide from: https://demos.pixinvent.com/materialize-nextjs-admin-template/documentation

You can experiment with the menu options first, as the project allows switching between these two menus.

- `caretag\src\components\layout\vertical\VerticalMenu.jsx`
- `caretag\src\components\layout\horizontal\HorizontalMenu.jsx`

## Home-page

<img width="917" alt="image" src="https://github.com/user-attachments/assets/b628108f-2c2e-4090-9473-241ef233b936">

## About-page

<img width="899" alt="image" src="https://github.com/user-attachments/assets/44ddc056-6bb3-4307-b25c-885b6527e04d">

## Team-page

<img width="915" alt="image" src="https://github.com/user-attachments/assets/70b5bf68-bbf4-4454-b32b-49622efde3e2">

## Calendar-page

<img width="907" alt="image" src="https://github.com/user-attachments/assets/65befd1f-eab3-4b13-8598-4a045b00841e">

## Documents-page (Todo)

<img width="617" alt="image" src="https://github.com/user-attachments/assets/b522df61-c307-41ab-bc41-295fca4fd257">
