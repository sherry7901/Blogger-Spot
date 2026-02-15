import cors from 'cors';

const corsOptions = {
  origin: (origin : any, callback : any) => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment || !origin) {
      callback(null, true);
    } else {
      const allowedOrigins = ['http://localhost:3000', 'https://your-production-domain.com'];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false); // Restrict without throwing an error
      }
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

export const enableCors = cors(corsOptions);
