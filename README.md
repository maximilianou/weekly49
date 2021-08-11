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

```
$ kubectl get all --namespace=app2-ns -o wide
NAME                        READY   STATUS    RESTARTS   AGE   IP           NODE                       NOMINATED NODE   READINESS GATES
pod/app2-7b9486d97b-7bfps   1/1     Running   0          10s   10.42.0.10   k3d-dev-cluster-server-0   <none>           <none>
pod/app1-6d65d7685b-wr65r   1/1     Running   0          12s   10.42.0.9    k3d-dev-cluster-server-0   <none>           <none>

NAME           TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
service/app2   ClusterIP   10.43.194.45   <none>        80/TCP    18s   app=app2
service/app1   ClusterIP   10.43.204.26   <none>        80/TCP    12s   app=app1

NAME                   READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES   SELECTOR
deployment.apps/app2   1/1     1            1           11s   app2         nginx    app=app2
deployment.apps/app1   1/1     1            1           13s   app1         nginx    app=app1

NAME                              DESIRED   CURRENT   READY   AGE   CONTAINERS   IMAGES   SELECTOR
replicaset.apps/app2-7b9486d97b   1         1         1       12s   app2         nginx    app=app2,pod-template-hash=7b9486d97b
replicaset.apps/app1-6d65d7685b   1         1         1       14s   app1         nginx    app=app1,pod-template-hash=6d65d7685b
```
----
----
