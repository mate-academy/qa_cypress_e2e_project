/* eslint-disable import/no-named-default */
import { default as format } from 'date-fns/format';

export default (date) => {
  return format(new Date(date), 'MMMM d, yyyy');
};
