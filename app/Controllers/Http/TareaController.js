'use strict'

const Project = use('App/models/Project');
const Tarea = use('App/Models/Tarea');
const AuthorizationService = use('App/Services/AuthorizationService');


class TareaController {
    async index({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.VerifyPermission(project, user);
        return await project.tareas().fetch();

    }

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

    async update({ auth, request, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        const project = await tarea.project().fetch();
        AuthorizationService.VerifyPermission(project, user);
        tarea.merge(request.only([
            'description',
            'completada'
        ]));
        await tarea.save();
        return tarea;

    }

    async destroy({ auth, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const tarea = await Tarea.find(id);
        const project = await tarea.project().fetch();
        AuthorizationService.VerifyPermission(project, user);
        await tarea.delete();
        return tarea;

    }
}

module.exports = TareaController