import * as yup from 'yup';

export default yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3)
    .required(),
  content: yup
    .string()
    .trim()
    .required(),
  topicSlug: yup
    .string()
    .trim()
    .required(),
  imageUrl: yup.string().trim(),
  draft: yup.boolean(),
  private: yup.boolean(),
});
