# Kubernetes, CI tekton, CD flux
weekly49

[![GitOps Continuous Delivery on Kubernetes with Flux lfs269 Certificate, Linux Fundation](https://raw.githubusercontent.com/maximilianou/weekly49/main/share/maximiliano-usich-gitops-continuous-delivery-on-kubernetes-with-flux-lfs269-certificate.png)](https://raw.githubusercontent.com/maximilianou/weekly49/main/share/maximiliano-usich-gitops-continuous-delivery-on-kubernetes-with-flux-lfs269-certificate.png)

<https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/3499b883-e4e1-41cf-8487-1553fdd33103-maximiliano-usich-gitops-continuous-delivery-on-kubernetes-with-flux-lfs269-certificate.pdf>

#### Typescript TDD jest ts-jest base project reference:
<https://github.com/mtiller/ts-jest-sample/>

#### CI - Continuous Integration Kubernete Native Tool
<https://tekton.dev/>

#### CD - Continuous Deploy Kubernetes Native Tool
<https://fluxcd.io/>

<https://github.com/fluxcd/flux2-multi-tenancy>

#### CD - Continuous Delivery Kubernetes Native Tool - Blue/Green - Canary
<https://flagger.app/>


- Repositories
  - Flux Fleet
  - Project Deployment (tenant)
  - Project/App Source.
----
----
- Minimal Cluster Create online, domain -> lb -> srv -> deploy -> container
```
$ k3d cluster create -p "80:80@loadbalancer" dev-cluster
```
- app2-namespace.yaml
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: app2-ns
```
- app-ingress.yaml
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app2-ingress
  namespace: app2-ns
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1  
    ingress.kubernetes.io/ssl-redirect: "false"    
spec:
  rules:
  - host: "app1.simpledoers.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: app1
            port:
              number: 80
  - host: "app2.simpledoers.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: app2
            port:
              number: 80
  defaultBackend:
    service:
      name: app2
      port:
        number: 80
```
- app1-service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: app1
  namespace: app2-ns
spec:
  selector:
    app: app1
  ports:
    - name: http
      protocol: TCP
      port: 80
```
- app1-deploy.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: app1
  name: app1
  namespace: app2-ns
spec:
  replicas: 1
  selector:
    matchLabels:
      app: app1
  template:
    metadata:
      labels:
        app: app1
    spec:
      containers:
        - image: nginx
          name: app1
```
- app2-service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: app2
  namespace: app2-ns
spec:
  selector:
    app: app2
  ports:
    - name: http
      protocol: TCP
      port: 80
```
- app2-deploy.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: app2
  name: app2
  namespace: app2-ns
spec:
  replicas: 1
  selector:
    matchLabels:
      app: app2
  template:
    metadata:
      labels:
        app: app2
    spec:
      containers:
        - image: nginx
          name: app2
```
----
----
