import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Force Google DNS
try {
    dns.setServers(['8.8.8.8']);
    console.log('✅ DNS servers set to 8.8.8.8');
} catch (e) {
    console.error('❌ Failed to set DNS servers:', e);
}

const domain = '_mongodb._tcp.traincapetechnology.1p6rbwq.mongodb.net';

console.log(`Testing DNS resolution for: ${domain}`);

dns.resolveSrv(domain, (err, addresses) => {
    if (err) {
        console.error('❌ DNS SRV Resolution Failed:', err);
    } else {
        console.log('✅ DNS SRV Resolution Succeeded:', addresses);
    }
});

const uri = process.env.MONGO_URI;
// We can't easily test mongoose connection with setServers without modifying the global dns verify,
// but if resolveSrv works, mongoose should work as it uses the same underlying lookup.
