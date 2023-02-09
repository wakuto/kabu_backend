function get_x_month_ago(now, period) {
  const start = new Date(now);
  const end_month = start.getMonth() - period;
  const end_of_month = new Date(start.getFullYear(), end_month, 0).getDate();

  var end_date;

  if (start.getDate() > end_of_month) {
    end_date = end_of_month;
  } else {
    end_date = start.getDate() - 1;
  }

  return new Date(start.getFullYear(), end_month, end_date);
}

function get_date_in_finance_format(date) {
  const fin_date = new Date(date);
  const year = fin_date.getFullYear().toString();
  const month = (fin_date.getMonth()+1).toString();
  const day = fin_date.getDate().toString();

  return year + '-' + month + '-' + day;
}

async function get_brands_data(id, period){
  const yahooFinance = require('yahoo-finance2').default;

  const query = id.toString() + '.T';
  const end = get_x_month_ago(Date.now(), period);
  const queryOptions = { period1: get_date_in_finance_format(end) };
  const data = await yahooFinance.historical(query, queryOptions);

  var result = [];
  console.log(data);
  for (const d of data) {
    result.push({"date": d.date, "close": d.close});
  }

  return {"values": result};
}

module.exports = {
  get_brands_data,
}
