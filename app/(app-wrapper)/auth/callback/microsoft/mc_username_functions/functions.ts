export async function getXBLToken(msAccessToken: string) {
  const resp = await fetch('https://user.auth.xboxlive.com/user/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      Properties: {
        AuthMethod: 'RPS',
        SiteName: 'user.auth.xboxlive.com',
        RpsTicket: `d=${msAccessToken}`,
      },
      RelyingParty: 'http://auth.xboxlive.com',
      TokenType: 'JWT',
    }),
  });

  const data = await resp.json();

  console.log("getXBLToken", data);
  return data;
}

export async function getXSTSToken(xblToken: string) {
  const resp = await fetch('https://xsts.auth.xboxlive.com/xsts/authorize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Properties: {
        SandboxId: 'RETAIL',
        UserTokens: [xblToken],
      },
      RelyingParty: 'rp://api.minecraftservices.com/',
      TokenType: 'JWT',
    }),
  });

  const data = await resp.json();

  console.log("getXSTSToken", data);
  return data;
}

export async function getMinecraftToken(xstsToken: string, userHash: string) {
  const resp = await fetch('https://api.minecraftservices.com/authentication/login_with_xbox', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identityToken: `XBL3.0 x=${userHash};${xstsToken}`,
      ensureLegacyEnabled: true
    }),
  });

  const data = await resp.json();

  console.log("getMinecraftToken", data);
  return data;
}

export async function getMinecraftProfile(mcToken: string) {
  const resp = await fetch('https://api.minecraftservices.com/minecraft/profile', {
    headers: { Authorization: `Bearer ${mcToken}` },
  });

  const data = await resp.json();

  console.log("getMinecraftProfile", data);
  return data;
}