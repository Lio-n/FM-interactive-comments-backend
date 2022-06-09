import * as yup from "yup";
type ValidateSchemaParams = {
  schema;
  request: Response;
};

const validateSchema = async ({ schema, request }: ValidateSchemaParams) => {
  try {
    return await schema.validate(request);
  } catch ({ message }) {
    throw message;
  }
};

const paramsSchema = yup.object().shape({
  commentId: yup.number().positive().required(),
});
const validateCommentId = async ({ request }) => {
  return validateSchema({ schema: paramsSchema, request });
};

const bodySchema = yup.object().shape({
  content: yup.string().max(255).required(),
});
const validateContent = async ({ request }) => {
  return validateSchema({ schema: bodySchema, request });
};
export { validateSchema, validateCommentId, validateContent };
