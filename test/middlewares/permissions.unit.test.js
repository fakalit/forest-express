/* eslint-disable jest/prefer-expect-assertions */
const { init } = require('@forestadmin/context');
const PermissionMiddlewareCreator = require('../../src/middlewares/permissions');

const Schemas = require('../../src/generators/schemas');

const buildRequest = (attributes) => ({
  query: { timezone: 'Europe/Paris' }, body: { data: { attributes } },
});

function executeMiddleware(middleware, request, response) {
  return new Promise((resolve, reject) => {
    middleware(request, response, (error) => {
      if (error) { reject(error); } else { resolve(); }
    });
  });
}

describe('middlewares > permissions', () => {
  const defaultDependencies = {
    modelsManager: {},
  };

  const createPermissionMiddlewareCreator = (collectionName, dependencies) => {
    const dependencyNames = Object.keys(dependencies);
    init((context) => dependencyNames.reduce((contextAccumulator, name) =>
      contextAccumulator.addInstance(name, () => dependencies[name]), context));
    return new PermissionMiddlewareCreator(collectionName);
  };

  describe('list', () => {
    it('should call canBrowse to ensure the user as the right permissions', async () => {
      expect.assertions(5);

      const collectionName = 'Sith';

      const authorizationService = {
        assertCanBrowse: jest.fn().mockResolvedValue(),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .list()(request, null, next))
        .toResolve();

      expect(authorizationService.assertCanBrowse).toHaveBeenCalledTimes(1);
      expect(authorizationService.assertCanBrowse).toHaveBeenCalledWith(
        request.user,
        collectionName,
        null,
      );

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });

    it('should throw HTTP error 403 on rejected canBrowse', async () => {
      expect.assertions(5);

      const collectionName = 'Sith';

      const error = new Error('Forbidden');
      const authorizationService = {
        assertCanBrowse: jest.fn().mockRejectedValue(error),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 }, query: { segmentQuery: 'segmentQuery' } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .list()(request, null, next))
        .toResolve();

      expect(authorizationService.assertCanBrowse).toHaveBeenCalledTimes(1);
      expect(authorizationService.assertCanBrowse).toHaveBeenCalledWith(
        request.user,
        collectionName,
        'segmentQuery',
      );

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('export', () => {
    it('should call canExport to ensure the user as the right permissions', async () => {
      expect.assertions(5);

      const collectionName = 'Sith';

      const authorizationService = {
        assertCanExport: jest.fn().mockResolvedValue(),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .export()(request, null, next))
        .toResolve();

      expect(authorizationService.assertCanExport).toHaveBeenCalledTimes(1);
      expect(authorizationService.assertCanExport).toHaveBeenCalledWith(
        request.user,
        collectionName,
      );

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });

    it('should throw HTTP error 403 on rejected canExport', async () => {
      expect.assertions(3);

      const collectionName = 'Sith';

      const error = new Error();
      const authorizationService = {
        assertCanExport: jest.fn().mockRejectedValue(error),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .export()(request, null, next))
        .toResolve();

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('details', () => {
    it('should call canRead to ensure the user as the right permissions', async () => {
      expect.assertions(5);

      const collectionName = 'Sith';

      const authorizationService = {
        assertCanRead: jest.fn().mockResolvedValue(),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .details()(request, null, next))
        .toResolve();

      expect(authorizationService.assertCanRead).toHaveBeenCalledTimes(1);
      expect(authorizationService.assertCanRead).toHaveBeenCalledWith(
        request.user,
        collectionName,
      );

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });

    it('should throw HTTP error 403 on rejected canRead', async () => {
      expect.assertions(3);

      const collectionName = 'Sith';

      const error = new Error();
      const authorizationService = {
        assertCanRead: jest.fn().mockRejectedValue(error),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .details()(request, null, next))
        .toResolve();

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('create', () => {
    it('should call canAdd to ensure the user as the right permissions', async () => {
      expect.assertions(5);

      const collectionName = 'Sith';

      const authorizationService = {
        assertCanAdd: jest.fn().mockResolvedValue(),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .create()(request, null, next))
        .toResolve();

      expect(authorizationService.assertCanAdd).toHaveBeenCalledTimes(1);
      expect(authorizationService.assertCanAdd).toHaveBeenCalledWith(
        request.user,
        collectionName,
      );

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });

    it('should throw HTTP error 403 on rejected canAdd', async () => {
      expect.assertions(3);

      const collectionName = 'Sith';

      const error = new Error();
      const authorizationService = {
        assertCanAdd: jest.fn().mockRejectedValue(error),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .create()(request, null, next))
        .toResolve();

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('update', () => {
    it('should call canEdit to ensure the user as the right permissions', async () => {
      expect.assertions(5);

      const collectionName = 'Sith';

      const authorizationService = {
        assertCanEdit: jest.fn().mockResolvedValue(),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .update()(request, null, next))
        .toResolve();

      expect(authorizationService.assertCanEdit).toHaveBeenCalledTimes(1);
      expect(authorizationService.assertCanEdit).toHaveBeenCalledWith(
        request.user,
        collectionName,
      );

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });

    it('should throw HTTP error 403 on rejected canBrowse', async () => {
      expect.assertions(3);

      const collectionName = 'Sith';

      const error = new Error();
      const authorizationService = {
        assertCanEdit: jest.fn().mockRejectedValue(error),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .update()(request, null, next))
        .toResolve();

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('delete', () => {
    it('should call canDelete to ensure the user as the right permissions', async () => {
      expect.assertions(5);

      const collectionName = 'Sith';

      const authorizationService = {
        assertCanDelete: jest.fn().mockResolvedValue(),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .delete()(request, null, next))
        .toResolve();

      expect(authorizationService.assertCanDelete).toHaveBeenCalledTimes(1);
      expect(authorizationService.assertCanDelete).toHaveBeenCalledWith(
        request.user,
        collectionName,
      );

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });

    it('should throw HTTP error 403 on rejected canDelete', async () => {
      expect.assertions(3);

      const collectionName = 'Sith';

      const error = new Error();
      const authorizationService = {
        assertCanDelete: jest.fn().mockRejectedValue(error),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .delete()(request, null, next))
        .toResolve();

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('smartAction', () => {
    const defaultAttributes = {
      collection_name: 'users',
      values: {},
      ids: [],
      all_records: false,
      smart_action_id: 'users-action@@@bulk',
      attributesProp: 'attributesProp',
    };
    // eslint-disable-next-line jest/no-hooks
    beforeEach(() => {
      Schemas.schemas = {
        users: {
          name: 'users',
          idField: 'id',
          primaryKeys: ['id'],
          isCompositePrimary: false,
          actions: [{
            name: 'known-action',
          }],
        },
      };
    });

    describe('smart action permissions', () => {
      function setupSmartAction({ requestAttributes = defaultAttributes } = {}) {
        const authorizationService = {
          verifySignedActionParameters: jest.fn(),
          assertCanApproveCustomAction: jest.fn(),
          assertCanTriggerCustomAction: jest.fn(),
        };

        const request = buildRequest(requestAttributes);
        request.baseUrl = '/forest';
        request.path = '/actions/known-action';
        request.method = 'POST';
        request.user = { id: 30 };

        const permissionMiddlewareCreator = createPermissionMiddlewareCreator('users', {
          ...defaultDependencies,
          authorizationService,
        });

        return {
          smartActionPermission: permissionMiddlewareCreator.smartAction()[0],
          smartActionRecordIds: permissionMiddlewareCreator.smartAction()[1],
          request,
          authorizationService,
        };
      }

      describe('when the request is an approval', () => {
        it('should check if the user has the right to execute the approval and replace the body', async () => {
          const { smartActionPermission, request, authorizationService } = setupSmartAction({
            requestAttributes: {
              ...defaultAttributes,
              requester_id: 666,
              signed_approval_request: 'signed',
            },
          });

          const legitParams = {
            data: {
              attributes: {
                ...defaultAttributes,
                requester_id: 42,
              },
            },
          };

          authorizationService.verifySignedActionParameters.mockReturnValue(legitParams);

          await executeMiddleware(smartActionPermission, request, {});

          expect(authorizationService.verifySignedActionParameters).toHaveBeenCalledWith(
            'signed',
          );
          expect(authorizationService.assertCanApproveCustomAction).toHaveBeenCalledWith({
            user: request.user,
            customActionName: 'known-action',
            collectionName: 'users',
            requesterId: 42,
          });
          expect(request.body).toBe(legitParams);
        });

        it('should throw an error if the user is not authorized', async () => {
          const { smartActionPermission, request, authorizationService } = setupSmartAction({
            requestAttributes: {
              ...defaultAttributes,
              requester_id: 666,
              signed_approval_request: 'signed',
            },
          });

          const legitParams = {
            data: {
              attributes: {
                ...defaultAttributes,
                requester_id: 42,
              },
            },
          };

          authorizationService.verifySignedActionParameters.mockReturnValue(legitParams);

          const error = new Error('Not authorized');
          authorizationService.assertCanApproveCustomAction.mockRejectedValue(error);

          await expect(
            executeMiddleware(smartActionPermission, request, {}),
          ).rejects.toBe(error);

          expect(authorizationService.verifySignedActionParameters).toHaveBeenCalledWith(
            'signed',
          );
          expect(authorizationService.assertCanApproveCustomAction).toHaveBeenCalledWith({
            user: request.user,
            customActionName: 'known-action',
            collectionName: 'users',
            requesterId: 42,
          });
          expect(request.body).not.toBe(legitParams);
        });
      });

      describe('when the request is a trigger', () => {
        it('should check that the user is authorized to trigger', async () => {
          const { smartActionPermission, request, authorizationService } = setupSmartAction();

          await executeMiddleware(smartActionPermission, request, {});

          expect(authorizationService.assertCanTriggerCustomAction).toHaveBeenCalledWith({
            user: request.user,
            customActionName: 'known-action',
            collectionName: 'users',
          });
        });

        it('should handle the error if the user is not authorized', async () => {
          const { smartActionPermission, request, authorizationService } = setupSmartAction();

          const error = new Error('Not authorized');
          authorizationService.assertCanTriggerCustomAction.mockRejectedValue(error);

          await expect(
            executeMiddleware(smartActionPermission, request, {}),
          ).rejects.toBe(error);

          expect(authorizationService.assertCanTriggerCustomAction).toHaveBeenCalledWith({
            user: request.user,
            customActionName: 'known-action',
            collectionName: 'users',
          });
        });
      });
    });

    describe('_ensureRecordIdsInScope', () => {
      const defaultResponse = {};
      const defaultRecordIdsInScopeAttributes = {
        collection_name: 'users',
        values: {},
        ids: [],
        all_records: false,
        smart_action_id: 'users-action@@@bulk',
      };

      const getDependencies = () => ({
        ...defaultDependencies,
        modelsManager: {
          getModelByName: jest.fn().mockReturnValue({ name: 'users' }),
        },
        // Used by RecordsCounter
        configStore: {
          Implementation: {
            getModelName: jest.fn().mockReturnValue('users'),
            ResourcesGetter: jest.fn().mockImplementation(() => ({ count: () => 3 })),
          },
        },
      });

      it('should return a middleware', () => {
        expect.assertions(1);

        const permissionMiddlewareCreator = createPermissionMiddlewareCreator('users', defaultDependencies);
        const middleware = permissionMiddlewareCreator._ensureRecordIdsInScope({});
        expect(typeof middleware).toBe('function');
      });

      describe('with a simple pk', () => {
        Schemas.schemas = {
          users: {
            name: 'users',
            idField: 'id',
            primaryKeys: ['id'],
            isCompositePrimary: false,
          },
        };

        it('should call next() when selecting all records', async () => {
          expect.assertions(2);

          const request = buildRequest({ ...defaultRecordIdsInScopeAttributes, all_records: true });
          const next = jest.fn();

          const dependencies = getDependencies();
          const permissionMiddlewareCreator = createPermissionMiddlewareCreator('users', dependencies);
          const middleware = permissionMiddlewareCreator._ensureRecordIdsInScope();
          await middleware(request, defaultResponse, next);

          expect(next).toHaveBeenCalledTimes(1);
          expect(next).toHaveBeenCalledWith();
        });

        it('should call next() when speficied records are allowed', async () => {
          expect.assertions(3);

          const request = buildRequest({ ...defaultRecordIdsInScopeAttributes, ids: ['1', '2', '3'] });
          const next = jest.fn();
          const response = { status: jest.fn() };

          const dependencies = getDependencies();
          const permissionMiddlewareCreator = createPermissionMiddlewareCreator('users', dependencies);
          const middleware = permissionMiddlewareCreator._ensureRecordIdsInScope();
          await middleware(request, response, next);

          expect(response.status).not.toHaveBeenCalled();
          expect(next).toHaveBeenCalledTimes(1);
          expect(next).toHaveBeenCalledWith();
        });

        it('should raise a 400 http response when one of the specified records are not allowed', async () => {
          expect.assertions(5);

          const request = buildRequest({ ...defaultRecordIdsInScopeAttributes, ids: ['1', '2'] });
          const next = jest.fn();
          const statusReturnValue = { send: jest.fn() };
          const response = { status: jest.fn().mockReturnValue(statusReturnValue) };

          const dependencies = getDependencies();
          const permissionMiddlewareCreator = createPermissionMiddlewareCreator('users', dependencies);
          const middleware = permissionMiddlewareCreator._ensureRecordIdsInScope();
          await middleware(request, response, next);

          expect(response.status).toHaveBeenCalledTimes(1);
          expect(response.status).toHaveBeenCalledWith(400);
          expect(statusReturnValue.send).toHaveBeenCalledTimes(1);
          expect(statusReturnValue.send).toHaveBeenCalledWith({
            error: 'Smart Action: target records are out of scope',
          });
          expect(next).not.toHaveBeenCalled();
        });
      });

      describe('with a composite pk', () => {
        Schemas.schemas = {
          users: {
            name: 'users',
            idField: 'forestCompositePrimary',
            primaryKeys: ['bookId', 'authorId'],
            isCompositePrimary: true,
          },
        };

        it('should call next() when selecting all records', async () => {
          expect.assertions(2);

          const request = buildRequest({ ...defaultRecordIdsInScopeAttributes, all_records: true });
          const next = jest.fn();

          const dependencies = getDependencies();
          const permissionMiddlewareCreator = createPermissionMiddlewareCreator('users', dependencies);
          const middleware = permissionMiddlewareCreator._ensureRecordIdsInScope();
          await middleware(request, defaultResponse, next);

          expect(next).toHaveBeenCalledTimes(1);
          expect(next).toHaveBeenCalledWith();
        });

        it('should call next() when speficied records are allowed', async () => {
          expect.assertions(3);

          const request = buildRequest({ ...defaultRecordIdsInScopeAttributes, ids: ['1|1', '2|1', '3|1'] });
          const next = jest.fn();
          const response = { status: jest.fn() };

          const dependencies = getDependencies();
          const permissionMiddlewareCreator = createPermissionMiddlewareCreator('users', dependencies);
          const middleware = permissionMiddlewareCreator._ensureRecordIdsInScope();
          await middleware(request, response, next);

          expect(response.status).not.toHaveBeenCalled();
          expect(next).toHaveBeenCalledTimes(1);
          expect(next).toHaveBeenCalledWith();
        });

        it('should raise a 400 http response when one of the specified records are not allowed', async () => {
          expect.assertions(5);

          const request = buildRequest({ ...defaultRecordIdsInScopeAttributes, ids: ['1|2', '2|1'] });
          const next = jest.fn();
          const statusReturnValue = { send: jest.fn() };
          const response = { status: jest.fn().mockReturnValue(statusReturnValue) };

          const dependencies = getDependencies();
          const permissionMiddlewareCreator = createPermissionMiddlewareCreator('users', dependencies);
          const middleware = permissionMiddlewareCreator._ensureRecordIdsInScope();
          await middleware(request, response, next);

          expect(response.status).toHaveBeenCalledTimes(1);
          expect(response.status).toHaveBeenCalledWith(400);
          expect(statusReturnValue.send).toHaveBeenCalledTimes(1);
          expect(statusReturnValue.send).toHaveBeenCalledWith({
            error: 'Smart Action: target records are out of scope',
          });
          expect(next).not.toHaveBeenCalled();
        });
      });

      describe('with a smart collection', () => {
        it('should call next() since no scope can be configured', async () => {
          expect.assertions(2);

          Schemas.schemas = {
            users: {
              name: 'users',
              idField: 'id',
              primaryKeys: ['id'],
              isVirtual: true,
            },
          };

          const request = buildRequest({ ...defaultRecordIdsInScopeAttributes, ids: ['1'] });
          const next = jest.fn();

          const dependencies = getDependencies();
          const permissionMiddlewareCreator = createPermissionMiddlewareCreator('users', dependencies);
          const middleware = permissionMiddlewareCreator._ensureRecordIdsInScope();
          await middleware(request, defaultResponse, next);

          expect(next).toHaveBeenCalledTimes(1);
          expect(next).toHaveBeenCalledWith();
        });
      });
    });

    it('should generate an array of middlewares', () => {
      expect.assertions(3);

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(
        'users',
        { ...defaultDependencies },
      );

      const smartActionPermissionMiddlewares = permissionMiddlewareCreator
        .smartAction({ name: 'users' });

      expect(smartActionPermissionMiddlewares).toHaveLength(2);
      expect(typeof smartActionPermissionMiddlewares[0]).toBe('function');
      expect(typeof smartActionPermissionMiddlewares[1]).toBe('function');
    });
  });

  describe('stats', () => {
    it('should call assertCanRetrieveChart to ensure the user as the right permissions', async () => {
      const collectionName = 'Sith';

      const chartRequest = {
        type: 'Value',
        filter: null,
        aggregate: 'Count',
        aggregate_field: 'price',
        collection: 'books',
      };

      const authorizationService = {
        assertCanRetrieveChart: jest.fn().mockResolvedValue(),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 }, body: chartRequest };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .stats()(request, null, next))
        .toResolve();

      expect(authorizationService.assertCanRetrieveChart).toHaveBeenCalledTimes(1);
      expect(authorizationService.assertCanRetrieveChart).toHaveBeenCalledWith({
        user: request.user,
        chartRequest,
      });

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });

    it('should throw HTTP error 403 on rejected assertCanRetrieveChart', async () => {
      expect.assertions(3);

      const collectionName = 'Sith';

      const error = new Error();
      const authorizationService = {
        assertCanRetrieveChart: jest.fn().mockRejectedValue(error),
      };

      const permissionMiddlewareCreator = createPermissionMiddlewareCreator(collectionName, {
        ...defaultDependencies,
        authorizationService,
      });

      const request = { user: { renderingId: 20 }, body: { not: 'OK' } };
      const next = jest.fn();

      await expect(permissionMiddlewareCreator
        .stats()(request, null, next))
        .toResolve();

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
