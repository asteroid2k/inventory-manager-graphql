const errorCodes = {
  UNIQUE_CONSTRAINT: ({ field, model }) =>
    `UNIQUE_CONSTRAINT_${model}_${field}`.toLocaleUpperCase(),
};

export default errorCodes;
