import convict from 'convict'

const serverConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  mongodb: {
    url: {
      doc: 'URL for mongodb connection',
      format: String,
      nullable: false,
      default: 'mongodb://localhost:27017/hackathon-notification?directConnection=true',
      env: 'MONGO_DB_URL',
    },
  },
  redis: {
    redisPort: {
      doc: 'Redis port',
      format: Number,
      default: 6379,
      env: 'REDIS_PORT',
    },
    redisHost: {
      doc: 'Redis host',
      format: String,
      default: '127.0.0.1',
      env: 'REDIS_HOST',
    },
    redisPassword: {
      doc: 'Redis password',
      format: String,
      default: '',
      env: 'REDIS_PASSWORD',
    },
  },
})

serverConfig.validate({ allowed: 'strict' })

export default serverConfig
