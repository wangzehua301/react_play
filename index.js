import SimpleReact from './SimpleReact.js';
import App from './App.js';

const app = new App();
SimpleReact.render(app.render(), document.getElementById('root'));