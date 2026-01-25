import client from 'prom-client';
export declare const register: client.Registry<"text/plain; version=0.0.4; charset=utf-8">;
export declare const requestsCounter: client.Counter<string>;
export declare const kafkaProduceLatency: client.Histogram<string>;
//# sourceMappingURL=prometheus.d.ts.map