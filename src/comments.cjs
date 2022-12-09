async function get_comments(db, id) {
  const data = await db.any("SELECT * FROM comments WHERE brand_code=$1", [id]);
  if (data.length < 1) {
    throw new Error("there is no data!");
  }
  // dataの中のpost_date, mentioned_dateフィールドをYYYY-MM-DDTHH:MM:SS+09:00形式にしたい
  // 2022-11-11T00:00:00.000Z
  data.map((comment) => {
    let temp = getJSTString(new Date(comment['post_date']), true);
    comment['post_date'] = temp.slice(0,19) + '+09:00';
    temp = getJSTString(new Date(comment['mentioned_date']), true);
    comment['mentioned_date'] = temp.slice(0,19) + '+09:00';
    return comment;
  });
  return {"comments_list": data};
}

async function append_comment(db, id, json_text) {
  const json = JSON.parse(json_text);

  const rows = `brand_code, comments, post_date, mentioned_date, related_news`;

  const args = [
    id,
    json['comment'],
    getJSTString(new Date, false),
    json['mentioned_date'],
    json['related_news']
  ];

  await db.none(`
    INSERT INTO comments(${rows})
      VALUES(
        $1,
        $2,
        to_timestamp($3, 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
        to_timestamp($4, 'YYYY-MM-DD"T"HH24:MI:SS"Z"'),
        $5
      )`, args
    );
  return {};
}

function getJSTString(from, isJST) {
  let jst = from;
  if (isJST === false) {
    jst = new Date(from.getTime() + 9 * 60 * 60 * 1000);
  }

  const year    = ('0000' + jst.getUTCFullYear().toString()).slice(-4);
  const month   = ('00' + (jst.getUTCMonth() + 1).toString()).slice(-2);
  const days    = ('00' + jst.getUTCDate().toString()).slice(-2);
  const hours   = ('00' + jst.getUTCHours().toString()).slice(-2);
  const minutes = ('00' + jst.getUTCMinutes().toString()).slice(-2);
  const seconds = ('00' + jst.getUTCSeconds().toString()).slice(-2);

  return `${year}-${month}-${days}T${hours}:${minutes}:${seconds}+09:00`;
}

module.exports = {
  get_comments,
  append_comment,
}

