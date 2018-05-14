export const asyncCall = (key) => [key, `${key}_SUCCESS`, `${key}_FAIL`];

export const createActionTypes = (scope, actionTypes) =>
  actionTypes.reduce((acc, actionType) => ({ ...acc, [`${actionType}`]: `${scope}/${actionType}` }), {});
