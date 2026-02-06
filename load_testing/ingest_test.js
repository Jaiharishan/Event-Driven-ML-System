import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Metrics
export let errorRate = new Rate('errors');

// Configurable options
export let options = {
    vus: 100,             // Virtual users
    duration: '2m',       // Test duration
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% requests under 500ms
        errors: ['rate<0.01'],
    },
};

const BASE_URL = 'http://localhost:3000/api/classify'; // ingestion endpoint

export default function () {
    // Example payload
    const payload = JSON.stringify({
        image_url: 'https://picsum.photos/200/300',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Send POST request
    const res = http.post(BASE_URL, payload, params);

    // Track errors
    const success = check(res, {
        'status is 202': (r) => r.status === 202,
    });

    if (!success) {
        errorRate.add(1);
    }

    // No sleep → maximum load
}
