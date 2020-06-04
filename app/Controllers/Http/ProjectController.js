'use strict'

const Project = use('App/Models/Project');
const AuthorizationService = use('App/Services/AuthorizationService');

class ProjectController {

    async index({ auth }) {
        const user = await auth.getUser();
        //console.log(user);
        return await user.projects().fetch();
    }

    async create({ auth, request }) {
        const user = await auth.getUser();
        const { name } = request.all();
        const project = new Project();
        project.fill({
            name
        });
        await user.projects().save(project);
        return project;
    }

    async destroy({ auth, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.VerifyPermission(project, user); //Llamamos el helper
        await project.delete();
        return project;

        //return console.log(project);
    }
}

module.exports = ProjectController