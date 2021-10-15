# Issue with health check (NestJS)

The app can't return `200` status for health check route, unless we put another segment in `@Get()` decorator.

```typescript
@Get('anything')
@HealthCheck()
async check() {
  // ...
}
```

Then it works! If we don't put anything there, it returns `500` status.

Another issue is: if we have multiple checks, the route still returns `200` status even if one/more of them fail.

```typescript
async check() {
  return await this.healthCheckService.check([
    async () => this.typeormHealthIndicator.pingCheck('database1'),
    async () => this.mongooseHealthIndicator.pingCheck('database2'),
  ]);
}
```

```json
{
  "status": "ok",
  "info": {
    "database1": {
      "status": "down"
    },
    "database2": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "database1": {
      "status": "down"
    },
    "database2": {
      "status": "up"
    }
  }
}
```

No! Status should not be OK - one check has been failed.

## Steps

Run the following command:

```bash
$ docker compose up --build
```

Then visit <http://localhost/api/foo/healthiness>.
