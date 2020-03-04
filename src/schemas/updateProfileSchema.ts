import * as yup from 'yup';

export default yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3)
    .required(),
  username: yup
    .string()
    .trim()
    .min(2)
    .required(),
  headline: yup
    .string()
    .trim()
    .required(),
  bio: yup
    .string()
    .trim()
    .required(),
});
