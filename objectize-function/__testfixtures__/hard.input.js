import { format } from 'date-fns';
import fmt from '../lib/format';

fmt(new Date(), 'DD-MM-YYYY', -5);
format(new Date(), 'MM/dd/yyyy');
