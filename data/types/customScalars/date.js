const moment = require('moment');

import {
  GraphQLScalarType,
  GraphQLError
} from 'graphql';

let DateType = new GraphQLScalarType({
  name: 'MomentDate',

  // What gets returned to the caller after being queried
  serialize: value => moment(value).format("dddd, MMMM Do YYYY"),

  // What is parsed when the value is embedded into the query string
  parseLiteral: value => validateDateString(value),

  // What is parsed when the value is passed as a variable
  parseValue: value => validateDateString(value)
});

function isMoment (iso) { return moment(iso).isValid(); };

function validateDateString(iso) {
  if (isMoment(iso) ) { return iso }
  else {
    throw new GraphQLError(`${iso} is not a valid date`);
  }
}

export default DateType;