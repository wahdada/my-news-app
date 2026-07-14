export default async function handler(req, res) {
  const API_KEY = process.env.NEWS_API_KEY;
  const cat = req.query.cat || "";
  const q = req.query.q || "";

  let url;
  if (cat) {
    url = `https://newsapi.org/v2/top-headlines?category=${cat}&language=en&pageSize=20&apiKey=${API_KEY}`;
    if (q) url += `&q=${encodeURIComponent(q)}`;
  } else {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;
  }

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
}
