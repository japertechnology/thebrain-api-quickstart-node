export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { name, kind, label, typeId, sourceThoughtId, relation, acType } = req.body;
  const { brainId } = req.query;
  const guidPattern = /^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;

  if (!brainId || !guidPattern.test(brainId)) {
    res.status(400).json({ error: 'Invalid brainId format.' });
    return;
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    res.status(401).json({ error: 'API Key missing or invalid.' });
    return;
  }

  try {
    const response = await fetch(`https://api.bra.in/thoughts/${brainId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        kind,
        label,
        typeId,
        sourceThoughtId,
        relation,
        acType
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let message = errorText || response.statusText;
      try {
        const errorJson = JSON.parse(errorText);
        message = errorJson.message || errorJson.error || errorText;
      } catch (_) {
        // Response was not JSON; keep message as text
      }
      return res.status(response.status).json({ error: message });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error: ', error.message);
    res.status(500).json({ error: 'An error occurred while creating the thought.' });
  }
};
