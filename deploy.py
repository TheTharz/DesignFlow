import os
import subprocess

def create_env_file():
    env_vars = {
        "CLIENT_PORT": "3000",
        "SERVER_PORT": "5000",
        "MONGO_PORT": "27017"
    }

    with open(".env", "w") as f:
        for key, value in env_vars.items():
            f.write(f"{key}={value}\n")

    print(".env file created successfully.")

def deploy_services():
    try:
        subprocess.run(["docker-compose", "up", "-d"], check=True)
        print("Services deployed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error deploying services: {e}")

if __name__ == "__main__":
    create_env_file()
    deploy_services()
