type ValidateSchemaParams = {
  schema;
  request: Response;
};

const validateSchema = async ({ schema, request }: ValidateSchemaParams) => {
  try {
    const result = await schema.validate(request);
    return result;
  } catch ({ message }) {
    throw message;
  }
};

export { validateSchema };
