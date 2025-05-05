interface Cache {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

class LocalCache implements Cache {
  private cache: { [key: string]: string };

  constructor() {
    this.cache = {};
  }

  async get(key: string): Promise<string | null> {
    return this.cache[key] || null;
  }

  async set(key: string, value: string): Promise<void> {
    this.cache[key] = value;
  }

  async delete(key: string): Promise<void> {
    delete this.cache[key];
  }
}

class ElastiCache implements Cache {
  private elasticacheClient: AWS.ElastiCache;

  constructor(elasticacheClient: AWS.ElastiCache) {
    this.elasticacheClient = elasticacheClient;
  }

  async get(key: string): Promise<string | null> {
    const params = {
      CacheClusterId: "your-cache-cluster-id",
      Key: key,
    };

    try {
      const data = await this.elasticacheClient
        .getCacheCluster(params)
        .promise();
      return data.Value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async set(key: string, value: string): Promise<void> {
    const params = {
      CacheClusterId: "your-cache-cluster-id",
      Key: key,
      Value: value,
    };

    try {
      await this.elasticacheClient.setCacheCluster(params).promise();
    } catch (error) {
      console.error(error);
    }
  }

  async delete(key: string): Promise<void> {
    const params = {
      CacheClusterId: "your-cache-cluster-id",
      Key: key,
    };

    try {
      await this.elasticacheClient.deleteCacheCluster(params).promise();
    } catch (error) {
      console.error(error);
    }
  }
}



// // Use the cache
// cache.get("my-key").then((value) => console.log(value));
// cache.set("my-key", "my-value").then(() => console.log("Set value"));
// cache.delete("my-key").then(() => console.log("Deleted value"));
