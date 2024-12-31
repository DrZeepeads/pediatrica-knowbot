import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Setting up bot commands...');
    
    const telegramToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!telegramToken) {
      console.error('TELEGRAM_BOT_TOKEN is not set');
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }

    // First, delete any existing commands
    console.log('Deleting existing commands...');
    const deleteResponse = await fetch(
      `https://api.telegram.org/bot${telegramToken}/deleteMyCommands`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const deleteData = await deleteResponse.text();
    console.log('Delete commands response:', deleteData);

    if (!deleteResponse.ok) {
      console.error('Failed to delete commands:', deleteData);
      throw new Error(`Failed to delete commands: ${deleteData}`);
    }

    // Set up new commands
    const commands = [
      { command: "start", description: "Initialize bot and get Chat ID" },
      { command: "help", description: "Show available commands" }
    ];

    console.log('Setting new commands:', commands);
    const response = await fetch(
      `https://api.telegram.org/bot${telegramToken}/setMyCommands`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commands }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to set commands:', errorText);
      throw new Error(`Telegram API error: ${errorText}`);
    }

    const data = await response.json();
    console.log('Set commands response:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error setting up bot commands:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});