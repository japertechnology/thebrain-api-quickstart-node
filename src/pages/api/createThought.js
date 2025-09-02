import isGuid from '../../utils/isGuid';

/**
 * API route handler for creating a new thought within a brain.
 *
 * This endpoint validates incoming data, ensures that the request includes a
 * valid CSRF token and properly formatted identifiers, and forwards the
 * request to TheBrain API. It returns the created thought data or an error
 * message in JSON format.
 *
 * @param {import('next').NextApiRequest} req - Incoming API request.
 * @param {import('next').NextApiResponse} res - API response object.
 * @returns {Promise<void>} Resolves once the response has been sent.
 */
export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const sessionToken = req.cookies?.csrfToken;
  const csrfToken = req.headers['x-csrf-token'];
  if (!csrfToken || csrfToken !== sessionToken) {
    res.status(403).json({ error: 'Invalid or missing CSRF token.' });
    return;
  }

  const { name, kind, label, typeId, sourceThoughtId, relation, acType } = req.body;
  const { brainId } = req.query;

  if (!brainId || !isGuid(brainId)) {
    res.status(400).json({ error: 'Invalid brainId format.' });
    return;
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error('API key not configured. Set API_KEY environment variable.');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  // Validate request body fields
  if (typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
    return;
  }

  if (!Number.isInteger(kind)) {
    res.status(400).json({ error: 'Kind is required and must be an integer.' });
    return;
  }

  if (!sourceThoughtId || !isGuid(sourceThoughtId)) {
    res.status(400).json({ error: 'Invalid sourceThoughtId format.' });
    return;
  }

  if (!typeId || !isGuid(typeId)) {
    res.status(400).json({ error: 'Invalid typeId format.' });
    return;
  }

  if (!Number.isInteger(relation)) {
    res.status(400).json({ error: 'Relation is required and must be an integer.' });
    return;
  }

  if (!Number.isInteger(acType)) {
    res.status(400).json({ error: 'acType is required and must be an integer.' });
    return;
  }

  if (label !== undefined && typeof label !== 'string') {
    res.status(400).json({ error: 'Label must be a string if provided.' });
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
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await response.text();
      return res.status(502).json({ error: text || 'Invalid response from upstream server.' });
    }

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

    try {
      const data = await response.json();
      return res.status(200).json(data);
    } catch (_) {
      const text = await response.text();
      return res.status(502).json({ error: text || 'Invalid JSON response from upstream server.' });
    }
  } catch (error) {
    console.error('Error: ', error.message);
    res.status(500).json({ error: 'An error occurred while creating the thought.' });
  }
};
