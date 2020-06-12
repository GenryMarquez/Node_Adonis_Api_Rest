'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'Hello world in JSON' }
})

/*Route.post('Users/register', () => {
    return { menssage: 'Registro de Usuarios' }
})*/

//Route.post('Users/register', 'UserController.store');

Route.group(() => {
    Route.post('Users/register', 'UserController.store');
    Route.post('Users/login', 'UserController.login');
    // Rutas de Proyecto
    Route.get('Projects', 'ProjectController.index').middleware('auth');
    Route.post('Projects', 'ProjectController.create').middleware('auth');
    Route.delete('Projects/:id', 'ProjectController.destroy').middleware('auth');
    Route.patch('Projects/:id', 'ProjectController.update').middleware('auth');
    // Rutas de las Tareas
    Route.post('Projects/:id/Tareas', 'TareaController.create').middleware('auth');
}).prefix('Api/v1');

Route.group(() => {
    Route.post('Users/register', 'UserController.store');
}).prefix('Api/v2');