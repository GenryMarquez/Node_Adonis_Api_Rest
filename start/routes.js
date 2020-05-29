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
    Route.get('Project', 'ProjectController.index').middleware('auth');

}).prefix('Api/v1');

Route.group(() => {
    Route.post('Users/register', 'UserController.store');
}).prefix('Api/v2');