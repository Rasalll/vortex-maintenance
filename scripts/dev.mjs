import os from 'node:os';
import { createServer } from 'vite';

const server = await createServer({ server: { host: '0.0.0.0' } });
await server.listen();
server.printUrls();

const ipv4Addresses = Object.values(os.networkInterfaces())
  .flatMap((networkInterface) => networkInterface ?? [])
  .filter((address) => address.family === 'IPv4' && !address.internal)
  .map((address) => address.address);

if (ipv4Addresses.length > 0) {
  const cardUrl = `http://${ipv4Addresses[0]}:${server.config.server.port}/business-card/arshad_arif`;
  console.log('\n  Business card:  ' + cardUrl);
  console.log('  Add contact:    ' + cardUrl + '/contact');
} else {
  console.log('\n  No LAN IPv4 address was detected. Use the Local URL above.');
}

const shutdown = async () => {
  await server.close();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
