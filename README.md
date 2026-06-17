# NotePad MERN

A full-stack note-taking application built with the MERN stack, containerized with Docker, deployed via CI/CD pipeline, and orchestrated with Kubernetes.

🔗 **Live Demo:** [https://notepadmern-frontend.onrender.com](https://notepadmern-frontend.onrender.com)  
🐳 **Docker Hub:** [muqeetryan/notepadmern-frontend](https://hub.docker.com/r/muqeetryan/notepadmern-frontend) | [muqeetryan/notepadmern-backend](https://hub.docker.com/r/muqeetryan/notepadmern-backend)

---

## Architecture

```
Browser
   ↓
React Frontend (nginx)
   ↓
Node/Express Backend
   ↓
MongoDB
```

Frontend and backend are deployed as **separate Docker containers** — independently scalable and deployable.

---

## Tech Stack

### Application
- **Frontend** — React, Vite, TailwindCSS, Axios
- **Backend** — Node.js, Express.js
- **Database** — MongoDB with Mongoose

### DevOps
- **Containerization** — Docker, Docker Compose
- **CI/CD** — GitHub Actions
- **Container Registry** — DockerHub
- **Orchestration** — Kubernetes (minikube)
- **Monitoring** — Prometheus + Grafana (via Helm)
- **Deployment** — Render (Docker image deploy)
- **Web Server** — nginx (production frontend)

---

## Features

- Full CRUD for notes (Create, Read, Update, Delete)
- Responsive UI with TailwindCSS
- CORS configured for secure cross-origin communication
- Rate limiting with Upstash Redis
- Environment separation (development / production)
- Containerized local development with Docker Compose
- Automated CI/CD pipeline with GitHub Actions
- Kubernetes deployments with resource limits
- Prometheus + Grafana monitoring stack
- Custom Kubernetes Resource Definition (NotepadApp CRD)

---

## Project Structure

```
NotePad-MERN/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── Dockerfile
│   ├── .env.development
│   └── .env.production
├── frontend/
│   ├── src/
│   ├── Dockerfile           (development)
│   ├── Dockerfile.prod      (production - multi-stage)
│   ├── nginx.conf
│   ├── .env.development
│   └── .env.production
├── k8s/
│   ├── mongo-deployment.yaml
│   ├── mongo-service.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── notepadapp-crd.yaml
│   └── notepadapp-instance.yaml
├── .github/
│   └── workflows/
│       └── ci-cd.yml
└── docker-compose.dev.yml
```

---

## Local Development with Docker Compose

Every developer runs the same environment with one command:

```bash
git clone https://github.com/Muqeet-Ryan/NotePad-MERN.git
cd NotePad-MERN
docker-compose -f docker-compose.dev.yml up
```

This starts all three tiers:
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:3000`
- MongoDB at `mongodb://localhost:27017`

---

## CI/CD Pipeline

Every push to `main` triggers the GitHub Actions pipeline:

```
Push to main
     ↓
GitHub Actions
     ├── Build frontend Docker image
     │   └── VITE_API_URL injected as build arg (baked into bundle)
     ├── Build backend Docker image
     └── Push both images to DockerHub
```

Render automatically pulls the latest images and redeploys.

---

## Kubernetes Deployment (Local)

Deploy the full stack on minikube:

```bash
minikube start
kubectl apply -f k8s/
kubectl get pods
```

Expected output:
```
NAME                        READY   STATUS    RESTARTS   AGE
backend-xxx                 1/1     Running   0          1m
frontend-xxx                1/1     Running   0          1m
mongo-xxx                   1/1     Running   0          1m
```

Open the app in browser:
```bash
minikube service frontend
```

### Kubernetes Architecture

```
Cluster (minikube)
└── Node
      ├── mongo pod       ← mongo-service (ClusterIP)
      ├── backend pod     ← backend-service (ClusterIP)
      └── frontend pod    ← frontend-service (NodePort :30000)
```

Each pod has defined resource requests and limits for proper scheduling and monitoring.

---

## Monitoring with Prometheus + Grafana

Installed via Helm:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install monitoring prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace
```

Access Grafana:
```bash
kubectl --namespace monitoring port-forward service/monitoring-grafana 3000:80
```

Open `http://localhost:3000` — dashboards show CPU, memory, and network metrics for all pods.

---

## Custom Resource Definition (CRD)

Extended the Kubernetes API with a custom `NotepadApp` resource type:

```bash
kubectl apply -f k8s/notepadapp-crd.yaml
kubectl apply -f k8s/notepadapp-instance.yaml
kubectl get notepadapps
```

```
NAME         AGE
my-notepad   1m
```

The CRD defines a domain-specific resource with fields for `replicas`, `environment`, and `version` — extending Kubernetes vocabulary for this application.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

---

## Environment Variables

**Backend**
```
MONGO_URI=
PORT=3000
NODE_ENV=
```

**Frontend** (build-time only)
```
VITE_API_URL=https://your-backend-url/api
```

> Note: `VITE_API_URL` is baked into the bundle at build time by Vite. Any change requires rebuilding the Docker image.

