import moment from 'moment'

export function timeFrameFromToday(numUnit = 1, unit = "days") {
  const date = moment();

  const today = moment.unix(date.unix());
  today.startOf("day");

  const tomorrow = moment.unix(today.unix());
  tomorrow.add(1, "days");

  const ago = moment.unix(date.unix());
  ago.startOf("day");
  ago.subtract(numUnit, unit);

  const lower = ago.unix();
  const upper = tomorrow.unix();

  return { lower, upper }
}

export function timeFrameToday() {
  return timeFrameFromToday(0, "days");
}

export function timeFrameWeekFromToday() {
  return timeFrameFromToday(6, "days");
}

export function calculateDateFromMs(seconds) {
  const now = moment();
  const then = moment(0);
  then.seconds(seconds);

  const secs = now.diff(then, 'seconds');
  const mins = now.diff(then, 'minutes');
  const hours = now.diff(then, 'hours');
  const days = now.diff(then, 'days');
  const months = now.diff(then, 'months');
  const years = now.diff(then, 'years');

  if (years)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;

  if (months)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;

  if (days)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;

  if (hours)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;

  if (mins)
    return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`;

  return `${secs} ${years === 1 ? 'second' : 'seconds'} ago`;
}

export function extractDomain(url) {
  var domain;
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  }
  else {
    domain = url.split('/')[0];
  }

  if (domain.indexOf("www.") > -1) {
    domain = domain.split('www.')[1];
  }

  domain = domain.split(':')[0];
  domain = domain.split('?')[0];

  return domain;
}
