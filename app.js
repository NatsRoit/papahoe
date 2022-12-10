const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const acceso = require('./src/middlewares/acceso'); // middleware login

// TEMPLATE ENGINE SETUP
app.set('view engine','ejs');
app.set("views", path.join(__dirname, "src/views"));   // Todas las rutas a vistas se encuentran en este dir
app.use(express.static(path.resolve(__dirname, 'public')));  // Todos los recursos estáticos se encuentran en este dir
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret : 'whatever',
    resave: true,
    saveUninitialized: true,
}));
app.use(cookieParser());
app.use(acceso);  // middleware global (siempre antes de los routers)


// REQUIERO LOS ROUTERS
const mainRoutes = require('./src/routes/main');
const productRoutes = require('./src/routes/product');
const userRoutes = require('./src/routes/user');
const adminRoutes = require('./src/routes/admin');
const apiUsersRoutes = require('./src/routes/apiUsers.js');
const apiProductsRoutes = require('./src/routes/apiProducts');

// USO LAS RUTAS
app.use('/', mainRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/api/users', apiUsersRoutes);
app.use('/api/products', apiProductsRoutes);


//-----------------404------------------------//
app.use((req, res, next) => {
    res.status(404).render(path.resolve(__dirname, './not-found'));
    next();
});

//-----------------SERVER---------------------//
app.listen(process.env.PORT || 3001, () => {
    console.log('Buena navegación! \nServidor corriendo en el puerto 3001');
});
