import app from './app.js';
import { PORT } from './config.js';
import { connectDB } from './db.js';
import { socketIO } from './socket-io.js';

async function main() {
  try {
    await connectDB();
    const server = app.listen(PORT, () => console.log(`>>> Server is running http://localhost:${PORT}`));
    await socketIO(server);
  } catch (error) {
    console.log(error);
  }
}

main();
