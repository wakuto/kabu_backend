async function get_brand_name_by_id(db, id) {
  const data = await db.any("SELECT * FROM brand_details WHERE brand_code=$1", [id]);
  if(data.length < 1) {
    throw new Error("there is no data!");
  }
  const name = data[0]['brand_name'];
  return {"brand_name": name};
}

async function get_brand_code_by_name(db, name) {
  const data =  await db.any("SELECT * FROM brand_details WHERE brand_name=$1", [name]);
  if(data.length < 1) {
    throw new Error("there is no data!");
  }
  const code = parseInt(data[0]['brand_code']);
  return {"brand_code": code};
}

module.exports = {
  get_brand_name_by_id,
  get_brand_code_by_name,
}
