#!/bin/bash

set -e

# Delete Kubernetes resources
kubectl delete -f secret.yaml || true
kubectl delete -f mongo-config.yaml || true
kubectl delete -f mongo-deployment.yaml || true
kubectl delete -f server-deployment.yaml || true
kubectl delete -f client-deployment.yaml || true

echo "Cleanup finished successfully."
