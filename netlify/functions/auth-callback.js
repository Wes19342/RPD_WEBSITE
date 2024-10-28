const fetch = require("node-fetch");

exports.handler = async (event) => {
    const code = new URLSearchParams(event.queryStringParameters).get("code");

    if (!code) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Authorization code missing from URL" }),
        };
    }

    const data = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URI,
    });

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const token = await tokenResponse.json();

    if (!token.access_token) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Failed to get access token" }),
        };
    }

    const userResponse = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${token.access_token}`,
        },
    });

    const user = await userResponse.json();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html",
        },
        body: `
            <script>
                localStorage.setItem('discordUser', JSON.stringify(${JSON.stringify(user)}));
                window.location.href = '/';
            </script>
        `,
    };
};
