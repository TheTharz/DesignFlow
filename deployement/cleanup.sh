#!/bin/bash

set -e

# Delete Kubernetes resources
kubectl delete -f secret.yml || true
kubectl delete -f mongo-config.yml || true
kubectl delete -f mongo-deployment.yml || true
kubectl delete -f server-deployment.yml || true
kubectl delete -f client-deployment.yml || true

echo "Cleanup finished successfully."
