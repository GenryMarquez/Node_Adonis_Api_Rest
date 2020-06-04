const AccessDeniedException = use('App/Exceptions/AccessDeniedException');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');

class AuthorizationService {
    VerifyPermission(resource, user) {
        if (!resource) {
            throw new ResourceNotFoundException();
        };
        if (resource.user_id !== user.id) {
            //throw new Error();
            throw new AccessDeniedException();
        };
    }
}
module.exports = new AuthorizationService();