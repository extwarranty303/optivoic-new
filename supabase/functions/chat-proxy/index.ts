import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// This is a shared file for CORS headers.
// Create it at `supabase/functions/_shared/cors.ts`
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Get the OpenAI API key from the environment variables (which are stored as secrets)
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  // This is needed for browser-based calls to your function
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY secret.')
    }

    // Extract the message history from the request body
    const { messages } = await req.json()

    // Call the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages, // The frontend will construct the full message list
        temperature: 0.7,
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error.message || `API error: ${response.status}`)
    }

    const data = await response.json()
    const reply = data.choices[0].message.content

    // Return the AI's response to the client
    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
