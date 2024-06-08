#!/bin/bash

set -e

# Define variables
SECRET_FILE="secret.yml"
MONGO_CONFIG_FILE="mongo-config.yml"
MONGO_DEPLOYMENT_FILE="mongo-deployment.yml"
SERVER_DEPLOYMENT_FILE="server-deployment.yml"
CLIENT_DEPLOYMENT_FILE="client-deployment.yml"

# Display current pod and service status
echo "Current Pods:"
kubectl get pods
echo "Current Services:"
kubectl get svc

echo "Starting the deployment..."

# Apply Kubernetes resources
kubectl apply -f $SECRET_FILE
kubectl apply -f $MONGO_CONFIG_FILE
kubectl apply -f $MONGO_DEPLOYMENT_FILE
kubectl apply -f $SERVER_DEPLOYMENT_FILE
kubectl apply -f $CLIENT_DEPLOYMENT_FILE

echo "Deployment finished successfully."

# Display updated pod and service status
echo "Updated Pods:"
kubectl get pods
echo "Updated Services:"
kubectl get svc

echo "Mapping the node port..."
# Check if Minikube is running
if minikube status | grep -q "Running"; then
    minikube service clientservice
else
    echo "Minikube is not running. Cannot map node port."
fi
