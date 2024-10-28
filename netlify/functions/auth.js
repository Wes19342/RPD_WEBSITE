exports.handler = async () => {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=identify`;

    return {
        statusCode: 302, // 302 is a redirect status code
        headers: {
            Location: discordAuthUrl,
        },
    };
};
