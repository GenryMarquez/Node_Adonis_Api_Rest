'use strict'

const Project = use('App/models/Project');
const Tarea = use('App/Models/Tarea');
const AuthorizationService = use('App/Services/AuthorizationService');

class TareaController {
    async create({ auth, request, params }) {
        const user = await auth.getUser();
        const { description } = request.all();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.VerifyPermission(project, user);
        const tarea = new Tarea;
        tarea.fill({
            description
        });

        await project.tareas().save(tarea);
        return tarea;
    }
}

module.exports = TareaController