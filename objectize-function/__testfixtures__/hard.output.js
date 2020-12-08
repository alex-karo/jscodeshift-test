import { format } from 'date-fns';
import fmt from '../lib/format';

fmt({
  date: new Date(),
  format: 'DD-MM-YYYY',
  timezone: -5
});
format(new Date(), 'MM/dd/yyyy');
