import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const domain = '_mongodb._tcp.traincapetechnology.1p6rbwq.mongodb.net';

console.log(`Testing DNS resolution for: ${domain}`);

dns.resolveSrv(domain, (err, addresses) => {
    if (err) {
        console.error('❌ DNS SRV Resolution Failed:', err);
        console.log('This confirms the issue is with Node.js DNS resolution.');
    } else {
        console.log('✅ DNS SRV Resolution Succeeded:', addresses);
    }
});

const uri = process.env.MONGO_URI;
console.log(`\nAttempting Mongoose connection...`);

try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Mongoose Connected Successfully!');
    await mongoose.disconnect();
} catch (error) {
    console.error('❌ Mongoose Connection Failed:', error.message);
}
